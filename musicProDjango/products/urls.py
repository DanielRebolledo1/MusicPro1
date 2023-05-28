from django.urls import path
from .views import home, product, category, subcategory, contact, questions, stores, terms, denied_access
from login.views import login_view, logout_view

urlpatterns = [
    path('', home, name="home"),
    path('p/<product_name>/-/<product_id>', product, name="product"),
    path('c/<category_name>', category, name="category"),
    path('c/<category_name>/<subcategory_name>', subcategory, name="subcategory"),
    path('contact', contact, name="contact"),
    path('questions', questions, name="questions"),
    path('stores', stores, name="stores"),
    path('terms', terms, name="terms"),
    path('login', login_view, name="login"),
    path('logout', logout_view, name="logout"),
    path('denied_access', denied_access, name="denied"),
]