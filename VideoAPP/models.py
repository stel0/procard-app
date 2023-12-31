from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,GroupManager



"""NORMALIZES"""

def normalize_first_name(first_name):
    return first_name.lower()


def normalize_last_name(last_name):
    return last_name.lower()


"""USER TABLE"""


class AppUserManager(BaseUserManager):
    def create_user(self, first_name, last_name, ci, email, genre, password=None, role=None):
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
        first_name = normalize_first_name(first_name)
        last_name = normalize_last_name(last_name)
        user = self.model(email=email, ci=ci, first_name=first_name,
                          last_name=last_name, genre=genre, role=role)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, first_name, last_name, ci, email, genre, password=None,role=None):
        user = self.create_user(first_name, last_name,
                                ci, email, genre, password)
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):

    USER = 0
    ADMIN = 1

    ROLE_CHOICES = (
        (ADMIN, 'Administrador'),
        (USER, 'Usuario')
    )

    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    ci = models.CharField(max_length=8, primary_key=True, unique=True)
    email = models.EmailField(unique=True, max_length=50)
    genre = models.CharField(max_length=5)
    password = models.CharField(max_length=50)

    is_staff = models.BooleanField(default=False)
    is_banned = models.BooleanField(default=False)
    reset_password = models.BooleanField(default=False)

    USERNAME_FIELD = 'ci'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'genre', 'password','role']
    objects = AppUserManager()

    def __str__(self):
        return self.ci


"""VIDEO TABLE"""


class Video(models.Model):
    title = models.CharField(max_length=100)
    upload_date = models.DateTimeField(auto_now_add=True)
    file_video = models.FileField(upload_to='videos/')
    description = models.TextField(max_length=500)

    def __str__(self):
        return self.title
