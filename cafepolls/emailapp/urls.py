from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('send-register-email', register_email),
    path('confirm-email/<int:code>', register_confirm),
    path('create-password-operation', create_password_operation),
    path('restore-password-operation', restore_password_operation),
    path('change-email-operation', change_email_operation),
    path('change-email/<int:code>', change_email),
]

