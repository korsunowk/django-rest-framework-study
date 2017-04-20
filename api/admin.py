from django.contrib import admin
from .models import Comment

# Register your models here.


class AdminComment(admin.ModelAdmin):
    list_display = ['user', 'text', 'date']

admin.site.register(Comment, AdminComment)
