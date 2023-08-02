from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from .models import User, Video
from django.core.exceptions import ValidationError

UserModel = get_user_model()


class uploadVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

    def create(self, data_video):
        video_obj = Video.objects.create(**data_video)
        video_obj.save()
        return video_obj


class userRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, clean_data):
        user_obj = User.objects.create_user(
            first_name=clean_data['first_name'], 
            last_name=clean_data['last_name'],
            ci=clean_data['ci'], 
            email=clean_data['email'], 
            genre=clean_data['genre'],
            password=clean_data['password'])
        user_obj.save()
        return user_obj


class userLoginSerializer(serializers.Serializer):

    password = serializers.CharField()
    ci = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(
            username=clean_data['ci'], password=clean_data['password'])
        if not user:
            raise ValidationError(authenticate(
                username=clean_data['ci'], password=clean_data['password']))
        return user


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
