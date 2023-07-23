from django.db import models
from django.contrib.auth.models import User
from PIL import Image
from django.utils.safestring import mark_safe 

class Tag(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name
        
class Group(models.Model):
    type = models.IntegerField(default=1)
    name = models.CharField(max_length=30, default='')

    def __str__(self):
        return str(self.type)
        
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=30, unique=True)
    email = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=30, blank=True)
    avatar = models.ImageField(upload_to='users/avatars', blank=True)
    cover = models.ImageField(upload_to='users/covers', blank=True)
    post_text = models.CharField(max_length=5000, blank=True)
    post_title = models.CharField(max_length=50, blank=True)
    post_image = models.ImageField(upload_to='users/postimgs', blank=True)
    post_created_at = models.DateTimeField(auto_now_add=True)
    color = models.CharField(max_length=21, default="gray")
    webcite = models.CharField(max_length=80, blank=True)
    groups = models.ManyToManyField(Group, blank='True', related_name='groups')

    def save(self, *args, **kwargs):
        super().save()
        if self.avatar:
            img = Image.open(self.avatar.path)

            if img.height > 500 or img.width > 500:
                output_size = (500, 500)
                img.thumbnail(output_size)
                img.save(self.avatar.path)

    def __str__(self):
        return self.name
    
    def display_my_safefield(self): 
        return mark_safe(self.post_text)


class Poll(models.Model):
    question = models.CharField(max_length=250)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='poll_author', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag, blank='True')
    saved_by = models.ManyToManyField(User, blank='True')
    
    def __str__(self):
        return self.question

class Option(models.Model):
    text = models.CharField(max_length=250)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='options')

    def __str__(self):
        return self.text

class Voice(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)

class Comment(models.Model):
    text = models.CharField(max_length=1000)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comment_author')
    created_at = models.DateTimeField(auto_now_add=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)

    def __str__(self):
        return self.text

class Room(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='room_author', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField(max_length=5000)
    tags = models.ManyToManyField(Tag, blank='True')
    saved_by = models.ManyToManyField(User, blank='True')
    views = models.IntegerField(default=0)
    color = models.CharField(max_length=21, default="gray")
    cover = models.ImageField(upload_to='rooms/covers', blank=True)

    def save(self, *args, **kwargs):
        super().save()
        if self.cover:
            img = Image.open(self.cover.path)

            if img.height > 1500 or img.width > 1500:
                output_size = (1500, 1500)
                img.thumbnail(output_size)
                img.save(self.cover.path)

    def __str__(self):
        return self.name

class Answer(models.Model):
    text = models.CharField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='room_answer_author', blank=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='answers', blank=True)

    def __str__(self):
            return self.text

class Notification(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sender')
    recipients = models.ManyToManyField(User, related_name='recipients')
    text = models.CharField(max_length=100,blank=True)
    type = models.IntegerField(default=0) #0-благодарность,1-обращение,2-сообщение в комнате
    object = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    viewed = models.BooleanField(default=False)

class Main_room(models.Model):
    type = models.IntegerField(default=0) #0-большая,1-поменьше
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    cover = models.ImageField(upload_to='rooms/maincovers', blank=True)
    
    def __str__(self):
        return self.room.name
        
    def save(self, *args, **kwargs):
        super().save()
        if self.cover:
            img = Image.open(self.cover.path)

            if img.height > 300 or img.width > 700:
                output_size = (1500, 1500)
                img.thumbnail(output_size)
                img.save(self.cover.path)


