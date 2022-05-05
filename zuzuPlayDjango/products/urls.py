from django.urls import path
from .views import home, login, product, catalog, contact, questions, stores, terms

urlpatterns = [
    path('', home, name="home"),
    path('login/', login, name="login"),
    path('product/', product, name="product"),
    path('catalog/', catalog, name="catalog"),
    path('contact/', contact, name="contact"),
    path('questions/', questions, name="questions"),
    path('stores/', stores, name="stores"),
    path('terms/', terms, name="terms"),
]