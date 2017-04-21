from rest_framework import serializers, viewsets, routers
from django.contrib.auth.models import User
from rest_framework_recursive.fields import RecursiveField
from rest_framework.permissions import IsAdminUser, BasePermission

from .models import Comment, Subject


class IsAuthorOfComment(BasePermission):
    """
        Custom permission to check "this user is author of that comment?"
    """
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class SubjectSerializer(serializers.ModelSerializer):
    """
        Serializer for subject model
    """
    class Meta:
        model = Subject
        fields = [
            'name'
        ]


class CommentDetailSerializer(serializers.ModelSerializer):
    """
        Serializer for one comment object display
    """
    date = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    user = serializers.SlugRelatedField(slug_field='username',
                                        queryset=User.objects.all(),
                                        write_only=True)
    nickname = serializers.SerializerMethodField()
    subject_name = serializers.SerializerMethodField()  # for display
    subject = serializers.SlugRelatedField(slug_field='name',
                                           queryset=Subject.objects.all(),
                                           write_only=True)  # for add/edit

    def get_nickname(self, comment):
        """
            Method for get first and last name of user. 
            If he/she haven't name, then return username

        :return: First_name last_name or username
        """
        has_name = comment.user.first_name and comment.user.last_name
        return "%s %s" % (comment.user.first_name,
                          comment.user.last_name) \
            if has_name else comment.user.username

    def get_subject_name(self, comment):
        """
            Get and return subject name
            
        :return: Subject name in string form
        """
        return comment.subject.name

    class Meta:
        model = Comment
        fields = [
            'user',
            'nickname',
            'text',
            'date',
            'parent',
            'subject_name',
            'subject'
        ]


class CommentSerializer(serializers.ModelSerializer):
    """
        Serializer for list of comments display
    """
    date = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    parent = RecursiveField()
    subject = SubjectSerializer()

    class Meta:
        model = Comment
        fields = [
            'subject',
            'text',
            'date',
            'url',
            'parent'
        ]


class UserSerializer(serializers.ModelSerializer):
    """
        Serializer for list of users display
    """
    comments = CommentSerializer(many=True, read_only=True)
    subject_name = serializers.SerializerMethodField()

    def get_subject_name(self, user):
        return user.subject.first().name if user.subject.first() else None

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'subject_name',
            'email',
            'url',
            'comments'
        ]


class UserDetailWithoutPasswordSerializer(serializers.ModelSerializer):
    """
        Serializer for display detail info about user without password
    """
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    subject_name = serializers.SerializerMethodField()

    def get_subject_name(self, user):
        return user.subject.first().name if user.subject.first() else None

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'subject_name',
            'subject',
            'email',
            'first_name',
            'last_name',
            'is_staff'
        ]


class UserCreateSerializer(UserDetailWithoutPasswordSerializer):
    """
        Serializer for display form to create user with password
    """
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'subject',
            'email',
            'first_name',
            'last_name',
            'is_staff',
            'password'
        ]


class SubjectViewSet(viewsets.ModelViewSet):
    """
        Default view model for display subjects
    """
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
        Default view model for display all/one users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
            return UserSerializer

        if is_object:
            return UserDetailWithoutPasswordSerializer
        return UserCreateSerializer

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
    serializer_class = CommentSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return CommentSerializer
        return CommentDetailSerializer

    def get_permissions(self):
        """
            Check request methods for give access to delete/change comments
            to authors
        :return: True if is author of message and False if not 
        """

        if self.request.method in ['PUT', 'DELETE']:
            return [IsAuthorOfComment()]
        return super(CommentViewSet, self).get_permissions()

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'subjects', SubjectViewSet)
