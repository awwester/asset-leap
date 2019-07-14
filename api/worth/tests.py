from model_mommy import mommy

from django.core.exceptions import ValidationError
from django.urls import reverse

from core.tests import BaseAPITestCase, BaseTestCase
from .models import Item


class ItemsTestMixin:
    def setUp(self):
        super(ItemsTestMixin, self).setUp()
        self.roger_curr_asset1 = mommy.make(
            Item,
            user=self.roger_user,
            type=Item.Type.CURRENT_ASSET
        )
        self.roger_curr_asset2 = mommy.make(
            Item,
            user=self.roger_user,
            type=Item.Type.CURRENT_ASSET
        )
        self.roger_fin_asset1 = mommy.make(
            Item,
            user=self.roger_user,
            type=Item.Type.FINANCIAL_ASSET
        )
        self.roger_fixed_asset1 = mommy.make(
            Item,
            user=self.roger_user,
            type=Item.Type.FIXED_ASSET
        )

        self.roger_curr_liab1 = mommy.make(
            Item,
            user=self.roger_user,
            type=Item.Type.CURRENT_LIAB
        )


class ItemsAPITestCase(ItemsTestMixin, BaseAPITestCase):
    item_list_url = reverse('worthitem-list') + '?type=asset'

    asset_payload = {
        "name": "New Asset",
        "type": Item.Type.CURRENT_ASSET,
        "amount": 789
    }

    liab_payload = {
        "name": "New Liability",
        "type": Item.Type.CURRENT_LIAB,
        "amount": 678
    }

    @property
    def roger_asset_url(self):
        return reverse('worthitem-detail', kwargs={'pk': self.roger_curr_asset1.pk})

    def test_user_can_create_asset(self):
        response = self.sally_client.post(self.item_list_url, self.asset_payload)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json().get('type'), Item.Type.CURRENT_ASSET)

    def test_user_can_create_liability(self):
        response = self.sally_client.post(self.item_list_url, self.liab_payload)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json().get('type'), Item.Type.CURRENT_LIAB)

    def test_user_cant_update_others_asset(self):
        asset_payload = {"name": "Sally Item"}
        response = self.sally_client.patch(self.roger_asset_url, self.asset_payload)
        self.assertEqual(response.status_code, 404)

    def test_user_can_delete_others_asset(self):
        response = self.sally_client.delete(self.roger_asset_url)
        self.assertEqual(response.status_code, 404)

    def test_user_can_update_their_asset(self):
        asset_payload = {"name": "Updated Item"}
        response = self.roger_client.patch(self.roger_asset_url, asset_payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('name'), 'Updated Item')

    def test_user_can_delete_their_asset(self):
        response = self.roger_client.delete(self.roger_asset_url)
        self.assertEqual(response.status_code, 204)
