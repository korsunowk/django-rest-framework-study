from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Subject(models.Model):
    name = models.CharField(max_length=255, default=None)
    user = models.ForeignKey(User, related_name='subject', default=None,
                             null=True, blank=True)

    def __str__(self):
        return self.name


class Comment(models.Model):
    """
        Model for tree structure comment objects
    """
    user = models.ForeignKey(User, related_name='comments')
    text = models.CharField(max_length=255,
                            default=None,
                            blank=False,
                            null=False)
    date = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', default=None, blank=True, null=True)
    subject = models.ForeignKey(Subject, related_name='comments', default=None)

    def __str__(self):
        return "{0}: {1}".format(self.user.username, self.text)
