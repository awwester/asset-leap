from django.db import models


class Statement(models.Model):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE,
                             related_name='statements')
    date = models.DateField()

    def __str__(self):
        return f"{self.user.username} - {self.date}"

    class Meta:
        ordering = ("-date",)
