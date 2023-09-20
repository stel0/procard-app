from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
import re
import os
UserModel = get_user_model()
group_pattern = r'^[a-zA-Z0-9 ]+$'
password_pattern = r"^[a-zA-Z0-9!@#$%^&*()-_+=<>?]+$"


def group_validation(data):
    group = data 
    if not group:
        raise ValidationError('El grupo es necesario')
    if not re.match(group_pattern, group):
        raise ValidationError('El grupo solo debe contener letras y números')
    return group


def custom_validation(data):
    email = data.get('email').strip()
    ci = data.get('ci').strip()
    password = data.get('password')
    if not ci:
        raise ValidationError('Elije otro numero de cedula')
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Elije otro correo')
    if not re.match(password, password_pattern):
        raise ValidationError('Elije otra contraseña')
    return data


def video_validation(data):
    title = data['title']
    file = data['file_video']
    description = data['description']
    extensiones_video = ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv']
    print(vars(file))
    file_type = os.path.splitext(file.name)[1]
    print(file_type)
    if file_type.lower() not in extensiones_video:
        raise ValidationError('El archivo debe ser .mp4')
    if not title:
        raise ValidationError('El titulo es necesario')
    if not file:
        raise ValidationError('El archivo es necesario')
    if not description:
        raise ValidationError('La descripcion es necesario')
    return data
    pass


def login_validation(data):
    ci = data.get('ci')
    password = data.get('password')
    if not ci or len(ci) > 8:
        raise ValidationError('La contraseña o cedula es incorrecta')
    if not password:
        raise ValidationError('La contraseña o cedula es incorrecta')
    return {'ci': ci, 'password': password}
