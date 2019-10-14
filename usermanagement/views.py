# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse
from rest_framework.decorators import permission_classes
from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView, ListAPIView,UpdateAPIView,mixins,GenericAPIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *
import jwt, json
import random
from django.utils import timezone
from rest_framework import status
from rest_framework import views
from rest_framework.views import APIView
from rest_framework.response import Response
from .customerpermissionsehr import Isauthorizedonpatientsdata, Isauthorizedtocreateuser
from django.core.exceptions import ValidationError
from django.http import Http404
from django.shortcuts import get_object_or_404 as _get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from django.contrib.auth import login, authenticate, logout
#from patientmanagement.views import Cutomecrateview as Newcutomecrateview
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.authentication import BasicAuthentication
from django.shortcuts import render,HttpResponse,HttpResponseRedirect,redirect

from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail
from django.contrib.auth import login, authenticate,logout
from django.core.cache import cache
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.contrib import messages
from usermanagement.tasks import send_password_sms,send_password_email, send_wellcom_email
from django.contrib.auth.decorators import login_required,permission_required
from usermanagement.customerpermissionsehr import Isadminpage,Isreceptionist,Isdoctor,Isnurse,Islaboratorist,Ispharma
from django.core.exceptions import PermissionDenied
from rest_framework.authentication import TokenAuthentication
# from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Create your views here.

# token = Token.objects.create(user=User)
# #print token
def get_object_or_404(queryset, *filter_args, **filter_kwargs):
    """
    Same as Django's standard shortcut, but make sure to also raise 404
    if the filter_kwargs don't match the required types.
    """
    try:
        return _get_object_or_404(queryset, *filter_args, **filter_kwargs)
    except (TypeError, ValueError, ValidationError):
        raise Http404
#


def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None

def permission_req(perm,request,view):
    view =None

    obj = perm.has_permission(request,view)

    if obj==True:
        return True
    else:
        raise PermissionDenied





#
# class CreateAPIView(mixins.CreateModelMixin,GenericAPIView):
#     """
#     Concrete view for creating a model instance.
#     """
#     def post(self, request, *args, **kwargs):
#
#         return self.create(request, *args, **kwargs)

# class Custom_update_delete(RetrieveUpdateDestroyAPIView):
#     def update(self, request, *args, **kwargs):
#         partial = kwargs.pop('partial', False)
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request, partial=partial)
#         #print serializer
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
#
#         if getattr(instance, '_prefetched_objects_cache', None):
#             # If 'prefetch_related' has been applied to a queryset, we need to
#             # forcibly invalidate the prefetch cache on the instance.
#             instance._prefetched_objects_cache = {}
#
#         return Response(serializer.data)
#     def put(self, request, *args, **kwargs):
#         #print request.data
#         newdata = request.data
#         new = newdata['doc']
#         new.pop('username')
#         #print newdata
#         # serializer_class = DoctorSerializer
#         return self.update(newdata, *args, **kwargs)
#
#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)
#

class CreateUserview(CreateAPIView):
    # permission_classes = (Isadminpage,)
    serializer_class = staffserializer

    # def validate_orgnastion(self, value):
    #     """
    #     Check that the blog post is about Django.
    #     """
    #     if Userorganisation.objects.filter(orgnastion=value).exists():
    #         raise serializers.ValidationError("organisation name already taken ")
    #     return value.lower()
    # def create(self, request, *args, **kwargs):
    #     #print request.data
    #
    #     # #print validated_data
    #     # user_type=Usertypes.objects.get(days=2)
    #     # request.data['user_type']=user_type
    #     # request.data['orgnastion']=Userorganisation.objects.create(orgnastion=self.validate_orgnastion(request.data['orgnastion']))
    #     request.data["password"]=make_password(request.data["password"])
    #     newdata=request.data
    #     serializer = self.get_serializer(data=newdata)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     # responedata={"Evaluvation parameters":serializer.data,"risk scores":b}
    #     # #print headers
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

# (1, _("Lab Technician")),
# (2, _("Receptionist")),
# (3, _("Admin/Operational staff")),
# (4, _("Pharmacist")),
# (5, _("Nursing Staff")),
# (6, _("Physician")),
# (7, _("Patient/Customer")),


class createdoctorview(CreateAPIView):
    permission_classes = (Isadminpage,)
    serializer_class = DoctorSerializer


class createnurseview(CreateAPIView):
    permission_classes = (Isadminpage,)
    serializer_class = NurseSerializer

class createpharasistview(CreateAPIView):
    permission_classes = (Isadminpage,)
    serializer_class = PharmacistSerializer

class createlaboratoristview(CreateAPIView):
    permission_classes = (Isadminpage,)
    serializer_class = LaboratoristSerializer

class createreceptionistview(CreateAPIView):
    permission_classes = (Isadminpage,)
    serializer_class = staffserializer

class createpatientview(CreateAPIView):
    permission_classes = (Isreceptionist,)
    serializer_class = PatientSerializer



# def userlogin(request):
# @csrf_exempt

class Login(views.APIView):
    def post(self, request):
        if not request.data:
            return Response({'Error': "Please provide username/password"}, status="400")
        #email = request.data['email']
        # authentication_classes = [BasicAuthentication]
        username = request.data['username']
        password = request.data['password']
        try:
            # user = authenticate(email=email, password=password)
            user = authenticate(username=username, password=password)
            #print user,'lksdjsl'

        except User.DoesNotExist:
            return Response({'Error': "Invalid username/password"}, status="400")
        u = User.objects.get(username=username)
        #print u
        #if User.is_superuser:

        pro = Profile.objects.get(user=u)
        #print pro.first_name
        expire_pass = timezone.timedelta(days=3) + pro.reset_time
        # #print user.reset_time
        #print expire_pass
        if pro.reset_time > expire_pass and u.is_reset == True:
            return Response(
                json.dumps({"success": "resend","username":u.username}),
                status=209,
                content_type="application/json"
            )
        if user:

                login(request, user)
                # request.session['user']=user
                #print 'ffffffffffffffc'
                return Response(
                    json.dumps({'success': "loged in","usertype":pro.user_type_id}),
                    status=200,
                    content_type="application/json"
                )
        else:
                return Response(
                    json.dumps({'Error': "Invalid credentials"}),
                    status=404,
                    content_type="application/json"
                )

# (1, _("Lab Technician")),
# (2, _("Receptionist")),
# (3, _("Admin/Operational staff")),
# (4, _("Pharmacist")),
# (5, _("Nursing Staff")),
# (6, _("Physician")),
# (7, _("Patient/Customer")),

# cheese_blog = User.objects.get(user_type_id=1)
# #print cheese_blog
# num=Usertypes.objects.all().count()
# # usertype=Usertypes.objects.all()
# # #print usertype.Role_name
# #print
# #print num
# for i in range(num):
#     name=User.objects.all().filter(user_type_id=i)
#     #print name
#

def redirectLoginview(request,name):
    #print "loginedd"
    user = request.user
    pro = Profile.objects.get(user = user)
    userType =pro.user_type_id
    #print userType
    user_verify = request.user.is_reset
    #print user_verify,'userverify'
    if user_verify == True:
        return redirect('/resetpassword/')
    if userType == 1:
        lab = Profile.objects.all().filter(user_type_id=1)
        Lab_Technician = len(lab)
        recep = Profile.objects.all().filter(user_type_id=2)
        receptionist = len(recep)
        adm = Profile.objects.all().filter(user_type_id=3)
        admin = len(adm)
        pharm = Profile.objects.all().filter(user_type_id=4)
        Pharmacist = len(pharm)
        nurse = Profile.objects.all().filter(user_type_id=5)
        Nurses = len(nurse)
        phys = Profile.objects.all().filter(user_type_id=6)
        physician = len(phys)
        patient = Profile.objects.all().filter(user_type_id=7)
        Patient = len(patient)
        return render(request,"Lab_Technician.html",{'Lab_Technician':Lab_Technician,'receptionist':receptionist,'admin':admin,'Pharmacist':Pharmacist,'Nurses':Nurses,'physician':physician,'Patient':Patient})
    elif userType == 2:
        patient = Profile.objects.all().filter(user_type_id=7)
        Patient = len(patient)
        return render(request,"Receptionist.html",{'Patient':Patient})
    elif userType == 3:
        lab = Profile.objects.all().filter(user_type_id=1)
        Lab_Technician=len(lab)
        recep = Profile.objects.all().filter(user_type_id=2)
        receptionist = len(recep)
        adm = Profile.objects.all().filter(user_type_id=3)
        admin = len(adm)
        pharm = Profile.objects.all().filter(user_type_id=4)
        Pharmacist = len(pharm)
        nurse = Profile.objects.all().filter(user_type_id=5)
        Nurses = len(nurse)
        phys = Profile.objects.all().filter(user_type_id=6)
        physician = len(phys)
        patient = Profile.objects.all().filter(user_type_id=7)
        Patient = len(patient)
        return render(request,"Admin.html",{'Lab_Technician':Lab_Technician,'receptionist':receptionist,'admin':admin,'Pharmacist':Pharmacist,'Nurses':Nurses,'physician':physician,'Patient':Patient})
    elif userType == 4:
        lab = Profile.objects.all().filter(user_type_id=1)
        Lab_Technician = len(lab)
        recep = Profile.objects.all().filter(user_type_id=2)
        receptionist = len(recep)
        adm = Profile.objects.all().filter(user_type_id=3)
        admin = len(adm)
        pharm = Profile.objects.all().filter(user_type_id=4)
        Pharmacist = len(pharm)
        nurse = Profile.objects.all().filter(user_type_id=5)
        Nurses = len(nurse)
        phys = Profile.objects.all().filter(user_type_id=6)
        physician = len(phys)
        patient = Profile.objects.all().filter(user_type_id=7)
        Patient = len(patient)
        return redirect('/hms/pharmacy/addsupplier/')
        # return render(request,"Pharmasist.html",{'Lab_Technician':Lab_Technician,'receptionist':receptionist,'admin':admin,'Pharmacist':Pharmacist,'Nurses':Nurses,'physician':physician,'Patient':Patient})
    elif userType == 5:
        lab = Profile.objects.all().filter(user_type_id=1)
        Lab_Technician = len(lab)
        recep = Profile.objects.all().filter(user_type_id=2)
        receptionist = len(recep)
        adm = Profile.objects.all().filter(user_type_id=3)
        admin = len(adm)
        pharm = Profile.objects.all().filter(user_type_id=4)
        Pharmacist = len(pharm)
        nurse = Profile.objects.all().filter(user_type_id=5)
        Nurses = len(nurse)
        phys = Profile.objects.all().filter(user_type_id=6)
        physician = len(phys)
        patient = Profile.objects.all().filter(user_type_id=7)
        Patient = len(patient)
        return render(request,"ehr_patient_list_in_nurse.html",{'Lab_Technician':Lab_Technician,'receptionist':receptionist,'admin':admin,'Pharmacist':Pharmacist,'Nurses':Nurses,'physician':physician,'Patient':Patient})
    elif userType == 6:
        lab = Profile.objects.all().filter(user_type_id=1)
        Lab_Technician = len(lab)
        recep = Profile.objects.all().filter(user_type_id=2)
        receptionist = len(recep)
        adm = Profile.objects.all().filter(user_type_id=3)
        admin = len(adm)
        pharm = Profile.objects.all().filter(user_type_id=4)
        Pharmacist = len(pharm)
        nurse = Profile.objects.all().filter(user_type_id=5)
        Nurses = len(nurse)
        phys = Profile.objects.all().filter(user_type_id=6)
        physician = len(phys)
        patient = Profile.objects.all().filter(user_type_id=7)
        Patient = len(patient)
        return render(request,"ehr_patient_list_in_physician.html",{'Lab_Technician':Lab_Technician,'receptionist':receptionist,'admin':admin,'Pharmacist':Pharmacist,'Nurses':Nurses,'physician':physician,'Patient':Patient})
    elif userType == 7:
        lab = Profile.objects.all().filter(user_type_id=1)
        Lab_Technician = len(lab)
        recep = Profile.objects.all().filter(user_type_id=2)
        receptionist = len(recep)
        adm = Profile.objects.all().filter(user_type_id=3)
        admin = len(adm)
        pharm = Profile.objects.all().filter(user_type_id=4)
        Pharmacist = len(pharm)
        nurse = Profile.objects.all().filter(user_type_id=5)
        Nurses = len(nurse)
        phys = Profile.objects.all().filter(user_type_id=6)
        physician = len(phys)
        patient = Profile.objects.all().filter(user_type_id=7)
        Patient = len(patient)
        return render(request,"Patient_Customer.html",{'Lab_Technician':Lab_Technician,'receptionist':receptionist,'admin':admin,'Pharmacist':Pharmacist,'Nurses':Nurses,'physician':physician,'Patient':Patient})
    else :
        return render(request,"login.html")
#
#
def userloginview(request):
    return render(request,"login.html")
def forgot(request):
    return render(request,'trouble_signin.html')
def resetpasswordview(request):
    return render(request, 'reset1.html')
def resendview(request,usr):
    return render(request,"resend.html",{"usr":usr})
# def usersignupview(request):
#     return render(request,"signup.html")
# def resetpasswordview(request):
#     return render(request,"forgot_password.html")
# def resetpasswordentermailview(request):
#     return render(request,"forgot_password_taking_email.html")

def physician_list_view(request):
    obj = permission_req(Isadminpage(),request,view=None)
    if obj == True:
        user = request.user
        if not request.user.is_authenticated:
            return HttpResponse('<h3>your session has expired please relogin</h3>')
        return render(request, "Physician_list.html")
def physician_list_in_receptionist_view(request):
    obj = permission_req(Isreceptionist(), request, view=None)
    if obj == True:
        return render(request, "physician_list_in_receptionist_view.html")
    else:
        return HttpResponse("not have authority")
    user = request.user
    if not request.user.is_authenticated:
        return HttpResponse('<h3>your session has expired please relogin</h3>')
    # return render(request, "physician_list_in_receptionist_view.html")

def Nurses_list_view(request):
    obj = permission_req(Isadminpage(),request,view=None)
    if obj == True:
        user = request.user
        if not request.user.is_authenticated:
            return HttpResponse('<h3>your session has expired please relogin</h3>')
        return render(request, "Nursing_Staff_list.html")
def Lab_technician_list_view(request):
    obj = permission_req(Isadminpage(),request,view=None)
    if obj == True:
        user = request.user
        if not request.user.is_authenticated:
            return HttpResponse('<h3>your session has expired please relogin</h3>')
        return render(request, "Lab_Technician_list.html")
def Pharmacist_list_view(request):
    obj = permission_req(Isadminpage(),request,view=None)
    if obj == True:
        user = request.user
        if not request.user.is_authenticated:
            return HttpResponse('<h3>your session has expired please relogin</h3>')
        return render(request, "Pharmacist_list.html")
def Receptionist_list_view(request):
    obj = permission_req(Isadminpage(),request,view=None)
    if obj == True:
        user = request.user
        if not request.user.is_authenticated:
            return HttpResponse('<h3>your session has expired please relogin</h3>')
        return render(request, "Receptionist_list.html")

# @login_required(login_url='/userlogin/')
def patient_list_view(request):
    obj = permission_req(Isreceptionist(),request,view=None)
    if obj == True:
        return render(request, "patient_list_in_receptionist.html")
    else:
        return HttpResponse("not have authority")


def patientpart(request,pat_id):
    user = request.user
    if not request.user.is_authenticated:
        return HttpResponse('<h3>your session has expired please relogin</h3>')
    return render(request, "patientparts.html",{"pat_id":pat_id})

def patient_listehr_physian_view(request):
    user = request.user
    if not request.user.is_authenticated:
        return HttpResponse('<h3>your session has expired please relogin</h3>')
    return render(request, "ehr_patient_list_in_physician.html")

def patient_listehr_nurse_view(request):
    user = request.user
    if not request.user.is_authenticated:
        return HttpResponse('<h3>your session has expired please relogin</h3>')
    return render(request, "ehr_patient_list_in_nurse.html")
# (1, _("Lab Technician")),
# (2, _("Receptionist")),
# (3, _("Admin/Operational staff")),
# (4, _("Pharmacist")),
# (5, _("Nursing Staff")),
# (6, _("Physician")),
# (7, _("Patient/Customer")),


class get_Lab_Technician_listview(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LaboratoristSerializer
    lookup_field = 'lab_user_id'
    queryset = Laboratorist.objects.all()


class get_Receptionist_listview(ListAPIView):
    permission_classes = (Isadminpage,)
    serializer_class = staffserializer
    lookup_field = 'user_type_id'
    queryset = Profile.objects.all()
    def get_queryset(self):
        queryset = self.queryset.filter(user_type_id=2)
        for i in queryset:
            print(i.id, i.email)
        return queryset


class get_Nurse_listview(ListAPIView):
    permission_classes = (Isadminpage,)
    serializer_class = NurseSerializer
    lookup_field = 'nurse_user_id'
    queryset = Nurse.objects.all()

class get_Physician_listview(ListAPIView):
    # permission_classes = (Isadminpage,)
    lookup_field = 'doc_id'
    # serializer_class = userserializer
    serializer_class = DoctorSerializer
    queryset = Doctors.objects.all()


    ##print 'rrrrr',queryset

    # def get_queryset(self):
    #     doc_id = self.kwargs['doc_id']
    #     queryset = self.queryset.filter(doc_id=self.request.user.doc_id)
    #     for i in queryset:
    #         #print i.doc.id,i.speciality
    #     return 'eeeeeeee',queryset


class get_Pharmacist_listview(ListAPIView):
    permission_classes = (Isadminpage,)
    serializer_class = PharmacistSerializer
    lookup_field = 'pharma_user_id'
    queryset = Pharmacist.objects.all()


class get_Patient_listview(ListAPIView):
    # permission_classes = (Isreceptionist,)
    serializer_class = PatientSerializer
    lookup_field = 'pat_id'
    queryset = Patient.objects.all()

class get_latestPatient_listview(ListAPIView):
    serializer_class = PatientSerializer
    lookup_field = 'pat_id'
    queryset = Patient.objects.all()

    def get_queryset(self):
        latest = date.today() - timedelta(days=7)
        #print latest,'latestttttttttt'
        d = {"created_date__gte":latest}
        #print d
        queryset = self.queryset.filter(**d)
        #print queryset
        return queryset




# def get(self, request, format=None):
        # content = {
        #     'status': 'request was permitted'
        # }
        # return Response(content)

# class Rud_Doctor_details_view(RetrieveUpdateDestroyAPIView):
#     lookup_field = 'doc_id'
#     serializer_class = DoctorSerializer
#     queryset = Doctors.objects.all()

#wiil do after complete the integration
class Rud_Patient_details_view(RetrieveUpdateDestroyAPIView):
    lookup_field = 'pat_id'
    serializer_class = PatientSerializer
    queryset = Patient.objects.all()

class Rud_doctor_details_view(RetrieveUpdateDestroyAPIView):
    lookup_field = 'doc_id'
    serializer_class = DoctoreditSerializer
    queryset = Doctors.objects.all()


class Rud_Nurse_details_view(RetrieveUpdateDestroyAPIView):
    lookup_field = 'nurse_user_id'
    serializer_class = NurseeditSerializer
    queryset = Nurse.objects.all()
#
class Rud_laboratorist_details_view(RetrieveUpdateDestroyAPIView):
    lookup_field = 'lab_user_id'
    serializer_class = LaboratoristeditSerializer
    queryset = Laboratorist.objects.all()

class Rud_Pharamasist_details_view(RetrieveUpdateDestroyAPIView):
    lookup_field = 'pharma_user_id'
    serializer_class = PharmacisteditSerializer
    queryset = Pharmacist.objects.all()

class get_Physician_Profile(RetrieveUpdateDestroyAPIView):
    # permission_classes = (Isadminpage,)
    lookup_field = 'doc_id'
    # serializer_class = userserializer
    serializer_class = DoctorSerializer
    queryset = Doctors.objects.all()

class get_nurse_profile(RetrieveUpdateDestroyAPIView):
    # permission_classes = (Isadminpage,)
    lookup_field = 'nurse_user_id'
    # serializer_class = userserializer
    serializer_class = NurseSerializer
    queryset = Nurse.objects.all()

class get_pharma_profile(RetrieveUpdateDestroyAPIView):
    # permission_classes = (Isadminpage,)
    lookup_field = 'pharma_user_id'
    # serializer_class = userserializer
    serializer_class = PharmacistSerializer
    queryset = Pharmacist.objects.all()

class get_laboratorist_profile(RetrieveUpdateDestroyAPIView):
    # permission_classes = (Isadminpage,)
    lookup_field = 'lab_user_id'
    # serializer_class = userserializer
    serializer_class = LaboratoristSerializer
    queryset = Laboratorist.objects.all()

class get_receptionist_profile(RetrieveUpdateDestroyAPIView):
    # permission_classes = (Isadminpage,)
    lookup_field = 'user_id'
    # serializer_class = userserializer
    serializer_class = staffserializer
    queryset = Profile.objects.filter(user_type=2)

# class Doctorlistview(ListAPIView):
#     permission_classes = (IsAuthenticated,)
#     serializer_class = userserializer
#     lookup_field = 'user_type_id'
#     queryset = User.objects.all()
#     def get_queryset(self):
#         orgnastion_id = self.kwargs[1]
#         queryset = self.queryset.filter(orgnastion_id=self.request.user.orgnastion_id)
#         #print queryset,orgnastion_id
#         for i in queryset:
#             #print i.id,i.email
#         return queryset

# class get_Patient_listview(ListAPIView):
#     permission_classes = (IsAuthenticated,)
#     serializer_class = PatientSerializer
#     lookup_field = 'pat_id'
#     queryset = Patient.objects.all()

class RUDpatientdetailsview(RetrieveUpdateDestroyAPIView):

    lookup_field = 'pat_id'
    # lookup_url_kwarg = "UHID"
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    # def get_queryset(self):
    #     #print 'enter 1'
    #     patient_code = self.kwargs.get(self.lookup_url_kwarg)
    #     patient = Patient.objects.get(UHID=patient_code)
    #     # filter_kwargs = {id : self.lookup_url_kwarg,}
    #     queryset = Profile.objects.get(id=patient.pat_id)
    #     return queryset
    # def get(self, request, *args, **kwargs):
    #     # user = request.user.id
    #     # queryset = self.filter_queryset(self.get_queryset())
    #     # #print 'eee',request.data
    #     #print 'dddd'
    #     profile = self.get_queryset()
    #     #print profile, 'question'
    #     queryset = Patient.objects.filter(pat=profile)
    #     #print queryset, 'ttt'
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)
    #

def patientpartview(request,pat_id):
    #print 'kkkkkkkk', pat_id

    obj = permission_req(Isreceptionist() , request, view=None)
    if obj == True:
        return render(request, 'patientparts.html',{"pat_id":pat_id})
    else:
        return HttpResponse("not have authority")
#
def lab_test_details(request,pat_id):
    #print 'lab test details', pat_id

    obj = permission_req(Islaboratorist(), request, view=None)
    if obj == True:
        return render(request, 'patientLaboratoryTestDetails.html',{"pat_id":pat_id})
    else:
        return HttpResponse("not have authority")



def healthrecordview(request,pat_id):
    #print 'kkkkkkkk',pat_id
    obj = permission_req(Isreceptionist(), request, view=None)
    if obj == True:
        patient = Patient.objects.all().filter(pat_id=pat_id)
        return render(request, '11-09.html', {"pat_id": pat_id, "patient": patient})
    else:
        return HttpResponse("not have authority")


# wiil do after integration
class ruduserview(RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = userserializer

class rudstaffview(RetrieveUpdateDestroyAPIView):
    lookup_field = 'user_id'
    queryset = Profile.objects.all()
    serializer_class = staffeditserializer
# class ruddoctor(RetrieveUpdateDestroyAPIView):
#     lookup_field = 'UHID'
#     queryset = Doctors.objects.all()
#     serializer_class = Doctoreditserializer

def patientpartphysicanview(request,pat_id):
    #print 'kkkkkkkk', pat_id
    obj = permission_req(Isdoctor(), request, view=None)
    if obj == True:
        return render(request, 'patient_part_physican.html',{"pat_id":pat_id})
    else:
        return HttpResponse("not have authority")




def healthrecordphysicanview(request,pat_id):
    #print 'kkkkkkkk', pat_id
    obj = permission_req(Isdoctor(), request, view=None)
    if obj == True:
        pat_id=pat_id
        patient = Patient.objects.get(pat_id=pat_id)
        profile = Profile.objects.get(id=pat_id)
        a = (profile.first_name + ' ' + profile.middle_name + ' ' + profile.last_name)

        return render(request, 'ehr_physican.html', {"UHID": patient.UHID, "patient": patient.UHID,"patient_name":a,"pat_id":pat_id})
    else:
        return HttpResponse("not have authority")



def patientpartnurseview(request,pat_id):
    #print 'kkkkkkkk', pat_id
    obj = permission_req(Isnurse(), request, view=None)
    if obj == True:
        return render(request, 'patient_part_nurse.html',{"pat_id":pat_id})
    else:
        return HttpResponse("not have authority")

def patientpartlaboratoristview(request,pat_id):
    #print 'kkkkkkkk', pat_id
    obj = permission_req(Islaboratorist(), request, view=None)
    if obj == True:
        return render(request, 'patient_part_laboratorist.html',{"pat_id":pat_id})
    else:
        return HttpResponse("not have authority")
#patientlaboratoristview
def patientlaboratoristview(request,pat_id):
    #print 'patientViewLabdashboard', pat_id
    obj = permission_req(Islaboratorist(), request, view=None)
    if obj == True:
        return render(request, 'patientListInLaboratorist.html',{"pat_id":pat_id})
    else:
        return HttpResponse("not have authority")

def healthrecordnurseview(request,pat_id):
    #print 'kkkkkkkk',pat_id
    obj = permission_req(Isnurse(), request, view=None)
    if obj == True:
        patient = Patient.objects.get(pat_id=pat_id)
        profile = Profile.objects.get(id=pat_id)
        a = (profile.first_name + ' ' + profile.middle_name + ' ' + profile.last_name)

        return render(request, 'ehr_nurse.html', {"UHID": patient.UHID, "patient": pat_id,"patient_name":a})
    else:
        return HttpResponse("not have authority")



def OPdrecordview(request,pat_id):
    #print 'kkkkkkkk',pat_id
    obj = permission_req(Isreceptionist(), request, view=None)
    if obj == True:
        patient = Patient.objects.get(pat_id=pat_id)
        return render(request, 'opdrecordview.html', {"UHID": patient.UHID, "patient": pat_id})
    else:
        return HttpResponse("not have authority")

class resetview(APIView):
    def post(self, request, **kwargs):
        password = request.data.get('password')
        #print password
        # #print 'ksdkk'
        #password = make_password(password)
        #print request.user.id,'lhjhjj'
        u = User.objects.get(id = request.user.id)
        #print u
        u.password=make_password(password)
        u.is_reset = False
        u.save()
        if u:
            return Response({"sucess": "changed password"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"success": "incorrect password"}, status=status.HTTP_204_NO_CONTENT)


class resendpasswordview(views.APIView):
    def post(self, request, **kwargs):

        user_name = request.data.get('username')
        #print user_name
        #password = make_password(password)
        u = User.objects.get(username = user_name)
        pro = Profile.objects.get(user=u)


        characters = string.ascii_letters + string.digits
        pasrd = "".join(random.choice(characters) for x in range(8))
        #print pasrd
        pswd = make_password(pasrd)
        u.password = pswd
        pro.reset_time = timezone.now()
        #print pro.reset_time
        mail_subject = "SUCCESSFUL REGISTRATION"
        contentmessage = render_to_string('verification_email', {
            'user': pro.first_name,
            'username': u.username,
            'userpassword': pasrd,
        })
        send_password_email.apply_async(kwargs={'subject': mail_subject, 'contentmessage': contentmessage,
                                                'sender': 'mailauthentication@cygengroup.com',
                                                'reciver': [u.email]}, queue='passwordemail')

        send_password_sms.apply_async(
            kwargs={
                'subject': 'Dear {0} ,Thank you for registering with LAMJINGBA HMS,Your Username is {1}.This Username can not be changed and hence we recommend that you save this Username for your future reference.Your login password for LAMJINGBA HMS is {2} (password change is mandatory upon first login)'.format(
                    u, u.username, pasrd),
                'mobilenumber': pro.phone},
            queue='passwordsms')
        u.save()
        pro.save()
        if u:
            return Response({"sucess": "password sent"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"success": "incorrect username"}, status=status.HTTP_204_NO_CONTENT)

# def adressview(request):
#     return render(request,'adressdropdown.html')

class logoutview(views.APIView):
    def post(self, request, **kwargs):
        # email = request.data['email']
        # user = request.user
        # username = user.username
        # password = user.password
        try:
            # user = authenticate(email=email, password=password)
            user = request.user

        except User.DoesNotExist:
            return Response({'Error': "Invalid username/password"}, status="400")

        if user:

            logout(request, user)

            return Response(
                json.dumps({'success': "loged in"}),
                status=200,
                content_type="application/json"
            )
        else:
            return Response(
                json.dumps({'Error': "Invalid credentials"}),
                status=404,
                content_type="application/json"
            )


def logoutdoview(request):
    #print "ksknksbkxbsk"
    ##print request
    #user = request.user
    logout(request)
    return redirect('/userlogin/')


class link_patient_view(RetrieveUpdateDestroyAPIView):
    lookup_field = 'UHID'
    queryset = Patient.objects.all()
    serializer_class = Patientlinkserializer

    # def get(self, request, *args, **kwargs):
    #     #print request.data,'ggjhgjhgj'
        # doc = Doctors.objects.get(doc_id=user)
        # queryset = doc.patient_set.all()
        # #print doc
        # page = self.paginate_queryset(queryset)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)
        # serializer = self.get_serializer(queryset, many=True)
        # return Response(serializer.data)

class get_patient_doctor(ListAPIView):
    lookup_field = 'pat_id'
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    def get(self, request, *args, **kwargs):
        user = request.user.id
        #print user
        doc = Doctors.objects.get(doc_id=user)
        queryset = doc.patient_set.all()
        #print doc
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

def doctor_profile_view(request,doc_id):
    #print 'doctor user id', doc_id
    
    obj = permission_req(Isadminpage(), request, view=None)
    if obj == True:
        return render(request, 'Doctor_profile.html',{"doc_id": doc_id})
    else:
        return HttpResponse("not have authority")

def nurse_profile_view(request,nurse_user_id):
    #print 'nurse user id', nurse_user_id
    
    obj = permission_req(Isadminpage(), request, view=None)
    if obj == True:
        return render(request, 'Nurse_profile.html',{"nurse_user_id": nurse_user_id})
    else:
        return HttpResponse("not have authority")

def pharma_profile_view(request,pharma_user_id):
    #print 'pharma user id', pharma_user_id
    
    obj = permission_req(Isadminpage(), request, view=None)
    if obj == True:
        return render(request, 'Pharmacist_profile.html',{"pharma_user_id": pharma_user_id})
    else:
        return HttpResponse("not have authority")

def laboratorist_profile_view(request,lab_user_id):
    #print 'laboratorist user id', lab_user_id
    
    obj = permission_req(Isadminpage(), request, view=None)
    if obj == True:
        return render(request, 'Laboratorist_profile.html',{"lab_user_id": lab_user_id})
    else:
        return HttpResponse("not have authority")

def receptionist_profile_view(request,id):
    #print 'receptionist user id', id
    
    obj = permission_req(Isadminpage(), request, view=None)
    if obj == True:
        return render(request, 'Receptionist_profile.html',{"id": id})
    else:
        return HttpResponse("not have authority")

def patientListViewInLaboratorist(request):
    obj = permission_req(Islaboratorist(), request, view=None)
    if obj == True:
        return render(request,"patientListInLaboratorist.html")
    # else:
    #     return HttpResponse("not have authority")

def patientLaboratoryTestDetailsView(request):
    obj = permission_req(Islaboratorist(), request, view=None)
    if obj == True:
        return render(request,"patientLaboratoryTestDetails.html")

class get_patient_doctor(ListAPIView):
    lookup_field = 'pat_id'
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    def get(self, request, *args, **kwargs):
        user = request.user.id
        #print user
        doc = Doctors.objects.get(doc_id=user)
        queryset = doc.patient_set.all()
        #print doc
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)




class createCBCview(CreateAPIView):
    serializer_class = CBCSerializer
    
class getCBC(ListAPIView):
    lookup_field = 'patient'
    serializer_class =CBCgetSerializer
    queryset = CBC.objects.all()
    def get_queryset(self):
        patient_id = self.kwargs['patient']
        queryset = self.queryset.filter(patient=patient_id)
        return queryset

class deleteCBCview(RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    queryset = CBC.objects.all()
    serializer_class =CBCgetSerializer

class updateCBCview(RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    queryset = CBC.objects.all()
    serializer_class =CBCeditSerializer

def appointmentview(request,UHID):
    return render(request,'appointments.html',{"UHID":UHID})

def trouble(request):
    if request.method == "POST":
        username = request.POST.get("username")
        user = get_or_none(User, username=username)
        u = User.objects.get(username=user.username)
        pro = Profile.objects.get(user=u)

        if user:
            name = pro.first_name
            current_site = get_current_site(request)
            mail_subject = 'Reset your Password.'
            message = render_to_string('reset_active.html', {
                'user': name,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.id)),
                'token': account_activation_token.make_token(user)
            })
            send_mail(
                mail_subject,
                message,
                'mailauthentication@cygengroup.com',
                [pro.email],
                fail_silently=True
            )
            return render(request, 'forgotpassword_link.html')
    return render(request, 'trouble_signin.html')


def resetview1(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        userid = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        userid = None
    if userid is not None and account_activation_token.check_token(userid, token):
        if request.method == "POST":
            new_password = request.POST.get("newpassword")
            con_password = request.POST.get("confirmpassword")
            if new_password == con_password:
                userid.password = make_password(new_password)
            else:
                return HttpResponse('Password dont match')
            userid.save()
            return render(request, 'Password_change_Success.html')
        return render(request, 'forgot_password.html')
    else:
        return HttpResponse('Password Reset link is invalid!')