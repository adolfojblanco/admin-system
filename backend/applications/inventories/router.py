from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import CategoryApiViewSet, ProductApiViewSet

router_inventory = DefaultRouter()

router_inventory.register(
    prefix='categories', basename='categories', viewset=CategoryApiViewSet
)

router_inventory.register(
    prefix='products', basename='products', viewset=ProductApiViewSet
)

urlpatterns = [

] + router_inventory.urls
