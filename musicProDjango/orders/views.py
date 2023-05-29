from dateutil.relativedelta import relativedelta
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils import timezone
from rest_framework.authtoken.models import Token

from transbank.webpay.webpay_plus.transaction import Transaction
from transbank.common.integration_api_keys import IntegrationApiKeys
from transbank.common.integration_commerce_codes import IntegrationCommerceCodes
from transbank.common.integration_type import IntegrationType
from transbank.common.options import WebpayOptions

from products.models import Unidad
from .models import Direccion, Proveedor, Orden, Despacho, Pago
from rest_cart.models import Carrito, CarritoProducto


# Create your views here.
@login_required
def checkout(request):
    direcciones = Direccion.objects.filter(usuario=request.user)
    direccionCarrito = Carrito.objects.get(usuario=request.user).direccion
    print(direccionCarrito)

    datos = {
        'direcciones': direcciones,
        'direccionCarrito': direccionCarrito,
    }
    return render(request, "orders/checkout.html", datos)


@login_required
def payment(request):
    proveedores = Proveedor.objects.all()
    direccionCarrito = Carrito.objects.get(usuario=request.user).direccion
    if direccionCarrito is None:
        return redirect('home')
    datos = {
        'proveedores': proveedores,
    }
    if request.method == 'POST':
        carrito = Carrito.objects.get(usuario=request.user)
        productos = CarritoProducto.objects.filter(carrito=carrito)
        pago = Pago.objects.create(monto=carrito.total, estado='Pendiente', proveedor_id=request.POST['proveedor'])
        orden = Orden.objects.create(subtotal=carrito.subtotal, total=carrito.total, pago=pago,
                                     usuario=carrito.usuario, estado='En proceso')
        for prod in productos:
            cantidad = prod.cantidad
            unidades = Unidad.objects.filter(producto__idProducto=prod.producto.idProducto,
                                             disponible=True).order_by('fechaIngUnidad')[:cantidad]
            if unidades.count() < cantidad:
                return JsonResponse({'error': 'stock'})

        url = 'http://127.0.0.1:8000' + reverse('confirmation', args=[orden.id])
        tx = Transaction(
            WebpayOptions(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, IntegrationType.TEST))
        response = tx.create(orden.id.__str__(), request.session.session_key, pago.monto, url)
        return JsonResponse(response)
    return render(request, "orders/payment.html", datos)


@login_required
def confirmation(request, idOrden):
    try:
        orden = Orden.objects.get(id=idOrden, estado__iexact='En proceso', pago__estado__iexact='Pendiente')
    except Orden.DoesNotExist:
        return redirect('home')
    if orden.usuario != request.user:
        return redirect('denied')

    token = request.GET.get('token_ws')
    if not token:
        return redirect('home')

    tx = Transaction(
        WebpayOptions(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, IntegrationType.TEST))
    resp = tx.status(token)

    carrito = Carrito.objects.get(usuario=request.user)
    productos = CarritoProducto.objects.filter(carrito=carrito)
    productos.cantidad = productos.count()

    if resp['vci'] == 'TSY':
        exito = True
        fechaEntrega = timezone.now() + relativedelta(weeks=1)
        horaEntrega = timezone.now()
        despacho = Despacho.objects.create(fechaEntrega=fechaEntrega, horaEntrega=horaEntrega, total=0,
                                           estado='Ingresado', direccion=carrito.direccion)
        orden.despacho = despacho
        orden.estado = 'Procesada'
        orden.save()
        orden.pago.estado = 'Aprobado'
        orden.pago.save()
        for prod in productos:
            cantidad = prod.cantidad
            unidades = Unidad.objects.filter(producto__idProducto=prod.producto.idProducto,
                                             disponible=True).order_by('fechaIngUnidad')[:cantidad]
            for uni in unidades:
                uni.orden = orden
                uni.disponible = False
                uni.save()
        carrito.delete()
    else:
        exito = False
        orden.estado = 'Cancelada'
        orden.save()
        orden.pago.estado = 'Rechazado'
        orden.pago.save()

    datos = {
        'orden': orden,
        'productos': productos,
        'exito': exito
    }

    return render(request, "orders/confirmation.html", datos)


@login_required
def orders(request):
    ordenes = Orden.objects.filter(usuario=request.user)
    datos = {
        'ordenes': ordenes,
    }
    return render(request, "orders/orders.html", datos)


@login_required
def detail(request, id):
    try:
        orden = Orden.objects.get(id=id)
    except Orden.DoesNotExist:
        orden = None
    if orden is not None:
        if orden.usuario != request.user:
            redirect('denied')
    datos = {
        'orden': orden,
    }
    return render(request, "orders/detail.html", datos)


@login_required
def tracking(request, id):
    try:
        despacho = Despacho.objects.get(orden_id=id)
    except Despacho.DoesNotExist:
        despacho = None
    if despacho is not None:
        if despacho.orden.usuario != request.user:
            redirect('denied')
    datos = {
        'despacho': despacho,
    }
    return render(request, "orders/tracking.html", datos)
