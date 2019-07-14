import time

from django.conf import settings


def delay_middleware(get_response):
    """
    Selectively delay json requests, used to imitate a delay for localhost.
    """

    def middleware(request):
        if (not settings.TEST_MODE and request.META and
                'application/json' in request.META.get('HTTP_ACCEPT')):
            time.sleep(settings.JSON_RESPONSE_DELAY / 1000)
        response = get_response(request)
        return response

    return middleware
