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
)


# main page, also catching all other paths
urlpatterns += patterns('', url(r'^(?P<optional>(.*))/?$',
                                'main.views.list_view',
                                name='list_view'))
