from django.contrib.auth import login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import userRegisterSerializer, userLoginSerializer, userSerializer, uploadVideoSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_password, validate_identity_card, custom_validation_video


class userRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = userRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class userLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
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
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class userView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    ##

    def get(self, request):
        serializer = userSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class uploadVideoView(APIView):
    ## auth if the user is admin
    permission_classes = (permissions.IsAdminUser,)
    authentication_classes = (SessionAuthentication,)
    ##

    def post(self, request):
        clean_data = custom_validation_video(request.data)
        serializer = uploadVideoSerializer(data=clean_data)
