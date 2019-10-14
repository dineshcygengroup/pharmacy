from __future__ import absolute_import, unicode_literals
from celery import Celery
from cygenhms.celeryproj import app
# from celerytest.celery import celery_app
# from celery import Celery
from celery.schedules import crontab
from django.core.mail import send_mail,send_mass_mail
import requests
import json
# from models import User
# from healthandrecords.models import Risk_sore
from datetime import date#datetime.date.today
import datetime
from django.db.models import Sum
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string

# from phase_1.profileupdates.heathandacti import bulkhealthtipsemail
import random
# app = Celery()

# @celery_app.on_after_configure.connect
# def setup_periodic_tasks(sender, **kwargs):
#     # Calls test('hello') every 10 seconds.
#     sender.add_periodic_task(10.0, test.s('hello'), name='add every 10')
#
#     # Calls test('world') every 30 seconds
#     sender.add_periodic_task(30.0, test.s('world'), expires=10)
#
#     # Executes every Monday morning at 7:30 a.m.
#     # sender.add_periodic_task(
#     #     crontab(hour=7, minute=30, day_of_week=1),
#     #     test.s('Happy Mondays!'),
#     # )

# payload = { "sender": "SOCKET", "route": "4", "country": "91",
# "sms": [
# { "message": "Message2", "to": [str(mobilenumber) ] } ] }
# payload=json.dumps(payload)
# headers = {
# 'authkey': "225056A39bSLPXl5b434284",
# 'content-type': "application/json"
# }
# r = requests.post("http://api.msg91.com/api/v2/sendsms", data = payload,headers=headers)
# print r.status_code

# @app.task()
# def send_bulktipsemail():
#     datatuple = [('subject3', 'content', 'manohar@cygengroup.com', [user.email]) for user in
#                  User.objects.all() if user.is_active]
#
#     send_mass_mail(datatuple, fail_silently=True)



@app.task()
def send_password_email(subject=None,contentmessage=None,sender=None,reciver=None):
    send_mail(
        subject,
        contentmessage,
        sender,
        reciver,
        fail_silently=True,
    )


# @app.task()
# def send_restpassword_email(subject=None,contentmessage=None,sender=None,reciver=None):
#     send_mail(
#         subject,
#         contentmessage,
#         sender,
#         reciver,
#         fail_silently=True,
#     )
#
# @app.task()
# def send_restsussuss_email(subject=None,contentmessage=None,sender=None,reciver=None):
#     send_mail(
#         subject,
#         contentmessage,
#         sender,
#         reciver,
#         fail_silently=True,
#     )
#
#
@app.task()
def send_wellcom_email(subject=None,contentmessage=None,sender=None,reciver=None):
    send_mail(
        subject,
        contentmessage,
        sender,
        reciver,
        fail_silently=True,
    )

@app.task()
def send_password_sms(mobilenumber=None,subject=None):
    payload = {"sender": "CYGENH", "route": "4", "country": "91",
              "sms": [
              {"message": subject, "to": [str(mobilenumber) ] } ] }

    payload=json.dumps(payload)
    headers = {
              'authkey': "228180AyXSxlFg935b586ff0",
              'content-type': "application/json"
              }
    requests.post("http://api.msg91.com/api/v2/sendsms", data = payload,headers=headers)
    


# @app.task
# def add(x,y):
#     # send_mail(
#     #     'Subject here12',
#     #     'Here is the message12.',
#     #     x,
#     #     [y],
#     #     fail_silently=False,
#     # )
#     print(x+y)

