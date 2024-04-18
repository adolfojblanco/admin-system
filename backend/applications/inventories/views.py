from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Category, Product
from .serializer import CategorySerializer, ProductSerializer


# Categories Views.
class CategoryApiViewSet(ModelViewSet):
    permision_classes = [IsAdminUser]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    http_method_names = ['get', 'post', 'put', 'delete']


@api_view(['GET'])
def active_categories(request):
    if request.method == 'GET':
        categories = Category.objects.filter(is_active=True)
        cat_serializer = CategorySerializer(categories, many=True)
        return Response(cat_serializer.data, status=status.HTTP_200_OK)
    Response({"message": "Hubo un error, no se pudo cargar"}, status=status.HTTP_400_BAD_REQUEST)


# Products Views.

class ProductApiViewSet(ModelViewSet):
    permision_classes = [IsAdminUser]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
