import os
import re

# Rest Framework
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

# Django
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import Group
from django.conf import settings
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

# Custom
from .models import Video, User
from .serializer import UserRegisterSerializer, UserLoginSerializer, UserSerializer, VideoSerializer
from .validations import custom_validation, login_validation, group_validation, video_validation, group_pattern
from .customPermissions import isAdmin

# google cloud
from google.cloud import storage

# others
csrf_protect_method = method_decorator(csrf_protect)

"""GRUPOS METODOS"""


class CreateGroup(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def post(self, request):
        group = group_validation(request.data.get('group'))
        try:
            groups = Group.objects.all()
            for g in groups:
                if group == g.name:
                    return Response({"error": "Group name already exists"}, status=status.HTTP_302_FOUND)
            newGroup = Group.objects.create(name=group)
            newGroup.save()
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteGroup(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def delete(self, request):

        try:
            group = Group.objects.get(name=request.data.get('group'))
            group.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Group.DoesNotExist:
            return Response({'error': 'Group does not exists'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EnableGroup(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def put(self, request):
        try:
            group_id = request.data.get('group')  # id of the group
            group = Group.objects.get(pk=group_id)  # search for the group

            # search all the user in the group, if the user exists then unban him
            users_in_group = User.objects.filter(groups=group)
            for user in users_in_group:
                user.is_banned = False
                user.save()

            return Response(status=status.HTTP_200_OK)
        except Group.DoesNotExist:
            return Response({"error": "El grupo no existe."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DisableGroup(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def put(self, request):
        try:
            group_id = request.data.get('group')  # id of the group
            group = Group.objects.get(pk=group_id)  # search for the group

            # search all the user in the group, if the user exists then ban him
            users_in_group = User.objects.filter(groups=group)
            for user in users_in_group:
                user.is_banned = True
                user.save()

            return Response(status=status.HTTP_200_OK)
        except Group.DoesNotExist:
            return Response({'error': 'El grupo no existe.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddUserToGroup(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def post(self, request):
        try:
            user = User.objects.get(pk=request.data.get('ci'))
            group = Group.objects.get(pk=request.data.get('group'))
            if user.groups.filter(name=group).exists():
                return Response("User is already in the group", status=status.HTTP_400_BAD_REQUEST)
            if user.groups.count() == 0:
                user.groups.add(group)
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response("User can only be added to one group", status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "El usuario no existe"}, status=status.HTTP_404_NOT_FOUND)
        except Group.DoesNotExist:
            return Response({"error": "El grupo no existe."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteUserFromGroup(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def delete(self, request):
        try:
            user = User.objects.get(pk=request.data.get('ci'))
            group = Group.objects.get(pk=request.data.get('group'))

            if user.groups.filter(name=group).exists():
                user.groups.remove(group)
                return Response("User removed from the group", status=status.HTTP_204_NO_CONTENT)
            else:
                return Response("User is not in this group", status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "El usuario no existe"}, status=status.HTTP_404_NOT_FOUND)
        except Group.DoesNotExist:
            return Response({"error": "El grupo no existe."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetGroups(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def get(self, request):
        groups = []
        for group in Group.objects.all():
            groups.append({
                'id': group.id,
                'Company': group.name})
        return Response(groups, status=status.HTTP_200_OK)


class EditGroup(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def put(self, request):
        try:

            # Assuming you pass the group's ID in the request data.
            group_id = request.data.get('group_id')

            # Assuming you pass the new group name in the request data.
            new_group_name = request.data.get('new_name')

            if not re.match(group_pattern, new_group_name):
                raise ValidationError(
                    'El grupo solo debe contener letras y números')

            groups = Group.objects.all()
            for g in groups:
                if new_group_name == g.name:
                    return Response({'error': 'Group name already exists'}, status=status.HTTP_302_FOUND)

            group = Group.objects.get(pk=group_id)  # Retrieve the group.
            group.name = new_group_name  # Modify the group's name.
            group.save()  # Save the changes.
            return Response(status=status.HTTP_200_OK)

        except Group.DoesNotExist:
            return Response({'error': "Group not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


"""USUARIO METODOS"""


class RegisterUser(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid():
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteUser(APIView):
    permission_classes = [permissions.IsAdminUser]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def delete(self, request):
        try:
            user = User.objects.get(pk=request.data.get('ci'))
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except user.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginUser(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]


    # descomentar en caso de que el login no funcione
    """ @csrf_protect_method  """

    def post(self, request):
        clean_data = login_validation(request.data)
        serializer = UserLoginSerializer(data=clean_data)
        print(clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(clean_data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutUser(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def post(self, request):
        logout(request)
        return Response("Logged out",status=status.HTTP_200_OK)


class GetUsers(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def get(self, request):
        usernames = []
        for user in User.objects.all():
            usernames.append({'ci': user.ci,
                              'first_name': user.first_name,
                              'last_name': user.last_name,
                              'Company': user.groups.first().name if user.groups.exists() else 0,
                              'is_banned': user.is_banned})
        return Response(usernames)

class GetUser(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def get(self, request):
        try:
            serializer = UserSerializer(request.user)
            return Response({
                'first_name': serializer.data['first_name'],
                'last_name': serializer.data['last_name'],
                'is_staff': serializer.data['is_staff'],
                'role': serializer.data['role']}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class CheckPermissions(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        try:
            serializer = UserSerializer(request.user)   
            return Response(bool(serializer.data['is_staff'] or serializer.data['role'] == 1), status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

"""VIDEOS METODOS"""

class GetVideos(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    def get(self, request):
        try:
            videos = Video.objects.all()
            serializer = VideoSerializer(videos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UploadVideo(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def post(self, request):
        clean_data = video_validation(request.data)
        serializer = VideoSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class DeleteVideo(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication,BasicAuthentication]

    def delete(self, request):
        try:
            video = Video.objects.get(pk=request.data.get('id'))
            file_path = os.path.join(
                settings.MEDIA_ROOT, str(video.file_video))
            if os.path.exists(file_path):
                os.remove(file_path)
            video.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Video.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EditVideo(APIView):
    permission_classes = [permissions.IsAdminUser | isAdmin]
    authentication_classes = [SessionAuthentication,BasicAuthentication]

    def put(self, request):
        try:
            video = Video.objects.get(pk=request.data.get('id'))
            video.title = request.data['title']
            video.description = request.data['description']
            file_path = os.path.join(
                settings.MEDIA_ROOT, str(video.file_video))

            if os.path.exists(file_path):
                os.remove(file_path)

            replace_file = request.FILES.get("file_video")
            if replace_file:
                video.file_video = replace_file

            video.save()
            return Response({'title': video.title, 'description': video.description}, status=status.HTTP_200_OK)
        except Video.DoesNotExist:
            return Response({"error": "The video does not exists"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error", str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # try:
        #     video = Video.objects.get(pk=request.data.get('id'))
        #     serializer = VideoSerializer(data = video)
        #     if serializer.is_valid(raise_exception=True):
        #         serializer.save()
        #         return Response(serializer,status=status.HTTP_200_OK)
        # except Video.DoesNotExist:
        #     return Response({'error':'The video not exists'},status=status.HTTP_404_NOT_FOUND)
        # except Exception as e:
        #     return Response({'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
