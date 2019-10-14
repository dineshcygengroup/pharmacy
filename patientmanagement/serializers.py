# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.serializers import ModelSerializer
from patientmanagement.models import vitals,Inpatientdetails,illnesssymtoms,Medications,Healthhistory,testsresults,\
    Familyhistory,Socialhistory,Allerirs,Vaccines,Doctornote,Symtomes,Procedure,Reportfiles,Goals,Visitreson,Referalls,\
    PatientAllert,PatientStatus,Patientproblems,Advancederivatives,Amendments
from datetime import datetime

from django.contrib.auth.hashers import make_password

# from django.contrib.auth.models import
class Advancederivativesserializer(ModelSerializer):
    class Meta:
        model = Advancederivatives
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Advancederivatives.objects.create(**validated_data)


class Amendmentsserializer(ModelSerializer):
    class Meta:
        model = Amendments
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Amendments.objects.create(**validated_data)



class PatientAllertserializer(ModelSerializer):
    class Meta:
        model = PatientAllert
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return PatientAllert.objects.create(**validated_data)




class PatientStatusserializer(ModelSerializer):
    class Meta:
        model = PatientStatus
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return PatientStatus.objects.create(**validated_data)


class Patientproblemsserializer(ModelSerializer):
    class Meta:
        model = Patientproblems
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Patientproblems.objects.create(**validated_data)




class Referallsserializer(ModelSerializer):
    class Meta:
        model = Referalls
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Referalls.objects.create(**validated_data)





class vitalsserializer(ModelSerializer):
    class Meta:
        model = vitals
        fields = "__all__"
        # exclude = ('password',)

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return vitals.objects.create(**validated_data)



class Allerirsserializer(ModelSerializer):
    class Meta:
        model = Allerirs
        fields = "__all__"
    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Allerirs.objects.create(**validated_data)





class Socialhistoryserializer(ModelSerializer):
    class Meta:
        model = Socialhistory
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Socialhistory.objects.create(**validated_data)





class Familyhistoryserializer(ModelSerializer):
    class Meta:
        model = Familyhistory
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Familyhistory.objects.create(**validated_data)




class Healthhistoryserializer(ModelSerializer):
    class Meta:
        model = Healthhistory
        fields="__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Healthhistory.objects.create(**validated_data)




class Medicationsserializer(ModelSerializer):
    class Meta:
        model = Medications
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Medications.objects.create(**validated_data)




class Inpatientdetailsserializer(ModelSerializer):
    class Meta:
        model = Inpatientdetails
        fields = "__all__"

    def create(self, validated_data):
        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Inpatientdetails.objects.create(**validated_data)


class testsresultsserializer(ModelSerializer):
    class Meta:
        model = testsresults
        fields = "__all__"

    def create(self, validated_data):
        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return testsresults.objects.create(**validated_data)


class Vaccinesserializer(ModelSerializer):
    class Meta:
        model = Vaccines
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Vaccines.objects.create(**validated_data)


class Doctornoteserializer(ModelSerializer):
    class Meta:
        model = Doctornote
        fields = "__all__"
        # exclude = ('password',)

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Doctornote.objects.create(**validated_data)



class Symtomesserializer(ModelSerializer):
    class Meta:
        model = Symtomes
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Symtomes.objects.create(**validated_data)




class Procedureserializer(ModelSerializer):
    class Meta:
        model = Procedure
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Procedure.objects.create(**validated_data)







class Goalsserializer(ModelSerializer):
    class Meta:
        model = Goals
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Goals.objects.create(**validated_data)



class Reportfilesserializer(ModelSerializer):
    class Meta:
        model = Reportfiles
        fields="__all__"

    def create(self, validated_data):
        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Reportfiles.objects.create(**validated_data)


class Visitresonserializer(ModelSerializer):
    class Meta:
        model = Visitreson
        fields = "__all__"

    def create(self, validated_data):

        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y  Time : %H:%M:%S")
        print(type(s))
        validated_data["created_date"] = s
        return Visitreson.objects.create(**validated_data)



#
# class Inpatientdetailsserializer(ModelSerializer):
#     class Meta:
#         model = Inpatientdetails
#         fields = "__all__"
#
#
#
# class testsresultsserializer(ModelSerializer):
#     class Meta:
#         model = testsresults
#         fields = "__all__"
#
#
