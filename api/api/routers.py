from rest_framework import routers

from accounts.views import UserViewSet
from worth.views import ItemViewSet


router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'worth-items', ItemViewSet, base_name="worthitem")
