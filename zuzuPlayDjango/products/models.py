from django.db import models

# Create your models here.

class Usuario(models.Model):
    idUsuario = models.IntegerField(primary_key=True, verbose_name='Id del usuario')
    emailUsuario = models.CharField(max_length=100, verbose_name='Email del usuario')
    nombreUsuario = models.CharField(max_length=50, verbose_name='Nombre del usuario')
    apellidoUsuario = models.CharField(max_length=50, verbose_name='Apellido del usuario')
    contrasenaUsuario = models.CharField(max_length=20, verbose_name='Contraseña del usuario')

    def __str__(self):
        return self.idUsuario


class Suscriptor(models.Model):
    idSuscriptor = models.IntegerField(primary_key=True, verbose_name='Id del suscriptor')
    emailSuscriptor = models.CharField(max_length=100, verbose_name='Email del suscriptor')
    estadoSuscriptor = models.IntegerField(verbose_name='Estado del suscriptor')

    def __str__(self):
        return self.idSuscriptor

class Categoria(models.Model):
    idCategoria = models.CharField(primary_key=True, max_length=1, verbose_name='Id de la categoría')
    nombreCategoria = models.CharField(max_length=50, verbose_name='Nombre de la categoría')

    def __str__(self):
        return self.idCategoria

class Subcategoria(models.Model):
    idSubcategoria = models.CharField(primary_key=True, max_length=4, verbose_name='Id de la subcategoría')
    nombreSubcategoria = models.CharField(max_length=50, verbose_name='Nombre de la subcategoría')
    estadoSubcategoria = models.IntegerField(verbose_name='Estado de la subcategoría')
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

    def __str__(self):
        return self.idSubcategoria

class Marca(models.Model):
    idMarca = models.IntegerField(primary_key=True, verbose_name='Id de la marca')
    nombreMarca = models.CharField(max_length=50, verbose_name='Nombre de la marca')
    estadoSubcategoria = models.IntegerField(verbose_name='Estado de la marca')

    def __str__(self):
        return self.idMarca

class Producto(models.Model):
    idProducto = models.CharField(primary_key=True, max_length=8, verbose_name='SKU del producto')
    nombreProducto = models.CharField(max_length=75, verbose_name='Nombre del producto')
    imagenProducto = models.FileField(verbose_name='Imagen del producto')
    fechaLanProducto = models.DateField(verbose_name='Fecha de lanzamiento del producto')
    precioProducto = models.IntegerField(verbose_name='Precio del producto')
    estadoProducto = models.IntegerField(verbose_name='Estado del producto')
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    subcategoria = models.ForeignKey(Subcategoria, on_delete=models.CASCADE)

    def __str__(self):
        return self.idProducto

class Unidad(models.Model):
    idUnidad = models.CharField(primary_key=True, max_length=12, verbose_name='UPC de la unidad')
    fechaIngUnidad = models.DateField(verbose_name='Fecha de ingreso de la unidad')
    estadoUnidad = models.IntegerField(verbose_name='Estado de la unidad')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    def __str__(self):
        return self.idUnidad