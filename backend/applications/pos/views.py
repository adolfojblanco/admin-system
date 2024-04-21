from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


from .models import Room, Table
from .serializer import RoomSerializer, TableSerializer


@api_view(['GET'])
def rooms_list(request):
    if request.method == 'GET':
        rooms = Room.objects.all()
        rooms_serializer = RoomSerializer(rooms, many=True)
        return Response(rooms_serializer.data, status=status.HTTP_200_OK)
    return Response({"message": "Hubo un error, no se pudo cargar"}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def tables_list(request):
    if request.method == 'GET':
        tables = Table.objects.all()
        table_serializer = TableSerializer(tables, many=True)
        return Response(table_serializer.data, status=status.HTTP_200_OK)
    return Response({"message": "Hubo un error al cargar la informacion"})

