from rest_framework import viewsets
from .serializer import videoSerializer
from .models import Video

class VideoView(viewsets.ModelViewSet):
    serializer_class = videoSerializer
    queryset = Video.objects.all() # Consulta a todos los videos
