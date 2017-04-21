from rest_framework import serializers, viewsets, routers
from django.contrib.auth.models import User
from rest_framework_recursive.fields import RecursiveField
from rest_framework.permissions import IsAdminUser
from .models import Comment


class CommentDetailSerializer(serializers.ModelSerializer):
    """
        Serializer for one comment object display
    """
    date = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    user = serializers.SlugRelatedField(slug_field='username',
                                        queryset=User.objects.all(),
                                        write_only=True)
    nickname = serializers.SerializerMethodField()

    def get_nickname(self, comment):
        has_name = comment.user.first_name and comment.user.last_name
        return "%s %s" % (comment.user.first_name,
                          comment.user.last_name) \
            if has_name else comment.user.username

    class Meta:
        model = Comment
        fields = [
            'user',
            'nickname',
            'text',
            'date',
            'parent'
        ]


class CommentSerializer(serializers.ModelSerializer):
    """
        Serializer for list of comments display
    """
    date = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    parent = RecursiveField()

    class Meta:
        model = Comment
        fields = [
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

    class Meta:
        model = User
        fields = [
            'id',
            'username',
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

    class Meta:
        model = User
        fields = [
            'id',
            'username',
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
            'email',
            'first_name',
            'last_name',
            'is_staff',
            'password'
        ]


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


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'comments', CommentViewSet)
