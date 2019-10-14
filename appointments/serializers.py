# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.serializers import ModelSerializer
from .models import *
# from .models import User,Usertypes,Userorganisation,Patientpersonalinfo,Patientcontactinfo,Patientprofiledetails,Alternatecontact,File,Staffaddress,\
#     Staffdemograpic,Staffspeciality
from rest_framework import serializers
from usermanagement.tasks import send_password_sms, \
    send_password_email  # send_verification_email,send_restpassword_email,send_wellcom_email,send_restsussuss_email,send_wellcom_sms,send_bulkhealthtipsemail
from django.contrib.auth.hashers import make_password
from django.template.loader import render_to_string
import string
from datetime import datetime, date
from dateutil.relativedelta import *
from rest_framework.utils import model_meta
from billing.models import consultfee


class doctortimesserializer(ModelSerializer):
    class Meta:
        model = Doctortimes
        fields = ("id","starttime","endtime","breakstart","breakend","appointmnetduration","doctor","consultationfee")

class doctorgetserializer(ModelSerializer):
    class Meta:
        model = Doctortimes
        fields = ("id","starttime","endtime","appointmnetduration","doctor","consultationfee")

    def update(self, instance, validated_data):
        #print "dess", instance
        info = model_meta.get_field_info(instance)

        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                field = getattr(instance, attr)
                # print field
                field.set(value)
            else:
                setattr(instance, attr, value)

        instance.save()

        return instance


class choicesserializer(ModelSerializer):
    class Meta:
        model = Choices
        fields = "__all__"
    def get(self,doc):
        Response = Choices.objects.get(doctor = doc)
        return Response

    # def update(self, instance, validated_data):
    #     print "nnnnnnnnnnnnnnnnn"
    #     choice = validated_data["choices"]
    #     book_date = validated_data["bookingdate"]
    #     book_time = validated_data["bookingtime"]
    #
    #     print type(choice)
    #     li = choice.split(",")
    #     print li
    #     for i in li:
    #         if str(i)==str(book_time):
    #             li.remove(i)
    #     # li.remove(unicode(book[sp:ep+1],'UTF-8'))
    #     print li
    #     instance.choices =",".join(li)
    #     instance.save()
    #     return instance


class appointmentserializer(ModelSerializer):
    # standardchoices = choicesserializer(read_only=True)
    class Meta:
        model = Appointmentrequest
        fields = ("id","patient","doctor","standardchoices","bookingdate","bookingtime","slotchoices")
        # fields = '__all__'
    #
    # def create(self, validated_data):
    #     choice = choicesserializer.get(choicesserializer(),validated_data['doctor'])
    #     # print choice.choices
    #
    #     # validated_data["slotchoices"]
    #     validated_data["slotchoices"] = str(choice.choices)
    #
    #     print validated_data["slotchoices"]
    #     return Appointmentrequest.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     print "nnnnnnnnnnnnnnnnn"
    #     choice = validated_data["choices"]
    #     book_date = validated_data["bookingdate"]
    #     book_time = validated_data["bookingtime"]
    #
    #     print type(choice)
    #     li = choice.split(",")
    #     print li
    #     for i in li:
    #         if str(i)==str(book_time):
    #             li.remove(i)
    #     # li.remove(unicode(book[sp:ep+1],'UTF-8'))
    #     print li
    #     instance.choices =",".join(li)
    #     instance.save()
    #     return instance


class appointmenttimeserializer(ModelSerializer):
    class Meta:
        model = Appointmentrequest
        fields = ("patient", "doctor", "bookingdate", "bookingtime",)
#billing

class consultfeebill(ModelSerializer):
    class Meta:
        model = consultfee
        fields = ("id","patient","doctor","amount","generate_date","is_paid")


class consultfeebillget(ModelSerializer):
    class Meta:
        model = consultfee
        fields = '__all__'
class getuhidserializer(ModelSerializer):
    # standardchoices = choicesserializer(read_only=True)
    class Meta:
        model = Appointmentrequest
        fields = ("id","patient","doctor")
