from django.shortcuts import render
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    pass

# Email de registro


def register_mail(email):
    context = {'email': email}
    template = get_template('email/new_user.html')
    content = template.render(context)

    try:
        email = EmailMultiAlternatives(
            'Registro de Usuario - Admin Otreze',
            'Admin Otreze',
            settings.EMAIL_HOST_USER,
            [email]
        )
        email.attach_alternative(content, 'text/html')
        email.send()

    except Exception as e:
        print(e)


class Client(models.Model):
    name = models.CharField('Nombre', null=False, blank=False)
    email = models.CharField('email', unique=True, null=True, blank=True)
    phone = models.CharField('Telefono', unique=True, null=True, blank=True)
    is_active = models.BooleanField('Activo', default=True)
    term = models.BooleanField('Publicidad', default=False)

    def save(self, *args, **kwargs):
        register_mail(self.email)
        super(Client, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
