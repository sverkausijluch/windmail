from django.contrib import admin

from .models import Poll, Option, Voice, Profile, Group, Comment, Tag, Room, Answer, Notification, Main_room

admin.site.register(Poll)
admin.site.register(Option)
admin.site.register(Voice)
admin.site.register(Profile)
admin.site.register(Comment)
admin.site.register(Tag)
admin.site.register(Room)
admin.site.register(Answer)
admin.site.register(Notification)
admin.site.register(Main_room)
admin.site.register(Group)