from django.conf.urls import url, include
from api.routers import router


urlpatterns = [
    url(r'^', include(router.urls))
]
