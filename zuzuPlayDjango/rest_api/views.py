from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from .models import Categoria_Promocional
from .serializers import CategoriaPromoSerializer


# Create your views here.
@csrf_exempt
@api_view(['GET', 'POST'])
def categorias_promo(request):
    if request.method == 'GET':
        categorias = Categoria_Promocional.objects.all()
        serializer = CategoriaPromoSerializer(categorias, many=True)
        return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def agregar_categorias_promo(request):
    if request.method == 'POST':
        serializer = CategoriaPromoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def modificar_categorias_promo(request, id):
    try:
        categoria = Categoria_Promocional.objects.get(id=id)
    except Categoria_Promocional.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CategoriaPromoSerializer(categoria)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CategoriaPromoSerializer(categoria, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        categoria.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
