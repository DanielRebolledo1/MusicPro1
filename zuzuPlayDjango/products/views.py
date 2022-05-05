from django.shortcuts import render


# Create your views here.
def home(request):
    return render(request, "products/index.html")


def login(request):
    return render(request, "products/login.html")


def product(request):
    return render(request, "products/product.html")


def catalog(request):
    return render(request, "products/catalog.html")


def contact(request):
    return render(request, "products/contact.html")


def questions(request):
    return render(request, "products/questions.html")


def stores(request):
    return render(request, "products/stores.html")


def terms(request):
    return render(request, "products/terms.html")
