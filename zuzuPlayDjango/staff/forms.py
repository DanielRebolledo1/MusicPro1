from django import forms
from django.forms import ModelForm
from products.models import Producto, Unidad
from django.forms.widgets import NumberInput


class NuevoProductoForm(ModelForm):
    class Meta:
        model = Producto
        fields = ['nombreProducto', 'imagenProducto', 'fechaLanProducto',
                  'precioProducto', 'marca', 'subcategoria', 'plataforma']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['nombreProducto'].widget.attrs.update(
            {'id': 'new-product-name', 'class': 'form-control form-control-lg custom-input'})
        self.fields['imagenProducto'].widget.attrs.update(
            {'id': 'new-product-img', 'class': 'form-control form-control-lg custom-input'})
        self.fields['fechaLanProducto'].widget = NumberInput(attrs=(
            {'id': 'new-product-date', 'type': 'date', 'class': 'form-control form-control-lg custom-input'}))
        self.fields['precioProducto'].widget.attrs.update(
            {'id': 'new-product-price', 'class': 'form-control form-control-lg custom-input'})
        self.fields['marca'].widget.attrs.update(
            {'id': 'new-product-brand', 'class': 'form-select form-select-lg custom-select'})
        self.fields['subcategoria'].widget.attrs.update(
            {'id': 'new-product-subcategory', 'class': 'form-select form-select-lg custom-select'})
        self.fields['plataforma'].widget.attrs.update(
            {'id': 'new-product-platform', 'class': 'form-select form-select-lg custom-select'})


class EditarProductoForm(ModelForm):
    class Meta:
        model = Producto
        fields = ['idProducto', 'nombreProducto', 'imagenProducto', 'fechaLanProducto',
                  'precioProducto', 'marca', 'subcategoria', 'plataforma']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['idProducto'].widget.attrs.update(
            {'id': 'edit-product-id', 'class': 'form-control form-control-lg custom-input', 'disabled': ''})
        self.fields['nombreProducto'].widget.attrs.update(
            {'id': 'edit-product-name', 'class': 'form-control form-control-lg custom-input', 'disabled': ''})
        self.fields['imagenProducto'].widget.attrs.update(
            {'id': 'edit-product-img', 'class': 'form-control form-control-lg custom-input', 'disabled': ''})
        self.fields['fechaLanProducto'].widget = NumberInput(attrs=(
            {'id': 'edit-product-date', 'type': 'date', 'class': 'form-control form-control-lg custom-input',
             'disabled': ''}))
        self.fields['precioProducto'].widget.attrs.update(
            {'id': 'edit-product-price', 'class': 'form-control form-control-lg custom-input', 'disabled': ''})
        self.fields['marca'].widget.attrs.update(
            {'id': 'edit-product-brand', 'class': 'form-select form-select-lg custom-select', 'disabled': ''})
        self.fields['subcategoria'].widget.attrs.update(
            {'id': 'edit-product-subcategory', 'class': 'form-select form-select-lg custom-select', 'disabled': ''})
        self.fields['plataforma'].widget.attrs.update(
            {'id': 'edit-product-platform', 'class': 'form-select form-select-lg custom-select', 'disabled': ''})
