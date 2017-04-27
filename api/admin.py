from django.contrib import admin
from .models import Comment, Subject

# Register your models here.


class CommentAdmin(admin.ModelAdmin):
    list_display = ['user', 'text', 'date']


class SubjectAdmin(admin.ModelAdmin):
    list_display = ['name']


admin.site.register(Comment, CommentAdmin)
admin.site.register(Subject, SubjectAdmin)
