from rest_framework import serializers

from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True, source="category")
    class Meta:
        model = Item
        exclude = ('user',)
