from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
import re
import os
UserModel = get_user_model()
group_pattern = r"^[a-zA-Z0-9 ]+$"
password_pattern = r"^[a-zA-Z0-9!@#$%^&*()-_+=<>?]+$"


def group_validation(data):
    group = data['group']
    if not re.match(group, group_pattern):
        raise ValidationError('El grupo es necesario')
    if not group:
        raise ValidationError('El grupo es necesario')
    return group


def custom_validation(data):
    email = data['email'].strip()
    ci = data['ci'].strip()
    password = data['password']
    if not ci:
        raise ValidationError('Elije otro numero de cedula')
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Elije otro correo')
    if not re.match(password, password_pattern):
        raise ValidationError('Elije otra contraseña')
    return data


def custom_validation_video(data):
    title = data['title']
    file = data['file_video']
    description = data['description']
    file_type = os.path.splitext(file)
    if file_type != ".mp4":
        raise ValidationError('El archivo debe ser .mp4')
    if not title:
        raise ValidationError('El titulo es necesario')
    if not file:
        raise ValidationError('El archivo es necesario')
    if not description:
        raise ValidationError('La descripcion es necesario')
    return data


def login_validation(data):
    ci = data['ci']
    password = data['password']
    if not ci or len(ci) > 8:
        raise ValidationError('La contraseña o cedula es incorrecta')
    if not password:
        raise ValidationError('La contraseña o cedula es incorrecta')
    return {'ci': ci, 'password': password}
