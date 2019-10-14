# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from usermanagement.models import User,Patient,Doctors
from appointments.models import Doctortimes
from datetime import datetime
# Create your models here.

class consultfee(models.Model):
    patient = models.ForeignKey(Patient,on_delete=models.CASCADE)
    # reciptionist = models.ForeignKey(User)
    doctor = models.ForeignKey(User,on_delete=models.CASCADE)
    amount = models.IntegerField()
    generate_date = models.CharField(max_length=300, null=True, blank=True)
    is_paid = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        self.generate_date = s
        super(consultfee, self).save(*args, **kwargs)

class bill(models.Model):
    amount = models.IntegerField()
    description = models.CharField(max_length=300)
    generate_time = models.CharField(max_length=300,null=True,blank=True)