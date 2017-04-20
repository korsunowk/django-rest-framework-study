from django.conf.urls import url, include
from .serializers import router


urlpatterns = [
    url(r'^', include(router.urls))
]
