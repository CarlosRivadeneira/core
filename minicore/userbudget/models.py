from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

# Create your models here.


class Budget(models.Model):

    amount = models.FloatField()
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.amount)


    class Meta:
        ordering: ['-date']
