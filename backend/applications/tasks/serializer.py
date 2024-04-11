from rest_framework import serializers
from .models import ShoppingList, TaskList


class ShoppingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingList
        fields = '__all__'


class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = '__all__'
