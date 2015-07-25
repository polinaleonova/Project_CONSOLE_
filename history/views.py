
import json
import logging
import random

import handler
from django.template import Context

from django.http import HttpResponse
from django.shortcuts import render, render_to_response
from history.models import History


def history(request):
    # History.objects.all()

    return HttpResponse(json.dumps({'parameter': History.objects.all()}))
