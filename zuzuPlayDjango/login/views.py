from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token

from .forms import NuevoUsuarioForm, LoginForm
from .models import Usuario
from social_django.models import UserSocialAuth


# Create your views here.
@user_passes_test(lambda u: u.is_authenticated is False, login_url='home')
def login_view(request):
    datos = {
        'nuevoUsuarioForm': NuevoUsuarioForm(),
        'loginForm': LoginForm(),
    }

    if request.method == 'POST':
        action = request.POST['action']
        if action == 'login':
            email = request.POST['email']
            try:
                Usuario.objects.get(email=email)
            except Usuario.DoesNotExist:
                return JsonResponse({'error': 'email'})
            password = request.POST['password']
            user = authenticate(request, email=email, password=password)
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                if not created:
                    token.delete()
                    Token.objects.create(user=user)
                login(request, user)
                response = JsonResponse({'url': '/'})
                response.set_cookie('sessiontoken', token)
                return response
            else:
                return JsonResponse({'error': 'password'})
        elif action == 'register':
            form = NuevoUsuarioForm(request.POST)
            if form.is_valid():
                user = form.save(commit=False)
                user.password = make_password(user.password)
                user.save()
                return JsonResponse({'success': True})
            else:
                email = form['email'].value()
                try:
                    social = UserSocialAuth.objects.get(uid=email)
                except UserSocialAuth.DoesNotExist:
                    try:
                        Usuario.objects.get(email=email)
                    except UserSocialAuth.DoesNotExist:
                        return JsonResponse({'success': False, 'errors': form.errors})
                    return JsonResponse({'success': False, 'errors': 'email'})
                return JsonResponse({'success': False, 'errors': 'social', 'name': social.provider})
    return render(request, "login/login.html", datos)


@login_required
def logout_view(request):
    try:
        token = Token.objects.get(user=request.user)
    except Token.DoesNotExist:
        token = None
    if token is not None:
        token.delete()
    logout(request)
    response = redirect('home')
    response.delete_cookie('sessiontoken')
    return response
