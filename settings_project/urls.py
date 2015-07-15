from django.conf import settings
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView


# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()


urlpatterns = patterns(
    '',
    url(r'^anynumber/$',
        'main.views.anynumber',
        name='anynumber'),

    url(r'^sum/(?P<optional>(.*))/?/$',
        'main.views.sum',
        name='sum'),

    url(r'^find_max_palindrome/(\d)/$',
        'main.views.find_max_palindrome',
        name='find_max_palindrome'),

    url(r'^find_sum_digits_factorial/(\d)/$',
        'main.views.find_sum_digits_factorial',
        name='find_sum_digits_factorial'),

)


# main page, also catching all other paths
urlpatterns += patterns('', url(r'^(?P<optional>(.*))/?$',
                                'main.views.list_view',
                                name='list_view'))
