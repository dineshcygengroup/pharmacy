# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db import IntegrityError
from django.core.mail import send_mail
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, BaseUserManager,UserManager
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from datetime import date
from itertools import dropwhile, islice, product
from string import digits, ascii_lowercase as letters
from datetime import timedelta
# Create your models here.

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, password, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        #email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, password, **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, password, **extra_fields)


class Usertypes(models.Model):

    stafftypes = [
        (1, _("Lab Technician")),
        (2, _("Receptionist")),
        (3, _("Admin/Operational staff")),
        (4, _("Pharmacist")),
        (5, _("Nursing Staff")),
        (6, _("Physician")),
        (7, _("Patient/Customer")),
    ]
    Role_id = models.PositiveSmallIntegerField(choices=stafftypes )

    def __unicode__(self):
        return '%s' % self.get_Role_id_display()


class User(AbstractUser):
    """User model."""
    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    password = models.CharField(_('password'), max_length=128)
    is_reset = models.BooleanField(default=True)
    #user_type = models.ForeignKey(Usertypes, on_delete=models.SET_NULL, null=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    objects = UserManager()



class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, primary_key=False, unique=False, null=True)
    email = models.EmailField(_('email address'), blank=True, null=True)
    first_name = models.CharField(max_length=300)
    last_name = models.CharField(max_length=300, null=True, blank=True)
    middle_name = models.CharField(max_length=300, null=True, blank=True)
    phone = models.CharField(max_length=30)
    gender = models.CharField(max_length=30, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    user_type = models.ForeignKey(Usertypes, on_delete=models.SET_NULL, null=True)
    reset_time = models.DateTimeField(default=timezone.now)
    Qualification = models.CharField(max_length=100, null=True, blank=True)
    #
    # def __str__(self):
    #     return self.first_name


class Doctors(models.Model):
    pro = models.OneToOneField(Profile, primary_key=False, null=True,on_delete=models.CASCADE)
    doc = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    is_booked= models.CharField(max_length=4,default='no')
    speciality = models.CharField(max_length=100)
    Experience = models.CharField(max_length=100)
    Licence_number = models.CharField(max_length=100)
    # Qualification = models.CharField(max_length=100, null=True)
    #
    # def __str__(self):
    #     return self.doc.username

class Patient(models.Model):
    UHID = models.SlugField(editable=False,primary_key=True)
    doc_link = models.ManyToManyField(Doctors,null=True)
    pat = models.OneToOneField(Profile, on_delete=models.CASCADE,primary_key=False,unique=True)
    is_refered = models.BooleanField(default=False)
    occupation = models.CharField(max_length=50,null=True,blank=True )
    blood_group = models.CharField(max_length=50, null=True,blank=True )
    maritial_status = models.CharField(max_length=50, null=True,blank=True )
    ethnicity = models.CharField(max_length=50, null=True,blank=True )
    dob = models.CharField(max_length=50 ,null =True,blank=True)
    age = models.CharField(max_length=50,null=True)
    address = models.CharField(max_length=150 )
    address2 = models.CharField(max_length=150,null=True,blank=True)
    city = models.CharField(max_length=50, null=True,blank=True )
    state = models.CharField(max_length=50, null=True,blank=True )
    country = models.CharField(max_length=50,null=True,blank=True )
    zip_code=models.CharField(max_length=50,null=True,blank=True )
    emergencycontactfname = models.CharField(max_length=50, null=True, blank=True)
    emergencycontactlname = models.CharField(max_length=50, null=True, blank=True)    
    emergencycontactno =  models.CharField(max_length=50, null=True, blank=True)
    emergencyrelationship =  models.CharField(max_length=200, null=True, blank=True)
    familyDoctorName=  models.CharField(max_length=50, null=True, blank=True)
    familycontactno = models.CharField(max_length=50, null=True, blank=True)
    reason = models.CharField(max_length=300, null=True, blank=True)
    created_date = models.DateField(default=date.today(),null=True)

    def __str__(self):
        return self.UHID

    def save(self, *args, **kwargs):
        if not self.UHID:
            count = Patient.objects.all().count()+1
            count + 1
            self.UHID = "{}-00-{:08d}".format('LHMR', count)
            #printself.UHID
        super(Patient, self).save(*args, **kwargs)
# class Patient(models.Model):
#     doc_link = models.ForeignKey(Doctors,on_delete=models.CASCADE,null=True)
#     pat = models.OneToOneField(Profile, on_delete=models.CASCADE)
#     UHID = models.SlugField(editable=False,primary_key=True)
#     is_refered = models.BooleanField(default=False)
#     occupation = models.CharField(max_length=20,null=True,blank=True )
#     blood_group = models.CharField(max_length=20, null=True,blank=True )
#     maritial_status = models.CharField(max_length=20, null=True,blank=True )
#     ethnicity = models.CharField(max_length=20, null=True,blank=True )
#     dob = models.DateField(default = date.today() ,null =True)
#     age = models.CharField(max_length=50,null=True)
#     address = models.CharField(max_length=20 )
#     city = models.CharField(max_length=20, null=True,blank=True )
#     state = models.CharField(max_length=20, null=True,blank=True )
#     country = models.CharField(max_length=20,null=True,blank=True )
#     zip_code=models.CharField(max_length=20,null=True,blank=True )
    #alter_contact= models.IntegerField(max_length=10)
    #notes = models.CharField(max_length=60,null=True,blank=True )
    #guardian= models.CharField(max_length=20,null=True,blank=True )
    # def __str__(self):
    #     return '  patient is  '+self.pat.first_name
    #
    # def save(self, *args, **kwargs):
    #     if not self.UHID:
    #         count = Patient.objects.all().count() + 1
    #         count + 1
    #         self.UHID = "{}-00-{:08d}".format('LHMR', count)
    #         ##printself.uhid
    #     super(Patient, self).save(*args, **kwargs)
   #
# for t in product(map(str, count), letters, letters, digits):
#     yield "".join(t)
class Nurse(models.Model):
    pro = models.OneToOneField(Profile, primary_key=False, null=True,on_delete=models.CASCADE)
    nurse_user = models.OneToOneField(User,primary_key=True,on_delete=models.CASCADE)
    speciality = models.CharField(max_length=100)
    experience = models.CharField(max_length=100)
    licence_number = models.CharField(max_length=100)

    def __str__(self):
        return self.Nurse_user.username

class Laboratorist(models.Model):
    pro = models.OneToOneField(Profile, primary_key=False, null=True,on_delete=models.CASCADE)
    lab_user = models.OneToOneField(User,primary_key=True,on_delete=models.CASCADE)
    licence_number = models.CharField(max_length=100)


class Pharmacist(models.Model):
    pro = models.OneToOneField(Profile, primary_key=False, null=True,on_delete=models.CASCADE)
    pharma_user = models.OneToOneField(User,primary_key=True,on_delete=models.CASCADE)
    licence_number = models.CharField(max_length=100)


# class Staffdemograpic(models.Model):
#     """User model."""
#     user= models.ForeignKey(User,on_delete=models.SET_NULL, null=True,)
#     gender=models.CharField(max_length=30, null=True)
#     education=models.CharField(max_length=30, null=True)
#     licenseno=models.CharField(max_length=30, null=True)
#
# class Staffaddress(models.Model):
#     user= models.ForeignKey(User,on_delete=models.SET_NULL, null=True,)
#     adress=models.CharField(max_length=30, null=True)
#     city=models.CharField(max_length=30, null=True)
#     country=models.CharField(max_length=30, null=True)
#     state=models.CharField(max_length=30, null=True)
#     zipcode=models.IntegerField()
#     phonenumber=models.CharField(max_length=30, null=True)
#
# class Staffspeciality(models.Model):
#     user= models.ForeignKey(User,on_delete=models.SET_NULL, null=True,)
#     speciality = models.CharField(max_length=300, null=True)
#
#
#
# class Patientpersonalinfo(models.Model):
#     first_name=models.CharField(max_length=30, null=True)
#     last_name=models.CharField(max_length=30, null=True)
#     dob=models.DateField()
#     email=models.EmailField()
#     phne=models.CharField(max_length=10, null=True)
#     gender=models.CharField(max_length=30, null=True)
#     #orgnastion= models.ForeignKey(Userorganisation,on_delete=models.SET_NULL, null=True,)
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, )
#
#
# class Patientcontactinfo(models.Model):
#     patient=models.ForeignKey(Patientpersonalinfo,on_delete=models.SET_NULL, null=True,)
#     address=models.CharField(max_length=100, null=True)
#     city=models.CharField(max_length=30, null=True)
#     state=models.CharField(max_length=30, null=True)
#     country=models.CharField(max_length=30, null=True)
#     zipcode=models.CharField(max_length=30, null=True)
#     emergencycontact=models.CharField(max_length=30, null=True)
#     notes=models.CharField(max_length=100,null=True)
#
#
# class Patientprofiledetails(models.Model):
#     ethinicity = models.CharField(max_length=100, null=True)
#     occupation=models.CharField(max_length=100, null=True)
#     m_status = models.CharField(max_length=50, null=True)
#     bloodgroup=models.CharField(max_length=100, null=True)
#
#
#     #preferedlanguage=models.CharField(max_length=100, null=True)
#     patient=models.ForeignKey(Patientpersonalinfo,on_delete=models.SET_NULL, null=True,)


# class Alternatecontact(models.Model):
#     fullname=models.CharField(max_length=100, null=True)
#     contactdetails=models.CharField(max_length=100, null=True)
#     relativedby=models.CharField(max_length=100, null=True)
#     patient=models.ForeignKey(Patientpersonalinfo,on_delete=models.SET_NULL, null=True,)
#
# class File(models.Model):
#     patientphoto = models.FileField(upload_to='static/patientdocs/',blank=False, null=False)
#     patient=models.ForeignKey(Patientpersonalinfo,on_delete=models.SET_NULL, null=True,)
#
#     # timestamp = models.DateTimeField(auto_now_add=True)

class CBC(models.Model):
    attribute=models.TextField(null=False)
    referenceminvalue=models.FloatField(null=False)
    referencemaxvalue=models.FloatField(null=False)
    units=models.TextField(null=False)
    #date=models.DateTimeField(auto_now_add=True, blank=True)
    created_date=models.CharField(max_length=100,null=True,blank=True)
    patient = models.ForeignKey(Patient,on_delete=models.CASCADE)
    # amount=models.FloatField(blank=False)