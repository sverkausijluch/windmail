from django import forms
import re
from django.contrib.auth.forms import AuthenticationForm, SetPasswordForm
from django.contrib.auth.models import User

class UserLoginForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ('username', 'password')
    
class UserPasswordChangeForm(SetPasswordForm):
    class Meta:
        model = User
        fields = ('password')