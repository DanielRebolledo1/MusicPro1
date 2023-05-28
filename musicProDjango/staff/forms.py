from django import forms
from django.forms import ModelForm
from products.models import Producto, Marca, Subcategoria, Unidad
from rest_videos.models import Video
from django.forms.widgets import NumberInput, HiddenInput


class NuevoProductoForm(ModelForm):
    class Meta:
        model = Producto
        fields = ['nombreProducto', 'imagenProducto', 'fechaLanProducto', 'modeloProducto', 'colorProducto',
                  'precioProducto', 'marca', 'subcategoria']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['nombreProducto'].widget.attrs.update(
            {'id': 'new-product-name', 'class': 'form-control form-control-lg custom-input'})
        self.fields['imagenProducto'].widget.attrs.update(
            {'id': 'new-product-img', 'class': 'image'})
        self.fields['modeloProducto'].widget.attrs.update(
            {'id': 'new-product-model', 'class': 'form-control form-control-lg custom-input'})
        self.fields['colorProducto'].widget.attrs.update(
            {'id': 'new-product-color', 'class': 'form-control form-control-lg custom-input'})
        self.fields['fechaLanProducto'].widget = NumberInput(attrs=(
            {'id': 'new-product-date', 'type': 'date', 'class': 'form-control form-control-lg custom-input'}))
        self.fields['precioProducto'].widget.attrs.update(
            {'id': 'new-product-price', 'class': 'form-control form-control-lg custom-input'})
        self.fields['marca'].widget.attrs.update(
            {'id': 'new-product-brand', 'class': 'form-select form-select-lg custom-select'})
        self.fields['subcategoria'].widget.attrs.update(
            {'id': 'new-product-subcategory', 'class': 'form-select form-select-lg custom-select'})


class EditarProductoForm(ModelForm):
    class Meta:
        model = Producto
        fields = ['idProducto', 'nombreProducto', 'imagenProducto', 'fechaLanProducto', 'modeloProducto', 'colorProducto',
                  'precioProducto', 'marca', 'subcategoria']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['idProducto'].widget.attrs.update(
            {'id': 'edit-product-id', 'class': 'form-control form-control-lg custom-input', 'readonly': ''})
        self.fields['nombreProducto'].widget.attrs.update(
            {'id': 'edit-product-name', 'class': 'form-control form-control-lg custom-input', 'disabled': ''})
        self.fields['imagenProducto'].widget.attrs.update(
            {'id': 'edit-product-img', 'class': 'image'})
        self.fields['fechaLanProducto'].widget = NumberInput(attrs=(
            {'id': 'edit-product-date', 'type': 'date', 'class': 'form-control form-control-lg custom-input',
             'disabled': ''}))
        self.fields['modeloProducto'].widget.attrs.update(
            {'id': 'edit-product-model', 'class': 'form-control form-control-lg custom-input', 'disabled': ''})
        self.fields['colorProducto'].widget.attrs.update(
            {'id': 'edit-product-color', 'class': 'form-control form-control-lg custom-input', 'disabled': ''})
        self.fields['precioProducto'].widget.attrs.update(
            {'id': 'edit-product-price', 'class': 'form-control form-control-lg custom-input', 'disabled': ''})
        self.fields['marca'].widget.attrs.update(
            {'id': 'edit-product-brand', 'class': 'form-select form-select-lg custom-select', 'disabled': ''})
        self.fields['subcategoria'].widget = HiddenInput(attrs=({'id': 'edit-product-subcategory'}))


class DescripcionProductoForm(ModelForm):
    class Meta:
        model = Producto
        fields = ['descripcionProducto']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['descripcionProducto'].widget.attrs.update(
            {'id': 'edit-product-description', 'class': 'form-control custom-input'})


class VideoForm(ModelForm):
    class Meta:
        model = Video
        fields = ['url']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['url'].widget.attrs.update(
            {'id': 'edit-product-video', 'class': 'form-control form-control-lg custom-input'})


class NuevaMarcaForm(ModelForm):
    class Meta:
        model = Marca
        fields = ['nombreMarca']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['nombreMarca'].widget.attrs.update(
            {'id': 'new-brand-name', 'class': 'form-control form-control-lg custom-input'})


class NuevaSubcategoriaForm(ModelForm):
    class Meta:
        model = Subcategoria
        fields = ['idSubcategoria', 'nombreSubcategoria', 'categoria']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['idSubcategoria'].widget.attrs.update(
            {'id': 'new-subcategory-id', 'class': 'form-control form-control-lg custom-input'})
        self.fields['nombreSubcategoria'].widget.attrs.update(
            {'id': 'new-subcategory-name', 'class': 'form-control form-control-lg custom-input'})
        self.fields['categoria'].widget.attrs.update(
            {'id': 'new-subcategory-category', 'class': 'form-select form-select-lg custom-select'})


class NuevaUnidadForm(ModelForm):
    class Meta:
        model = Unidad
        fields = ['idUnidad']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['idUnidad'].widget.attrs.update(
            {'id': 'new-unit-id', 'class': 'form-control form-control-lg custom-input'})


class EditarUnidadForm(ModelForm):
    class Meta:
        model = Unidad
        fields = ['idUnidad']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['idUnidad'].widget.attrs.update(
            {'id': 'edit-unit-id', 'class': 'form-control form-control-lg custom-input', 'disabled': ''})
