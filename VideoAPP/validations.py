from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
import os
UserModel = get_user_model()



def custom_validation(data):
    email = data['email'].strip()
    ci = data['ci'].strip()
    password = data['password']
    confirm_password = data['confirm_password']
    ##
    if not ci:
        raise ValidationError('Elije otro numero de cedula')
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Elije otro correo')
    ##
    if not password or len(password) < 8:
        raise ValidationError('Elije otra contraseña')
    ##
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


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('El correo es necesario')
    return True


def login_validation(data):
    ci = data['ci'].strip()
    password = data['password'].strip()
    if not ci or len(ci) > 8:
        raise ValidationError('La contraseña o cedula es incorrecta')
    if not password:
        raise ValidationError('La contraseña o cedula es incorrecta')    
    return True


