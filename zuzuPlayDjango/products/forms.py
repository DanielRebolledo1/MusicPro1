from django import forms
from django.forms import ModelForm
from .models import Suscriptor


class SuscriptorForm(ModelForm):
    class Meta:
        model = Suscriptor
        fields = ['emailSuscriptor']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['emailSuscriptor'].widget.attrs.update({'id': 'subs-email', 'class': 'form-control custom-input'})