from django.urls import path
from .views import shopping_list_view, complete_item, task_list_view, complete_task


app_name = "tasks"

urlpatterns = [
    path('shopping-list/', shopping_list_view, name='shoppinglist_list'),
    path('shopping-list/<int:pk>/', complete_item, name='complete_item'),
    path('tasks-list/', task_list_view, name='task_list'),
    path('tasks/<int:pk>/', complete_task, name='complete_task')
]
