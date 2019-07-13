from rest_framework import serializers

from .models import Liability


class LiabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Liability
        exclude = ('user',)
