from rest_framework import serializers
from .models import Item, Section, Article, Illustration
from polls.serializers import MainProfileInfoSerializer
from rest_framework.validators import UniqueValidator
from django.core.exceptions import ValidationError

class SectionSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = Section
        fields = ('id', 'name', 'groups')
        
class ItemSerializer(serializers.ModelSerializer):
    section = SectionSerializer(many=True, read_only=True)
    groups = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = Item
        fields = ('id', 'name', 'groups', 'section')
        
class IllustrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Illustration
        fields = ('id', 'description', 'file', 'created_at')
        
class ArticleSerializer(serializers.ModelSerializer):
    updated_by = MainProfileInfoSerializer(many=False, read_only=True)
    illustrations = IllustrationSerializer(many=True, read_only=True)
    class Meta:
        model = Article
        fields = ('id', 'name', 'text', 'updated_at', 'updated_by', 'illustrations')
        
class FullSectionSerializer(serializers.ModelSerializer):
    articles = ArticleSerializer(many=True, read_only=True)
    class Meta:
        model = Section
        fields = ('id', 'name', 'groups', 'articles')
        
class SectionTypeSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = Section
        fields = ('groups',)
        
class SectionIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('id',)
        
class SmallArticleSerializer(serializers.ModelSerializer):
    section = SectionIdSerializer(many=False, read_only=True)
    class Meta:
        model = Article
        fields = ('id', 'name', 'section')
        
class IllustrationShowSerializer(serializers.ModelSerializer):
    article = SmallArticleSerializer(many=False, read_only=True)
    class Meta:
        model = Illustration
        fields = ('id', 'description', 'file', 'article', 'created_at')