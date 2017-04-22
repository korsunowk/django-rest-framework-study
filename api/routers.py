from rest_framework import routers

from api import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'subjects', views.SubjectViewSet)
