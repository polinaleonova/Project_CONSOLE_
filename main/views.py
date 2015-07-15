
import json
import logging
import random


from django.http import HttpResponse
from django.shortcuts import render


def anynumber(request):
    results = {}
    results['parametr'] = '=>'+'1234567890'*8
    j = json.dumps(results)
    return HttpResponse(j, content_type ='application/json')


def find_sum_digits_factorial(request, num_factorial):
    """
    factorial function without using recursion
    and calculation of sum the result's digits
    """
    results = {}
    value = 1
    for x in xrange(2, num_factorial+1):
        value *= x
    factorial = value
    string_factorial = str(factorial)
    sum = 0
    for digit in string_factorial:
        sum += int(digit)
    results['parametr'] = '=>'+'Sum of the digits in the number {}! is equal {}'.format(num_factorial, sum)
    j = json.dumps(results)
    return HttpResponse(j, mimetype='application/json')



def find_max_palindrome(request, count_digits):
    results = {}
    count_digits_int = int(count_digits)
    max_value = int('9'*count_digits_int)
    min_value = int('1'+'0'*(count_digits_int-1))
    max_number = str(max_value**2)
    first_part = max_number[0:len(max_number)/2]
    for number in xrange(int(first_part), min_value, -1):
        str_number = str(number)
        palindrome = int(str_number + str_number[::-1])
        for div in xrange(max_value, min_value, -1):
            if palindrome % div == 0 and min_value < palindrome/div < max_value:
                results['parametr'] = '=>'+str(palindrome)
                j = json.dumps(results)
                return HttpResponse(j, mimetype='application/json')

def sum(request, *args, **kwargs):

    results = {}
    unicode_arg_string = kwargs['optional']
    arg_string_type = unicode_arg_string.encode('utf-8')
    list_all_elements_str = arg_string_type.split('/')
    sum_arguments = 0
    for elem in range(len(list_all_elements_str)):
        sum_arguments += int(list_all_elements_str[elem])
    results['parametr'] = '=>'+str(sum_arguments)
    j = json.dumps(results)
    return HttpResponse(j, mimetype='application/json')

def help(request):
    results = {}
    results['parametr'] = '=>'+'1234567890'*8
    j = json.dumps(results)
    return HttpResponse(j, mimetype='application/json')


def list_view(request, *args, **kwargs):
    """
    List of all views by url
    """
    return render(request, 'console.html', {})
