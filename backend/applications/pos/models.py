from django.db import models
from datetime import datetime
from applications.users.models import Client, User
from applications.inventories.models import Product


# Create your models here.

# Rooms Model
class Room(models.Model):
    name = models.CharField('Nombre', null=False, blank=False, max_length=100)
    is_active = models.BooleanField('Activa', default=True)

    class Meta:
        verbose_name = "Salón"
        verbose_name_plural = "Salones"
        ordering = ('name',)

    def __str__(self):
        return self.name


# Payment Model
class Payment(models.Model):
    name = models.CharField('Tipo de Pago', null=False, blank=False, max_length=100)
    is_active = models.BooleanField('Activa', default=True)

    class Meta:
        verbose_name = "Metodo de Pago"
        verbose_name_plural = "Metodo de Pagos"
        ordering = ['name']

    def __str__(self):
        return self.name


# Table Model
class Table(models.Model):
    number = models.CharField('Número', null=False, blank=False, max_length=100)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=False, blank=False)
    is_open = models.BooleanField('Abierta', default=False)
    is_active = models.BooleanField('Activa', default=True)

    def __str__(self):
        return "{} - {}".format(self.number, self.room)

    class Meta:
        verbose_name = "Mesa"
        verbose_name_plural = "Mesas"
        ordering = ['number']


# Invoice Model
class Invoice(models.Model):
    number = models.CharField('Número', null=False, blank=False, max_length=100)
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, blank=False)
    table = models.ForeignKey(Table, on_delete=models.SET_NULL, null=True, blank=False)
    employee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=False)
    created = models.DateTimeField('Fecha', auto_now_add=True)

    def save(self, *args, **kwargs):
        self.number = "{}-{}".format(self.pk, datetime.today().strftime('%m%d'))
        super(Invoice, self).save(*args, **kwargs)


    def __str__(self):
        return self.number
    
    class Meta:
        verbose_name='Factura'
        verbose_name_plural = 'Facturas'
        ordering = ['number']


# Invoice Details Model
class InvoiceDetail(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, null=True, blank=False, verbose_name='Factura')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=False, verbose_name='Producto')
    quantity = models.IntegerField('Cantidad')
    price = models.DecimalField('Precio', max_digits=5, decimal_places=2, blank=True, null=True)
    total = models.DecimalField('Total', max_digits=5, decimal_places=2, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.price = self.product.price
        self.total = self.quantity * self.price
        super(InvoiceDetail, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.pk)
