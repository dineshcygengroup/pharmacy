# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.serializers import ModelSerializer
from .models import *
from datetime import datetime,date,time

class billgenerateserializer(ModelSerializer):
    class Meta:
        model = bill
        # fields = '__all__'
        exclude = ('generate_time',)
    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["generate_time"] = s
        return bill.objects.create(**validated_data)