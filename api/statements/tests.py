from datetime import timedelta

from model_mommy import mommy

from django.urls import reverse
from django.utils import timezone

from core.tests import BaseAPITestCase
from worth.tests import ItemsTestMixin


class StatementTestMixin:
    def setUp(self):
        super(StatementTestMixin, self).setUp()
        self.roger_statement = mommy.make(
            'statements.Statement',
            user=self.roger_user,
            date=timezone.now().date()
        )

        self.roger_statement_url = reverse('statement-detail', kwargs={
            'pk': self.roger_statement.pk
        })


class StatementAPITestCase(ItemsTestMixin, StatementTestMixin, BaseAPITestCase):
    statement_list_url = reverse('statement-list')

    def test_user_can_get_their_statements(self):
        response = self.roger_client.get(self.statement_list_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            len(response.json()),
            self.roger_user.statements.count()
        )

    def test_user_can_retrieve_their_statement(self):
        response = self.roger_client.get(self.roger_statement_url)
        self.assertEqual(response.status_code, 200)

    def test_user_can_create_a_statement(self):
        payload = {
            "date": timezone.now().date()
        }
        response = self.roger_client.post(self.statement_list_url, payload)
        self.assertEqual(response.status_code, 201)

    def test_user_can_update_their_statement(self):
        new_date = timezone.now().date() - timedelta(days=10)
        payload = {"date": new_date}
        response = self.roger_client.patch(self.roger_statement_url, payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json().get('date'), str(new_date))

    def test_user_can_delete_their_statement(self):
        response = self.roger_client.delete(self.roger_statement_url)
        self.assertEqual(response.status_code, 204)
