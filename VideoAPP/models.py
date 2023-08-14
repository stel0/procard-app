from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class AppUserManager(BaseUserManager):
    def create_user(self, first_name, last_name, ci, email, genre, password=None):
        if not first_name:
            raise ValueError('An first_name is required.')
        if not last_name:
            raise ValueError('An last_name is required.')
        if not ci:
            raise ValueError('An ci is required.')
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        if not genre:
            raise ValueError('A genre is required.')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            ci=ci,
            first_name=first_name,
            last_name=last_name,
            genre=genre)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, first_name, last_name, ci, email, genre, password=None):
        user = self.create_user(first_name, last_name,
                                ci, email, genre, password)
        user.is_superuser = True
        user.save()
        return user

    def create_teacher(self, first_name, last_name, ci, email, genre, password=None):
        user = self.create_user(first_name, last_name,
                                ci, email, genre, password)
        user.is_superuser = 0
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    ci = models.CharField(max_length=8, primary_key=True, unique=True)
    email = models.EmailField(unique=True, max_length=50)
    genre = models.CharField(max_length=5)
    password = models.CharField(max_length=50)
    is_teacher = models.BooleanField(default=False)

    USERNAME_FIELD = 'ci'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'genre', 'password']
    objects = AppUserManager()

    def __str__(self):
        return self.ci

class Video(models.Model):
    title = models.CharField(max_length=100)
    upload_date = models.DateTimeField(auto_now_add=True)
    file_video = models.FileField(upload_to='videos/')
    description = models.TextField(max_length=500)

    def __str__(self):
        return self.title 
