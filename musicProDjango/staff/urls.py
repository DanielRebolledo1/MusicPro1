from django.urls import path
from .views import web_admin, orders_admin

urlpatterns = [
    path('admin/web', web_admin, name="web_admin"),
    path('admin/orders', orders_admin, name="orders_admin")
]
