from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from django.utils.dateparse import parse_datetime

# Create your views here.
'''
@require_http_methods(['GET'])
#@check_api_key
def tweet_untrained_text_router(request, *args, **kwargs):
    """
    A router used to control the permission and distribute request
    """
    resource = 100
    for arg in args:
        if isinstance(arg, dict):
            resource = arg.get('resource', 100)

    if request.method == 'GET':
        return tweet_untrained_text_get(request, resource)
    return HttpResponseNotAllowed()
'''

def tweet_count(request):
    return