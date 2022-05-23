import imp
from django.urls import path
from .views import categorias_promo

urlpatterns = [
    path('categorias_promo', categorias_promo, name='categorias_promo')
]
