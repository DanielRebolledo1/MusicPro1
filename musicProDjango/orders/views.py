import hmac
import hashlib
import base64
import requests

from dateutil.relativedelta import relativedelta
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils import timezone

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
        pago = Pago.objects.create(monto=carrito.total, estado='En proceso', proveedor_id=request.POST['proveedor'])
        orden = Orden.objects.create(subtotal=carrito.subtotal, total=carrito.total, pago=pago,
                                     usuario=carrito.usuario, estado='En proceso')
        for prod in productos:
            cantidad = prod.cantidad
            unidades = Unidad.objects.filter(producto__idProducto=prod.producto.idProducto,
                                             disponible=True).order_by('fechaIngUnidad')[:cantidad]
            if unidades.count() < cantidad:
                return JsonResponse({'error': 'stock'})

        api_key = "4CB9F47C-6553-4705-A76B-59CE0L731D11"
        string_to_sign = "amount" + pago.monto.__str__() + "apiKey" + api_key + "currencyCLP"
        secret_key = "0712b9f9de5c7bfae5d98c01e5d37cac40c3a801"
        signature = hmac.new(secret_key.encode('utf-8'), string_to_sign.encode('utf-8'), hashlib.sha256).hexdigest()

        # Add the HMAC value to the HTTP request headers
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'apiKey': api_key,
            's': signature
        }

        request_body = {
            'apiKey': api_key,
            'commerceOrder': orden.id.__str__(),
            'subject': "MusicPro Orden ID: " + orden.id.__str__(),
            'amount': pago.monto,
            'email': request.user.email,
            'urlConfirmation': "https://www.google.com/search?q=confirmation",
            #'urlConfirmation': reverse('confirmation', args=[orden.id]),
            'urlReturn': "https://www.google.com/search?q=return",
            #'urlReturn': reverse('payment'),
            's': signature
        }

        # Send the HTTP request with the authenticated headers
        response = requests.post("https://www.flow.cl/api/payment/create", headers=headers, data=request_body)
        print(response.text)
        print(response.request.body)

        return JsonResponse({'url': 'https://www.flow.cl/btn.php?token=owdtll6'})
        # return JsonResponse({'url': reverse('confirmation', args=[orden.id])})
    return render(request, "orders/payment.html", datos)


@login_required
def confirmation(request, idOrden):
    try:
        orden = Orden.objects.get(id=idOrden, estado__iexact='En proceso')
    except Orden.DoesNotExist:
        return redirect('home')
    if orden.usuario != request.user:
        return redirect('denied')
    carrito = Carrito.objects.get(usuario=request.user)
    productos = CarritoProducto.objects.filter(carrito=carrito)
    productos.cantidad = productos.count()
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
    datos = {
        'orden': orden,
        'productos': productos,
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
