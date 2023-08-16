from django.contrib.auth import login, logout
from .models import Video, User
# Rest Framework
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .serializer import userRegisterSerializer, userLoginSerializer, userSerializer, VideoSerializer
from .validations import custom_validation, validate_password, validate_identity_card, custom_validation_video
from .customPermissions import isAdminUser



class userRegister(APIView):
    permission_classes =[isAdminUser]

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = userRegisterSerializer(data=clean_data)
        if serializer.is_valid():
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class userLogin(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]
    ##

    def post(self, request):
        data = request.data
        assert validate_identity_card(data)
        assert validate_password(data)

        serializer = userLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class userLogout(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class userView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (SessionAuthentication,)
    ##

    def get(self, request):
        serializer = userSerializer(request.user)
        return Response({'first_name': serializer.data['first_name'],
                        'last_name': serializer.data['last_name'],
                        'password': serializer.data['password'],
                        'permissions': request.user.is_superuser}, status=status.HTTP_200_OK)
    
class getUsers(APIView):
    permission_classes = [isAdminUser]

    def get(self,request):
        usernames = [{"user":f"{user.first_name} {user.last_name} - {user.ci}"}  for user in User.objects.all()]
        return Response(usernames)


class uploadVideo(APIView):
    permission_classes = [isAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class videosView(APIView):
    permission_classes = [isAdminUser]

    def get(self, request):
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)
