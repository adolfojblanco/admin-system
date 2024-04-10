from django.db import models


# Create your models here.

PRIORITY_TYPE = [
    ("HIGH", "Alta"),
    ("MEDIUM", "Media"),
    ("LOW", "Baja"),
]


class ShoppingList(models.Model):
    title = models.CharField('Título', max_length=100)
    is_complete = models.BooleanField('Completado', default=False)
    priority = models.CharField('Prioridad',
                                choices=PRIORITY_TYPE,
                                default="LOW"
                                )

    def __str__(self):
        return self.title
