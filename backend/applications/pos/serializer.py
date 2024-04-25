from rest_framework import serializers
from .models import Room, Table


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        depth = 1
        fields = ['id', 'number', 'room', 'is_open']


class RoomSerializer(serializers.ModelSerializer):
    tables = TableSerializer(read_only=True, many=True)

    class Meta:
        model = Room
        depth = 1
        fields = '__all__'
