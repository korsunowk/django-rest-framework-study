from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import datetime

# Create your models here.


class Comment(models.Model):
    user = models.ForeignKey(User, related_name='comments')
    text = models.CharField(max_length=255,
                            default=None,
                            blank=False,
                            null=False)
    date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return "{0}: {1}".format(self.user.username, self.text)
