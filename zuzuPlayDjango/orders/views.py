from dateutil.relativedelta import relativedelta
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils import timezone

from rest_cart.forms import CuponForm
from products.models import Unidad
from .models import Direccion, Proveedor, Orden, Despacho, Pago
from rest_cart.models import Carrito, CarritoProducto


# Create your views here.
@login_required
def checkout(request):
    direcciones = Direccion.objects.filter(usuario=request.user)
    direccionCarrito = Carrito.objects.get(usuario=request.user).direccion

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
        'cuponForm': CuponForm(),
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
        return JsonResponse({'url': reverse('confirmation', args=[orden.id])})
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

def confirmationEx(request):
    orden = Orden.objects.filter(usuario=request.user).first()
    carrito = Carrito.objects.get(usuario=request.user)
    productos = CarritoProducto.objects.filter(carrito=carrito)
    productos.cantidad = productos.count()
    datos = {
        'orden': orden,
        'productos': productos,
    }
    return render(request, "orders/confirmation.html", datos)


@login_required
def orders(request):
    ordenes = Orden.objects.filter(usuario=request.user)
    estado =  Orden.objects.filter(estado='confirmado')
    orden = Orden.objects.all()
    datos = {
        'ordenes': ordenes,
        'orden': orden,
        'estado' : estado,
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
