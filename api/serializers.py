from rest_framework import serializers, viewsets, routers
from django.contrib.auth.models import User
from rest_framework_recursive.fields import RecursiveField
from .models import Comment


class CommentDetailSerializer(serializers.ModelSerializer):
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


class UserDetailSerializer(serializers.ModelSerializer):
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


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return UserSerializer
        return UserDetailSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return CommentSerializer
        return CommentDetailSerializer


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'comments', CommentViewSet)
