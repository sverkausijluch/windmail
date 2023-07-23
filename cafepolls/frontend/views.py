from django.views.generic import TemplateView
from .forms import UserLoginForm, UserPasswordChangeForm
from django.contrib.auth import login, logout
from django.shortcuts import redirect, render
from emailapp.models import Operation
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework.response import Response

class IndexView(TemplateView):
    template_name = 'frontend/index.html'

def user_login(request):
    if request.user.is_authenticated:
        return redirect("../")
    else:
        if request.method == 'POST':
            form = UserLoginForm(data=request.POST)
            if form.is_valid():
                user = form.get_user()
                login(request, user)
                return redirect("../")
        else:
            form = UserLoginForm()
        context = {
            'load': request.POST.get('load', 0),
            'form': form,
        }
        return render(request,'frontend/auth.html', context=context)
    
def change_password(request, code):
    queryset = Operation.objects.all()
    operation = get_object_or_404(queryset, code=code)
    user = operation.user
    if request.method == 'POST':
        form = UserPasswordChangeForm(user,request.POST)
        if form.is_valid():
            form.save()
            operation.delete()
            return redirect("../")
    else:
        form = UserPasswordChangeForm(user)
    context = {
        'form': form,
    }
    return render(request,'frontend/change-password.html', context=context)
    
def user_logout(request):
    logout(request)
    return redirect('../login/')