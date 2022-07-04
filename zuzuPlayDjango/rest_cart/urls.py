from django.urls import path
from .views import carrito, agregar_al_carrito, modificar_carrito

urlpatterns = [
    path('cart', carrito, name='carrito'),
    path('add_to_cart', agregar_al_carrito, name='agregarAlCarrito'),
    path('update_cart/<id_carrito>/<id_producto>', modificar_carrito, name='modificarCarrito'),
]