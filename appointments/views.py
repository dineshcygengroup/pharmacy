# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.forms.models import model_to_dict
from django.shortcuts import render
from usermanagement.models import User,Patient,Profile,Doctors
from rest_framework.response import Response
from .serializers import *
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView, ListAPIView,UpdateAPIView,mixins,GenericAPIView,RetrieveAPIView,DestroyAPIView
from dateutil.relativedelta import relativedelta
from datetime import datetime,time
from django.utils.encoding import smart_bytes
from django.http import JsonResponse
import json
from billing.models import consultfee
from django.http import HttpResponse
from django.views.generic import View
from .utils import render_to_pdf

class update_patient_appointment(RetrieveUpdateDestroyAPIView):
    #print 'kkkkkkkkkkk'
    lookup_field = "doctor_id"
    serializer_class = appointmentserializer
    # 
    #queryset = Appointmentrequest.objects.all().last()


def slotsminise(book_date,book_time,sl_cho):

    v = book_time
    ty = v.split(":")
    sl = sl_cho.split(",")
    dy = datetime.strptime(book_date, '%Y-%m-%d')
    year = dy.strftime("%Y")
    month = dy.strftime("%m")
    day = dy.strftime("%d")
    date1 = datetime(int(year), int(month), int(day), int(ty[0]), int(ty[1]))
    for i in sl:

        v = i
        time2 = v.split(":")
        d2 = eval('datetime' + "({0},{1},{2},{3},{4})".format(int(year), int(month), int(day), int(time2[0]), int(time2[1])))
        if d2 == date1:
            sl.remove(i)
    # #print sl
    slotchoices = ",".join(sl)
    #print slotchoices,'llkfkdklkl'
    #print type(slotchoices)
    return slotchoices

class appointmentslot(CreateAPIView):
    serializer_class = appointmentserializer
    queryset =Appointmentrequest.objects.all()
    def create(self, request, *args, **kwargs):
        new_data= request.data
        newdata ={}
        for i in new_data:
            newdata[i] = new_data[i]
        #print newdata
        # newdata.pop('standardchoices')
        doc = newdata["doctor"]
        choices = Choices.objects.filter(doctor=doc).last()
        newdata['standardchoices'] = choices.id

        newdata["slotchoices"] =slotsminise(newdata['bookingdate'], newdata['bookingtime'], choices.choices)

        serializer = self.get_serializer(data=newdata)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # #print serializer.data
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def post(self, request, *args, **kwargs):
        newdata = request.data
        #print newdata,'wwwwwwwwwwwww'
        #print newdata['bookingdate']
        try:
            bookings = Appointmentrequest.objects.filter(bookingdate=newdata['bookingdate'],doctor =newdata["doctor"]).last()
            #print bookings.doctor
        except :
            bookings = None
        # #print bookings
        if bookings is None:
            #print 'mmmmmmmmm'
            return self.create(request,*args, **kwargs)
        else:
            #print 'ssssssssssssss'
            book_date = newdata["bookingdate"]
            book_time = newdata["bookingtime"]
            sl_cho =bookings.slotchoices
            slotchoices = slotsminise(book_date,book_time,sl_cho)
            #print slotchoices,'slots'
            newdata["slotchoices"] =slotchoices
            newdata['standardchoices'] = bookings.standardchoices.id
            #print newdata,'hhhhhhhhhhhh'
            serializer = self.get_serializer(data=newdata)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)




class appointmentslotsget(ListAPIView):
    lookup_field = 'id'
    lookup_url_kwarg = "doctor_link"
    serializer_class = appointmentserializer
    queryset = Appointmentrequest.objects.all()

class doctortimespost(CreateAPIView):
    serializer_class = doctortimesserializer

class doctortimesget(RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    serializer_class = doctorgetserializer
    queryset = Doctortimes.objects.all()
class appointment(RetrieveAPIView):
    lookup_field = "doctor_id"
    # lookup_url_kwarg = "patient_code"
    serializer_class = appointmentserializer
    #################
    #
    #queryset = Appointmentrequest.objects.all().last()
    def get_queryset(self,request):
        doctor = self.kwargs.get(self.lookup_field)
        queryset = Appointmentrequest.objects.filter(doctor=doctor,bookingdate =request.data["bookingdate"])
        return queryset
    def get(self, request, *args, **kwargs):
        #print 'eee'
        queryset = self.get_queryset(request)
        #print queryset
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

def getappoints(request,doctor_id):
    doctor =doctor_id
    bookdate = request.GET["bookingdate"]
    #print bookdate,doctor
    choices= {}
    queryset = Appointmentrequest.objects.filter(doctor_id=doctor, bookingdate=bookdate).last()
    if queryset is None:
        choice_slot=Choices.objects.filter(doctor_id=doctor).last()
        # #print choice_slot,doctor
        lis=[]
        for i in list((choice_slot.choices).split(',')):
            lis.append(i[:i.rfind(':')])
        # #print lis
        choices["choices"] = list(lis)
    else:
        #print queryset.slotchoices
        lis = []
        for i in list((queryset.slotchoices).split(',')):
            lis.append(i[:i.rfind(':')])
        #print lis
        choices["choices"] = list(lis)
    print(choices)
    # choices = json.dumps(choices)
    return JsonResponse(choices)

class get_all_appointment(ListAPIView):
    lookup_field = "doctor_id"
    serializer_class = getuhidserializer
    queryset = Appointmentrequest.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset()).values()
        lis = queryset
        for dict in lis:
            dict['UHID'] = dict.pop('patient_id')
            dict.pop('standardchoices_id')
            dict.pop('slotchoices')
            dict.pop('bookingdate')
            dict.pop('bookingtime')
            print(dict,'dict')
        return Response(lis)


class choicesview(RetrieveUpdateDestroyAPIView):
    lookup_field = "id"
    serializer_class = choicesserializer
    queryset = Choices.objects.all()

class appointmentchoices(ListAPIView,DestroyAPIView):
    lookup_field = "doctor_id"
    # lookup_url_kwarg = "patient_code"
    serializer_class = appointmentserializer
    queryset = Appointmentrequest.objects.all()
    def get(self, request, *args, **kwargs):

        date = request.GET.get("bookingdate")
        time = request.GET.get("bookingtime")
        #print( date,time,self.kwargs["doctor_id"])
        # d= self.lookup_field
        query = self.queryset.filter(doctor=self.kwargs["doctor_id"],bookingdate=date,bookingtime=time)
        #print query[0].doctor.doc_id, "doc_id"
        self.queryset=query
        #print self.queryset
        # d = model_to_dict(query)
        # get_querystring_params(d,Appointmentrequest)
        return self.list(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        date = request.GET.get("bookingdate")
        time = request.GET.get("bookingtime")
        ##print date, time, self.kwargs["doctor_id"]
        # d= self.lookup_field
        query = self.queryset.filter(doctor=self.kwargs["doctor_id"], bookingdate=date, bookingtime=time)
        self.queryset = query
        ##print self.queryset
        return self.destroy(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        data ={"patient_id":instance.patient.UHID}
        self.perform_destroy(instance)
        ##print data
        return JsonResponse(data)


class getappointtime(ListAPIView):
    lookup_field = "patient_id"
    serializer_class = appointmenttimeserializer
    queryset = Appointmentrequest.objects.all().filter(bookingdate__gte=date.today())
    def get_queryset(self):
        patient_id = self.kwargs['patient_id']
        queryset = self.queryset.filter(patient=patient_id)
        return queryset
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        lis = []
        for i in list(queryset):
            time = str(i.bookingtime)
            time1 = (time[:time.rfind(':')])
            dic = model_to_dict(i)
            dic.pop("doctor")
            dic.pop("id")
            dic.pop("slotchoices")
            dic.pop("standardchoices")
            dic["doctor_id"] = i.doctor.doc_id
            dic["doctor"] = i.doctor.pro.first_name+" "+i.doctor.pro.middle_name+" "+i.doctor.pro.last_name
            dic["bookingtime"] = time1
            lis.append(dic)

        return Response(lis)

#billing


class generatebill(CreateAPIView):
    serializer_class = consultfeebill

    def create(self, request, *args, **kwargs):
        new_data =  request.data
        ##print new_data,'ooooooooooo'
        newdata = {}
        for i in new_data:
            newdata[i] = new_data[i]
        serializer = self.get_serializer(data=newdata)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        pat_id = serializer.data['patient']
        patient = Patient.objects.filter(UHID=pat_id).last()
        rec_id = serializer.data['doctor']
        reciption = User.objects.filter(id=rec_id).last()
        recprofile = Profile.objects.filter(user_id=reciption.id).last()
        patname = patient.pat.first_name+' '+patient.pat.middle_name+' '+patient.pat.last_name
        recname = recprofile.first_name+' '+recprofile.middle_name+' '+recprofile.last_name
        headers = self.get_success_headers(serializer.data)
        data = serializer.data
        data["patient"]= patname
        data["doctor"] = recname
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)

# def finalbill(request,id):
#     rec_id = request.user.id
#     pro  = Profile.objects.get(user_id=rec_id)
#     recname = pro.first_name + ' ' + pro.middle_name + ' ' + pro.last_name
#     appoint = Appointmentrequest.objects.get(id=id)
#     pat_id = appoint.patient.pat.id





class billget(ListAPIView):
    lookup_field = 'patient_id'
    serializer_class = consultfeebillget
    queryset = consultfee.objects.all()

    def get_queryset(self):
        patient_id = self.kwargs['patient_id']
        queryset = self.queryset.filter(patient=patient_id)
        return queryset


def consultfeeview(request,id):
    rec_id = request.user.id
    pro = Profile.objects.get(user_id=rec_id)
    recname = pro.first_name+' '+pro.middle_name+' '+pro.last_name
    appoint = Appointmentrequest.objects.get(id=id)
    name = appoint.patient.pat.first_name+' '+appoint.patient.pat.middle_name+' '+appoint.patient.pat.last_name
    docname = appoint.doctor.pro.first_name+' '+appoint.doctor.pro.middle_name+' '+appoint.doctor.pro.last_name
    bookdate = appoint.bookingdate
    booktime = appoint.bookingtime
    pat_id = appoint.patient.pat.id
    uhid = appoint.patient.UHID
    doc_id = appoint.doctor.doc.id
    doc = appoint.doctor.doc.id
    docamount = Doctortimes.objects.filter(doctor_id=doc).last()
    amount = docamount.consultationfee
    fname = appoint.patient.pat.first_name
    # billid = consultfee.objects.all().last().id

    return render(request,'consult.html',{'name':name,'docname':docname,'recname':recname,'bookdate':bookdate,'booktime':booktime,
                                          'pat_id':pat_id,'doc_id':doc_id,'amount':amount,'rec_id':rec_id,'uhid':uhid,'fname':fname})







#Creating ourview, it is a

# class GeneratePdf(View):
#     def get(self, request, *args, **kwargs):
#         # getting the template
#         pdf = render_to_pdf('consult.html')
#
#         # rendering the template
#         return HttpResponse(pdf, content_type='application/pdf')

def billingview(request,id):
    rec_id = request.user.id
    ##print rec_id
    recname = User.objects.get(id=rec_id)

    pro = Profile.objects.get(user_id=rec_id)
    recname = pro.first_name+' '+pro.middle_name+' '+pro.last_name
    appoint = consultfee.objects.get(id = id)
    doc =Profile.objects.get(user_id = appoint.doctor_id)
    ##print doc.user.id,'ghkjhkjh'
    name = appoint.patient.pat.first_name + ' ' + appoint.patient.pat.middle_name + ' ' + appoint.patient.pat.last_name
    pataddr = appoint.patient.address + ' ' + appoint.patient.address2
    age = appoint.patient.age
    patid = appoint.patient_id
    contactno = appoint.patient.emergencycontactno
    billdate = appoint.generate_date
    docname = doc.first_name + ' ' + doc.middle_name + ' ' + doc.last_name
    pat_id = appoint.patient.pat.id
    docamount = Doctortimes.objects.filter(doctor_id=doc.user.id).last()
    amount = docamount.consultationfee
    appoint.is_paid = True
    appoint.save()
    # status = appoint.is_paid
    # ##print docamount.id,'docccc'
    # ##print amount,'aaaaaa'

    ##print docname,name,recname
   # context = { }
    return render(request, 'invoice.html',{'name':name,'docname':docname,'pataddr':pataddr,'age':age,'contactno': contactno,'patid': patid,'billdate':billdate,"recname":recname,"amount":amount})


