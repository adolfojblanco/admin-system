from django.db import models
from django.utils.text import slugify


# Create your models here.

class Category(models.Model):
    name = models.CharField('Categoria', max_length=100, unique=True)
    slug = models.SlugField(max_length=150, unique=True, blank=True)
    is_active = models.BooleanField('Activo', default=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        self.name = self.name.title()
        super(Category, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ('name',)


class Product(models.Model):
    name = models.CharField('Producto', max_length=100, unique=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    price = models.DecimalField('Precio', max_digits=5, decimal_places=2)
    image = models.ImageField('Imagen', upload_to='products', blank=True)
    description = models.TextField('Descripción', blank=True)
    is_active = models.BooleanField('Activo', default=False)
    has_stock = models.BooleanField('Tiene Inventario', default=False)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        self.name = self.name.title()
        super(Product, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
