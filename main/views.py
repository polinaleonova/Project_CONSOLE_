import json
import logging
import random

import handler
from django.template import Context

from django.http import HttpResponse
from django.shortcuts import render


def anynumber(request):
    data = handler.anynumber_handler()
    return HttpResponse(data, content_type='application/json')


def find_sum_digits_factorial(request, num_factorial):
    data = handler.find_sum_digits_factorial_handler(int(num_factorial))
    return HttpResponse(data, mimetype='application/json')


def find_max_palindrome(request, count_digits):
    if not count_digits:
        return HttpResponse(
            json.dumps(
                {'parameter': "You didn't pass any arrguments. Sorry. :{"}
            ), mimetype='application/json'
        )
    try:
        int(count_digits)
    except ValueError:
        pass
    data = handler.find_max_palindrome_handler(count_digits)
    return HttpResponse(data, mimetype='application/json')


def sum(request, *args, **kwargs):
    data = handler.sum_handler(*args, **kwargs)
    return HttpResponse(data, mimetype='application/json')


def bracket(request, number_bracket):
    data = handler.bracket_handler(number_bracket)
    return HttpResponse(data, mimetype='application/json')


def help_command(request, *args, **kwargs):
        data = handler.help_command_handler(*args, **kwargs)
        return HttpResponse(data, mimetype='application/json')

# from django.template
# def list_view(request, *args, **kwargs):


# **second method for getting list_of_possible_command
# def list_commands(request):
#     data = json.dumps({'commands': ['anynumber', 'help', '', 'sum', 'find_max_palindrome', 'find_sum_digits_factorial']})
#     return HttpResponse(data, mimetype='application/json')


def list_view(request, *args, **kwargs):
    """
    List of all views by url
    """
    return render(request, 'console.html', {'commands': json.dumps(['anynumber', 'help', '', 'sum', 'find_max_palindrome', 'bracket', 'find_sum_digits_factorial'])})
    # return render(request, 'console.html', {}) #**second method for getting list_of_possible_command








# It is equivalent to
# from django.template import RequestContext, loader
#
# def list_view(request, *args, **kwargs):
#     """
#     List of all views by url
#     """
#     template = loader.get_template('console.html')
#
#     context_dictionary = RequestContext(request,{})
#     pipirka = template.render(context_dictionary)
#     # browser will get pipirka
#     return HttpResponse(pipirka)


# Project_CONSOLE_
# It is the first project for implementation of the skills Python, Django, JavaScript, HTML and CSS.
# This web-console must work like a unix-system console.
# The execution of any command assume the calling of the view-function.
