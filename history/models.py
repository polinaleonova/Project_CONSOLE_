from django.db import models


class History(models.Model):
    command_name = models.CharField(max_length=50)

    def __unicode__(self):
        return self.command_name

    def __str__(self):
        return self.command_name

