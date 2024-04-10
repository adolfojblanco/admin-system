from rest_framework import serializers
from .models import Movement, Supplier


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'name', 'is_active']
        ordering = ['name']


class MovementSerializer(serializers.ModelSerializer):
    #supplier = SupplierSerializer()

    class Meta:
        model = Movement
        fields = '__all__'
