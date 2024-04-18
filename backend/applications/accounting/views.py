from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from .models import Movement, Supplier
from .serializer import MovementSerializer, SupplierSerializer


# Create your views here.
class MovementViewSet(ModelViewSet):
    permision_classes = [IsAdminUser]
    queryset = Movement.objects.all().order_by('name')
    serializer_class = MovementSerializer


class SupplierViewSet(ModelViewSet):
    permision_classes = [IsAdminUser]
    queryset = Supplier.objects.all().order_by('name')
    serializer_class = SupplierSerializer

