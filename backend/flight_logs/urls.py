"""flight_logs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
# we probably don't need generics...
from rest_framework import routers, generics
from django.urls import path, include, re_path
from rest_framework.authtoken import views
from flights.api import FlightsViewSet, AircraftViewSet, FilterAircraftViewSet, FilterFlightsViewSet
from rest_framework_jwt.views import obtain_jwt_token

from django.conf.urls import url
from flights.views import Filter3ViewSet

router = routers.DefaultRouter()
router.register(r'flights', FlightsViewSet)
router.register(r'aircraft', AircraftViewSet)
router.register(r'filteraircraft', FilterAircraftViewSet)
router.register(r'filterflights', FilterFlightsViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    re_path(r'^api-token-auth/', views.obtain_auth_token),
    path('token-auth/', obtain_jwt_token),
    path('flights/', include('flights.urls')),
    # url endpoint to filter data dynamically
    url('^filter3/(?P<tail_number>.+)/$', Filter3ViewSet.as_view()),
]

urlpatterns += router.urls