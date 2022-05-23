from django.http import JsonResponse
from django.shortcuts import render
from products.models import Producto, Marca
from .forms import NuevoProductoForm, EditarProductoForm


# Create your views here.
def administration(request):
    datos = {
        'nuevoProductoForm': NuevoProductoForm(),
        'editarProductoForm': EditarProductoForm()
    }

    if request.method == 'POST':
        action = request.POST['action']

        if action == 'autocomplete':
            query = Producto.objects.filter(nombreProducto__icontains=request.POST['term'])
            productos = []
            for prod in query:
                prod = {
                    'buscar': prod.nombreProducto + ' ' + prod.plataforma.idPlataforma,
                    'id': prod.idProducto,
                    'nombre': prod.nombreProducto,
                    'imagen': prod.imagenProducto.url,
                    'fechaLan': prod.fechaLanProducto,
                    'precio': prod.precioProducto,
                    'marca': prod.marca.idMarca,
                    'subcategoria': prod.subcategoria.idSubcategoria,
                    'plataforma': prod.plataforma.idPlataforma,
                }
                productos.append(prod)
            return JsonResponse(productos, safe=False)
        elif action == 'nuevoProductoForm':
            form = NuevoProductoForm(request.POST)
            if form.is_valid():
                form.save()
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False})
        else:
            return False

    return render(request, "staff/administration.html", datos)
