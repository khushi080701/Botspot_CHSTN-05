# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path
from .views import login, register,home
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('',home,name='home'),
    path('login/', login, name="login"),
    path('register/', register, name="register"),
    path("logout/", LogoutView.as_view(), name="logout")
]
