from django.conf import settings
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from django.contrib.flatpages import views

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()


urlpatterns = patterns(
    '',
    # url(r'^about/$', views.flatpage, {'url': '/about/'}, name='about'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^about/?$',
        'main.views.flatpage',
        name='about'),



    url(r'^commands/?(?P<argument>(.*))/?$',
        'main.views.commands',
        name='commands'),

url(r'^history/?(?P<argument>(.*))/?$',
        'main.views.history',
        name='history'),


    # url(r'^anynumber/$',
    #     'main.views.anynumber',
    #     name='anynumber'),
#
#     url(r'^sum/(?P<optional>(.*))/?/$',
#         'main.views.sum',
#         name='sum'),
#
#     url(r'^find_max_palindrome/?/$',

    # url(r'^find_max_palindrome/?(?P<count_digits>(.*))/?$',
    #     'main.views.find_max_palindrome',
    #     name='find_max_palindrome'),
#
#     url(r'^find_sum_digits_factorial/(\d)/$',
#         'main.views.find_sum_digits_factorial',
#         name='find_sum_digits_factorial'),
#
# **second method for getting list_of_possible_command
#     url(r'^list_commands/$',
#         'main.views.list_commands',
#         name='list_commands'),
#
#     url(r'^bracket/(\d)/$',
#         'main.views.bracket',
#         name='bracket'),
#
#     url(r'^help/(?P<optional>(.*))/$',
#         'main.views.help_command',
#         name='help'),

)


# main page, also catching all other paths
urlpatterns += patterns('', url(r'^(?P<optional>(.*))/?$',
                                'main.views.list_view',
                                name='list_view'))
