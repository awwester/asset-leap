from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .serializers import ItemSerializer
from .models import Item


class ItemViewSet(ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        """Save the user to the worth item object."""
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """Users should only be able to see or edit their own worth items."""
        return Item.objects.filter(user=self.request.user)
