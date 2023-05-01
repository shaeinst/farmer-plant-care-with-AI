from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import Comment, Post, User
from .forms import UserChangeForm


admin.site.site_title = "welcome"
admin.site.site_header = "FAWPLANT Administration"
admin.site.index_title = "welcom to FAWPLANT admin pannel"


class HasCommentsFilter(admin.SimpleListFilter):
    title = "Has comments"
    parameter_name = "has_comments"

    def lookups(self, request, model_admin):
        return (("yes", "Yes"), ("no", "No"))

    def queryset(self, request, queryset):
        if self.value() == "yes":
            return queryset.filter(comments__isnull=False).distinct()
        if self.value() == "no":
            return queryset.filter(comments__isnull=True)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "title",
        "has_comments",
    )
    search_fields = ("user", "description", "title")
    list_filter = (HasCommentsFilter,)

    ordering = ("user",)

    def has_comments(self, obj):
        return obj.comments.exists()

    has_comments.boolean = True
    has_comments.short_description = "Has comments"


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "post",
        "created_on",
    )
    search_fields = ("user", "post", "title")
    ordering = ("user",)


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    form = UserChangeForm

    list_filter = ("user_type", "is_staff", "is_active")
    search_fields = ("email", "first_name", "last_name")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            _("Personal info"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "gender",
                    "user_type",
                    "profile_picture",
                )
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "user_type",
                    "gender",
                    "mobile_number",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
    list_display = (
        "email",
        "first_name",
        "last_name",
        "gender",
        "user_type",
        "mobile_number",
        "is_staff",
        "is_active",
    )
    ordering = ("email",)
    filter_horizontal = (
        "groups",
        "user_permissions",
    )
