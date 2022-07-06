from django.contrib import admin
from .models import Orden, Descuento, Cupon, Region, Comuna, Direccion, Despacho, Pago, Proveedor


# Register your models here.
admin.site.register(Orden)
admin.site.register(Descuento)
admin.site.register(Cupon)
admin.site.register(Region)
admin.site.register(Comuna)
admin.site.register(Direccion)
admin.site.register(Despacho)
admin.site.register(Pago)
admin.site.register(Proveedor)