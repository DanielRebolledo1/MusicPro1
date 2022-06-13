from rest_framework import serializers
from .models import Categoria_Promocional


class CategoriaPromoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria_Promocional
        fields = ['id', 'nombre', 'imagen']
