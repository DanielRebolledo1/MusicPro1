from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
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
    elif request.method == 'POST':
        dataParse = JSONParser().parse(request)
        serializer = CategoriaPromoSerializer(data=dataParse)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
