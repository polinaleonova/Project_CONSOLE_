""" File with root views of PEN GUI"""
import json
import logging
from django.conf import settings
from django.contrib.flatpages.models import FlatPage
from django.http import HttpResponse
from django.shortcuts import render
from django.template.loader import render_to_string
import random
from django.utils import simplejson


def any_number(request):
    results = {}
    results['parametr'] = '1234567890'*8
    j = json.dumps(results)
    return HttpResponse(j, mimetype='application/json')


def list_view(request, *args, **kwargs):
    """
    List of all views by url
    """
    return render(request, 'console.html', {})
