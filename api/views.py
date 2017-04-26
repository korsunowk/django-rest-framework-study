from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from .permissions import IsAuthorOfComment
from .models import Subject, Comment
from api import serializers

# Create your views here.


class SubjectViewSet(viewsets.ModelViewSet):
    """
        Default view model for display subjects
        
        list:
        Return all subjects
        
        post:
        Create a new subject
        
        retrieve:
        Return the given subject
    """
    queryset = Subject.objects.all()
    serializer_class = serializers.SubjectSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
        Default view model for display all/one users
        
        list:
        Return all users in system
        
        post:
        Create a new user
        
        retrieve:
        Return the given user
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
        
        list:
        Return all comments to anonymous user or return comment 
        with as same subject as authenticated user subject
        
        post:
        Create a new comment
        
        retrieve:
        Return the given comment
    """
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer

    def list(self, request, *args, **kwargs):
        """
            Returns a list of comments of the same 
            subject as the subject of the user
            
        :param request: 
        :param args: 
        :param kwargs: 
        :return: response with new queryset
        """
        if request.user.is_authenticated():
            queryset = \
                Comment.objects.filter(subject=request.user.subject.first())
        else:
            queryset = Comment.objects.all()

        serializer = \
            serializers.CommentSerializer(queryset, many=True,
                                          context={'request': request})
        return Response(serializer.data)

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
