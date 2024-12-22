from .models import *
from rest_framework import serializers


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class RieltorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rieltor
        fields = '__all__'



class RentalObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentalObject
        fields = '__all__'
