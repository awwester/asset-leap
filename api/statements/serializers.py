from rest_framework import serializers

from worth.serializers import WorthItemSerializer
from .models import Statement


class StatementSerializer(serializers.ModelSerializer):
    liabilities = WorthItemSerializer(many=True, read_only=True)
    assets = WorthItemSerializer(many=True, read_only=True)
    total = serializers.CharField(read_only=True)

    class Meta:
        model = Statement
        exclude = ('user',)
