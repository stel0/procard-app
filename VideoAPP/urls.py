from django.urls import path
from VideoAPP import views
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    # path("api/v1/",include(router.urls)),
    path("docs/",include_docs_urls(title="Video API")),
    
    # Groups
    path("createGroup/",views.CreateGroup.as_view()),
    path("deleteGroup/",views.DeleteGroup.as_view()),
    path("editGroup/",views.EditGroup.as_view()),
    path("addUserToGroup/",views.AddUserToGroup.as_view()),
    path("deleteUserFromGroup/",views.DeleteUserFromGroup.as_view()),
    path("disableGroup/",views.DisableGroup.as_view()),
    path("enableGroup/",views.EnableGroup.as_view()),
    path("get_all_groups/",views.GetGroups.as_view()),

    # User
    path("login/",views.LoginUser.as_view()),
    path("register/",views.RegisterUser.as_view()),
    path("logout/",views.LogoutUser.as_view()),
    path("user/",views.GetUser.as_view()),
    path("deleteUser/",views.DeleteUser.as_view()),
    path("get_all_users/",views.GetUsers.as_view()),
    
    # Video
    path("upload_video/",views.UploadVideo.as_view()),
    path("get_all_videos/",views.GetVideos.as_view()),
    path("deleteVideo/",views.DeleteVideo.as_view()),
    path("editVideo/",views.EditVideo.as_view()),
] 