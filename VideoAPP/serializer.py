#Convertir de python a json

from rest_framework import serializers
from .models import User,Video

class videoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Video
    fields = '__all__'

class userSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'