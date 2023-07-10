from django.urls import path,include
from rest_framework import routers
from VideoAPP import views
from rest_framework.documentation import include_docs_urls

#api versioning

router = routers.DefaultRouter()
router.register('videos',views.VideoViewSet,basename='videos')

urlpatterns = [
    path("api/v1/",include(router.urls)),
    path("docs/",include_docs_urls(title="Video API"))
] 