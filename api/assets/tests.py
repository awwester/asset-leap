from model_mommy import mommy

from django.urls import reverse

from core.tests import BaseAPITestCase
from .models import Asset


class AssetsTestMixin:
    def setUp(self):
        super(AssetsTestMixin, self).setUp()
        self.roger_curr_asset1 = mommy.make(
            Asset,
            user=self.roger_user,
            type=Asset.Type.CURRENT
        )
        self.roger_curr_asset2 = mommy.make(
            Asset,
            user=self.roger_user,
            type=Asset.Type.CURRENT
        )
        self.roger_fin_asset1 = mommy.make(
            Asset,
            user=self.roger_user,
            type=Asset.Type.FINANCIAL
        )
        self.roger_fixed_asset1 = mommy.make(
            Asset,
            user=self.roger_user,
            type=Asset.Type.FIXED
        )


class AssetsAPITestCase(AssetsTestMixin, BaseAPITestCase):
    asset_list_url = reverse('asset-list')

    asset_payload = {
        "name": "New Asset",
        "type": "current",
        "amount": 789
    }

    @property
    def roger_asset_url(self):
        return reverse('asset-detail', kwargs={'pk': self.roger_curr_asset1.pk})

    def test_user_can_create_asset(self):
        asset_payload = {
            "name": "New Asset",
            "type": "current",
            "amount": 789
        }
        response = self.sally_client.post(self.asset_list_url, asset_payload)
        self.assertEqual(response.status_code, 201)

    def test_user_cant_update_others_asset(self):
        asset_payload = {"name": "Sally Asset"}
        response = self.sally_client.patch(self.roger_asset_url, asset_payload)
        self.assertEqual(response.status_code, 404)

    def test_user_can_delete_others_asset(self):
        response = self.sally_client.delete(self.roger_asset_url)
        self.assertEqual(response.status_code, 404)

    def test_user_can_update_their_asset(self):
        asset_payload = {"name": "Updated Asset"}
        response = self.roger_client.patch(self.roger_asset_url, asset_payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('name'), 'Updated Asset')

    def test_user_can_delete_their_asset(self):
        response = self.roger_client.delete(self.roger_asset_url)
        self.assertEqual(response.status_code, 204)
