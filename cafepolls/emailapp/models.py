from django.db import models
from django.contrib.auth.models import User

class Operation(models.Model):
    code = models.CharField(max_length=30, unique=True)
    type = models.IntegerField(default=0) #1-confirmemail,2-changepassword,3-changeemail
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    info = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.code
