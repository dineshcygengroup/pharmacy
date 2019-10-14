from django.conf.urls import url,include
from . import views

urlpatterns = [
    url(r'^appointment/$',views.appointmentslot.as_view(), name="appointment"),
    # url(r'^appointment/get/(?P<doctor_link>[0-9]+)/$',views.appointmentslotsget.as_view(), name="apppointmentget"),
    url(r'^doctoravailability/$',views.doctortimespost.as_view(), name="doctortimes"),
    # url(r'^choices/get/(?P<id>[0-9]+)/$',views.choicesview.as_view(), name="choices"),
    # url(r'^doctoravailabilty/get/(?P<id>[0-9]+)/$',views.doctortimesget.as_view(), name="doctortimes"),
    url(r'^get_appointment/get/(?P<doctor_id>[0-9]+)/$',views.getappoints, name="appointment"),
    # url(r'^appointment/put/(?P<doctor_id>[0-9]+)/$',views.update_patient_appointment.as_view(), name="appointment"),
    url(r'^get-uhid/$',views.get_all_appointment.as_view()),
    url(r'^appointment/(?P<doctor_id>[0-9]+)/$',views.appointmentchoices.as_view(), name="choices"),
    url(r'getappointtime/get/(?P<patient_id>[A-Z]+-00-[0-9]+)/$',views.getappointtime.as_view(), name='getappointtime'),
    url(r'consultfee/$',views.generatebill.as_view(), name='bill'),
    url(r'consultfee/get/(?P<patient_id>[A-Z]+-00-[0-9]+)/$',views.billget.as_view(), name='getbill'),
    url(r'consultationfee/(?P<id>[0-9]+)/$',views.consultfeeview, name='getbill'),
    url(r'billing/(?P<id>[0-9]+)/$', views.billingview, name='billinvoice'),
    # url(r'bill/$' ,views.finalbill.as_view(), name='consultbill'),

    # url(r'preview/(?P<id>[0-9]+)/$',views.billpreview, name='preview'),
    # url(r'pdf/$', views.GeneratePdf.as_view()),


]
