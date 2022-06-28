from django.db import models
from pyuploadcare.dj.models import ImageField


# Create your models here.
class CategoriaPromocional(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    nombre = models.CharField(max_length=50, verbose_name='Nombre')
    imagen = ImageField(manual_crop="", verbose_name='Imagen')

    def __str__(self):
        return self.nombre