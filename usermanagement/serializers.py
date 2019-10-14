# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.serializers import ModelSerializer
from .models import *
# from .models import User,Usertypes,Userorganisation,Patientpersonalinfo,Patientcontactinfo,Patientprofiledetails,Alternatecontact,File,Staffaddress,\
#     Staffdemograpic,Staffspeciality
from rest_framework import serializers
from usermanagement.tasks import send_password_sms, \
    send_password_email  # send_verification_email,send_restpassword_email,send_wellcom_email,send_restsussuss_email,send_wellcom_sms,send_bulkhealthtipsemail
from django.contrib.auth.hashers import make_password
from django.template.loader import render_to_string
import string
from datetime import datetime, date
from dateutil.relativedelta import *
from rest_framework.utils import model_meta


# from django.contrib.auth.models import

###############################

def Emailsendserializer(**data):
    #print "email funcion enter",data
    mail_subject = "SUCCESSFUL REGISTRATION"
    contentmessage = render_to_string('verification_email', {
        'user': data['fname'],
        'username': data['username'],
        'userpassword': data['password'],
    })
    send_password_email.apply_async(kwargs={'subject': mail_subject, 'contentmessage': contentmessage,
                                              'sender': 'mailauthentication@cygengroup.com',
                                              'reciver': [data['email'], ]}, queue='passwordemail')

    send_password_sms.apply_async(kwargs={'subject': 'Dear {0} Thank you for registering with LAMJINGBA HMS Your Username is {1} This Username can not be changed Your password for LAMJINGBA HMS is {2} (password change is mandatory upon first login)'.format(data['fname'], data['username'], data['password']), 
                                            'mobilenumber': data['phone']}, 
                                           
                                            queue='passwordsms')
    #print "sms sent"
    return "success"

class Customserializer(ModelSerializer):

    def create_nestedseriliazer(self,user_data,pro_data, validated_data):
        data = {}
        usr = userserializer.create(userserializer(), validated_data=user_data)
        password = usr.password
        usr.password = make_password(password)
        username = usr.username

        usr.save()
        if pro_data:
            pro = profileserializer.create(profileserializer(), validated_data=pro_data)
            pro.user_id = usr.id
            pro.save()
        data['username'] = username
        data['password'] = password
        data['email'] = validated_data['email']
        ##print "kkkk", email, password
        phone_1 = validated_data['phone']
        phone_2 = phone_1.split(' ')
        data['phone'] = phone_2[1]
        data['fname'] = validated_data['first_name']
        
        
        if Emailsendserializer(**data):
            print("emailsend")
        user_type = validated_data['user_type']
        #print user_type.id

        if pro_data:
            for i in pro_data:
                validated_data.pop(i)
            #print validated_data
            if user_type.id == 1 :
                custom_update, created = Laboratorist.objects.update_or_create(lab_user=usr, pro=pro,** validated_data)
            elif user_type.id==4 :
                custom_update, created = Pharmacist.objects.update_or_create(pharma_user=usr, pro=pro, **validated_data)
            elif user_type.id == 5:
                custom_update, created = Nurse.objects.update_or_create(nurse_user=usr, pro=pro, **validated_data)
            elif user_type.id == 6:
                custom_update, created = Doctors.objects.update_or_create(doc=usr, pro=pro, **validated_data)
            elif user_type.id == 7:
                custom_update, created = Patient.objects.update_or_create(pat=pro, **validated_data)
        else:
            custom_update, created = Profile.objects.update_or_create(user=usr, **validated_data)
        custom_update.save()
        return custom_update

    def update(self, instance, validated_data):
        # #print "dess", instance.username
        info = model_meta.get_field_info(instance)

        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                field = getattr(instance, attr)
                # #print field
                field.set(value)
            else:
                setattr(instance, attr, value)

        instance.save()

        return instance


###############################
class userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username",)

    def create(self, validated_data):
        password = BaseUserManager().make_random_password(8, string.ascii_letters + string.digits)
        validated_data['password'] = password

        return User.objects.create(**validated_data)

    def get_password(self):
        #print self.pswd
        return "llkllll"

    def update(self, instance, validated_data):
        #print "dess", instance.username
        info = model_meta.get_field_info(instance)

        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                field = getattr(instance, attr)
                # #print field
                field.set(value)
            else:
                setattr(instance, attr, value)

        instance.save()

        return instance


class profileserializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = (
        "id", "gender", "email", "first_name", "middle_name", "last_name", "Qualification", "user_type", "phone")


class staffserializer(ModelSerializer):
    user = userserializer(required=True)

    class Meta:
        model = Profile
        fields = ("user", "email", "first_name", "last_name", "user_type", "gender", "Qualification" , "middle_name", "phone")

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        # #print validated_data
        user =Customserializer.create_nestedseriliazer(Customserializer(),user_data=user_data,pro_data=None,validated_data=validated_data)
        if user.user_type.id == 3:
            user.is_superuser = True
            user.save()
            #print 'ggbhbhbhb',user.is_superuser

        return user

class staffeditserializer(ModelSerializer):
    user = userserializer(read_only=True)

    class Meta:
        model = Profile
        fields = ("user","email", "first_name", "last_name", "middle_name", "phone")


    def update(self, instance, validated_data):
        # #print instance.user,"hhhhhhh"
        # user_data = validated_data.pop('user')
        # usr = userserializer.update(userserializer(), instance=instance.user)
        #instance.user = validated_data['user']  
        relationsinfo = model_meta.get_field_info(instance)
        #print validated_data
        for attr, value in validated_data.items():
            if attr in relationsinfo.relations and relationsinfo.relations[attr].to_many:
                field = getattr(instance, attr)
                # #print field
                field.set(value)
            else:
                setattr(instance, attr, value)

        instance.save()

        return instance


class DoctorSerializer(ModelSerializer):
    doc = userserializer(required=True)
    pro = profileserializer(required=True)

    class Meta:
        model = Doctors
        fields = ("doc", "pro", "speciality", "Experience", "Licence_number",)

    def create(self, validated_data):
        user_data = validated_data.pop('doc')
        pro_data = validated_data.pop('pro')
        #print validated_data
        validated_data.update(pro_data)
        #print "ds",validated_data
        object = Customserializer.create_nestedseriliazer(Customserializer(), user_data=user_data, pro_data=pro_data,
                                                         validated_data=validated_data)
        return object

class DoctoreditSerializer(ModelSerializer):
    doc = userserializer(read_only=True)
    pro = profileserializer(required=True)

    class Meta:
        model = Doctors
        fields = ("doc", "pro", "speciality", "Experience", "Licence_number",)

    def update(self, instance, validated_data):

        #print validated_data
        # user_data = validated_data.pop('doc')
        pro_data = validated_data.pop('pro')
        docproobject = Customserializer.update(Customserializer(),instance=instance.pro, validated_data=pro_data)
        docusrobject = Customserializer.update(Customserializer(),instance=instance, validated_data=validated_data)
        return instance

class patientprofileserializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ("id", "gender", "email", "first_name", "middle_name", "last_name", "user_type", "phone")


class PatientSerializer(ModelSerializer):
    pat = patientprofileserializer(required=True)

    # pat = patientuserserializer(required=True)
    class Meta:
        model = Patient
        # fields = ("UHID","pat","occupation","blood_group","maritial_status","ethnicity","age","address","city","state","country","zip_code",)
        exclude = ('is_refered', "doc_link")

    def create(self, validated_data):
        """
        Overriding the default create method of the Model serializer.
        :param validated_data: data containing all the details of student
        :return: returns a successfully created student record
        """
        # #print validated_data
        pro_data = validated_data.pop('pat')
        #print pro_data
        pro = profileserializer.create(profileserializer(), validated_data=pro_data)
        # user = patientuserserializer.create(patientuserserializer(), validated_data=user_data)
        pro.save()
        # #print u.username
        if pro.user_type.id == 7:
            dob = validated_data['dob']
            age = validated_data["age"] 
            patient_update, created = Patient.objects.update_or_create(pat=pro,**validated_data)
            patient_update.save()
            return patient_update

    def update(self, instance, validated_data):
        #print validated_data
        # user_data = validated_data.pop('doc')
        pat_data = validated_data.pop('pat')
        docproobject = Customserializer.update(Customserializer(), instance=instance.pat, validated_data=pat_data)
        docusrobject = Customserializer.update(Customserializer(), instance=instance, validated_data=validated_data)
        return instance





################################################
class NurseSerializer(ModelSerializer):
    nurse_user = userserializer(required=True)
    pro = profileserializer(required=True)

    class Meta:
        model = Nurse
        fields = ("nurse_user", "pro", "speciality", "experience", "licence_number",)

    def create(self, validated_data):
        user_data = validated_data.pop('nurse_user')
        pro_data = validated_data.pop('pro')
        #print validated_data
        validated_data.update(pro_data)
        #print "ds", validated_data
        object = Customserializer.create_nestedseriliazer(Customserializer(), user_data=user_data, pro_data=pro_data,
                                                          validated_data=validated_data)
        return object

class NurseeditSerializer(ModelSerializer):
    nurse_user = userserializer(read_only=True)
    pro = profileserializer(required=True)

    class Meta:
        model = Nurse
        fields = ("nurse_user", "pro", "speciality", "experience", "licence_number",)
    def update(self, instance, validated_data):
        #print validated_data
        # user_data = validated_data.pop('doc')
        pro_data = validated_data.pop('pro')
        docproobject = Customserializer.update(Customserializer(), instance=instance.pro, validated_data=pro_data)
        docusrobject = Customserializer.update(Customserializer(), instance=instance, validated_data=validated_data)
        return instance

#################################################


class LaboratoristSerializer(ModelSerializer):
    lab_user = userserializer(required=True)
    pro = profileserializer(required=True)

    class Meta:
        model = Laboratorist
        fields = ("lab_user", "pro", "licence_number",)

    def create(self, validated_data):
        user_data = validated_data.pop('lab_user')
        pro_data = validated_data.pop('pro')
        #print validated_data
        validated_data.update(pro_data)
        #print "ds", validated_data
        object = Customserializer.create_nestedseriliazer(Customserializer(), user_data=user_data, pro_data=pro_data,
                                                          validated_data=validated_data)
        return object
class LaboratoristeditSerializer(ModelSerializer):
    lab_user = userserializer(read_only=True)
    pro = profileserializer(required=True)

    class Meta:
        model = Laboratorist
        fields = ("lab_user", "pro", "licence_number",)

    def update(self, instance, validated_data):
        #print validated_data
        # user_data = validated_data.pop('doc')
        pro_data = validated_data.pop('pro')
        docproobject = Customserializer.update(Customserializer(), instance=instance.pro, validated_data=pro_data)
        docusrobject = Customserializer.update(Customserializer(), instance=instance, validated_data=validated_data)
        return instance




class PharmacistSerializer(ModelSerializer):
    pharma_user = userserializer(required=True)
    pro = profileserializer(required=True)

    class Meta:
        model = Pharmacist
        fields = ("pharma_user", "pro", "licence_number",)

    def create(self, validated_data):
        user_data = validated_data.pop('pharma_user')
        pro_data = validated_data.pop('pro')
        #print validated_data
        validated_data.update(pro_data)
        #print "ds", validated_data
        object = Customserializer.create_nestedseriliazer(Customserializer(), user_data=user_data, pro_data=pro_data,
                                                          validated_data=validated_data)
        return object

class PharmacisteditSerializer(ModelSerializer):
    pharma_user = userserializer(read_only=True)
    pro = profileserializer(required=True)

    class Meta:
        model = Pharmacist
        fields = ("pharma_user", "pro", "licence_number",)

    def update(self, instance, validated_data):
        #print validated_data
        # user_data = validated_data.pop('doc')
        pro_data = validated_data.pop('pro')
        docproobject = Customserializer.update(Customserializer(), instance=instance.pro, validated_data=pro_data)
        docusrobject = Customserializer.update(Customserializer(), instance=instance, validated_data=validated_data)
        return instance


class Patientlinkserializer(serializers.ModelSerializer):
    # doc_link = profileserializer(read_only=True)
    class Meta:
        model = Patient
        fields = ('UHID','doc_link')

    def update(self, instance, validated_data):
        #print 'ffffffffffffffffff',validated_data
        # #print instance.doc_link.all()
        # lis = []
        lis = instance.doc_link.all()
        #print "sedse",lis
        for i in lis:
            if i in validated_data["doc_link"]:
                continue
            else:
                validated_data['doc_link'].append(i)

        info = model_meta.get_field_info(instance)
        #print validated_data

        # Simply set each attribute on the instance, and then save it.
        # Note that unlike `.create()` we don't need to treat many-to-many
        # relationships as being a special case. During updates we already
        # have an instance pk for the relationships to be associated with.
        for attr, value in validated_data.items():
            if attr in info.relations and info.relations[attr].to_many:
                field = getattr(instance, attr)
                field.set(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        # #print validated_data
        return instance


        # return instance


class CBCSerializer(ModelSerializer):
    class Meta:
        model = CBC
        fields = ( "patient","attribute","referenceminvalue","referencemaxvalue","units","created_date")
    def create(self,validated_data):        
        a = datetime.now()
        s = a.strftime("Date : %d-%m-%Y Time : %H:%M:%S")
        #print(type(s))
        validated_data["created_date"] = s
        return CBC.objects.create(**validated_data)

class CBCgetSerializer(ModelSerializer):
    class Meta:
        model = CBC
        fields = "__all__"
        
class CBCeditSerializer(ModelSerializer):
    class Meta:
        model = CBC
        fields = ("id","attribute","referenceminvalue","referencemaxvalue","units","created_date")
       
    def update(self, instance, validated_data):
              
        a = datetime.now()
        #print a
        s = a.strftime("Date : %d-%m-%Y Time : %H:%M:%S")
        #print(type(s))
        instance.created_date=s
        instance.save()
        return instance

