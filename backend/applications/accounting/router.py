from rest_framework.routers import DefaultRouter
from .views import MovementViewSet, SupplierViewSet

router_accounting = DefaultRouter()

router_accounting.register(
    prefix='movements', basename='movement', viewset=MovementViewSet
)

router_accounting.register(
    prefix='suppliers', basename='supplier', viewset=SupplierViewSet
)

urlpatterns = router_accounting.urls
