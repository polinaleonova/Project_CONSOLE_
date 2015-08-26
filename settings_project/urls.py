from django.conf import settings
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from django.contrib.flatpages import views

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()


urlpatterns = patterns(
    '',
    url(r'^admin/', include(admin.site.urls)),

    url(r'^about/', include('django.contrib.flatpages.urls')),

    url(r'^commands/?(?P<argument>(.*))/?$',
        'main.views.commands',
        name='commands'),

    url(r'^history/?(?P<argument>(.*))/?$',
        'main.views.history',
        name='history'),

    url(r'^information_about_courses_set/?$',
        'main.views.information_about_courses_set',
        name='information_about_courses_set'),

)


# main page, also catching all other paths
urlpatterns += patterns('', url(r'^(?P<optional>(.*))/?$',
                                'main.views.list_view',
                                name='list_view'))
