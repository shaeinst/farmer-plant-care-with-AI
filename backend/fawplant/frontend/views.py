from django.views.generic import TemplateView
from django.shortcuts import render
from django.views import View
from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login
from rest_framework_simplejwt.views import TokenObtainPairView
from django.views import View
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm


class TestView(TemplateView):
    template_name = "test.html"


class HomeView(View):
    def get(self, request):
        return render(request, "frontend/home.html")


class AboutView(View):
    def get(self, request):
        return render(request, "frontend/about.html")


class LoginView(View):
    def get(self, request):
        form = AuthenticationForm()
        return render(request, "frontend/login.html", {"form": form})

    def post(self, request):
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            # Use the API to authenticate the user
            response = TokenObtainPairView.as_view()(request=request._request)
            token = response.data.get("access")
            if token:
                # If authentication succeeds, log in the user and redirect to home
                user = authenticate(request=request, token=token)
                if user is not None:
                    login(request, user)
                    return redirect("home")

        # If authentication fails, display error message and render login page again
        return render(request, "frontend/login.html", {"form": form})


class RegisterView(View):
    def get(self, request):
        form = UserCreationForm()
        return render(request, "frontend/register.html", {"form": form})

    def post(self, request):
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("home")
        return render(request, "frontend/register.html", {"form": form})
