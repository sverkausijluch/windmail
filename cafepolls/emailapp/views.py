from django.shortcuts import render
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.shortcuts import redirect, render
from .models import Operation
from django.shortcuts import get_object_or_404
from random import randint
from polls.models import Profile, Group
from django.http import HttpResponse
from django.contrib.auth.models import User

def register_email(request):
    user = request.user
    oper_code = randint(0, 1000000)
    email = user.email
    operation = Operation(code=oper_code, user=user, type=1, info=email)
    operation.save()
    data = {'code': oper_code, 'email': email}
    msg_plain = render_to_string('emailapp/email_confirm.txt', data)
    msg_html = render_to_string('emailapp/email_confirm.html', data)
    subject, from_email, to = 'Регистрация на windmail.ru', 'maomail@windmail.ru', [email]
    send_mail(subject, msg_plain, from_email, to, html_message=msg_html)
    return redirect("../../registration-continue")
    
def register_confirm(request, code):
    queryset = Operation.objects.all()
    operation = get_object_or_404(queryset, code=code)
    user = request.user
    profile_queryset = Profile.objects.all()
    profile = get_object_or_404(profile_queryset, user=user)
    group2 = Group.objects.get(type=2)
    group1 = Group.objects.get(type=1)
    profile.groups.remove(group1)
    profile.groups.add(group2)
    profile.save()
    operation.delete()
    return redirect("../../../")
    
def create_password_operation(request):
    user = request.user
    oper_code = randint(0, 1000000)
    operation = Operation(code=oper_code, user=user, type=2)
    operation.save()
    email = user.email
    data = {'code': oper_code, 'email': email}
    msg_plain = render_to_string('emailapp/password_change.txt', data)
    msg_html = render_to_string('emailapp/password_change.html', data)
    subject, from_email, to = 'Смена пароля', 'maomail@windmail.ru', [email]
    send_mail(subject, msg_plain, from_email, to, html_message=msg_html)
    return redirect("../../password-email")
    
def restore_password_operation(request):
    email = request.POST.get('email')
    login = request.POST.get('login')
    oper_code = randint(0, 1000000)
    user = User.objects.get(email=email,username=login)
    operation = Operation(code=oper_code, user=user, type=2)
    operation.save()
    data = {'code': oper_code, 'email': email}
    msg_plain = render_to_string('emailapp/password_change.txt', data)
    msg_html = render_to_string('emailapp/password_change.html', data)
    subject, from_email, to = 'Смена пароля', 'maomail@windmail.ru', [email]
    send_mail(subject, msg_plain, from_email, to, html_message=msg_html)
    return HttpResponse("все хорошо!")
    
def change_email_operation(request):
    user = request.user
    email = request.POST.get('email')
    oper_code = randint(0, 1000000)
    operation = Operation(code=oper_code, user=user, type=3, info=email)
    operation.save()
    data = {'code': oper_code}
    msg_plain = render_to_string('emailapp/email_change.txt', data)
    msg_html = render_to_string('emailapp/email_change.html', data)
    subject, from_email, to = 'Подтвердите смену email на сайте windmail.ru', 'maomail@windmail.ru', [email]
    send_mail(subject, msg_plain, from_email, to, html_message=msg_html)
    return HttpResponse("все хорошо!")
    
def change_email(request):
    user = request.user
    email = request.POST.get('email')
    oper_code = randint(0, 1000000)
    operation = Operation(code=oper_code, user=user, type=3, info=email)
    operation.save()
    data = {'code': oper_code}
    msg_plain = render_to_string('emailapp/email_change.txt', data)
    msg_html = render_to_string('emailapp/email_change.html', data)
    subject, from_email, to = 'Подтвердите смену email на сайте', 'maomail@windmail.ru', [email]
    send_mail(subject, msg_plain, from_email, to, html_message=msg_html)
    return HttpResponse("все хорошо!")
    
    
def change_email(request, code):
    queryset = Operation.objects.all()
    operation = get_object_or_404(queryset, code=code)
    user = request.user
    user.email = operation.info
    user.save()
    operation.delete()
    return redirect("../../../")

    
    