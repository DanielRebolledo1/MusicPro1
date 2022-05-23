from django.db import models


# Create your models here.
class Suscriptor(models.Model):
    idSuscriptor = models.AutoField(primary_key=True, verbose_name='Id')
    emailSuscriptor = models.CharField(max_length=100, unique=True, verbose_name='Email')
    estadoSuscriptor = models.IntegerField(default=1, verbose_name='Estado')

    def __str__(self):
        return self.emailSuscriptor


class Categoria(models.Model):
    idCategoria = models.CharField(primary_key=True, max_length=1, verbose_name='Id')
    nombreCategoria = models.CharField(max_length=50, verbose_name='Nombre')

    def __str__(self):
        return self.nombreCategoria


class Subcategoria(models.Model):
    idSubcategoria = models.CharField(primary_key=True, max_length=4, verbose_name='Id')
    nombreSubcategoria = models.CharField(max_length=50, verbose_name='Nombre')
    estadoSubcategoria = models.IntegerField(default=1, verbose_name='Estado')
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, verbose_name='Categoría')

    def __str__(self):
        return self.nombreSubcategoria


class Marca(models.Model):
    idMarca = models.IntegerField(primary_key=True, verbose_name='Id')
    nombreMarca = models.CharField(max_length=50, verbose_name='Nombre')
    estadoMarca = models.IntegerField(default=1, verbose_name='Estado')

    def __str__(self):
        return self.nombreMarca


class Plataforma(models.Model):
    idPlataforma = models.CharField(primary_key=True, max_length=3, verbose_name='Id')
    nombrePlataforma = models.CharField(max_length=30, verbose_name='Nombre')

    def __str__(self):
        return self.nombrePlataforma


class Producto(models.Model):
    idProducto = models.CharField(primary_key=True, max_length=8, verbose_name='SKU')
    nombreProducto = models.CharField(max_length=75, verbose_name='Nombre')
    imagenProducto = models.ImageField(upload_to='products/media', verbose_name='Imagen')
    fechaLanProducto = models.DateField(null=True, blank=True, verbose_name='Fecha de lanzamiento')
    precioProducto = models.IntegerField(verbose_name='Precio')
    estadoProducto = models.IntegerField(default=1, verbose_name='Estado')
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    subcategoria = models.ForeignKey(Subcategoria, on_delete=models.CASCADE, verbose_name='Subcategoría')
    plataforma = models.ForeignKey(Plataforma, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombreProducto


class Unidad(models.Model):
    idUnidad = models.CharField(primary_key=True, max_length=12, verbose_name='UPC')
    fechaIngUnidad = models.DateField(verbose_name='Fecha de ingreso')
    estadoUnidad = models.IntegerField(default=1, verbose_name='Estado')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    def __str__(self):
        return self.idUnidad
