from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view

from .models import Category, Product
from .serializer import CategorySerializer, ProductSerializer
# Create your views here.


class CategoryApiViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class ProductApiViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()