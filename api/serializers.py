from rest_framework import serializers, viewsets, routers
from django.contrib.auth.models import User

from .models import Comment


# class DetailUserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = [
#             'id',
#             'username',
#             'email',
#             'first_name',
#             'last_name',
#             'is_staff'
#         ]


class CommentSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Comment
        fields = [
            'text',
            'date'
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


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
