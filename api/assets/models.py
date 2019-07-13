from django.db import models


class Asset(models.Model):
    """
    An asset that belongs to a user.

    User assets can only be tied to a given statement period, so a user will
    have multiple records of the same asset, which will have different value
    as it changes over time.
    """
    class Type:
        FINANCIAL = 'finance'
        FIXED = 'fixed'
        CURRENT = 'current'

        CHOICES = (
            (FINANCIAL, 'Financial'),
            (FIXED, 'Fixed'),
            (CURRENT, 'Current'),
        )

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    value = models.PositiveIntegerField(default=0)
    type = models.CharField(max_length=8, choices=Type.CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.name}"
