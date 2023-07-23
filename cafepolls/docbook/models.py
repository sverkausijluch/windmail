from django.db import models
from django.contrib.auth.models import User
from PIL import Image
from polls.models import Group, Profile

class Item(models.Model):
    name = models.CharField(max_length=35, unique=True)
    groups = models.ManyToManyField(Group, blank='True')

    def __str__(self):
        return self.name

class Section(models.Model):
    name = models.CharField(max_length=35, unique=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, blank='True', related_name='section')
    groups = models.ManyToManyField(Group, blank='True')

    def __str__(self):
        return self.name
   
class Article(models.Model):
    name = models.CharField(max_length=150)
    text = models.TextField(max_length=15000)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, blank='True', related_name='articles')
    updated_at = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='updated_by')

    def __str__(self):
        return self.name
        
class Illustration(models.Model):
    description = models.CharField(max_length=150)
    file = models.ImageField(upload_to='illustrations', blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, blank='True', related_name='illustrations')
    created_at = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        super().save()
        if self.file:
            img = Image.open(self.file.path)

            if img.height > 1000 or img.width > 1000:
                output_size = (1000, 1000)
                img.thumbnail(output_size)
                img.save(self.file.path)

    def __str__(self):
        return self.description