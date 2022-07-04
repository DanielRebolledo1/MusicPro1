from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from .models import Carrito, CarritoProducto
from .serializers import CarritoSerializer, CarritoProductoSerializer


# Create your views here.
@csrf_exempt
@api_view(['GET'])
def carrito(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            carrito = Carrito.objects.get_or_create(usuario_id=request.user.id)
        else:
            if not request.session or not request.session.session_key:
                request.session.save()
            carrito = Carrito.objects.get_or_create(sesion_id=request.session.session_key)
        serializer = CarritoSerializer(carrito, many=True)
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
            if producto is not None:
                serializer.validated_data['cantidad'] = producto.cantidad + int(request.data['cantidad'])
            serializer.validated_data['total'] = \
                serializer.validated_data['producto'].precioProducto * serializer.validated_data['cantidad']
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)