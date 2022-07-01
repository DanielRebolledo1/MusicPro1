from django.urls import path
from .views import videos, agregar_video, modificar_video

urlpatterns = [
    path('videos', videos, name='videos'),
    path('agregar_video', agregar_video, name='agregar_video'),
    path('modificar_video/<id>', modificar_video, name='modificar_video')
]
