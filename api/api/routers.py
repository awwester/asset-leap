from rest_framework import routers

from accounts.views import UserViewSet
from assets.views import AssetViewSet


router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'assets', AssetViewSet, base_name="asset")
