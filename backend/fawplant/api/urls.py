from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    AIDiseaseDetectorView,
    CreateCommentView,
    CreatePostView,
    CreateUserView,
    FarmerPostView,
    PostCommentsView,
    PostView,
    ProfileView,
    TestMessage,
)


urlpatterns = [
    path("test/", TestMessage.as_view(), name="test_msg"),
    # Authentication EndPoints
    # ---------------------------
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    #
    path("farmer/users/create/", CreateUserView.as_view(), name="create_user"),
    path("farmer/profile/", ProfileView.as_view(), name="profile"),
    # get all farmer posts
    path("posts/", PostView.as_view(), name="post_list"),
    # get specific farmer's posts
    path("farmer/posts/", FarmerPostView.as_view(), name="post_list"),
    path("farmer/post/create/", CreatePostView.as_view(), name="create_post"),
    # get all comments on farmer's specific post
    path(
        "farmer/post/comments/<int:post_id>/",
        PostCommentsView.as_view(),
        name="post_comments",
    ),
    path(
        "farmer/post/<int:post_id>/comments/create/",
        CreateCommentView.as_view(),
        name="create_comment",
    ),
    #
    path(
        "disease-detector/", AIDiseaseDetectorView.as_view(), name="ai_disease_detector"
    ),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
