from django.urls import path

from .views import TestView, HomeView, AboutView, LoginView, RegisterView

urlpatterns = [
    path("test/", TestView.as_view(), name="test"),
    #
    path("", HomeView.as_view(), name="home"),
    path("about/", AboutView.as_view(), name="about"),
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
]
