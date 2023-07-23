from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('login', user_login),
    path('change-password/<int:code>', change_password),
    path('logout/', user_logout),
    re_path(r'^', IndexView.as_view()),
]

