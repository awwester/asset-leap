from rest_framework.viewsets import ModelViewSet

from .models import Statement
from .serializers import StatementSerializer


class StatementViewSet(ModelViewSet):
    serializer_class = StatementSerializer

    def perform_create(self, serializer):
        """Save the user to the statement object."""
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """Users should only be able to see or edit their own statements."""
        return Statement.objects.filter(user=self.request.user)
