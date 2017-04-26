from rest_framework import routers

from api import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, base_name='user')
router.register(r'comments', views.CommentViewSet, base_name='comment')
router.register(r'subjects', views.SubjectViewSet, base_name='subject')
