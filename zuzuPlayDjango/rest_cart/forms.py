from django.forms import ModelForm
from django.forms.widgets import HiddenInput
from .models import CarritoProducto
from orders.models import Cupon


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


class CuponForm(ModelForm):
    class Meta:
        model = Cupon
        fields = ['id']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['id'].widget.attrs.update({'id': 'cupon-id', 'class': 'form-control custom-input'})
        self.fields['id'].label = 'Cupón de descuento'
