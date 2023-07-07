#Convertir de python a json

from rest_framework import serializers
from .models import Video

class videoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Video
    fields = '__all__'