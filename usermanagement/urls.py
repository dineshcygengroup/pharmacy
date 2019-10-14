from django.conf.urls import url
from . import views
from django.views.decorators.csrf import csrf_exempt

from django.views.generic.base import TemplateView
#  1 | Lab_Technician |
# |  2 | Receptionist   |
# |  3 | Nurse          |
# |  4 | Physician      |
# |  5 | Pharmacist     |
# |  7 | Admin


urlpatterns = [
    url(r'^registration/$', views.CreateUserview.as_view(), name='registration'),
    url(r'^login/$', views.Login.as_view(), name='login'),
    #url(r'^logoutedd/$', views.logoutview.as_view(), name='logoussxxst'),
    url(r'^logout/$', views.logoutdoview, name='logout'),
    url(r'^reset/$',views.resetview.as_view(),name='reset'),
    url(r'^resend/$',views.resendpasswordview.as_view(),name='resend'),
    url(r'^resendpassword/(?P<usr>[a-zA-Z0-9]+)/$',views.resendview,name='resendpass'),
    url(r'^resetpassword/$',views.resetpasswordview,name='firstreset'),
    #url(r'^forgot_password/',views.forgotview.as_view(),name= 'forgot'),
    url(r'^forgot/$',views.forgot,name= 'forgotpage'),
    url(r'^(?P<name>[a-z]+)dashboard/$', views.redirectLoginview, name='redirect'),
    #url(r'^createusertype/$', views.createusertypeview.as_view(), name='createusertypes'),
    url(r'^createdoctor/$', views.createdoctorview.as_view(), name='createdoctorview'),
    url(r'^createnurse/$', views.createnurseview.as_view(), name='createnurserview'),
    url(r'^createpharmasist/$', views.createpharasistview.as_view(), name='createpharmasist'),
    url(r'^createlaboratorist/$', views.createlaboratoristview.as_view(), name='createlaboratorist'),
    url(r'^createreceptionist/$', views.createreceptionistview.as_view(), name='createreceptionist'),
    url(r'^createpatient/$', views.createpatientview.as_view(), name='createreceptionist'),
    # url(r'^getcountuser/$', views.createlaboratoristview.as_view(), name='createpharmaview'),
    url(r'^physician_list/$', views.physician_list_view, name='physician'),
    url(r'^physician_list_view/$', views.physician_list_in_receptionist_view, name='physician'),
    url(r'^nurses_list/$', views.Nurses_list_view, name='Nurses'),
    url(r'^laboratorist_list/$', views.Lab_technician_list_view, name='laboratorist'),
    url(r'^pharmacist_list/$', views.Pharmacist_list_view, name='pharmasist'),
    url(r'^receptionist_list/$', views.Receptionist_list_view, name='receptionist'),
    url(r'^patient_list/$', views.patient_list_view, name='receptionist'),
    url(r'^ruduser/(?P<user_id>[0-9]+)/$', views.rudstaffview.as_view(), name='udpatient'),
    url(r'^rudusers_delete/(?P<id>[0-9]+)/$', views.ruduserview.as_view(), name='udpatient'),
    #url(r'^ruddoctor/(?P<pat_id>[a-z A-Z]+-[0-9]+-[0-9]+)/$',views.ruddoctor.as_view(), name='ruddoctor'),
    #url(r'^rud_Patient_for_receptionist_details/(?P<pat_id>[0-9]+)/$', views.Rud_Patient_details_view.as_view(), name='udpatient'),

    # url(r'^rud_doctor_details/(?P<doc_id>[0-9]+)/$', views.Rud_Doctor_details_view.as_view(), name='uddoctor'),
    url(r'^rud_nurse_details/(?P<nurse_user_id>[0-9]+)/$', views.Rud_Nurse_details_view.as_view(), name='udReceptionist'),
    url(r'^rud_Pharmacist_details/(?P<pharma_user_id>[0-9]+)/$', views.Rud_Pharamasist_details_view.as_view(), name='udPharmacist'),
    url(r'^rud_Laboratorist_details/(?P<lab_user_id>[0-9]+)/$', views.Rud_laboratorist_details_view.as_view(), name='udLaboratorist'),
    url(r'^update_Patient_details/(?P<pat_id>[0-9]+)/$', views.Rud_Patient_details_view.as_view(), name='updatepatient'),
    url(r'^rud_doctor_details/(?P<doc_id>[0-9]+)/$', views.Rud_doctor_details_view.as_view(), name='updatedoctor'),

    url(r'^getLabTechnicianList/$', views.get_Lab_Technician_listview.as_view(), name='Lab Technician'),
    url(r'^getReceptionistList/$', views.get_Receptionist_listview.as_view(), name='Receptionist'),
    url(r'^getNurseList/$', views.get_Nurse_listview.as_view(), name='Nurse'),
    url(r'^getdoctor/$', views.get_Physician_listview.as_view(), name='Physician'),
    url(r'^getpharmasist/$', views.get_Pharmacist_listview.as_view(), name='Pharmacist'),
    url(r'^getnurses/$', views.get_Nurse_listview.as_view(), name='Admin'),
    url(r'^getpatients/$', views.get_Patient_listview.as_view(), name='Admin'),
    url(r'getpatientslatest/$',views.get_latestPatient_listview.as_view(), name='latestpateints'),
    url(r'^getpatient/(?P<pat_id>[0-9]+)/$', views.RUDpatientdetailsview.as_view(), name='getpatient'),
    url(r'^rudpatientdetails/(?P<pat_id>[0-9]+)/$', views.RUDpatientdetailsview.as_view(), name='udpatientdetails'),
    url(r'^patient__profile/(?P<pat_id>[0-9]+)/$', views.patientpartview, name='createreceptionist'),
    
    url(r'^doctor_profile/(?P<doc_id>[0-9]+)/$', views.doctor_profile_view, name='doctorProfile'),
    url(r'^get_Physician_Profile/(?P<doc_id>[0-9]+)/$', views.get_Physician_Profile.as_view(), name='doctorProfile'),

    url(r'^nurse_profile/(?P<nurse_user_id>[0-9]+)/$', views.nurse_profile_view, name='nurseProfile'),
    url(r'^get_nurse_profile/(?P<nurse_user_id>[0-9]+)/$', views.get_nurse_profile.as_view(), name='nurseProfile'),

    url(r'^pharma_profile/(?P<pharma_user_id>[0-9]+)/$', views.pharma_profile_view, name='pharmaProfile'),
    url(r'^get_pharma_profile/(?P<pharma_user_id>[0-9]+)/$', views.get_pharma_profile.as_view(), name='pharmaProfile'),

    url(r'^laboratorist_profile/(?P<lab_user_id>[0-9]+)/$', views.laboratorist_profile_view, name='laboratoristProfile'),
    url(r'^get_laboratorist_profile/(?P<lab_user_id>[0-9]+)/$', views.get_laboratorist_profile.as_view(), name='laboratoristProfile'),

    url(r'^receptionist_profile/(?P<id>[0-9]+)/$', views.receptionist_profile_view, name='receptionistProfile'),
    url(r'^get_receptionist_profile/(?P<user_id>[0-9]+)/$', views.get_receptionist_profile.as_view(), name='receptionistProfile'),

    url(r'^healthrecordview/(?P<pat_id>[0-9]+)/$', views.healthrecordview, name='createreceptionist'),
    url(r'^physianhealthrecord/$', views.patient_listehr_physian_view, name='createphysianehr'),
    url(r'^patient_profile/(?P<pat_id>[0-9]+)/$', views.patientpartphysicanview, name='patientphysican'),
    url(r'^health_record/(?P<pat_id>[0-9]+)/$', views.healthrecordphysicanview, name='healthrecordphsican'),
    url(r'^nursehealthrecord/$', views.patient_listehr_nurse_view, name='createnurseehr'),
    url(r'^patient-profile/(?P<pat_id>[0-9]+)/$', views.patientpartnurseview, name='patientnurse'),
    url(r'^health-record/(?P<pat_id>[0-9]+)/$', views.healthrecordnurseview, name='healthrecordnurse'),
    url(r'^summary/(?P<pat_id>[0-9]+)/$', views.OPdrecordview, name='createreceptionist'),
    # url(r'^patientphoto/(?P<id>[0-9]+)/$', views.FileView.as_view(),
    #     name='creatpatientphoto'),
    url(r'^userlogin/$', views.userloginview, name='userlogin'),
    url(r'^$', views.userloginview, name='userlogin'),
    url(r'^lab_test_details/(?P<pat_id>[a-z A-Z]+-[0-9]+-[0-9]+)/$', views.lab_test_details, name='laboratory_test_details'),
    url(r'^patientListInLaboratorist/(?P<pat_id>[0-9]+)/$', views.patientlaboratoristview, name='patientlaboratory'),
    url(r'^patients_list_view_laboratorist/$', views.patientListViewInLaboratorist, name='patientListViewInLaboratorist'),
    url(r'^patient_laboratory_test_details/$', views.patientLaboratoryTestDetailsView, name='patient_laboratory_test_details'),
    url(r'^patient_profile_details/(?P<pat_id>[0-9]+)/$', views.patientpartlaboratoristview, name='patientpartlaboratorist'),

    # url(r'^usersignup/$', views.usersignupview, name='usersignup'),
    url(r'^trouble-signin/$', views.trouble, name='trouble'),
    # # url(r'^resetpasswordsettings/(?P<pk>[0-9]+)//$', views.resetpasswordsettings, name='reset'),
    # url(r'^reset-password/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     views.reset, name='reset'),
    # url(r'^$', views.index, name='index'),
    # url(r'^changepassword/$', views.ChangePasswordview.as_view(), name='changepassword'),
    # url(r'^changepasswordtemplete/$', views.changepasswordtemplate, name='changepasswordtemplate'),
    # url(r'^ruduser/(?P<id>[0-9]+)/$', views.RUDemplyeeview.as_view(), name='createallergy'),
    # url(r'^rudpersonaldetails/$', views.RUDemplyeedetailsview.as_view(), name='rudpersonaldetails'),
    # url(r'^createpatient/$', views.Createpatientview.as_view(), name='createpatient'),
    # url(r'^creatpatientdetails/$', views.Creatpatientdetailsview.as_view(), name='creatpatientdetails'),
    # url(r'^createpatientprofile/$', views.Createpatientprofileview.as_view(), name='createpatientprofile'),
    # url(r'^createpatientalternatecontact/$', views.Creatpatientalternatecontactview.as_view(),
    #     name='creatpatientalternatecontact'),
    #
    url(r'^getpatientsdoctor/$', views.get_patient_doctor.as_view(), name='getpatient'),
    # url(r'^getpatientdetails/(?P<patient_id>[0-9]+)/$', views.Getpatientdetailsview.as_view(),
    #     name='getpatientdetails'),
    # url(r'^getpatientprofile/(?P<patient_id>[0-9]+)/$', views.Getpatientprofileview.as_view(),
    #     name='getpatientprofile'),
    # url(r'^getpatientalternatecontact/(?P<patient_id>[0-9]+)/$', views.Getpatientalternatecontactview.as_view(),
    #     name='getpatientalternate'),
    #
    # url(r'^rudpatient/(?P<id>[0-9]+)/$', views.Rudpatientview.as_view(), name='udpatient'),
    # url(r'^rudpatientdetails/(?P<id>[0-9]+)/$', views.RUDpatientdetailsview.as_view(), name='udpatientdetails'),
    # url(r'^rudpatientprofile/(?P<id>[0-9]+)/$', views.Rudpatientprofileview.as_view(), name='udpatientprofile'),
    # url(r'^rudpatientalternatecontact/(?P<id>[0-9]+)/$', views.RUDpatientalternatecontactview.as_view(),
    #     name='udpatientalternatecontact'),
    # url(r'^patients/(?P<orgnastion_id>[0-9]+)/$', views.Patieantlistview.as_view(), name='patientlist'),
    #
    # url(r'^createemployeeadress/$', views.Createemployeeadress.as_view(), name='createadress'),
    # url(r'^employeeadress/(?P<user_id>[0-9]+)/$', views.Employeeadress.as_view(), name='adress'),
    #
    # url(r'^createemployeepersonal/$', views.Createemployeepersonal.as_view(), name='createpersonal'),
    # url(r'^employeepersonal/(?P<user_id>[0-9]+)/$', views.Employeepersonal.as_view(), name='personal'),
    #
    # url(r'^createemployeespeciality/$', views.Createemployeespeciality.as_view(), name='createspeciality'),
    # url(r'^employeespeciality/(?P<user_id>[0-9]+)/$', views.Employeespeciality.as_view(), name='speciality'),
    # url(r'^adress/$',views.adressview,name='adress'),
    url(r'^link_patient/(?P<UHID>[A-Z]+-00-[0-9]+)/$', views.link_patient_view.as_view(), name='receptionist'),
    url(r'^create_cbc/$', views.createCBCview.as_view(), name='createCBC'),
    url(r'^get_cbc/(?P<patient>[A-Z]+-00-[0-9]+)/$', views.getCBC.as_view(), name='getCBC'),
    url(r'^delete_cbc_labtest_data/(?P<id>[0-9]+)/$', views.deleteCBCview.as_view(), name='deletecbc'),
    url(r'^update_cbc_labtest_data/(?P<id>[0-9]+)/$', views.updateCBCview.as_view(), name='updatecbc'),
    url(r'^appointments/(?P<UHID>[A-Z]+-00-[0-9]+)/$', views.appointmentview, name='appointments'),

    # url(r'getlinkdoctors/$', views.getlinkdoctorview.as_view(), name='getdoctorpatients')
    url(r'^reset-password/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',views.resetview1, name='reset'),



]