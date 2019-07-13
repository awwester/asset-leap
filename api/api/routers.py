from rest_framework import routers

from accounts.views import UserViewSet
from assets.views import AssetViewSet
from liabilities.views import LiabilityViewSet


router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'assets', AssetViewSet, base_name="asset")
router.register(r'liabilities', LiabilityViewSet, base_name="liability")
