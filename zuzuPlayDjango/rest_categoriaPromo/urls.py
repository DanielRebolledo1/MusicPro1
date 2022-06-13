from django.urls import path
from .views import categorias_promo, modificar_categorias_promo

urlpatterns = [
    path('categorias_promo', categorias_promo, name='categorias_promo'),
    path('modificar_categorias_promo/<id>', modificar_categorias_promo, name='modificar_categorias_promo'),
]
