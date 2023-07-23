from django.contrib import admin

from .models import Item, Section, Article, Illustration

admin.site.register(Item)
admin.site.register(Section)
admin.site.register(Article)
admin.site.register(Illustration)
