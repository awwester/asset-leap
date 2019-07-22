from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import WorthItemSerializer
from .models import Item


class ItemViewSet(ModelViewSet):
    serializer_class = WorthItemSerializer
    permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=["GET"])
    def active(self, request):
        """Return only items that aren't associated with a statement."""
        print('handling active...')
        queryset = Item.objects.filter(user=request.user, statement=None)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        """Save the user to the worth item object."""
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """Users should only be able to see or edit their own worth items."""
        return Item.objects.filter(user=self.request.user)
