from django.contrib import admin
from .models import ShoppingList

# Register your models here.


@admin.register(ShoppingList)
class ShoppingListAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_complete', 'priority')
    search_fields = ['name', 'is_complete']
