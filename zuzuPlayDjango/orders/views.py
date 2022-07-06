from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from rest_cart.forms import CuponForm
from .models import Direccion, Proveedor, Orden, Despacho
from rest_cart.models import Carrito


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
    return render(request, "orders/payment.html", datos)


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
