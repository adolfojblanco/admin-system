from django.db import models

# Create your models here.

PRIORITY_TYPE = [
    ("HIGH", "Alta"),
    ("MEDIUM", "Media"),
    ("LOW", "Baja"),
]

# Shopping list model
class ShoppingList(models.Model):
    title = models.CharField('Título', max_length=100)
    is_complete = models.BooleanField('Completado', default=False)
    priority = models.CharField('Prioridad',
                                choices=PRIORITY_TYPE,
                                default="LOW",
                                max_length=10
                                )

    def __str__(self):
        return self.title


# Task model
class TaskList(models.Model):
    title = models.CharField('Tarea', max_length=200)
    is_complete = models.BooleanField('Completado', default=False)

    def __str__(self):
        return self.title
