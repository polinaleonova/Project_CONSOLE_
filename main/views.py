import json
import logging
import random


from django.http import HttpResponse
from django.shortcuts import render


def anynumber(request):
    results = {}
    results['parametr'] = '1234567890'*8
    j = json.dumps(results)
    return HttpResponse(j, mimetype='application/json')

def help(request):
    results = {}
    results['parametr'] = '1234567890'*8
    j = json.dumps(results)
    return HttpResponse(j, mimetype='application/json')


def list_view(request, *args, **kwargs):
    """
    List of all views by url
    """
    return render(request, 'console.html', {})
