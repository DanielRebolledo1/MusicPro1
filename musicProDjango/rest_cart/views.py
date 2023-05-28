from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

from products.models import Unidad
from .models import Carrito, CarritoProducto
from orders.models import Direccion
from .serializers import CarritoSerializer, CarritoProductoSerializer


# Create your views here.
@csrf_exempt
@api_view(['GET'])
def carrito(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                carrito = Carrito.objects.get(usuario=request.user)
            except Carrito.DoesNotExist:
                try:
                    direccion = Direccion.objects.get(usuario=request.user, principal=True)
                except Direccion.DoesNotExist:
                    direccion = None
                carrito = Carrito.objects.create(usuario=request.user, direccion=direccion)
        else:
            if not request.session or not request.session.session_key:
                request.session.save()
            carrito, created = Carrito.objects.get_or_create(sesion_id=request.session.session_key)
        serializer = CarritoSerializer(carrito)
        return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
def agregar_al_carrito(request):
    if request.method == 'POST':
        try:
            producto = CarritoProducto.objects.get(carrito_id=request.data['carrito'],
                                                   producto_id=request.data['producto'])
        except CarritoProducto.DoesNotExist:
            producto = None
        if producto is not None:
            serializer = CarritoProductoSerializer(producto, data=request.data)
        else:
            serializer = CarritoProductoSerializer(data=request.data)
        if serializer.is_valid():
            oldTotal = 0
            if producto is not None:
                serializer.validated_data['cantidad'] = producto.cantidad + int(request.data['cantidad'])
                oldTotal = producto.total
            serializer.validated_data['total'] = \
                serializer.validated_data['producto'].precioProducto * serializer.validated_data['cantidad']
            if stockAvailability(serializer):
                subtotal = update_cart_subtotal(request, serializer.validated_data['carrito'].id,
                                                serializer.validated_data['total'], oldTotal)
                if subtotal:
                    serializer.save()
                    return Response(serializer.data)
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_409_CONFLICT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def modificar_carrito(request, id_carrito, id_producto):
    try:
        producto = CarritoProducto.objects.get(carrito_id=id_carrito,
                                               producto_id=id_producto)
    except CarritoProducto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CarritoProductoSerializer(producto)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = CarritoProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.validated_data['total'] = \
                serializer.validated_data['producto'].precioProducto * serializer.validated_data['cantidad']
            if stockAvailability(serializer):
                if update_cart_subtotal(request, producto.carrito_id,
                                        serializer.validated_data['total'], producto.total):
                    serializer.save()
                    return Response(serializer.data)
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_409_CONFLICT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if update_cart_subtotal(request, producto.carrito_id, producto.total):
            producto.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


def update_cart_subtotal(request, cartId, total, oldTotal=0):
    try:
        carrito = Carrito.objects.get(id=cartId)
    except Carrito.DoesNotExist:
        return False
    if request.method == 'DELETE':
        subtotal = carrito.subtotal - total
    else:
        subtotal = carrito.subtotal - oldTotal + total
    data = {'id': cartId, 'subtotal': subtotal, 'total': subtotal}
    serializer = CarritoSerializer(carrito, data=data)
    if serializer.is_valid():
        serializer.save()
        return True
    else:
        return False


def stockAvailability(carritoProductoSerializer):
    stock = Unidad.objects.filter(producto=carritoProductoSerializer.validated_data['producto'],
                                  disponible=True).count()
    if stock < carritoProductoSerializer.validated_data['cantidad']:
        return False
    return True
