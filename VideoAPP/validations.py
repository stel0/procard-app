from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
    email = data['email'].strip()
    ci = data['ci'].strip()
    password = data['password'].strip()
    ##
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Elije otro correo')
    ##
    if not password or len(password) < 8:
        raise ValidationError('Elije otra contraseña')
    ##
    if not ci:
        raise ValidationError('Elije otro numero de cedula')
    return data

def custom_validation_video(data):
    title = data['title'].strip()
    file = data['file_video'].strip()
    print(file)
    if not title:
        raise ValidationError('El titulo es necesario')
    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('El correo es necesario')
    return True

def validate_identity_card(data):
    ci = data['ci'].strip()
    if not ci or len(ci) > 8:
        raise ValidationError('Elije otro numero de cedula')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('Se necesita una contraseña')
    return True


