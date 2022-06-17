from django.db import models

# Create your models here.
class Categoria_Promocional(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    nombre = models.CharField(max_length=50, verbose_name='Nombre')
    imagen = models.ImageField(upload_to='rest_categoriaPromo/media', verbose_name='Imagen')

    def __str__(self):
        return self.nombre