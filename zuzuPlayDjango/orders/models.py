from django.db import models
from login.models import Usuario
from products.models import Unidad, Suscriptor


# Create your models here.
class Descuento(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    nombre = models.CharField(max_length=100, verbose_name='Nombre')
    porcentaje = models.IntegerField(default=0, verbose_name='Porcentaje')
    monto = models.IntegerField(default=0, verbose_name='Monto')

    def __str__(self):
        return self.nombre


class Cupon(models.Model):
    id = models.CharField(primary_key=True, max_length=32, verbose_name='Id')
    fechaCreacion = models.DateField(verbose_name='Fecha de creacion')
    fechaExpiracion = models.DateField(verbose_name='Fecha de expiracion')
    usado = models.BooleanField(default=True, verbose_name='Usado')
    descuento = models.ForeignKey(Descuento, on_delete=models.CASCADE)
    suscriptor = models.ForeignKey(Suscriptor, on_delete=models.CASCADE)

    def __str__(self):
        return self.id, self.fechaExpiracion


class Orden(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    fecha = models.DateTimeField(verbose_name='Fecha')
    subtotal = models.IntegerField(verbose_name='Subtotal')
    total = models.IntegerField(verbose_name='Total')
    estado = models.CharField(max_length=50, verbose_name='Estado')
    unidades = models.ManyToManyField(Unidad)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    cupon = models.ForeignKey(Cupon, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.fecha


class Pago(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    fecha = models.DateTimeField(verbose_name='Fecha')
    monto = models.IntegerField(verbose_name='Monto')
    proveedor = models.CharField(max_length=100, verbose_name='Proveedor')
    estado = models.CharField(max_length=50, verbose_name='Estado')
    orden = models.OneToOneField(Orden, on_delete=models.CASCADE)

    def __str__(self):
        return self.fecha


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
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    comuna = models.ForeignKey(Comuna, on_delete=models.CASCADE)

    def __str__(self):
        return self.usuario, self.comuna


class Despacho(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    fechaEntrega = models.DateField(verbose_name='Fecha de entrega')
    horaEntrega = models.TimeField(null=True, blank=True, verbose_name='Hora de entrega')
    total = models.IntegerField(verbose_name='Total')
    estado = models.CharField(max_length=50, verbose_name='Estado')
    direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE)
    orden = models.OneToOneField(Orden, on_delete=models.CASCADE)

    def __str__(self):
        return self.fechaEntrega
