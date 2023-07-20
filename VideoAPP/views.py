from rest_framework import viewsets
from .serializer import videoSerializer,userSerializer
from .models import Video,User

class VideoViewSet(viewsets.ModelViewSet):
    serializer_class = videoSerializer
    queryset = Video.objects.all() 
    # permission_classes = [permissions.IsAdminUser]

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = userSerializer
    queryset = User.objects.all()
   
