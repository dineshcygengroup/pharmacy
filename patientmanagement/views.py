# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render,HttpResponse
from rest_framework.generics import RetrieveUpdateDestroyAPIView,CreateAPIView,ListAPIView,ListCreateAPIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .models import Cvxcodes,Icd10problemcodes,Lioniccode,Cptcodes,Icd10pcscodes,Icdsymtomscodes,Hspccodes,Medicalcodesfordrug
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
#from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import *
from .models import *
import jwt,json
from rest_framework import status
from rest_framework import views
from rest_framework.response import Response
from django.http import JsonResponse
#from usermanagement.customerpermissionsehr import Isauthorizedonpatientsdata
from django.core.exceptions import ValidationError
from django.http import Http404
from django.shortcuts import get_object_or_404 as _get_object_or_404
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
#rom usermanagement.models import Patientpersonalinfo,Patientcontactinfo
from rest_framework.parsers import MultiPartParser, FormParser,FileUploadParser

# Create your views here.


def get_object_or_404(queryset, *filter_args, **filter_kwargs):
    """
    Same as Django's standard shortcut, but make sure to also raise 404
    if the filter_kwargs don't match the required types.
    """
    try:
        return _get_object_or_404(queryset, *filter_args, **filter_kwargs)
    except (TypeError, ValueError, ValidationError):
        raise Http404


# class Ehrlistview(ListAPIView):


class Cutomecrateview(ListCreateAPIView):
    # authentication_classes = (JSONWebTokenAuthentication,)

    #permission_classes = (Isauthorizedonpatientsdata,)

    def create(self, request, *args, **kwargs):
        #print "kkkkkk",request.data

        # #print validated_data
        # user_type=Usertypes.objects.get(days=2)
        # request.data['user_type']=user_type

        # request.data['orgnastion']=Userorganisation.objects.create(orgnastion=self.validate_orgnastion(request.data['orgnastion']))
        #request.data["orgnastion"] = request.user.orgnastion.id
        #request.data["user"] = request.user.id
        newdata = request.data
        serializer = self.get_serializer(data=newdata)

        # newdata = request.data

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # responedata={"Evaluvation parameters":serializer.data,"risk scores":b}
        # #print headers

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)




class Createvitalview(Cutomecrateview):
    # permission_classes = (Isauthorizedonpatientsdata,)

    serializer_class = vitalsserializer
    queryset = vitals.objects.all()




class Createallergiesview(Cutomecrateview):
    # permission_classes = (Isauthorizedonpatientsdata,)
    serializer_class = Allerirsserializer
    queryset = vitals.objects.all()



class CreateSocialhistoryview(Cutomecrateview):
    # permission_classes = (Isauthorizedonpatientsdata,)

    serializer_class = Socialhistoryserializer
    queryset = Socialhistory.objects.all()


class CreateFamilyhistoryview(Cutomecrateview):
    # permission_classes = (Isauthorizedonpatientsdata,)

    serializer_class = Familyhistoryserializer
    queryset = Familyhistory.objects.all()

class CreateHealthhistoryview(Cutomecrateview):

    serializer_class = Healthhistoryserializer
    queryset = Healthhistory.objects.all()





class CreateMedicationsview(Cutomecrateview):

    serializer_class = Medicationsserializer
    queryset = Medications.objects.all()



class CreateInpatientdetailsview(Cutomecrateview):

    serializer_class = Inpatientdetailsserializer
    queryset = Inpatientdetails.objects.all()


class Createtestsresultsview(Cutomecrateview):
    serializer_class = testsresultsserializer
    queryset = testsresults.objects.all()


class Createvisitreasonview(Cutomecrateview):
    serializer_class = Visitresonserializer
    queryset = Visitreson.objects.all()

class Createattachfileview(Cutomecrateview):
    parser_classes = (MultiPartParser,FileUploadParser,)
    serializer_class = Reportfilesserializer
    queryset = Reportfiles.objects.all()

class Createproceduresview(Cutomecrateview):
    serializer_class = Procedureserializer
    queryset = Procedure.objects.all()

class Createvaccineview(Cutomecrateview):
    serializer_class = Vaccinesserializer
    queryset = Vaccines.objects.all()


class Createderivativesview(Cutomecrateview):

    serializer_class = Medicationsserializer
    queryset = Medications.objects.all()

class Createnoteview(Cutomecrateview):

    serializer_class = Doctornoteserializer
    queryset = Doctornote.objects.all()


class Creategoalview(Cutomecrateview):

    serializer_class = Goalsserializer
    queryset = Goals.objects.all()

class Createsymtomsview(Cutomecrateview):

    serializer_class = Symtomesserializer
    queryset = Symtomes.objects.all()

class Createrefferalview(Cutomecrateview):

    serializer_class = Referallsserializer
    queryset = Referalls.objects.all()


class Createstatusview(Cutomecrateview):

    serializer_class = PatientStatusserializer
    queryset = PatientStatus.objects.all()


class Createproblemsview(Cutomecrateview):

    serializer_class = Patientproblemsserializer
    queryset = Patientproblems.objects.all()


class Createalertview(Cutomecrateview):

    serializer_class = PatientAllertserializer
    queryset = Alert.objects.all()


class Createlabtestdetailsview(Cutomecrateview):

    serializer_class = Inpatientdetailsserializer
    queryset = vitals.objects.all()


class CreateAmendmentsview(Cutomecrateview):

    serializer_class = Amendmentsserializer
    queryset = Amendments.objects.all()


class CreateAdvancederivativeview(Cutomecrateview):

    serializer_class = Advancederivativesserializer
    queryset = Advancederivatives.objects.all()

#Get methods fromhere om

class Customelistapiview(ListAPIView):
    lookup_field = 'patient_id'
    #permission_classes = (Isauthorizedonpatientsdata,)
    def get_queryset(self):
        patient_id = self.kwargs['patient_id']
        queryset = self.queryset.filter(patient_id=patient_id)
        return queryset

class Customevitallistapiview(ListAPIView):
    lookup_field = 'patient_id'
    #permission_classes = (Isauthorizedonpatientsdata,)
    def get_queryset(self):
        patient_id = self.kwargs['patient_id']
        queryset = self.queryset.filter(patient_id=patient_id)
        queryset = queryset[::-1]
        queryset =queryset[0:1]

        return queryset

class Getvitalview(Customevitallistapiview):
    # permission_classes = (Isauthorizedonpatientsdata,)
    queryset = vitals.objects.all()

    serializer_class = vitalsserializer

class Getvitallistview(Customelistapiview):
    # permission_classes = (Isauthorizedonpatientsdata,)
    queryset = vitals.objects.all()

    serializer_class = vitalsserializer

class Getallergiesview(Customelistapiview):
    # permission_classes = (Isauthorizedonpatientsdata,)
    queryset = Allerirs.objects.all()
    serializer_class = Allerirsserializer



class GetSocialhistoryview(Customelistapiview):
    queryset = Socialhistory.objects.all()

    serializer_class = Socialhistoryserializer


class GetFamilyhistoryview(Customelistapiview):
    queryset = Familyhistory.objects.all()

    serializer_class = Familyhistoryserializer

class GetHealthhistoryview(Customelistapiview):

    serializer_class = Healthhistoryserializer

class GetMedicationsview(Customelistapiview):
    queryset = Medications.objects.all()
    serializer_class = Medicationsserializer

class GetInpatientdetailsview(Customelistapiview):
    queryset = Inpatientdetails.objects.all()
    serializer_class = Inpatientdetailsserializer


class Gettestsresultsview(Customelistapiview):
    queryset = testsresults.objects.all()

    serializer_class = testsresultsserializer

class Getvisitreasonview(Customelistapiview):
    queryset = Visitreson.objects.all()

    serializer_class = Visitresonserializer

class Getproceduresview(Customelistapiview):

    queryset = Procedure.objects.all()
    serializer_class = Procedureserializer

class Getvaccinesview(Customelistapiview):

    queryset = Vaccines.objects.all()
    serializer_class = Vaccinesserializer

class Getnoteview(Customelistapiview):
    queryset =Doctornote.objects.all()
    serializer_class = Doctornoteserializer

class Getgoalview(Customelistapiview):
    queryset = Goals.objects.all()
    serializer_class = Goalsserializer

class Getsymtomsview(Customelistapiview):
    queryset = Symtomes.objects.all()
    serializer_class = Symtomesserializer


class Getrefferalview(Customelistapiview):
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset =Referalls.objects.all()
    serializer_class = Referallsserializer

class Getattachfileview(Customelistapiview):
    queryset = Reportfiles.objects.all()
    serializer_class = Reportfilesserializer

class Getlabtestdetailsview(Customelistapiview):
    #permission_classes = (Isauthorizedonpatientsdata,)

    serializer_class = Inpatientdetailsserializer

class Getstatusview(Customelistapiview):
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset =PatientStatus.objects.all()
    serializer_class = PatientStatusserializer

class Getproblemssview(Customelistapiview):
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset =Patientproblems.objects.all()
    serializer_class = Patientproblemsserializer

class Getalertview(Customelistapiview):
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset =PatientAllert.objects.all()
    serializer_class = PatientAllertserializer


class Getderivativesview(Customelistapiview):
    #permission_classes = (Isauthorizedonpatientsdata,)

    serializer_class = Medicationsserializer

class GetAmendmentsview(Customelistapiview):
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset = Amendments.objects.all()
    serializer_class = Amendmentsserializer


class GetAdvancederivativesview(Customelistapiview):
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset = Advancederivatives.objects.all()
    serializer_class = Advancederivativesserializer

# class CreateHealthhistoryview(CreateAPIView):
# from here on we have update and delete views

class CustomeRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    # authentication_classes = (JSONWebTokenAuthentication,)

    #permission_classes = (Isauthorizedonpatientsdata,)
    def get_object(self):
        """
        Returns the object the view is displaying.
        You may want to override this if you need to provide non-standard
        queryset lookups.  Eg if objects are referenced using multiple
        keyword arguments in the url conf.
        """
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
                'Expected view %s to be called with a URL keyword argument '
                'named "%s". Fix your URL conf, or set the `.lookup_field` '
                'attribute on the view correctly.' %
                (self.__class__.__name__, lookup_url_kwarg)
        )
        # #print lookup_url_kwarg,"lookup_url_kwarg"
        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        # #print filter_kwargs,"filter_kwargs"

        obj = get_object_or_404(queryset, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj


class RUDvitalview(CustomeRetrieveUpdateDestroyAPIView):
    # authentication_classes = (BasicAuthentication,)

    lookup_field = 'id'
    queryset = vitals.objects.all()
    serializer_class = vitalsserializer


class RUDallergiesview(CustomeRetrieveUpdateDestroyAPIView):

    lookup_field = 'id'
    queryset = Allerirs.objects.all()
    serializer_class = Allerirsserializer

class RUDSocialhistoryview(CustomeRetrieveUpdateDestroyAPIView):

    lookup_field = 'id'
    queryset = Socialhistory.objects.all()
    serializer_class = Socialhistoryserializer

class RUDFamilyhistoryview(CustomeRetrieveUpdateDestroyAPIView):

    lookup_field = 'id'
    queryset = Familyhistory.objects.all()
    serializer_class = Familyhistoryserializer

class RUDHealthhistoryview(CustomeRetrieveUpdateDestroyAPIView):

    lookup_field = 'id'
    queryset = Healthhistory.objects.all()
    serializer_class = Healthhistoryserializer



class RUDproblemssview(CustomeRetrieveUpdateDestroyAPIView):

    lookup_field = 'id'
    queryset = Patientproblems.objects.all()
    serializer_class = Patientproblemsserializer

class RUDMedicationsview(CustomeRetrieveUpdateDestroyAPIView):

    lookup_field = 'id'
    queryset = Medications.objects.all()
    serializer_class = Medicationsserializer

class RUDInpatientdetailsview(CustomeRetrieveUpdateDestroyAPIView):
    # authentication_classes = (JSONWebTokenAuthentication, )

    lookup_field = 'id'
    queryset = Inpatientdetails.objects.all()
    serializer_class = Inpatientdetailsserializer

class RUDtestsresultsview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    queryset = testsresults.objects.all()
    serializer_class = testsresultsserializer

class RUDvisitreasonview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset = Visitreson.objects.all()
    serializer_class = Visitresonserializer


class RUDproceduresview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    #permission_classes = (Isauthorizedonpatientsdata,)

    queryset = Procedure.objects.all()
    serializer_class = Procedureserializer


class RUDvaccineview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    #permission_classes = (Isauthorizedonpatientsdata,)

    queryset = Vaccines.objects.all()
    serializer_class = Vaccinesserializer

class RUDnoteview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset = Doctornote.objects.all()
    serializer_class = Doctornoteserializer


class RUDgoalview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset = Goals.objects.all()
    serializer_class = Goalsserializer


class RUDsymtomsview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset = Symtomes.objects.all()
    serializer_class = Symtomesserializer


class RUDrefferalview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset = Referalls.objects.all()
    serializer_class = Referallsserializer


class RUDattachfileview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset = Reportfiles.objects.all()
    serializer_class = Reportfilesserializer


class RUDlabtestdetailsview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset = testsresults.objects.all()
    serializer_class = Inpatientdetailsserializer

class RUDstatusview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset = PatientStatus.objects.all()
    serializer_class = PatientStatusserializer


class RUDalertview(CustomeRetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    #permission_classes = (Isauthorizedonpatientsdata,)
    queryset = PatientAllert.objects.all()
    serializer_class = PatientAllertserializer


class RUDderivativesview(CustomeRetrieveUpdateDestroyAPIView):
    #permission_classes = (Isauthorizedonpatientsdata,)

    serializer_class = Medicationsserializer

class RUDAmendmentsview(CustomeRetrieveUpdateDestroyAPIView):

    lookup_field = 'id'
    queryset = Amendments.objects.all()
    serializer_class = Amendmentsserializer


class RUDAdvancederivativesview(CustomeRetrieveUpdateDestroyAPIView):

    lookup_field = 'id'
    queryset = Advancederivatives.objects.all()
    serializer_class = Advancederivativesserializer

def homepage(request,patient_id):
    return render(request,'extend_ehr.html' ,{"patient_id":patient_id})

def ehrpatient(request):
    return render(request, 'extend_ehrpatient.html')

def manageuser(request):
    return render(request, 'extend_manageuser.html',{"orgnastion_id":request.user.orgnastion_id})

def patientpart(request,patient_id):
    return render(request, 'extend_patientparts.html',{"patient_id":patient_id})

def userprofile(request,user_id):
    return render(request, 'extend_userprofile.html',{"user_id":user_id})

def vitalsummaryview(request,pat_id):
    patient = Patient.objects.get(pat_id=pat_id)
    return render(request, 'vital-summary.html',{"patient":pat_id,"UHID":patient.UHID})

from django.core.mail import get_connection, send_mail
from django.core.mail.message import EmailMessage
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags

class Referalview(APIView):
    def post(self, request, *args, **kwargs):
        #print request.data,self.request.data.get("patient")
        # patientdata=Patientpersonalinfo.objects.get(id=self.request.data.get("patient"))

        subject, from_email, to = 'Patient referal', 'mailauthentication@cygengroup.com', self.request.data.get("doctoremail")

        html_content = render_to_string('email.html', {'user': request.user,"referedto":request.data,"client":patientdata})
        text_content =strip_tags(html_content)
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

        send_mail(
            "sample test results email",
            "sent the email but content is missing",
            'mailauthentication@cygengroup.com',
            [ self.request.data],
            fail_silently=True
        )
        return Response({"sucess":"email sent"}, status=status.HTTP_201_CREATED)


class Testshaeview(APIView):
    def post(self, request, *args, **kwargs):
        #print request.data,self.request.data.get("patient_id")
        #patientdata=Patientpersonalinfo.objects.get(id=self.request.data.get("patient_id"))

        subject, from_email, to = 'test referal', 'mailauthentication@cygengroup.com', self.request.data.get("email")

        html_content = render_to_string('lab.html', {'user': request.user,"referedto":request.data,"client":patientdata})
        text_content =strip_tags(html_content)
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

        send_mail(
            "sample test results email",
            "sent the email but content is missing",
            'mailauthentication@cygengroup.com',
            [ self.request.data],
            fail_silently=True
        )
        return Response({"sucess":"email sent"}, status=status.HTTP_201_CREATED)


class Pharmacyview(APIView):
    def post(self, request, *args, **kwargs):
        #print request.data,self.request.data.get("patient_id")
        #patientdata=Patientpersonalinfo.objects.get(id=self.request.data.get("patient_id"))

        subject, from_email, to = 'test referal', 'mailauthentication@cygengroup.com', self.request.data.get("doctoremail")

        html_content = render_to_string('pharmacy.html', {'user': request.user,"referedto":request.data,"client":patientdata})
        text_content =strip_tags(html_content)
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

        send_mail(
            "sample test results email",
            "sent the email but content is missing",
            'mailauthentication@cygengroup.com',
            [ self.request.data],
            fail_silently=True
        )
        return Response({"sucess":"email sent"}, status=status.HTTP_201_CREATED)

@csrf_exempt

def Cvxcodesview(request):

    data=list(Cvxcodes.objects.all().values())

    # data = serializers.serialize('json', qs)
    # #print data
    return JsonResponse({"data":data})
def Systomsview(request):

    data=list(Icdsymtomscodes.objects.all().values())

    return JsonResponse({"data":data})
def Problemview(request):
    # k =request.GET['next']
    key = request.GET['searchText']
    #print key
    # if key is None:
    #     return render(request,'ehr_physican.html',{"data":None})
    # else:
    # data=list(Icd10problemcodes.objects.filter().values())[:800]

    data=list(Icd10problemcodes.objects.filter(description__icontains=key).values()| Icd10problemcodes.objects.filter(code__icontains=key).values())[:50]
    #print data

    return JsonResponse({"data":data})
    # return render(request,'ehr_physican.html',{"data":data})
def Testorderview(request):
    key = request.GET['searchText']
    # data=list(Lioniccode.objects.all().values())
    data=list(Lioniccode.objects.filter(description__icontains=key).values()| Lioniccode.objects.filter(codes__icontains=key).values())[:20]

    return JsonResponse({"data":data})
def icd10Procedureview(request):
    key = request.GET['searchText']
    # data=list(Icd10pcscodes.objects.all().values())
    data=list(Icd10pcscodes.objects.filter(description__icontains=key).values()| Icd10pcscodes.objects.filter(code__icontains=key).values())[:20]

    return JsonResponse({"data":data})
def CptProcedureview(request):
    key = request.GET['searchText']
    #data=list(Cptcodes.objects.all().values())
    data=list(Cptcodes.objects.filter(description__icontains=key).values()| Cptcodes.objects.filter(coodes__icontains=key).values())[:20]

    return JsonResponse({"data":data})
def HspcsProcedureview(request):
    key = request.GET['searchText']

    #data=list(Hspccodes.objects.all().values())
    data=list(Hspccodes.objects.filter(description__icontains=key).values()| Hspccodes.objects.filter(code__icontains=key).values())[:20]

    return JsonResponse({"data":data})


def medicineview(request):
    key = request.GET['searchText']
    data=list(Medicalcodesfordrug.objects.filter(url__icontains=key).values()| Medicalcodesfordrug.objects.filter(code__icontains=key).values())[:20]
    # data=list(Medicalcodesfordrug.objects.all().values())

    return JsonResponse({"data":data})


