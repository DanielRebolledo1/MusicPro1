import datetime

from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse

from .models import Producto, Categoria, Subcategoria
from rest_cart.forms import CarritoProductoForm


# Create your views here.
def home(request):
    nuevosProductos = Producto.objects.filter(fechaLanProducto__lte=datetime.date.today(),
                                              disponible=True).order_by('-fechaLanProducto')[:12]
    productosPreventa = Producto.objects.filter(fechaLanProducto__gt=datetime.date.today(),
                                                disponible=True).order_by('fechaLanProducto')[:12]
    datos = {
        'categorias': get_categories_urls(),
        'subcategorias': get_subcategories_urls(),
        'nuevosProductos': get_products_urls(nuevosProductos),
        'productosPreventa': get_products_urls(productosPreventa),
        'carritoProductoForm': CarritoProductoForm(auto_id=False),
    }

    return render(request, "products/index.html", datos)


def product(request, product_name, product_id):
    try:
        producto = Producto.objects.get(idProducto__iexact=product_id)
        producto.alias = producto.nombreProducto + ' ' + producto.marca.nombreMarca + ' ' + producto.modeloProducto
    except Producto.DoesNotExist:
        producto = None
    recomendados = Producto.objects.filter(fechaLanProducto__lte=datetime.date.today(),
                                           disponible=True).order_by('?')[:18]
    datos = {
        'categorias': get_categories_urls(),
        'subcategorias': get_subcategories_urls(),
        'producto': producto,
        'carritoProductoForm': CarritoProductoForm(auto_id=False),
        'recomendados': get_products_urls(recomendados),
        'breadcrumb': get_product_breadcrumb_info(producto),
    }
    return render(request, "products/product.html", datos)


def category(request, category_name):
    nombreCat = category_name.replace('-', ' ')
    productos = Producto.objects.filter(subcategoria__categoria__nombreCategoria__iexact=nombreCat,
                                        fechaLanProducto__lte=datetime.date.today(),
                                        disponible=True)
    datos = {
        'categorias': get_categories_urls(),
        'subcategorias': get_subcategories_urls(),
        'productos': get_page(request, get_products_urls(productos)),
        'carritoProductoForm': CarritoProductoForm(auto_id=False),
        'breadcrumb': get_breadcrumb_info(category_name),
    }

    return render(request, "products/category.html", datos)


def subcategory(request, category_name, subcategory_name):
    nombreSub = subcategory_name.replace('-', ' ')
    nombreCat = category_name.replace('-', ' ')
    productos = Producto.objects.filter(subcategoria__categoria__nombreCategoria__iexact=nombreCat,
                                        subcategoria__nombreSubcategoria__iexact=nombreSub,
                                        fechaLanProducto__lte=datetime.date.today(),
                                        disponible=True)
    datos = {
        'categorias': get_categories_urls(),
        'subcategorias': get_subcategories_urls(),
        'productos': get_page(request, get_products_urls(productos)),
        'carritoProductoForm': CarritoProductoForm(auto_id=False),
        'breadcrumb': get_breadcrumb_info(category_name, subcategory_name),
    }

    return render(request, "products/category.html", datos)


def contact(request):
    datos = {
        'categorias': get_categories_urls(),
        'subcategorias': get_subcategories_urls(),
    }
    return render(request, "products/contact.html", datos)


def questions(request):
    datos = {
        'categorias': get_categories_urls(),
        'subcategorias': get_subcategories_urls(),
    }
    return render(request, "products/questions.html", datos)


def stores(request):
    datos = {
        'categorias': get_categories_urls(),
        'subcategorias': get_subcategories_urls(),
    }
    return render(request, "products/stores.html", datos)


def terms(request):
    datos = {
        'categorias': get_categories_urls(),
        'subcategorias': get_subcategories_urls(),
    }
    return render(request, "products/terms.html", datos)


def denied_access(request):
    datos = {
        'categorias': get_categories_urls(),
        'subcategorias': get_subcategories_urls(),
    }
    return render(request, "products/denied_access.html", datos)


def get_categories_urls():
    categorias = Categoria.objects.all()
    categoriasUrl = []
    for cat in categorias:
        catUrl = cat.nombreCategoria.lower().replace(' ', '-')
        url = reverse('category', args=[catUrl])
        cat.url = url
        categoriasUrl.append(cat)
    return categoriasUrl


def get_subcategories_urls():
    subcategorias = Subcategoria.objects.all()
    subcategoriasUrl = []
    for sub in subcategorias:
        catUrl = sub.categoria.nombreCategoria.lower().replace(' ', '-')
        subUrl = sub.nombreSubcategoria.lower().replace(' ', '-')
        url = reverse('subcategory', args=[catUrl, subUrl])
        sub.url = url
        subcategoriasUrl.append(sub)
    return subcategoriasUrl


def get_products_urls(query):
    print(query)
    productosUrl = []
    for prod in query:
        prodName = prod.nombreProducto.lower().replace('-', ' ').replace(':', '') \
                       .replace("'", '').replace('  ', ' ').replace(' ', '-') + '-' + \
                   prod.marca.nombreMarca.lower().replace('|', '-').replace(' ', '-')
        prodId = prod.idProducto
        url = reverse('product', args=[prodName, prodId])
        prod.url = url
        prod.nombreProducto = prod.nombreProducto + ' ' + prod.marca.nombreMarca + ' ' + prod.modeloProducto
        productosUrl.append(prod)
    return productosUrl


def get_page(request, query):
    paginator = Paginator(query, 20)
    page = request.GET.get('page')
    return paginator.get_page(page)


def get_breadcrumb_info(category_name, subcategory_name=None):
    bread = {'has_sub': False}
    nombreCat = category_name.replace('-', ' ')
    try:
        bread['cat'] = Categoria.objects.get(nombreCategoria__iexact=nombreCat).nombreCategoria
    except Categoria.DoesNotExist:
        return None
    if subcategory_name is not None:
        bread['has_sub'] = True
        nombreSub = subcategory_name.replace('-', ' ')
        try:
            bread['sub'] = Subcategoria.objects.get(categoria__nombreCategoria__iexact=nombreCat,
                                                    nombreSubcategoria__iexact=nombreSub).nombreSubcategoria
        except Subcategoria.DoesNotExist:
            return None
        bread['cat_url'] = reverse('category', args=[category_name])
        bread['sub_url'] = reverse('subcategory', args=[category_name, subcategory_name])
    return bread


def get_product_breadcrumb_info(product):
    bread = {'cat': product.subcategoria.categoria.nombreCategoria, 'sub': product.subcategoria.nombreSubcategoria}
    category_name = bread['cat'].lower().replace(' ', '-')
    subcategory_name = bread['sub'].lower().replace(' ', '-')
    bread['cat_url'] = reverse('category', args=[category_name])
    bread['sub_url'] = reverse('subcategory', args=[category_name, subcategory_name])
    return bread
