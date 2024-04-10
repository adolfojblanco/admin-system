from django.contrib import admin
from .models import Movement, Supplier, CashBox, CashBoxDetails


# Register your models here.


@admin.register(Movement)
class MovementAdmin(admin.ModelAdmin):
    list_display = ('supplier', 'name', 'type', 'date', 'status', 'amount')
    list_filter = ['date']
    ordering = ['date']


@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')
    search_fields = ['name']
    ordering = ['name']


@admin.register(CashBox)
class CashBoxAdmin(admin.ModelAdmin):
    list_display = ('id', 'is_open', 'open_date', 'close_date', 'money_count', 'tpv', 'user')
    search_fields = ['open_date']
    readonly_fields = ('open_date', 'close_date')


@admin.register(CashBoxDetails)
class CashBoxDetailsAdmin(admin.ModelAdmin):
    pass