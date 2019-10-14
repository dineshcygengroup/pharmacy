# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView
from .serializers import *
# Create your views here.

class billgenerate(CreateAPIView):
    serializer_class = billgenerateserializer