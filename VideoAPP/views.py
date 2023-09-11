# Rest Framework
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

#Django
from django.contrib.auth import login, logout
from django.contrib.auth.models import Group
from django.core.exceptions import ValidationError

#Custom
from .models import Video, User
from .serializer import UserRegisterSerializer, UserLoginSerializer, UserSerializer, VideoSerializer
from .validations import custom_validation, login_validation,group_validation
from .customPermissions import isAdmin

"""GRUPOS METODOS"""

class createGroup(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [SessionAuthentication]
    def post(self,request):

        group = group_validation(request.data)
        newGroup = Group.objects.create(name=group)

        try:
            newGroup.save()
            return Response(status=status.HTTP_201_CREATED)
        except:
            return Response(newGroup,status=status.HTTP_404_NOT_FOUND)
        
class deleteGroup(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [SessionAuthentication]

    def delete(self,request):
        group = Group.objects.get(name=request.data['group'])

        try:
            group.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(group,status=status.HTTP_404_NOT_FOUND)
        
class addUserToGroup(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [SessionAuthentication]

    def post(self,request):
        user = User.objects.get(pk=request.data['ci'])
        group = Group.objects.get(pk=request.data['group'])
        if user.groups.filter(name=group).exists():
            return Response("User is already in the group",status=status.HTTP_400_BAD_REQUEST)
        if user.groups.count() == 0:
            try:
                user.groups.add(group)
                return Response(status=status.HTTP_201_CREATED)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response("User can only be added to one group",status=status.HTTP_400_BAD_REQUEST)

class deleteUserFromGroup(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [SessionAuthentication]

    def delete(self,request):
        user = User.objects.get(pk=request.data['ci'])
        group = Group.objects.get(pk=request.data['group'])

        if user.groups.filter(name=group).exists():
            try:
                user.groups.remove(group)
                return Response("User removed from the group",status=status.HTTP_204_NO_CONTENT)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response("User is not in this group",status=status.HTTP_400_BAD_REQUEST)

"""USUARIO METODOS"""

class registerUser(APIView):
    permission_classes =[permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid():
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class loginUser(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]
    ##

    def post(self, request):
        clean_data = login_validation(request.data)
        serializer = UserLoginSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(clean_data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class logoutUser(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class deleteUser(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [SessionAuthentication]


    def delete(self,request):
        user = User.objects.get(pk=request.data['ci'])
        if(user == request.user):
            user.delete()
            logout(request)
            return Response("Logout",status=status.HTTP_200_OK)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# class sendResetPasswordEmail(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):    
#         data = request.data
#         serializer = ResetPasswordEmailRequestSerializer(data=data)
#         if serializer.is_valid(raise_exception=True):
#             try:
#                 user = serializer.validate(data)
#                 if user:
#                     return Response({'message':'Cambiar contraseña concedido'}, status=status.HTTP_200_OK)
#                 else:
#                     return Response({'message':'El correo no existe'}, status=status.HTTP_404_NOT_FOUND)
#             except Exception:
#                 return Response({'message':'No es posible pedir cambio de contraseña'}, status=status.HTTP_400_BAD_REQUEST)

# class changePassword(APIView):
#     permission_classes = [isResetPasswordUser]

#     def post(self,request):
#         data = request.data
#         serializer = SetNewPasswordSerializer(data=data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.change()
#             if user:
#                 return Response({'message':'Contraseña cambiada'}, status=status.HTTP_200_OK)
#         return Response({'message':'Contraseña no cambiada, intente de nuevo'}, status=status.HTTP_400_BAD_REQUEST)
    
##Obtener todos los usuarios
class getUsers(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication]


    def get(self,request):
        usernames = [{"user":f"{user.first_name} {user.last_name} - {user.ci}"}  for user in User.objects.all()]
        return Response(usernames)

##Informacion del usuario logeado
class userView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    ##

    def get(self, request):
        try:
            serializer = UserSerializer(request.user)
            return Response({'first_name': serializer.data['first_name'],
                        'last_name': serializer.data['last_name'],}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

"""VIDEOS METODOS"""

##Obtener todos los videos
class videosView(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]

    def get(self, request):
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

##Subir un video
class uploadVideo(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]

    def post(self, request, *args, **kwargs):
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

##Eliminar un video
class deleteVideo(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]

    def delete(self, request):
        video = Video.objects.get(pk=request.data['id'])
        video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)