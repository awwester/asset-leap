import time

from django.conf import settings


def delay_middleware(get_response):
    """
    Selectively delay json requests, used to imitate a delay for localhost.
    """

    def middleware(request):
        if ('application/json' in request.META.get('HTTP_ACCEPT') and
                not settings.TEST_MODE):
            time.sleep(settings.JSON_RESPONSE_DELAY)
        response = get_response(request)
        return response

    return middleware
