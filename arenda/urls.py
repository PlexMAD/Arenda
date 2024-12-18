from django.urls import path, include
from esoft.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'clients', ClientViewSet)

urlpatterns = [
    path('', include(router.urls))]