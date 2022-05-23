from django.db import models

# Create your models here.
class Usuario(models.Model):
    idUsuario = models.AutoField(primary_key=True, verbose_name='Id del usuario')
    emailUsuario = models.CharField(max_length=100, unique=True, verbose_name='Email del usuario')
    nombreUsuario = models.CharField(max_length=50, verbose_name='Nombre del usuario')
    apellidoUsuario = models.CharField(max_length=50, verbose_name='Apellido del usuario')
    contrasenaUsuario = models.CharField(max_length=20, verbose_name='Contraseña del usuario')

    def __str__(self):
        return self.nombreUsuario
