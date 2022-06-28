from rest_framework import serializers
from .models import CategoriaPromocional


class CategoriaPromoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaPromocional
        fields = ['id', 'nombre', 'imagen']
