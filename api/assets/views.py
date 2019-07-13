from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .serializers import AssetSerializer
from .models import Asset


class AssetViewSet(ModelViewSet):
    serializer_class = AssetSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        """Save the user to the asset object."""
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """Users should only be able to see or edit their own assets."""
        return Asset.objects.filter(user=self.request.user)
