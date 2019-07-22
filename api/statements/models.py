from django.db import models
from django.db.models import Sum


class Statement(models.Model):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE,
                             related_name='statements')
    date = models.DateField()

    def __str__(self):
        return f"{self.user.username} - {self.date}"

    @property
    def assets(self):
        return self.worth_items.filter(
            statement=self,
            type__contains='asset'
        )

    @property
    def liabilities(self):
        return self.worth_items.filter(
            statement=self,
            type__contains='liab'
        )

    @property
    def total(self):
        asset_value = self.assets.aggregate(Sum('value')).get('value__sum')
        liability_value = self.liabilities.aggregate(
            Sum('value')
        ).get('value__sum')
        return asset_value - liability_value

    class Meta:
        ordering = ("-date",)
        unique_together = ('user', 'date')
