import datetime

from django.http import JsonResponse
from django.shortcuts import render
from .models import Producto, Categoria, Subcategoria
from .forms import SuscriptorForm

# Create your views here.
def home(request):
    categorias = Categoria.objects.all()
    subcategorias = Subcategoria.objects.all()
    for sub in subcategorias:
        for cat in categorias:
            sub.nombreSubcategoria = sub.nombreSubcategoria.replace(cat.nombreCategoria, "").strip()
    nuevosProductos = Producto.objects.filter(fechaLanProducto__lt=datetime.date.today(), estadoProducto=1).order_by('-fechaLanProducto')[:12]
    productosPreventa = Producto.objects.filter(fechaLanProducto__gt=datetime.date.today(), estadoProducto=1).order_by('fechaLanProducto')[:12]
    datos = {
        'categorias': categorias,
        'subcategorias': subcategorias,
        'nuevosProductos': nuevosProductos,
        'productosPreventa': productosPreventa,
        'form': SuscriptorForm()
    }

    if(request.method == 'POST'):
        form = SuscriptorForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False})

    return render(request, "products/index.html", datos)


def product(request):
    categorias = Categoria.objects.all()
    subcategorias = Subcategoria.objects.all()
    recomendados = Producto.objects.filter(fechaLanProducto__lt=datetime.date.today(), estadoProducto=1).order_by('?')[:18]
    datos = {
        'categorias': categorias,
        'subcategorias': subcategorias,
        'recomendados': recomendados
    }
    return render(request, "products/product.html", datos)


def catalog(request):
    return render(request, "products/catalog.html")


def contact(request):
    return render(request, "products/contact.html")


def questions(request):
    return render(request, "products/questions.html")


def stores(request):
    return render(request, "products/stores.html")


def terms(request):
    return render(request, "products/terms.html")