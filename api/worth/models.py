from django.core.exceptions import ValidationError
from django.db import models


class AssetManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(type__endswith='asset')


class LiabilityManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(type__endswith='liability')


class Item(models.Model):
    """
    An asset or liability that belongs to a user. Collectively we'll call these
    "worth items".

    User's worth items can only be tied to a given statement period, so a user
    will have multiple records of the same asset, but have different value as
    it changes over time.
    """
    class Type:
        FINANCIAL_ASSET = 'financial_asset'
        FIXED_ASSET = 'fixed_asset'
        CURRENT_ASSET = 'current_asset'
        CURRENT_LIAB = 'current_liab'
        NONCURRENT_LIAB = 'noncurrent_liab'

        CHOICES = (
            (FINANCIAL_ASSET, 'Financial asset'),
            (FIXED_ASSET, 'Fixed asset'),
            (CURRENT_ASSET, 'Current asset'),
            (CURRENT_LIAB, 'Current liability'),
            (NONCURRENT_LIAB, 'Noncurrent liability'),
        )

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    value = models.PositiveIntegerField(default=0)
    type = models.CharField(max_length=16, choices=Type.CHOICES)

    # managers
    objects = models.Manager()
    assets = AssetManager()
    liabilities = LiabilityManager()

    @property
    def category(self):
        """Determine if asset or liability based on type."""
        return 'asset' if 'asset' in self.type else 'liability'

    def __str__(self):
        return f"{self.user.username} - {self.name}"
