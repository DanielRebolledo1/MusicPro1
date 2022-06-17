from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.forms.widgets import PasswordInput, EmailInput
from .models import Usuario


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = Usuario
        fields = ['email', ]


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = Usuario
        fields = ['email', ]


class LoginForm(ModelForm):
    class Meta:
        model = Usuario
        fields = ['email', 'password']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].widget.attrs.update(
            {'id': 'login-email', 'class': 'form-control form-control-lg custom-input'})
        self.fields['password'].widget = PasswordInput(attrs=(
            {'id': 'login-pw', 'class': 'form-control form-control-lg custom-input', 'maxlength': '20'}))
        self.fields['password'].label = 'Contraseña'


class NuevoUsuarioForm(ModelForm):
    class Meta:
        model = Usuario
        fields = ['nombre', 'apellido', 'email', 'password']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['nombre'].widget.attrs.update(
            {'id': 'register-name', 'class': 'form-control form-control-lg custom-input', 'maxlength': '40'})
        self.fields['apellido'].widget.attrs.update(
            {'id': 'register-lastname', 'class': 'form-control form-control-lg custom-input', 'maxlength': '40'})
        self.fields['email'].widget.attrs.update(
            {'id': 'register-email', 'class': 'form-control form-control-lg custom-input'})
        self.fields['password'].widget = PasswordInput(attrs=(
            {'id': 'register-pw', 'class': 'form-control form-control-lg custom-input', 'maxlength': '20'}))
        self.fields['password'].label = 'Contraseña'


class EditarUsuarioForm(ModelForm):
    class Meta:
        model = Usuario
        fields = ['email', 'nombre', 'apellido']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].widget.attrs.update(
            {'id': 'edit-email', 'class': 'form-control form-control-lg custom-input', 'maxlength': '254'})
        self.fields['nombre'].widget.attrs.update(
            {'id': 'edit-name', 'class': 'form-control form-control-lg custom-input', 'maxlength': '40'})
        self.fields['apellido'].widget.attrs.update(
            {'id': 'edit-lastname', 'class': 'form-control form-control-lg custom-input',
             'maxlength': '40'})
