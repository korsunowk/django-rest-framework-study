from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_recursive.fields import RecursiveField

from .models import Comment, Subject


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
        """
            Return subject name if exists
        """
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
