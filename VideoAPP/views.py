from rest_framework import viewsets
from .serializer import videoSerializer
from .models import Video

class VideoViewSet(viewsets.ModelViewSet):
    serializer_class = videoSerializer
    queryset = Video.objects.all() 

