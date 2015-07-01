""" File with root views of PEN GUI"""
import json
import logging
from django.conf import settings
from django.contrib.flatpages.models import FlatPage
from django.http import HttpResponse
from django.shortcuts import render
from django.template.loader import render_to_string
import random


def list_view(request, *args, **kwargs):
    """
    List of all views by url
    """
    return render(request, 'console.html', {})