from django.db import models
from applications.users.models import User

# Create your models here.

"""
    Proveedores
"""


class Supplier(models.Model):
    name = models.CharField('Proveedor', max_length=150, unique=True)
    is_active = models.BooleanField('Activo', default=True)

    def save(self, *args, **kwargs):
        self.name = self.name.title()
        super(Supplier, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Proveedor'
        verbose_name_plural = 'Proveedores'


"""
    Entradas y salidas
"""


class Movement(models.Model):
    MOVEMENT_TYPE = [
        ("IN", "Entrada"),
        ("OUT", "Salida"),
    ]

    STATUS = [
        ("PAID", "Pagado"),
        ("PENDING", "Pendiente"),
    ]

    name = models.CharField('Gasto', max_length=200)
    type = models.CharField('Tipo de Gasto',
                            choices=MOVEMENT_TYPE,
                            default="OUT",
                            max_length = 10
                            )
    status = models.CharField('Estado de Gasto',
                              choices=STATUS,
                              default="PENDIENTE",
                              max_length=10
                              )
    amount = models.DecimalField('Monto', max_digits=5, decimal_places=2)
    date = models.DateField('Fecha', auto_now_add=True)
    comment = models.TextField('Comentario', null=True, blank=True)
    supplier = models.ForeignKey(Supplier, verbose_name='Proveedor', on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(
        User, verbose_name='Usuario', on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        self.name = self.name.title()
        super(Movement, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Gasto"
        verbose_name_plural = "Gastos"


"""
    Cajas diarias
"""


class CashBox(models.Model):
    is_open = models.BooleanField('Abierta', default=True)
    open_balance = models.DecimalField('Saldo Inicial', max_digits=5, decimal_places=2, default=100)
    open_date = models.DateTimeField('Fecha Apertura', auto_now_add=True)
    close_date = models.DateTimeField('Fecha de Cierre', auto_now_add=True)
    money_count = models.DecimalField('Total Conteo', max_digits=5, decimal_places=2, blank=True, default=0)
    tpv = models.DecimalField('TPV', max_digits=5, decimal_places=2, null=True, blank=True, default=0)
    numbers_sales = models.IntegerField('Ventas del Dia', null=True, blank=True, default=0)
    expenses = models.DecimalField('Gastos', max_digits=5, decimal_places=2, null=True, blank=True, default=0)
    incomes = models.DecimalField('Ingresos', max_digits=5, decimal_places=2, null=True, blank=True, default=0)
    comment = models.TextField('Comentarios', null=True, blank=True)
    user = models.ForeignKey(
        User, verbose_name='Usuario', on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = "Caja"
        verbose_name_plural = "Cajas"

    def __str__(self):
        return str(self.id)


"""
    Detalle de caja diaria
"""


class CashBoxDetails(models.Model):
    cash_box = models.ForeignKey(CashBox, on_delete=models.CASCADE, null=True)
    hundred = models.IntegerField('100', null=True, blank=True, default=0)
    fifty = models.IntegerField('50', null=True, blank=True, default=0)
    twenty = models.IntegerField('20', null=True, blank=True, default=0)
    ten = models.IntegerField('10', null=True, blank=True, default=0)
    five = models.IntegerField('5', null=True, blank=True, default=0)
    two = models.IntegerField('2', null=True, blank=True, default=0)
    one = models.IntegerField('1', null=True, blank=True, default=0)
    fifty_cents = models.IntegerField('0.50', null=True, blank=True, default=0)
    twenty_cents = models.IntegerField('0.20', null=True, blank=True, default=0)
    ten_cents = models.IntegerField('0.10', null=True, blank=True, default=0)
    five_cents = models.IntegerField('0.05', null=True, blank=True, default=0)
    one_cents = models.IntegerField('0.01', null=True, blank=True, default=0)
    tpv = models.DecimalField('TPV', max_digits=5, decimal_places=2, default=0)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = "Detalle Caja"
        verbose_name_plural = "Detalle Cajas"
