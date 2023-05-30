from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required, user_passes_test
from products.models import Producto, Marca, Unidad, Subcategoria, Orden
from .forms import NuevoProductoForm, EditarProductoForm, NuevaMarcaForm, NuevaSubcategoriaForm, \
    NuevaUnidadForm, EditarUnidadForm, DescripcionProductoForm, VideoForm


# Create your views here.
@login_required
@user_passes_test(lambda u: u.is_staff, login_url='denied', redirect_field_name=None)
def web_admin(request):
    datos = {
        'nuevoProductoForm': NuevoProductoForm(),
        'editarProductoForm': EditarProductoForm(),
        'nuevaMarcaForm': NuevaMarcaForm(),
        'nuevaSubcategoriaForm': NuevaSubcategoriaForm(),
        'nuevaUnidadForm': NuevaUnidadForm(),
        'editarUnidadForm': EditarUnidadForm(),
        'descripcionProductoForm': DescripcionProductoForm(),
        'videoForm': VideoForm(),
    }

    if request.method == 'POST':
        action = request.POST['action']

        if action == 'autocomplete':
            query = Producto.objects.filter(nombreProducto__istartswith=request.POST['term'], disponible=True)
            count = query.count()
            if count == 0:
                query = Producto.objects.filter(nombreProducto__icontains=request.POST['term'], disponible=True)
            productos = []
            for prod in query:
                if prod.imagenProducto:
                    imagen = prod.imagenProducto.cdn_url
                else:
                    imagen = ""
                prod = {
                    'buscar': prod.nombreProducto + ' ' + prod.modeloProducto,
                    'id': prod.idProducto,
                    'nombre': prod.nombreProducto,
                    'imagen': imagen,
                    'fechaLan': prod.fechaLanProducto,
                    'precio': prod.precioProducto,
                    'marca': prod.marca.idMarca,
                    'modelo': prod.modeloProducto,
                    'color': prod.colorProducto,
                    'subcategoria': prod.subcategoria.idSubcategoria,
                    'nombreSubcategoria': prod.subcategoria.__str__()
                }
                productos.append(prod)
            return JsonResponse(productos, safe=False)
        elif action == 'newProduct':
            form = NuevoProductoForm(request.POST)
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
            id = request.POST['idProducto']
            prod = Producto.objects.get(idProducto=id)
            img = prod.imagenProducto
            form = EditarProductoForm(request.POST, instance=prod)
            if form.is_valid():
                editProd = form.save(commit=False)
                if editProd.imagenProducto == '':
                    editProd.imagenProducto = img
                editProd.save()
                prod = Producto.objects.get(idProducto=id)
                return JsonResponse({'success': True, 'imagen': prod.imagenProducto.cdn_url})
            else:
                return JsonResponse({'errors': form.errors})
        elif action == 'deleteProduct':
            id = request.POST['id']
            prod = Producto.objects.get(idProducto=id)
            prod.disponible = False
            try:
                prod.save()
                return JsonResponse({'success': True})
            except:
                return JsonResponse({'success': False})
        elif action == 'productExists':
            name = request.POST['name']
            count = Producto.objects.filter(nombreProducto__iexact=name).count()
            if count != 0:
                return JsonResponse({'exists': True})
            else:
                return JsonResponse({'exists': False})
        elif action == 'editProductExists':
            id = request.POST['id']
            name = request.POST['name']
            try:
                Producto.objects.get(idProducto__iexact=id,
                                     nombreProducto__iexact=name)
                return JsonResponse({'exists': False})
            except Producto.DoesNotExist:
                count = Producto.objects.filter(nombreProducto__iexact=name).count()
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
            count = Marca.objects.filter(nombreMarca__iexact=name).count()
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
        elif action == 'subcategoryExists':
            id = request.POST['id']
            name = request.POST['name']
            category = request.POST['category']
            try:
                Subcategoria.objects.get(idSubcategoria__iexact=id)
            except Subcategoria.DoesNotExist:
                try:
                    Subcategoria.objects.get(nombreSubcategoria__iexact=name, categoria__idCategoria__iexact=category)
                except Subcategoria.DoesNotExist:
                    return JsonResponse({'exists': False})
            return JsonResponse({'exists': True})
        elif action == 'newUnit':
            try:
                unidad = Unidad.objects.create(idUnidad=request.POST['id'], producto_id=request.POST['producto'])
            except Exception as e:
                return JsonResponse({'success': False, 'errors': str(e)})
            unidad.save()
            return JsonResponse({'success': True})
        elif action == 'editUnit':
            unidad = Unidad.objects.get(idUnidad=request.POST['currentId'])
            try:
                nueva_unidad = Unidad.objects.create(idUnidad=request.POST['newId'], producto_id=unidad.producto_id,
                                                     fechaIngUnidad=unidad.fechaIngUnidad)
            except Exception as e:
                return JsonResponse({'success': False, 'errors': str(e)})
            unidad.delete()
            nueva_unidad.save()
            return JsonResponse({'success': True})
        elif action == 'unitExists':
            id = request.POST['id']
            count = Unidad.objects.filter(idUnidad=id).count()
            if count != 0:
                return JsonResponse({'exists': True})
            else:
                return JsonResponse({'exists': False})
        elif action == 'getUnits':
            query = Unidad.objects.filter(producto__idProducto=request.POST['product'],
                                          disponible=True).order_by('-fechaIngUnidad')
            unidades = []
            for unidad in query:
                unidad = {
                    'id': unidad.idUnidad,
                    'fechaIng': unidad.fechaIngUnidad,
                }
                unidades.append(unidad)
            return JsonResponse(unidades, safe=False)
        else:
            return JsonResponse({'error': 'Error en POST: Acción no definida'})
    return render(request, "staff/webAdmin.html", datos)


@login_required
@user_passes_test(lambda u: u.is_staff, login_url='denied', redirect_field_name=None)
def orders_admin(request):
    ordenes = []
    groups = request.user.groups

    try:
        groups.get(name__iexact="vendedor")
        rol = "vendedor"
    except:
        try:
            groups.get(name__iexact="bodeguero")
            rol = "bodeguero"
        except:
            try:
                groups.get(name__iexact="contador")
                rol = "contador"
            except:
                rol = ""

    if rol == "vendedor":
        ordenesBD = Orden.objects.filter(estado__iexact="Procesada")
    elif rol == "bodeguero":
        ordenesBD = Orden.objects.filter(estado__iexact="Aceptada")
    elif rol == "contador":
        ordenesBD = Orden.objects.filter(despacho__estado__iexact="En Despacho").filter(pago__estado__iexact="Pendiente")
    else:
        ordenesBD = Orden.objects.all()

    for orden in ordenesBD:
        orden.unidades = Unidad.objects.filter(orden__id__iexact=orden.id)
        ordenes.append(orden)

    datos = {
        'ordenes': ordenes,
        'rol': rol
    }

    return render(request, "staff/ordersAdmin.html", datos)
