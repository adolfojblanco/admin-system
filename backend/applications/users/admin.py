from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User, Client


# Register your models here.
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    pass


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'is_active', 'term')
    search_fields = ['name']
