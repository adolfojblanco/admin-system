from django.urls import path
from .views import rooms_list, tables_list


app_name = "pos"

urlpatterns = [
    path('rooms/', rooms_list, name='room-lists'),
    path('tables/', tables_list, name='table-lists'),
]
