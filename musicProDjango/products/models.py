from django.db import models
from django.utils import timezone
from orders.models import Orden
from pyuploadcare.dj.models import ImageField


# Create your models here.
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


class Producto(models.Model):
    idProducto = models.CharField(primary_key=True, max_length=8, verbose_name='SKU')
    nombreProducto = models.CharField(max_length=75, verbose_name='Nombre')
    imagenProducto = ImageField(manual_crop="", blank=True, verbose_name='Imagen')
    fechaLanProducto = models.DateField(null=True, blank=True, verbose_name='Fecha de lanzamiento')
    precioProducto = models.IntegerField(verbose_name='Precio')
    descripcionProducto = models.TextField(null=True, blank=True, verbose_name='Descripcion')
    modeloProducto = models.CharField(max_length=50, verbose_name='Modelo')
    colorProducto = models.CharField(max_length=50, null=True, blank=True, verbose_name='Color')
    disponible = models.BooleanField(default=True, verbose_name='Disponible')
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    subcategoria = models.ForeignKey(Subcategoria, on_delete=models.CASCADE, verbose_name='Subcategoría')

    def __str__(self):
        return self.nombreProducto + " " + self.marca.nombreMarca + " " + self.modeloProducto + " " + self.colorProducto


class Unidad(models.Model):
    idUnidad = models.CharField(primary_key=True, max_length=12, verbose_name='UPC')
    fechaIngUnidad = models.DateField(default=timezone.now, verbose_name='Fecha de ingreso')
    disponible = models.BooleanField(default=True, verbose_name='Disponible')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    orden = models.ForeignKey(Orden, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.idUnidad
