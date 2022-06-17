from django.urls import path, include
from .views import home, product, catalog, contact, questions, stores, terms
from login.views import login_view, logout_view

urlpatterns = [
    path('', home, name="home"),
    path('product/', product, name="product"),
    path('catalog/', catalog, name="catalog"),
    path('contact/', contact, name="contact"),
    path('questions/', questions, name="questions"),
    path('stores/', stores, name="stores"),
    path('terms/', terms, name="terms"),
    path('login/', login_view, name="login"),
    path('logout/', logout_view, name="logout"),
    path('social/', include('social_django.urls', namespace='social')),
]