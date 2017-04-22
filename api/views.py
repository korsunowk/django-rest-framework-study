from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from .permissions import IsAuthorOfComment
from .models import Subject, Comment
from api import serializers

# Create your views here.


class SubjectViewSet(viewsets.ModelViewSet):
    """
        Default view model for display subjects
    """
    queryset = Subject.objects.all()
    serializer_class = serializers.SubjectSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
        Default view model for display all/one users
    """
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    def get_serializer_class(self):
        """
            Method check is list or detail view and
            return different serializers
        :return: Some serializer
        """
        try:
            is_object = self.get_object()  # check it's detail or list view
        except AssertionError:
            is_object = False

        if self.action == 'list':
            return serializers.UserSerializer

        if is_object:
            return serializers.UserDetailWithoutPasswordSerializer
        return serializers.UserCreateSerializer

    def get_permissions(self):
        """
            Check request method and get some permissions
        :return: Some permissions classes
        """
        if self.request.method in ['PUT', 'DELETE']:
            return [IsAdminUser()]
        return super(UserViewSet, self).get_permissions()


class CommentViewSet(viewsets.ModelViewSet):
    """
        Default comment view with different serializers for different actions
    """
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.CommentSerializer
        return serializers.CommentDetailSerializer

    def get_permissions(self):
        """
            Check request methods for give access to delete/change comments
            to authors
        :return: True if is author of message and False if not
        """

        if self.request.method in ['PUT', 'DELETE']:
            return [IsAuthorOfComment()]
        return super(CommentViewSet, self).get_permissions()
