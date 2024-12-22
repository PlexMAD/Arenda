from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from rapidfuzz.distance import Levenshtein
from .models import *
from .serializers import *


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def fuzzy_filter(self, query, queryset):
        a = query.strip().lower()
        print(a)
        return [
            obj for obj in queryset
            if Levenshtein.distance(a, obj.surname.strip().lower()) <= 3
               or Levenshtein.distance(a, obj.name.strip().lower()) <= 3
               or Levenshtein.distance(a, obj.grand_name.strip().lower()) <= 3
        ]

    @action(detail=False, methods=['get'])
    def search(self, request):
        clients = Client.objects.all()
        query = request.query_params.get('q', '').strip().lower()
        if not query:
            return Response(self.get_serializer(clients, many=True).data)

        filtered_clients = self.fuzzy_filter(query, clients)
        serializer = self.get_serializer(filtered_clients, many=True)
        return Response(serializer.data)


class RieltorViewSet(viewsets.ModelViewSet):
    queryset = Rieltor.objects.all()
    serializer_class = RieltorSerializer

    def fuzzy_filter(self, query, queryset):
        aa = query.strip().lower()
        return [
            obj for obj in queryset
            if Levenshtein.distance(aa, obj.surname.strip().lower()) <= 3
               or Levenshtein.distance(aa, obj.name.strip().lower()) <= 3
               or Levenshtein.distance(aa, obj.grand_name.strip().lower()) <= 3
        ]

    @action(detail=False, methods=['get'])
    def search(self, request):
        rieltors = Rieltor.objects.all()
        query = request.query_params.get('q', '').strip().lower()
        if not query:
            return Response(self.get_serializer(rieltors, many=True).data)

        filtered_rieltors = self.fuzzy_filter(query, rieltors)
        serializer = self.get_serializer(filtered_rieltors, many=True)
        return Response(serializer.data)


class RentalObjectViewSet(viewsets.ModelViewSet):
    queryset = RentalObject.objects.all()
    serializer_class = RentalObjectSerializer