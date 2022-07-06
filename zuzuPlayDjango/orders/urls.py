from django.urls import path
from .views import checkout, payment, orders, detail, tracking

urlpatterns = [
    path('checkout', checkout, name="checkout"),
    path('checkout/payment', payment, name="payment"),
    path('account/orders', orders, name="orders"),
    path('account/orders/detail/<id>', detail, name="detail"),
    path('account/orders/tracking/<id>', tracking, name="tracking"),
]
