from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Comment(models.Model):
    user = models.ForeignKey(User, related_name='comments')
    text = models.CharField(max_length=255,
                            default=None,
                            blank=False,
                            null=False)
    date = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', default=None, blank=True, null=True)

    def __str__(self):
        return "{0}: {1}".format(self.user.username, self.text)
