from django.shortcuts import render
from .models import Item, Section, Illustration
from rest_framework import viewsets
from .serializers import ItemSerializer, FullSectionSerializer, SectionTypeSerializer, IllustrationShowSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class ItemView(viewsets.ViewSet):
    def list(self, request):
        queryset = Item.objects.all().order_by('id')
        serializer = ItemSerializer(queryset, many=True)
        return Response({'items': serializer.data})
        
class SectionView(viewsets.ViewSet):
    def retrieve(self, request, id=None):
        queryset = Section.objects.all()
        section = get_object_or_404(queryset, pk=id)
        serializer = FullSectionSerializer(section)
        return Response(serializer.data)
    
    def retrieve_type(self, request, id=None):
        queryset = Section.objects.all()
        section = get_object_or_404(queryset, pk=id)
        serializer = SectionTypeSerializer(section)
        return Response(serializer.data)
        
class ImageView(viewsets.ViewSet):
    def retrieve(self, request, id=None):
        queryset = Illustration.objects.all()
        img = get_object_or_404(queryset, pk=id)
        serializer = IllustrationShowSerializer(img)
        return Response(serializer.data)
    
