from rest_framework.permissions import BasePermission


class IsAuthorOfComment(BasePermission):
    """
        Custom permission to check "this user is author of that comment?"
    """
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user
