# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from usermanagement.models import Doctors, Patient
from django.dispatch import receiver
from django.db.models.signals import post_save
from datetime import timedelta,time

class Doctortimes(models.Model):
    slotlist =[]

    TIMESLOT_LIST = [(i,j) for i,j in zip(range(0,len(slotlist)),slotlist)]

    doctor = models.ForeignKey(Doctors,on_delete=models.CASCADE)
    starttime = models.TimeField(null=True,blank=True)
    endtime = models.TimeField(null=True,blank=True)
    consultationfee = models.IntegerField(null=True)
    # consultfee = models.IntegerField(null=True)
    breakstart = models.TimeField(null=True,blank=True)
    breakend = models.TimeField(null=True,blank=True)
    appointmnetduration = models.CharField(null=True,blank=True,max_length=100)

    # def save(self, force_insert=True, force_update=True, using=None, update_fields=None):
    # def save(self, *args, **kwargs):
    #
    #     # choices = ",".join(['{}'.format(j) for j in self.slotlist[:]])
    #     #printtype(str(st+du))
    #     super(Doctortimes, self).save()


@receiver(post_save,sender = Doctortimes)
def slots(sender, instance, **kwargs):
    def time_in_range(start, end, x):
        """Return true if x is in the range [start, end]"""
        if start <= end:
            return start <= x < end
        else:
            return start <= x or x < end

    lis =[]
    duration = instance.appointmnetduration
    instance.appointmnetduration = str(duration) + " min"
    st, et = instance.starttime, instance.endtime
    # #printdatetime.combine(time=et) - datetime.combine(time=st)
    # #printtype(st.hour),type(st.minute)

    st = timedelta(hours=st.hour, minutes=st.minute, seconds=st.second)
    startime = st
    et = timedelta(hours=et.hour, minutes=et.minute, seconds=et.second)
    timedu = instance.appointmnetduration
    d = timedu.split()
    du = timedelta(minutes=int(d[0]))
    timeslot = str(et - st)
    li = timeslot.split(':')
    # breakst = timedelta(hours=instance.breakstart.hour,minutes=instance.breakstart.minute)
    # breaket = timedelta(hours=instance.breakend.hour,minutes=instance.breakend.minute)
    lis.append(str(st))
    for i in range((int(li[0]) * 60 + int(li[1]) + int(li[2])) // int(d[0])):
        # print(st+du,instance.breakstart,instance.breakend)
        if startime == et:
            break
        # elif str(st)>str(instance.breakstart) and str(st)<str(instance.breakend):
        #      continu
        else:
            st = st + du
            s = str(st).split(':')
            timeloop = time(int(s[0]), int(s[1]))
            # print("afterloop", s, "time", timeloop)
            con = time_in_range(instance.breakstart, instance.breakend,timeloop)
            # print(con)
            if con:
                continue
            else:
                # print(st)
                lis.append(str(st))
    # print(lis)
    # for i in lis:
    #     s = i.split(':')
    #
    #     timeloop = time(int(s[0]),int(s[1]))
    #     print("afterloop", s,"time",timeloop)
    #     con =time_in_range(instance.breakstart,instance.breakend,timeloop)
    #     if con:
    #         lis.remove(i)
    print(lis)
    slots = lis
    slots = ",".join(slots)
    #printslots
    #printinstance.doctor
    up_choice = Choices.objects.create(choices=slots,doctor=instance.doctor)
    up_choice.save()
    #printup_choice

class Choices(models.Model):
    doctor = models.ForeignKey(Doctors,on_delete=models.CASCADE)
    datechoice = models.DateField(null=True, blank=True, unique=True)
    choices = models.TextField(null=True, blank=True)


class Appointmentrequest(models.Model):
    patient = models.ForeignKey(Patient,on_delete=models.SET_NULL, null=True,blank=True, related_name='appointments')
    doctor = models.ForeignKey(Doctors,on_delete=models.CASCADE)
    standardchoices = models.ForeignKey(Choices,on_delete=models.CASCADE)
    slotchoices = models.TextField(null=True, blank=True)
    # department=models.ForeignKey(Departments)
    # approvedby=models.ForeignKey(Staff, default=None)
    bookingdate = models.DateField(null=True)
    bookingtime = models.TimeField(null=True)
    # statusofappointment=models.PositiveSmallIntegerField(choices=types)

    def __str__(self):
        return self.slotchoices