from rest_framework import serializers

from .models import Item


class WorthItemSerializer(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True)

    class Meta:
        model = Item
        exclude = ('user',)
