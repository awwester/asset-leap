from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import Statement
from worth.models import Item


@receiver(post_save, sender=Statement)
def statement_post_save(sender, instance, created, **kwargs):
    """
    When a new statement is created, we need to copy all the user's worth items
    and save them to the statement.
    """
    if created:
        active_items = Item.objects.filter(
            user=instance.user,
            statement=None
        )

        print('active items...', active_items)
        for worth_item in active_items:
            worth_item.pk = None
            worth_item.statement = instance
            worth_item.save()
