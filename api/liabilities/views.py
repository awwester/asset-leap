from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .serializers import LiabilitySerializer
from .models import Liability


class LiabilityViewSet(ModelViewSet):
    serializer_class = LiabilitySerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        """Save the user to the liability object."""
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """Users should only be able to see or edit their own liabilities."""
        return Liability.objects.filter(user=self.request.user)
