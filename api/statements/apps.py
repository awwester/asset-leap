from django.apps import AppConfig


class StatementsConfig(AppConfig):
    name = 'statements'

    def ready(self):
        import statements.signals
