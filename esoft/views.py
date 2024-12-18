from django.shortcuts import render
from rest_framework import viewsets

from .models import *
from .serializers import *

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class RieltorViewSet(viewsets.ModelViewSet):
    queryset = Rieltor.objects.all()
    serializer_class = RieltorSerializer