
from django.db import models


class History(models.Model):
    command_name = models.CharField(max_length=50)

    def __unicode__(self):
        return self.command_name

    def __str__(self):
        return self.command_name


class Course(models.Model):

    name_course = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name_course


class Person(models.Model):

    name = models.CharField(max_length=50)
    age = models.IntegerField()
    courses = models.ManyToManyField(Course)

    def __unicode__(self):
        return self.name

