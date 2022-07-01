from django.db import models
from products.models import Producto


# Create your models here.
class Video(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='Id')
    url = models.URLField(verbose_name='URL')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    def __str__(self):
        return self.url