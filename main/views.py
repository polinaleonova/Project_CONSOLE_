import json
import logging
import random

import handler
from django.template import Context

from django.http import HttpResponse
from django.shortcuts import render, render_to_response
from models_project.models import History


def flatpage(request):
    pass


def history(request, argument):
    if argument != '':
        arg = argument.replace('/', ' ')
        h = History(command_name=arg)
        h.save()
    return HttpResponse()


def commands(request, argument):
    if argument == '':
        return HttpResponse(json.dumps({'parameter': ''}), mimetype='application/json')
    list_arguments = argument.split('/')
    command = list_arguments[0]+'_handler'
    if not hasattr(handler, command):
        argument_error = argument.replace('/',' ')
        return HttpResponse(json.dumps({'parameter': argument_error +': this command is not exist. If you want to know more about all build-in commands, use help <function_name>'}), mimetype='application/json')
    else:
        data = getattr(handler, command)(list_arguments[1:])
        return HttpResponse(json.dumps({'parameter': data}), mimetype='application/json')


def list_view(request, *args, **kwargs):
    """
    List of all views by url
    """
    return render(request, 'console.html')
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
