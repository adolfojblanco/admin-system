from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import CategoryApiViewSet, ProductApiViewSet, active_categories




router_inventory = DefaultRouter()

router_inventory.register(
    prefix='categories', basename='categories', viewset=CategoryApiViewSet
)

router_inventory.register(
    prefix='products', basename='products', viewset=ProductApiViewSet
)

urlpatterns = [
    path('categories/active-categories/', active_categories, name='active_categories_list'),
] + router_inventory.urls
