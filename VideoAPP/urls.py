from django.urls import path
from VideoAPP import views
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    # path("api/v1/",include(router.urls)),
    path("docs/",include_docs_urls(title="Video API")),
    
    # Groups
    path("company/create_group/",views.CreateGroup.as_view()),
    path("company/delete_group/",views.DeleteGroup.as_view()),
    path("company/edit_group/",views.EditGroup.as_view()),
    path("company/add_user_to_group/",views.AddUserToGroup.as_view()),
    path("company/delete_user_from_group/",views.DeleteUserFromGroup.as_view()),
    path("company/disable_group/",views.DisableGroup.as_view()),
    path("company/enable_group/",views.EnableGroup.as_view()),
    path("company/get_all_groups/",views.GetGroups.as_view()),

    # User
    path("user/login/",views.LoginUser.as_view()),
    path("user/register/",views.RegisterUser.as_view()),
    path("user/logout/",views.LogoutUser.as_view()),
    path("user/get_user/",views.GetUser.as_view()),
    path("user/delete_user/",views.DeleteUser.as_view()),
    path("user/get_all_users/",views.GetUsers.as_view()),
    path("user/check_permissions/",views.CheckPermissions.as_view()),
    
    # Video
    path("video/upload_video/",views.UploadVideo.as_view()),
    path("video/get_all_videos/",views.GetVideos.as_view()),
    path("video/delete_video/",views.DeleteVideo.as_view()),
    path("video/edit_video/",views.EditVideo.as_view()),
] 