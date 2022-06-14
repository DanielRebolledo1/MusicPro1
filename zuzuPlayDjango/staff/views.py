from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response

from products.models import Producto, Marca
from .forms import NuevoProductoForm, EditarProductoForm, NuevaMarcaForm, NuevaSubcategoriaForm, NuevaPlataformaForm
from rest_categoriaPromo.serializers import CategoriaPromoSerializer


# Create your views here.
def administration(request):
    datos = {
        'nuevoProductoForm': NuevoProductoForm(),
        'editarProductoForm': EditarProductoForm(),
        'nuevaMarcaForm': NuevaMarcaForm(),
        'nuevaSubcategoriaForm': NuevaSubcategoriaForm(),
        'nuevaPlataformaForm': NuevaPlataformaForm()

    }

    if request.method == 'POST':
        action = request.POST['action']

        if action == 'autocomplete':
            query = Producto.objects.filter(nombreProducto__istartswith=request.POST['term'], estadoProducto=1)
            count = query.count()
            if count == 0:
                query = Producto.objects.filter(nombreProducto__icontains=request.POST['term'], estadoProducto=1)
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
                    'nombreSubcategoria': prod.subcategoria.nombreSubcategoria,
                    'plataforma': prod.plataforma.idPlataforma,
                    'nombrePlataforma': prod.plataforma.nombrePlataforma,
                }
                productos.append(prod)
            return JsonResponse(productos, safe=False)
        elif action == 'newProduct':
            form = NuevoProductoForm(request.POST, request.FILES)
            if form.is_valid():
                prod = form.save(commit=False)
                count = Producto.objects.filter(subcategoria__idSubcategoria=prod.subcategoria.idSubcategoria).count()
                idProducto = prod.subcategoria.idSubcategoria + str(count + 1)
                prod.idProducto = idProducto
                prod.save()
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'errors': form.errors})
        elif action == 'editProduct':
            id = request.POST.get('idProducto')
            prod = Producto.objects.get(idProducto=id)
            form = EditarProductoForm(request.POST, request.FILES, instance=prod)
            if form.is_valid():
                form.save()
                prod = Producto.objects.get(idProducto=id)
                return JsonResponse({'success': True, 'imagen': prod.imagenProducto.url})
            else:
                return JsonResponse({'errors': form.errors})
        elif action == 'deleteProduct':
            id = request.POST['id']
            prod = Producto.objects.get(idProducto=id)
            prod.estadoProducto = 0
            try:
                prod.save()
                return JsonResponse({'success': True})
            except:
                return JsonResponse({'success': False})
        elif action == 'productExists':
            name = request.POST['name']
            platform = request.POST['platform']
            count = Producto.objects.filter(nombreProducto=name, plataforma__idPlataforma=platform).count()
            if count != 0:
                return JsonResponse({'exists': True})
            else:
                return JsonResponse({'exists': False})
        elif action == 'newBrand':
            form = NuevaMarcaForm(request.POST)
            if form.is_valid():
                form.save()
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'errors': form.errors})
        elif action == 'brandExists':
            name = request.POST['name']
            count = Marca.objects.filter(nombreMarca=name).count()
            if count != 0:
                return JsonResponse({'exists': True})
            else:
                return JsonResponse({'exists': False})
        elif action == 'newSubcategory':
            form = NuevaSubcategoriaForm(request.POST)
            if form.is_valid():
                form.save()
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'errors': form.errors})
        elif action == 'SubcategoryExists':
            name = request.POST['name']
            count = Marca.objects.filter(nombreMarca=name).count()
            if count != 0:
                return JsonResponse({'exists': True})
            else:
                return JsonResponse({'exists': False})
        elif action == 'newPlatform':
            form = NuevaPlataformaForm(request.POST)
            if form.is_valid():
                form.save()
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'errors': form.errors})
        elif action == 'platformExists':
            name = request.POST['name']
            count = Marca.objects.filter(nombreMarca=name).count()
            if count != 0:
                return JsonResponse({'exists': True})
            else:
                return JsonResponse({'exists': False})
        elif action == 'newPromoCategory':
            serializer = CategoriaPromoSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'success': True}) and Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({'success': False, 'errors': serializer.errors}) and Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({'error': 'Error en POST: Acción no definida'})

    return render(request, "staff/administration.html", datos)
