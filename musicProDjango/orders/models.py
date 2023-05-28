from django.db import models
from django.utils import timezone

from login.models import Usuario
from pyuploadcare.dj.models import ImageField


# Create your models here.

class Descuento(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    nombre = models.CharField(max_length=100, verbose_name='Nombre')
    porcentaje = models.IntegerField(default=0, verbose_name='Porcentaje')
    monto = models.IntegerField(default=0, verbose_name='Monto')

    def __str__(self):
        return self.nombre


class Proveedor(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    nombre = models.CharField(max_length=50, verbose_name='Nombre')
    logo = ImageField(manual_crop="", blank=True, verbose_name='Imagen')

    def __str__(self):
        return self.nombre


class Pago(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    fecha = models.DateTimeField(default=timezone.now, verbose_name='Fecha')
    monto = models.IntegerField(verbose_name='Monto')
    estado = models.CharField(max_length=50, verbose_name='Estado')
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)

    def __str__(self):
        return self.proveedor.nombre + ' / ' + str(self.monto)


class Region(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    nombre = models.CharField(max_length=100, verbose_name='Nombre')

    def __str__(self):
        return self.nombre


class Comuna(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    nombre = models.CharField(max_length=100, verbose_name='Nombre')
    region = models.ForeignKey(Region, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre


class Direccion(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    direccion = models.CharField(max_length=100, verbose_name='Direccion')
    codigoPostal = models.IntegerField(default=0, verbose_name='Código postal')
    principal = models.BooleanField(default=False, verbose_name='Principal')
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    comuna = models.ForeignKey(Comuna, on_delete=models.CASCADE)

    def __str__(self):
        return self.direccion


class Tienda(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    direccion = models.CharField(max_length=100, verbose_name='Direccion')
    comuna = models.ForeignKey(Comuna, on_delete=models.CASCADE)

    def __str__(self):
        return self.direccion


class Despacho(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    fechaEntrega = models.DateField(verbose_name='Fecha de entrega')
    horaEntrega = models.TimeField(null=True, blank=True, verbose_name='Hora de entrega')
    total = models.IntegerField(verbose_name='Total')
    estado = models.CharField(max_length=50, verbose_name='Estado')
    direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE, blank=True, null=True)
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.direccion.direccion + ' / ' + str(self.fechaEntrega)


class Orden(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    fecha = models.DateTimeField(default=timezone.now, verbose_name='Fecha')
    subtotal = models.IntegerField(verbose_name='Subtotal')
    total = models.IntegerField(verbose_name='Total')
    estado = models.CharField(max_length=50, verbose_name='Estado')
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    pago = models.OneToOneField(Pago, on_delete=models.CASCADE)
    despacho = models.OneToOneField(Despacho, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.usuario.email + " / " + str(self.fecha)
