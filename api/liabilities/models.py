from django.db import models


class Liability(models.Model):
    """
    An liability that belongs to a user.

    User liabilities can only be tied to a given statement period, so a user will
    have multiple records of the same liability, which will have different value
    as it changes over time.
    """
    class Type:
        CURRENT = 'current'
        NONCURRENT = 'non-current'

        CHOICES = (
            (CURRENT, 'Current'),
            (NONCURRENT, 'Non-current'),
        )

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    value = models.PositiveIntegerField(default=0)
    type = models.CharField(max_length=16, choices=Type.CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.name}"
