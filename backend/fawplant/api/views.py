from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from .models import Comment, Post

from .serializers import (
    CommentSerializer,
    TestMessageSerializer,
    PostSerializer,
    UserSerializer,
)
from .AI.image_analysis import perform_analysis
from .models import Post, User


class TestMessage(ListAPIView):
    serializer_class = TestMessageSerializer

    def get_queryset(self):
        return [{"id": 1, "msg": "hello world"}]

    def get(self, request):
        serializered = self.serializer_class(
            self.get_queryset(),
            many=True,
        )
        response = Response(serializered.data)

        return response


class CreateUserView(CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()

            return Response(
                {
                    "success": True,
                    "user_id": user.id,
                    "feedback": "User created successfully",
                },
                status=status.HTTP_201_CREATED,
            )

        except ValidationError as e:
            message = list(e.detail.values())[0][0]
            return Response(
                {"success": False, "feedback": message},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    serializer_class = UserSerializer

    def get(self, request):
        # serializered = self.serializer_class(request.user)
        serializered = self.serializer_class(request.user, context={"request": request})

        return Response(serializered.data)


# get posts of all farmer
class PostView(ListAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Post.objects.all()
    serializer_class = PostSerializer


# get all posts by specific farmer
class FarmerPostView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(user=user)


class CreatePostView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CreateCommentView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        post_id = self.kwargs["post_id"]
        post = Post.objects.get(id=post_id)
        serializer.save(user=self.request.user, post=post)


class PostCommentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, post_id):
        post = Post.objects.filter(id=post_id).first()
        if not post:
            return Response({"detail": "Post not found."}, status=404)

        comments = Comment.objects.filter(post=post)
        response_data = []
        for comment in comments:
            user_profile_url = f"/profiles/{comment.user.id}/"
            response_data.append(
                {
                    "user": comment.user.full_name(),
                    "solution": comment.text,
                    "profileUrl": user_profile_url,
                }
            )
        return Response(response_data, status=200)


class AIDiseaseDetectorView(APIView):
    #
    permission_classes = [IsAuthenticated]

    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        # Extract the image file from the request data
        image_file = request.data.get("image")

        # Perform analysis on the image
        perform = perform_analysis(image_file)
        result = perform.detect_disease()

        # Return the analysis result as a JSON response
        return Response({"result": result}, status=status.HTTP_200_OK)
