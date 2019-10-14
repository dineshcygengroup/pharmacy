from __future__ import unicode_literals
from datetime import datetime
from django.db import models

from usermanagement.models import User, Patient
from appointments.models import Appointmentrequest

# Create your models here.


class vitals(models.Model):
    # user=models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    weight = models.FloatField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    height_inch = models.FloatField(null=True, blank=True)
    heartrate = models.FloatField(null=True, blank=True)
    temprature = models.FloatField(null=True, blank=True)
    oxisaturation = models.FloatField(null=True, blank=True)
    diastolicbp = models.FloatField(null=True, blank=True)
    systolicbp = models.FloatField(null=True, blank=True)
    glucose = models.FloatField(null=True, blank=True)
    resporitoryrate = models.FloatField(null=True, blank=True)
    bmi = models.FloatField(null=True, blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)

    created_date = models.CharField(max_length=100, null=True, blank=True)


class Allerirs(models.Model):
    # user=models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    alergytype = models.CharField(max_length=20, null=True, blank=True)
    allergien = models.CharField(max_length=80, null=True, blank=True)
    reaction = models.TextField(max_length=100, null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Socialhistory(models.Model):
    # user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    social_type = models.CharField(max_length=20, null=True, blank=True)
    description = models.TextField()
    fromwhen = models.DateField()
    updtedon = models.DateTimeField(auto_now=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Familyhistory(models.Model):
    # user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    relationtype = models.CharField(max_length=20, null=True, blank=True)
    description = models.TextField()
    notes = models.TextField()
    updtedon = models.DateTimeField(auto_now=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Alert(models.Model):
    # user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    patientalert = models.TextField()
    visiabilitytype = models.CharField(max_length=20, null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Vaccines(models.Model):
    # user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    takendate = models.DateField()
    vaccinecode = models.TextField()
    notes = models.TextField()
    v_status = models.CharField(max_length=20, null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Healthhistory(models.Model):
    # user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField()
    notes = models.TextField()
    updtedon = models.DateTimeField()
    created_date = models.CharField(max_length=100, null=True, blank=True)


class illnesssymtoms(models.Model):
    # user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    symptoncode = models.CharField(max_length=50, null=True, blank=True)
    sysmtomdescription = models.TextField()
    fromwhen = models.DateField()
    created_date = models.CharField(max_length=100, null=True, blank=True)


# class patientgoal(models.Model):

# class patientstatus(models.Model):

class testsresults(models.Model):
    # user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    testcode = models.CharField(max_length=500, null=True, blank=True)
    resultumber = models.CharField(max_length=50, null=True, blank=True)
    resultunit = models.CharField(max_length=50, null=True, blank=True)
    notes = models.TextField()
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Medications(models.Model):
    # user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    appointment = models.ForeignKey(Appointmentrequest, on_delete=models.SET_NULL, null=True, blank=True, related_name='medications')
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    medicinname = models.CharField(max_length=150, null=True, blank=True)
    doesage = models.CharField(max_length=50, null=True, blank=True)
    quantity = models.CharField(max_length=50, null=True, blank=True)
    usagedirections = models.TextField()
    refills = models.CharField(max_length=50, null=True, blank=True)
    startdate = models.DateField()
    enddate = models.DateField()
    labelofmedication = models.CharField(max_length=50, null=True, blank=True)
    notes = models.TextField()
    created_date = models.CharField(max_length=100, null=True, blank=True)


# class Notes(models.Model):

class Inpatientdetails(models.Model):
    # user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True,blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    admintdate = models.DateField()
    dischargedate = models.DateField()
    admissiontype = models.CharField(max_length=50, null=True, blank=True)
    # roomno=models.CharField(max_length=50,null=True,blank=True)
    dischargesummary = models.TextField()
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Doctornote(models.Model):
    notes = models.CharField(max_length=150, null=True, blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Symtomes(models.Model):
    icdcod = models.CharField(max_length=500, null=True, blank=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    symtomdescription = models.CharField(max_length=500, null=True, blank=True)
    fromdated = models.DateField()
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Procedure(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    procedurecodetype = models.CharField(max_length=50, null=True, blank=True)
    procedurecode = models.CharField(max_length=500, null=True, blank=True)
    procedure = models.CharField(max_length=150, null=True, blank=True)
    status = models.CharField(max_length=20, null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Goals(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.CharField(max_length=150, null=True, blank=True)
    fromdated = models.DateField()
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Reportfiles(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    filetype = models.CharField(max_length=50, null=True, blank=True)
    description = models.CharField(max_length=150, null=True, blank=True)
    source = models.FileField(upload_to='documents/', null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)
    # uploadingtowhere=


class Visitreson(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.CharField(max_length=150, null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)
    # fromdated=models.DateField()


class Patientproblems(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    problems = models.CharField(max_length=500, null=True, blank=True)
    description = models.CharField(max_length=150, null=True, blank=True)
    fromdate = models.DateField()
    created_date = models.CharField(max_length=100, null=True, blank=True)


class PatientStatus(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    healthstatus = models.CharField(max_length=150, null=True, blank=True)
    effectivedate = models.DateField()
    description = models.CharField(max_length=150, null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)


class PatientAllert(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    patientalert = models.TextField()
    visiabilitytype = models.CharField(max_length=20, null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Referalls(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    doctorname = models.CharField(max_length=50, null=True, blank=True)
    doctorcontact = models.CharField(max_length=50, null=True, blank=True)
    doctoremail = models.EmailField(null=True, blank=True)
    doctornote = models.CharField(max_length=50, null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Amendments(models.Model):
    amendmentssource = models.CharField(max_length=50, null=True)
    description = models.CharField(max_length=150, null=True)
    status = models.CharField(max_length=50, null=True)
    statusdescription = models.CharField(max_length=150, null=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)


class Advancederivatives(models.Model):
    derivatives = models.CharField(max_length=50, null=True)
    description = models.CharField(max_length=50, null=True)
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, blank=True)
    created_date = models.CharField(max_length=100, null=True, blank=True)

# medical codes


class Cvxcodes(models.Model):
    code=models.CharField(max_length=20,null=True)
    Description=models.CharField(max_length=500,null=True)

class Icd10pcscodes(models.Model):
    code=models.CharField(max_length=20,null=True)
    description=models.CharField(max_length=500,null=True)

class Cptcodes(models.Model):
    coodes=models.CharField(max_length=20,null=True)
    description=models.CharField(max_length=500,null=True)

class Lioniccode(models.Model):
    codes=models.CharField(max_length=20,null=True)
    description=models.CharField(max_length=500,null=True)

class Icd10problemcodes(models.Model):
    code=models.CharField(max_length=20,null=True)
    description=models.CharField(max_length=500,null=True)

class Hspccodes(models.Model):
    code=models.CharField(max_length=20,null=True)
    description=models.CharField(max_length=500,null=True)

class Icdsymtomscodes(models.Model):
    code=models.CharField(max_length=20,null=True)
    description=models.CharField(max_length=500,null=True)

class Medicalcodesfordrug(models.Model):
    code = models.CharField(max_length=250, null=True)
    url  = models.CharField(max_length=500, null=True)
class Cvxcodes(models.Model):
    code=models.CharField(max_length=20,null=True)
    Description=models.CharField(max_length=500,null=True)



