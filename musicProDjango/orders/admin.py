from django.contrib import admin
from .models import Orden, Descuento, Region, Comuna, Direccion, Despacho, Pago, Proveedor, Tienda

# Register your models here.
admin.site.register(Orden)
admin.site.register(Descuento)
admin.site.register(Region)
admin.site.register(Comuna)
admin.site.register(Direccion)
admin.site.register(Despacho)
admin.site.register(Pago)
admin.site.register(Proveedor)
admin.site.register(Tienda)
