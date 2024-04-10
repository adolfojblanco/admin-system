from django.urls import path
from .views import shopping_list_view, complete_item


urlpatterns = [
    path('shopping-list/', shopping_list_view, name='shoppinglist_list'),
    path('shopping-list/<int:pk>/', complete_item, name='complete_item')
]
