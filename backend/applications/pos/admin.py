from django.contrib import admin
from .models import Invoice, Room, InvoiceDetail, Payment, Table

# Register your models here.


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    pass


@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    pass


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {"slug": ["name", ]}
    pass


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['number', 'table', 'employee']
    readonly_fields = ["number"]


@admin.register(InvoiceDetail)
class InvoiceDetailAdmin(admin.ModelAdmin):
    list_display = ['invoice', 'product', 'quantity', 'price', 'total']
    readonly_fields = ["price", 'total']

