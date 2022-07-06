from django.urls import reverse
from rest_framework import serializers

from products.models import Producto
from .models import Carrito, CarritoProducto


class CarritoProductoSerializer(serializers.ModelSerializer):
    nombre = serializers.ReadOnlyField(source="producto.nombreProducto")
    plataforma = serializers.ReadOnlyField(source="producto.plataforma.idPlataforma")
    precio = serializers.ReadOnlyField(source="producto.precioProducto")
    imagen = serializers.ReadOnlyField(source="producto.imagenProducto.cdn_url")
    url = serializers.SerializerMethodField('get_product_url')
    subtotalCarrito = serializers.SerializerMethodField('get_cart_subtotal')
    totalCarrito = serializers.SerializerMethodField('get_cart_total')

    class Meta:
        model = CarritoProducto
        fields = ['id', 'carrito', 'producto', 'nombre', 'plataforma',
                  'precio', 'imagen', 'cantidad', 'url', 'total', 'subtotalCarrito', 'totalCarrito']

    def get_product_url(self, carritoProducto):
        try:
            prod = Producto.objects.get(idProducto__iexact=carritoProducto.producto_id)
        except Producto.DoesNotExist:
            return None
        prodName = prod.nombreProducto.lower().replace('-', ' ').replace(':', '') \
                       .replace("'", '').replace('  ', ' ').replace(' ', '-') + '-' + \
                   prod.plataforma.nombrePlataforma.lower().replace('|', '-').replace(' ', '-')
        prodId = prod.idProducto
        url = reverse('product', args=[prodName, prodId])
        return url

    def get_cart_subtotal(self, carritoProducto):
        try:
            carrito = Carrito.objects.get(id=carritoProducto.carrito_id)
        except Carrito.DoesNotExist:
            return None
        return carrito.subtotal

    def get_cart_total(self, carritoProducto):
        try:
            carrito = Carrito.objects.get(id=carritoProducto.carrito_id)
        except Carrito.DoesNotExist:
            return None
        return carrito.total


class CarritoSerializer(serializers.ModelSerializer):
    productos = CarritoProductoSerializer(read_only=True, source='carritoproducto_set', many=True)

    class Meta:
        model = Carrito
        fields = ['id', 'usuario', 'sesion', 'productos', 'subtotal', 'total', 'cupon', 'direccion']
