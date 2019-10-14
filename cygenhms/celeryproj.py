from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from datetime import timedelta
from celery.schedules import crontab

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cygenhms.settings')

app = Celery('cygenhms',broker='amqp://localhost')


# app = Celery('tasks', backend='amqp', broker='amqp://guest:guest@localhost:5672//')
# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))


app.conf.beat_schedule = {
     'bulkdeittonormaluser': {
         'task': 'cygenhms.usermanagement.tasks.send_bulkdeittonormalusertipsemail',
         'schedule':crontab(minute=0, hour='3'),

     },
 'bulkdietandactivity': {
         'task': 'cygenhms.usermanagement.tasks.send_bulkhealthtipsemail',
         'schedule':crontab(minute=0, hour='3'),

     },
 }

app.conf.timezone = 'Asia/Kolkata'

# from __future__ import absolute_import, unicode_literals
# import os
# from celery import Celery
# from datetime import timedelta
# from celery.schedules import crontab
# from django.apps import apps
# #app.autodiscover_tasks(lambda: [n.name for n in apps.get_app_configs()])
#
# # set the default Django settings module for the 'celery' program.
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'demoproj.settings')
#
# app = Celery('demoproj',broker='amqp://localhost')
#
# # Using a string here means the worker doesn't have to serialize
# # the configuration object to child processes.
# # - namespace='CELERY' means all celery-related configuration keys
# #   should have a `CELERY_` prefix.
# #app.config_from_object('django.conf:settings', namespace='CELERY')
# app.config_from_object('django.conf:settings')
# # Load task modules from all registered Django app configs.
# # app.autodiscover_tasks()
# app.autodiscover_tasks(lambda: [n.name for n in apps.get_app_configs()])
#
# @app.task(bind=True)
# def debug_task(self):
#     print('Request: {0!r}'.format(self.request))
#
#
# app.conf.beat_schedule = {
#     'bulkdeittonormaluser': {
#         'task': 'phase_1.before_login.tasks.send_bulkdeittonormalusertipsemail',
#         'schedule':crontab(minute=0, hour='3'),
#
#     },
# 'bulkdietandactivity': {
#         'task': 'phase_1.before_login.tasks.send_bulkhealthtipsemail',
#         'schedule':crontab(minute=0, hour='3'),
#
#     },
# }
#
# app.conf.timezone = 'Asia/Kolkata'