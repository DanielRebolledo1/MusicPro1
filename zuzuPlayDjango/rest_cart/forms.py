from django.forms import ModelForm
from django.forms.widgets import HiddenInput
from .models import CarritoProducto


class CarritoProductoForm(ModelForm):
    class Meta:
        model = CarritoProducto
        fields = ['carrito', 'producto', 'cantidad']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['carrito'].widget = HiddenInput(attrs=(
            {'name': 'carrito'}))
        self.fields['producto'].widget = HiddenInput(attrs=(
            {'name': 'producto'}))
        self.fields['cantidad'].widget = HiddenInput(attrs=(
            {'name': 'cantidad'}))
