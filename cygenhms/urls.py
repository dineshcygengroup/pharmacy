"""cygenhms URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token,refresh_jwt_token
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.views.generic.base import TemplateView
from rest_framework.authtoken import views

from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    
    url(r'^', include(('patientmanagement.urls','patientmanagement'), namespace='ehr')),
    # url(r'^', include(('hospitalcodes.urls','hospitalcode'), namespace='hospitalcodes')),
    url(r'^', include(('usermanagement.urls','usermanagement'), namespace='usemanagement')),
    url(r'^', include(('appointments.urls','appointments'), namespace='appointments')),
    url(r'^', include(('billing.urls','billing'), namespace='billing')),

    url(r'^', include(('pharmacy.urls','pharmacy'), namespace='pharmacy')),
    url(r'^', include(('inventory.urls','inventory'), namespace='inventory')),
    # url(r'^', include('appointments.urls', namespace='appointmentcalender')),
    # url(r'^api-token-refresh/', refresh_jwt_token),
    # url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^hms/', csrf_exempt(TemplateView.as_view(template_name="index.html")), name="home"),
    url(r'^Hms/', TemplateView.as_view(template_name="index1.html"), name="home1"),
    url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    # url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    
]
