from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        user = self.create_user(
            email=self.normalize_email(email), password=password, **extra_fields
        )
        user.is_admin = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(
        max_length=6,
        choices=(("male", "Male"), ("female", "Female"), ("other", "Other")),
        null=True,
        blank=True,
    )
    user_type = models.CharField(
        max_length=6, choices=(("farmer", "Farmer"), ("expert", "Expert"))
    )
    profile_picture = models.ImageField(
        upload_to="profile_images/", default="default.png", null=True, blank=True
    )
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "gender",
        "user_type",
    ]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField(max_length=250)
    description = models.TextField(max_length=4000)
    created_on = models.DateTimeField(default=timezone.now, null=True, blank=True)

    comments = models.ManyToManyField(
        "Comment", related_name="post_comments", blank=True
    )

    def has_comments(self):
        return self.comments.exists()

    def __str__(self):
        return f"{self.title}"[:30]

    has_comments.boolean = True
    has_comments.short_description = "Has comments"


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    text = models.TextField(max_length=3500)
    created_on = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user.full_name()}: {self.post.title}"
