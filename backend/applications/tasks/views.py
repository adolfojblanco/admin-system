from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ShoppingList, TaskList
from .serializer import ShoppingListSerializer, TaskListSerializer


@api_view(["GET", "POST"])
def shopping_list_view(request):
    if request.method == 'GET':
        lists = ShoppingList.objects.filter(is_complete=False)[:5]
        lists_serializer = ShoppingListSerializer(lists, many=True)
        return Response(lists_serializer.data)

    elif request.method == 'POST':
        item_serializer = ShoppingListSerializer(data=request.data)
        if item_serializer.is_valid():
            item_serializer.save()
            # Si el item esta marcado como urgente, enviamos email
            if item_serializer.data['priority'] == 'HIGH':
                shopping_item_email(item_serializer.validated_data['title'])
            else:
                return Response(item_serializer.data)
        return Response(item_serializer.errors)


@api_view(["PUT"])
def complete_item(request, pk=None):
    if request.method == "PUT":
        item = ShoppingList.objects.filter(id=pk).first()
        item_serializer = ShoppingListSerializer(item, request.data)
        if item_serializer.is_valid():
            item_serializer.save()
            return Response(item_serializer.data)
        return Response(item_serializer.errors)


def shopping_item_email(item):
    context = {'item': item}
    template = get_template('email/task/new_item.html')
    content = template.render(context)

    try:
        email = EmailMultiAlternatives(
            subject='Item Sin Stock - Admin Otreze',
            from_email=settings.EMAIL_HOST_USER,
            to=[settings.EMAIL_ADMIN]
        )
        email.attach_alternative(content, 'text/html')
        email.send()

    except Exception as e:
        print(e)


@api_view(["GET", "POST"])
def task_list_view(request):
    if request.method == 'GET':
        lists = TaskList.objects.filter(is_complete=False)[:5]
        lists_serializer = TaskListSerializer(lists, many=True)
        return Response(lists_serializer.data)

    elif request.method == 'POST':
        item_serializer = TaskListSerializer(data=request.data)
        if item_serializer.is_valid():
            item_serializer.save()
            return Response(item_serializer.data)
        return Response(item_serializer.errors)


@api_view(["PUT"])
def complete_task(request, pk=None):
    if request.method == "PUT":
        item = ShoppingList.objects.filter(id=pk).first()
        item_serializer = ShoppingListSerializer(item, request.data)
        if item_serializer.is_valid():
            item_serializer.save()
            return Response(item_serializer.data)
        return Response(item_serializer.errors)