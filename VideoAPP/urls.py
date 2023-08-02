from django.urls import path
from VideoAPP import views
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    # path("api/v1/",include(router.urls)),
    path("docs/",include_docs_urls(title="Video API")),
    path("login",views.userLogin.as_view()),
    path("register",views.userRegister.as_view()),
    path("logout",views.userLogout.as_view()),
    path("user",views.userView.as_view()),
    path("upload_video",views.uploadVideoView.as_view()),
] 