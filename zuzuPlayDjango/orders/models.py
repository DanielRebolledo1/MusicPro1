from dateutil.relativedelta import relativedelta
from django.db import models
from django.db.models.signals import post_save
from django.utils import timezone

from login.models import Usuario
from pyuploadcare.dj.models import ImageField


# Create your models here.
class Suscriptor(models.Model):
    idSuscriptor = models.AutoField(primary_key=True, verbose_name='Id')
    emailSuscriptor = models.CharField(max_length=100, unique=True, verbose_name='Email')
    activo = models.BooleanField(default=True, verbose_name='Activo')

    def __str__(self):
        return self.emailSuscriptor


class Descuento(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    nombre = models.CharField(max_length=100, verbose_name='Nombre')
    porcentaje = models.IntegerField(default=0, verbose_name='Porcentaje')
    monto = models.IntegerField(default=0, verbose_name='Monto')

    def __str__(self):
        return self.nombre


class Cupon(models.Model):
    id = models.CharField(primary_key=True, max_length=32, verbose_name='Id')
    fechaCreacion = models.DateField(default=timezone.now, verbose_name='Fecha de creacion')
    fechaExpiracion = models.DateField(verbose_name='Fecha de expiracion')
    usado = models.BooleanField(default=False, verbose_name='Usado')
    descuento = models.ForeignKey(Descuento, on_delete=models.CASCADE)
    suscriptor = models.ForeignKey(Suscriptor, on_delete=models.CASCADE)

    def __str__(self):
        return self.id + " | " + str(self.fechaExpiracion)

    def suscriptor_post_save(sender, instance, *args, **kwargs):
        desc = Descuento.objects.get(nombre__iexact='primera compra')
        fechaExp = timezone.now() + relativedelta(years=1)
        id = 'PRIMERACOMPRA' + str(instance.idSuscriptor)
        Cupon.objects.create(id=id, fechaExpiracion=fechaExp, descuento=desc, suscriptor=instance)

    post_save.connect(suscriptor_post_save, sender=Suscriptor)


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


class Despacho(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    fechaEntrega = models.DateField(verbose_name='Fecha de entrega')
    horaEntrega = models.TimeField(null=True, blank=True, verbose_name='Hora de entrega')
    total = models.IntegerField(verbose_name='Total')
    estado = models.CharField(max_length=50, verbose_name='Estado')
    direccion = models.ForeignKey(Direccion, on_delete=models.CASCADE)

    def __str__(self):
        return self.direccion.direccion + ' / ' + str(self.fechaEntrega)


class Orden(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    fecha = models.DateTimeField(default=timezone.now, verbose_name='Fecha')
    subtotal = models.IntegerField(verbose_name='Subtotal')
    total = models.IntegerField(verbose_name='Total')
    estado = models.CharField(max_length=50, verbose_name='Estado')
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    cupon = models.OneToOneField(Cupon, on_delete=models.CASCADE, null=True, blank=True)
    pago = models.OneToOneField(Pago, on_delete=models.CASCADE)
    despacho = models.OneToOneField(Despacho, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.usuario.email + " / " + str(self.fecha)
