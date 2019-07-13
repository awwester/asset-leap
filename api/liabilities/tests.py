from model_mommy import mommy

from django.urls import reverse

from core.tests import BaseAPITestCase
from .models import Liability


class LiabilitiesTestMixin:
    def setUp(self):
        super(LiabilitiesTestMixin, self).setUp()
        self.roger_curr_liability1 = mommy.make(
            Liability,
            user=self.roger_user,
            type=Liability.Type.CURRENT
        )
        self.roger_curr_liability2 = mommy.make(
            Liability,
            user=self.roger_user,
            type=Liability.Type.CURRENT
        )
        self.roger_noncurr_liability1 = mommy.make(
            Liability,
            user=self.roger_user,
            type=Liability.Type.NONCURRENT
        )


class LiabilitiesAPITestCase(LiabilitiesTestMixin, BaseAPITestCase):
    liability_list_url = reverse('liability-list')

    liability_payload = {
        "name": "New Liability",
        "type": "current",
        "amount": 789
    }

    @property
    def roger_liability_url(self):
        return reverse('liability-detail', kwargs={
            'pk': self.roger_curr_liability1.pk
        })

    def test_user_can_create_liability(self):
        liability_payload = {
            "name": "New Liability",
            "type": "current",
            "amount": 789
        }
        response = self.sally_client.post(
            self.liability_list_url, liability_payload)
        self.assertEqual(response.status_code, 201)

    def test_user_cant_update_others_liability(self):
        liability_payload = {"name": "Sally Liability"}
        response = self.sally_client.patch(
            self.roger_liability_url, liability_payload)
        self.assertEqual(response.status_code, 404)

    def test_user_can_delete_others_liability(self):
        response = self.sally_client.delete(self.roger_liability_url)
        self.assertEqual(response.status_code, 404)

    def test_user_can_update_their_liability(self):
        liability_payload = {"name": "Updated Liability"}
        response = self.roger_client.patch(
            self.roger_liability_url, liability_payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('name'), 'Updated Liability')

    def test_user_can_delete_their_liability(self):
        response = self.roger_client.delete(self.roger_liability_url)
        self.assertEqual(response.status_code, 204)
