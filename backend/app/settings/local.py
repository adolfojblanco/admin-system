"""
Otreze base settings for app project.
"""

from .base import *

SECRET_KEY = "django-insecure-vu0872#b-96k3zu+97r%p4&y8r#v2xomn@b4a5nn(^-=n4!!es"

DEBUG = True

ALLOWED_HOSTS = ['*']

CSRF_TRUSTED_ORIGINS = ["http://localhost:4200"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
]

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "static/"

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': os.getenv("DB_ENGINE_LOCAL"),
        'OPTIONS': {
            'sql_mode': 'traditional',
            'init_command': 'SET storage_engine=INNODB;'
        },
        'NAME': os.getenv("DB_NAME_LOCAL"),
        'USER': os.getenv("DB_USER_LOCAL"),
        'PASSWORD': os.getenv("DB_PASSWORD_LOCAL"),
        'HOST': os.getenv("DB_HOST_LOCAL"),
        'PORT':  os.getenv("DB_PORT_LOCAL"),
    }
}

EMAIL_BACKEND = os.getenv("EMAIL_BACKEND")
EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = os.getenv("EMAIL_PORT")
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS")
EMAIL_USE_SSL = os.getenv("EMAIL_USE_SSL")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
