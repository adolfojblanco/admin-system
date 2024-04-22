"""
    url's principales
"""

from django.contrib import admin
from django.urls import path, include

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from applications.users.router import router_user

from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view(
    openapi.Info(
        title="Otreze APIDocs",
        default_version='v1',
        description="Documentación Api Otreze",
        terms_of_service="https://www.adbwebdesing.com",
        contact=openapi.Contact(email="info@adbwebdesing.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router_user.urls)),
    path('api/auth/', include('applications.users.router')),
    path('api/task/', include('applications.tasks.urls', namespace="tasks")),
    path('api/inventory/', include('applications.inventories.router')),
    path('api/accounting/', include('applications.accounting.router')),
    path("api/pos/", include('applications.pos.urls', namespace="pos")),

    #Documentation
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redocs/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
