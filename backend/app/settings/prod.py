from .base import *
from datetime import timedelta

DEBUG = True
SECRET_KEY = "django-insecure-vu0872#b-96k3zu+97r%p4&y8r#v2xomn@b4a5nn(^-=n4!!es"

ALLOWED_HOSTS = ['*']

CSRF_TRUSTED_ORIGINS = [
    "https://admin.otreze.es",
    "https://www.admin.otreze.es",
    "https://api-admin.otreze.es"]

CORS_ALLOWED_ORIGINS = [
    "https://admin.otreze.es",
    "https://www.admin.otreze.es"
]

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=6),
    "REFRESH_TOKEN_LIFETIME": timedelta(hours=6),
}

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"


DATABASES = {
    'default': {
        'ENGINE': os.getenv("DB_ENGINE_PROD"),
        'NAME': os.getenv("DB_NAME_PROD"),
        'USER': os.getenv("DB_USER_PROD"),
        'PASSWORD': os.getenv("DB_PASSWORD_PROD"),
        'HOST': os.getenv("DB_HOST_PROD"),
    }
}

EMAIL_BACKEND = os.getenv("EMAIL_BACKEND")
EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = os.getenv("EMAIL_PORT")
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_ADMIN = os.getenv("EMAIL_ADMIN")