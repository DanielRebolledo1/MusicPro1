from django.db import models

from orders.models import Cupon, Direccion
from products.models import Producto
from login.models import Usuario
from django.contrib.sessions.models import Session


# Create your models here.
class Carrito(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, null=True, blank=True)
    sesion = models.OneToOneField(Session, on_delete=models.CASCADE, null=True, blank=True)
    productos = models.ManyToManyField(Producto, through='CarritoProducto', blank=True)
    subtotal = models.IntegerField(default=0, verbose_name='Subtotal')
    total = models.IntegerField(default=0, verbose_name='Total')
    cupon = models.ForeignKey(Cupon, on_delete=models.CASCADE, null=True, blank=True)
    direccion = models.OneToOneField(Direccion, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.usuario


class CarritoProducto(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1, verbose_name='Cantidad')
    total = models.IntegerField(default=0, verbose_name='Total')

    def __str__(self):
        return self.carrito, self.producto
