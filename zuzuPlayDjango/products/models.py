from django.db import models
from django.utils import timezone
from dateutil.relativedelta import relativedelta
from pyuploadcare.dj.models import ImageField


# Create your models here.
class Suscriptor(models.Model):
    idSuscriptor = models.AutoField(primary_key=True, verbose_name='Id')
    emailSuscriptor = models.CharField(max_length=100, unique=True, verbose_name='Email')
    activo = models.BooleanField(default=True, verbose_name='Activo')

    def __str__(self):
        return self.emailSuscriptor


class Categoria(models.Model):
    idCategoria = models.CharField(primary_key=True, max_length=1, verbose_name='Id')
    nombreCategoria = models.CharField(max_length=50, verbose_name='Nombre')
    activa = models.BooleanField(default=True, verbose_name='Activa')

    def __str__(self):
        return self.nombreCategoria

    def save(self, *args, **kwargs):
        self.idCategoria = self.idCategoria.upper()
        super(Categoria, self).save(*args, **kwargs)


class Subcategoria(models.Model):
    idSubcategoria = models.CharField(primary_key=True, max_length=4, verbose_name='Id')
    nombreSubcategoria = models.CharField(max_length=50, verbose_name='Nombre')
    activa = models.BooleanField(default=True, verbose_name='Activa')
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, verbose_name='Categoría')

    def __str__(self):
        return self.nombreSubcategoria + ' - ' + self.categoria.nombreCategoria

    def save(self, *args, **kwargs):
        self.idSubcategoria = self.idSubcategoria.upper()
        super(Subcategoria, self).save(*args, **kwargs)


class Marca(models.Model):
    idMarca = models.AutoField(primary_key=True, verbose_name='Id')
    nombreMarca = models.CharField(max_length=50, verbose_name='Nombre')
    activa = models.BooleanField(default=True, verbose_name='Activa')

    def __str__(self):
        return self.nombreMarca


class Plataforma(models.Model):
    idPlataforma = models.CharField(primary_key=True, max_length=3, verbose_name='Id')
    nombrePlataforma = models.CharField(max_length=30, verbose_name='Nombre')
    activa = models.BooleanField(default=True, verbose_name='Activa')

    def save(self, *args, **kwargs):
        self.idPlataforma = self.idPlataforma.upper()
        super(Plataforma, self).save(*args, **kwargs)

    def __str__(self):
        return self.nombrePlataforma


class Producto(models.Model):
    idProducto = models.CharField(primary_key=True, max_length=8, verbose_name='SKU')
    nombreProducto = models.CharField(max_length=75, verbose_name='Nombre')
    imagenProducto = ImageField(manual_crop="", blank=True, verbose_name='Imagen')
    fechaLanProducto = models.DateField(null=True, blank=True, verbose_name='Fecha de lanzamiento')
    precioProducto = models.IntegerField(verbose_name='Precio')
    descripcionProducto = models.TextField(null=True, blank=True, verbose_name='Descripcion')
    disponible = models.BooleanField(default=True, verbose_name='Disponible')
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    subcategoria = models.ForeignKey(Subcategoria, on_delete=models.CASCADE, verbose_name='Subcategoría')
    plataforma = models.ForeignKey(Plataforma, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombreProducto


class Unidad(models.Model):
    idUnidad = models.CharField(primary_key=True, max_length=12, verbose_name='UPC')
    fechaIngUnidad = models.DateField(default=timezone.now, verbose_name='Fecha de ingreso')
    disponible = models.BooleanField(default=True, verbose_name='Disponible')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    def __str__(self):
        return self.idUnidad
