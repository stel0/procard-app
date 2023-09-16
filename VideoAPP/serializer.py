#DRF
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
#Django
from django.contrib.auth import authenticate, get_user_model
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
#My App
from .models import User, Video

"""USER SERIALIZER"""

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, clean_data):
        user_obj = None
        user_obj = User.objects.create_user(
                first_name=clean_data['first_name'], 
                last_name=clean_data['last_name'],
                ci=clean_data['ci'], 
                email=clean_data['email'], 
                genre=clean_data['genre'],
                password=clean_data['password'],
                role=clean_data['role'])
        user_obj.save()
        return user_obj
    
class UserLoginSerializer(serializers.Serializer):

    password = serializers.CharField()
    ci = serializers.CharField()

    def check_user(self, clean_data):
        print(clean_data)
        user = authenticate(username=clean_data['ci'], password=clean_data['password'])
        print(user)
        if not user:
            raise ValidationError(authenticate(username=clean_data['ci'], password=clean_data['password']))
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

"""
Creo que esto no deberia de ir en el serializer ya que no es una funcion que tenga que ver con el serializador.
Deberia de devolver la informacion del usuario que quiere cambiarse la contrasena, solo cuando el usuario verifique en su correo
el link de cambio de contraseña, una vez pasase la validacion de cambio de contraseña, el usuario podra cambiar su contrasena
"""

"""Deberia de crear un view que devuelva la informacion del usuario que quiere cambiar la contrasena"""
##Trabajar luego en esto cuando tenga todo el frontend
# class ResetPasswordEmailRequestSerializer(serializers.Serializer):
#     email = serializers.EmailField(min_length=2)

#     def validate(self, attrs):
#         data = attrs['data']
#         email = data['email']
#         user = None
#         ##Si el existe un usuario con ese mail entonces enviarle un mensaje
#         if User.objects.filter(email=email).exists():
#             user = User.objects.get(email=email)
#             user.reset_password(True)
#             user.save()
#             # send_mail('Email de cambio de contraseña', 'El siguiente correo de cambio de contraseña fue enviado', '3i8vA@example.com', [email], fail_silently=False)
#         return user
# class SetNewPasswordSerializer(serializers.Serializer):
#     password = serializers.CharField(required=True)

#     """Funcion para cambiar la contrasena del usuario que solicito el cambio"""
    
#     def change(self,data):
#         user_obj = None
#         if User.objects.get(email=data['email']).exists():
#             user_obj = User.objects.get(email=data['email'])
#             user_obj.set_password(data['password']).save()
#         return user_obj
      


"""VIDEO SERIALIZER"""
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('title','file_video','description')
