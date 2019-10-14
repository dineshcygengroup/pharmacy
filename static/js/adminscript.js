$(function () {
    var load_doctor = function () {
        get_doctor_data(function (data, status) {
            var doctor_view = ""
            console.log(data)
            if (data.length >= 0) {
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    
                    doctor_view += '<tr >';
                    doctor_view += '<td><span>' + alr.pro.first_name + ' ' + '</span><span>' + alr.pro.middle_name + ' ' + '</span><span>' + alr.pro.last_name + '</span></td>';
                    doctor_view += '<td style="display: none;" ><span>' + alr.pro.gender + '</span></td>';
                    var a = alr.pro.phone.split(" ");
                    var phon = a[1]
                    doctor_view += '<td style="display: none;" ><span>' + phon + '</span></td>';
                    doctor_view += '<td style="display: none;" ><span>' + alr.doc.username + '</span></td>';
                    doctor_view += '<td style="display: none;"><span>' + alr.pro.email + '</span></td>';
                    doctor_view += '<td><span>' + alr.speciality + '</span></td>';
                    doctor_view += '<td><span>' + alr.pro.Qualification + '</span></td>';
                    doctor_view += '<td><span>' + alr.Experience + '</span></td>';
                    doctor_view += '<td><span>' + alr.Licence_number + '</span></td>';
                    doctor_view += '<td ><a style="color: #64c1b1; " href="/doctor_profile/' + alr.doc.id + '/"class="fa fa-user-circle fa-lg" ></a></td>';
                    doctor_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.doc.id + '" class="doctoredit fa fa-pencil-square-o "></a> </td>';
                    doctor_view += '<td><a style="color: #64c1b1; ;"  href="javascript:void(0)" data-id="' + alr.doc.id + '" class="doctordelete fa fa-trash-o"></a></td>';
                    
                    doctor_view += '</tr>';
                }
                $("#myTable").html(doctor_view);
                //                var doctorDetails =[];
                //                for (var i in data){
                //                    docName=data[i]
                //                    // console.log(docName);
                //                    // console.log(docName.doc.id,docName.speciality,docName.doc.first_name,docName.doc.last_name)
                //                    doctorDetails.push(docName.doc.id+ '-'+docName.pro.first_name+ ''+ docName.pro.last_name+ '-'+ docName.speciality)
                //            }
                //            $( "#doctorNameSpeciality" ).autocomplete({
                //                    source: doctorDetails,
                //                    appendTo: "#doctorcontent"
                //                });
                var doctorDetails = [];
                doctorDetails += '<option selected disabled>' + "Select doctor" + '</option>'
                for (var i in data) {
                    docName = data[i]
                    // var doctorDetails='';
                    // console.log(docName);
                    // console.log(docName.doc.id,docName.speciality,docName.doc.first_name,docName.doc.last_name)
                    doctorDetails += '<option style="display:none">' + docName.doc.id + '</option>'
                    doctorDetails += '<option value="' + docName.doc.id + '">' + docName.pro.first_name + ' ' + docName.pro.middle_name + ' ' + docName.pro.last_name + ' ' + docName.speciality + '</option>'
                    // doctorDetails.push(docName.doc.id+ ' '+docName.doc.first_name+ ' '+ docName.doc.last_name+ ' '+ docName.speciality)

                }
                // $( "#doctorNameSpeciality" ).autocomplete({
                // source: doctorDetails,
                // appendTo: "#doctorcontent"
                // });
                $("#doctorNameSpeciality").html(doctorDetails);
            }
        });
    }
    var new_dialog = function (type, row, doctor_id) {
        var dlg = $("#doctor-form");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Create": save_doctor_data,
                "Cancel": function () {
                    dlg.dialog("close");
                }
            },
            close: function () {
                dlg.dialog("close");
            }
        };

        if (type === 'Edit') {
            get_doctor_data_for_edit(row);
            delete (config.buttons['Create']);
            config.buttons['Save'] = function () {
                edit_doctor_data(doctor_id)
                row.remove();
            };
            config.buttons['Cancel'] = function () {
                dlg.dialog("close");
                    $("#docfname").val("");
                    $("#docmname").val("");
                    $("#doclname").val("");
                    $("#doccontact").val("");
                    $("#docgender,#docgendername").val("").show();
                    $("#docemail,#docemailname").val("");
                    $("#docusername,#docusernamename").val("").show();
                    $("#docPassword,#docpasswordname").val("");
                    $("#docspeciality,#docspecialityname").val("");
                    $("#docqualification,#docqualificationname,#docqualificationnamen").val("").show();
                    $("#selectYear,#docexperience,#docexperiencenamen,#docexperiencename").val("").show();
                    $("#doclicense,#doclicensename").val("");
         };
        }
        dlg.dialog(config);
        function get_doctor_data_for_edit(row) {
            $("#docfname").val($(row.children().find('span').get(0)).text());
            $("#docmname").val($(row.children().find('span').get(1)).text());
            $("#doclname").val($(row.children().find('span').get(2)).text());
            $("#doccontact").val($(row.children().find('span').get(4)).text());
//            $("#docgender").val($(row.children().find('span').get(3)).text());
            $("#docgender,#docgendername").hide();
            $("#docemail").val($(row.children().find('span').get(6)).text());
            $("#docusername,#docusernamename").hide();
            $("#docPassword,#docpasswordname").hide();
            $("#docspeciality,#docspecialityname").val($(row.children().find('span').get(7)).text());
            var qualificationValue = $(row.children().find('span').get(8)).text();
            // alert(qualificationValue+" qualification");
//            $("#docqualification").val(qualificationValue);
            $("#docqualification,#docqualificationname,#docqualificationnamen").hide();

            // $("#docqualification").val($(row.children().find('span').get(8)).text());
            $("#docexperiencenamen,#docexperiencename").val($(row.children().find('span').get(9)).text());
            var experience = $(row.children().find('span').get(9)).text();
            var splitExperience=experience.split(" ");
            var year= splitExperience[0];
            var month= splitExperience[2];
            $("#selectYear").val(year); 
            $("#docexperience").val(month);

            $("#doclicense,#doclicensename,#docspecialityname1").val($(row.children().find('span').get(10)).text());


        }
        function edit_doctor_data(id) {
            var fname = $("#docfname").val();
            var mname = $("#docmname").val();
            var lname = $("#doclname").val();
            var countryCode = $("#docCountryCode").val();
            var contactNo = $("#doccontact").val();
            var contact = countryCode + ' ' + contactNo;
            var gender = $("#docgender").val();
            var email = $("#docemail").val();
            var username = $("#docusername").val();
            var password = $("#docPassword").val();
            var speciality = $("#docspeciality").val();
            var docQualification = $("#docqualification").val();

            if (docQualification !== null) {
                var qualification = docQualification.join();
            }
            else {
                var qualification = "";
            }

            var experiencemonth = $("#docexperience").val();
            var experienceyear = $("#selectYear").val();
            var experience = experienceyear + ' years ' + experiencemonth + ' months'
            var license = $("#doclicense").val();

            var doctor_data = {
                "doc": {
                    "id": id,
                },
                "pro": {
//                    "gender": gender,
                    "email": email,
                    "first_name": fname,
                    "middle_name": mname,
                    "phone": contact,
                    "last_name": lname,
//                    "Qualification": qualification,
                    "user_type": 6
                },
                "speciality": speciality,
                "Experience": experience,
                "Licence_number": license,

            }
            
            update_doctor(doctor_data, function (data, status) {
                if (status == "success") {
                    $("#docfname").val("");
                    $("#docmname").val("");
                    $("#doclname").val("");
                    $("#doccontact").val("");
                    $("#docgender,#docgendername").val("").show();
                    $("#docemail,#docemailname").val("");
                    $("#docusername,#docusernamename").val("").show();
                    $("#docPassword,#docpasswordname").val("");
                    $("#docspeciality,#docspecialityname").val("");
                    $("#docqualification,#docqualificationname,#docqualificationnamen").val("").show();
                    $("#selectYear,#docexperience,#docexperiencenamen,#docexperiencename").val("").show();
                    $("#doclicense,#doclicensename").val("");
                    
                    $("#successMessage").html("Availability timings created successfully")
                    load_doctor();
                    dlg.dialog("close");

                }
            });
        }

        function save_doctor_data() {

            var fname = $("#docfname").val();
            var mname = $("#docmname").val();
            var lname = $("#doclname").val();
            var countryCode = $("#docCountryCode").val();
            var contactNo = $("#doccontact").val();
            var contact = countryCode + ' ' + contactNo;
            // console.log(contact)
            var gender = $("#docgender").val();
            var email = $("#docemail").val();
            var username = $("#docusername").val();
            var speciality = $("#docspeciality").val();
            var docQualification = $("#docqualification").val();
            // alert(typeof(docQualification))
            //console.log('qualificaiton',docQualification)
            if (docQualification !== null) {
                var qualification = docQualification.join();
            }
            else {
                var qualification = "";
            }
            var experiencemonth = $("#docexperience").val();
            var experienceyear = $("#selectYear").val();
            var experience = experienceyear + ' years ' + experiencemonth + ' months'
            //console.log(experience);

            var license = $("#doclicense").val();
            // if (fname=='' || lname=='' || contactNo =='' || username =='' || email=='' || qualification =='' || speciality =='' || experience=='0 years 0 months' || license==''){
            if (fname == '') {
                $("#dialogboxDoctor1").show();
                $("#errorMsgFirstName").html('First name is mandatory');
                $("#dialogboxDoctor1").delay(4000).fadeOut();
            }
            else if (lname == '') {
                $("#dialogboxDoctor9").show();
                $("#errorMsgLastName").html('Last name is mandatory');
                $("#dialogboxDoctor9").delay(4000).fadeOut();
            }

            else if (contactNo == '') {
                $("#dialogboxDoctor2").show();
                $("#errorMsgContact").html('Contact number is mandatory');
                $("#dialogboxDoctor2").delay(4000).fadeOut();
            }
            else if (email == '') {
                $("#dialogboxDoctor8").show();
                $("#errorMsgemail").html('Email address is mandatory');
                $("#dialogboxDoctor8").delay(4000).fadeOut();
            }
            else if (username == '') {
                $("#dialogboxDoctor3").show();
                $("#errorMsgUsername").html('Username is mandatory');
                $("#dialogboxDoctor3").delay(4000).fadeOut();
            }
            else if (speciality == null) {
                // alert("speciality")
                $("#dialogboxDoctor5").show();
                $("#errorMsgSpeciality").html('Speciality is mandatory');
                $("#dialogboxDoctor5").delay(4000).fadeOut();
            }
            else if (experience == '0 years 0 months') {
                $("#dialogboxDoctor6").show();
                $("#errorMsgExperience").html('Experience is mandatory');
                $("#dialogboxDoctor6").delay(4000).fadeOut();
            }
            else if (license == '') {
                $("#dialogboxDoctor7").show();
                $("#errorMsgLicenceNumber").html('Licence number is mandatory');
                $("#dialogboxDoctor7").delay(4000).fadeOut();
            }
            else if (qualification == '') {
                $("#dialogboxDoctor4").show();
                $("#errorMsgQualification").html('Qualification is mandatory');
                $("#dialogboxDoctor4").delay(4000).fadeOut();
            }
            // }
            else {
                var doctor_data =
                {
                    "doc": {
                        "username": username,
                    },
                    "pro": {
                        "gender": gender,
                        "email": email,
                        "first_name": fname,
                        "middle_name": mname,
                        "phone": contact,
                        "last_name": lname,
                        "Qualification": qualification,
                        "user_type": 6
                    },
                    "speciality": speciality,
                    "Experience": experience,
                    "Licence_number": license,
                }

                save_doctor(doctor_data, function (data, status) {
                    if (status == "success") {
                        $("#docfname").val("");
                    $("#docmname").val("");
                    $("#doclname").val("");
                    $("#doccontact").val("");
                    $("#docgender,#docgendername").val("").show();
                    $("#docemail,#docemailname").val("");
                    $("#docusername,#docusernamename").val("").show();
                    $("#docPassword,#docpasswordname").val("");
                    $("#docspeciality,#docspecialityname").val("");
                    // $("#docqualification").val([]);
                    $("#selectYear,#docexperience,#docexperiencenamen,#docexperiencename").val("").show();
                    $("#docqualification").multiselect("clearSelection");
                    $("#docqualification").multiselect( 'refresh' );
                    $("#doclicense,#doclicensename").val(null);
                        
                        load_doctor();

                        dlg.dialog("close");
                    }
                });
            }
        }
    };


    $(document).on('click', 'a.doctordelete', function () {
        id = $(this).data('id');
        //        alert("delete ::"+id);
        delete_doctor(id, function (data, status) {
            load_doctor();
        });
        return false;
    });
    $(document).on('click', 'td a.doctoredit', function () {
        new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
        return false;
    });
    $(".doctor-adduser").button().click(new_dialog);

    load_doctor();

});
/*doctor end*/
/*Nurse*/
$(function () {
    var load_nurse = function () {
        get_nurse_data(function (data, status) {
            //console.log("********");
            var nurse_view = ""
            //console.log(data);

            //console.log(data.length);

            if (data.length >= 0) {

                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    nurse_view += '<tr >';
                    nurse_view += '<td ><span>' + alr.pro.first_name + " " + '</span><span>' + alr.pro.middle_name + " " + '</span><span>' + alr.pro.last_name + '</span></td>';

                    nurse_view += '<td style="display: none;" ><span>' + alr.pro.gender + '</span></td>';
                    var a = alr.pro.phone.split(" ");
                    var phon = a[1]

                    nurse_view += '<td style="display: none;" ><span>' + phon + '</span></td>';
                    nurse_view += '<td style="display: none;" ><span>' + alr.nurse_user.username + '</span></td>';
                    nurse_view += '<td style="display: none;"><span>' + alr.pro.email + '</span></td>';
                    nurse_view += '<td><span>' + alr.speciality + '</span></td>';
                    nurse_view += '<td><span>' + alr.pro.Qualification + '</span></td>';
                    nurse_view += '<td><span>' + alr.experience + '</span> <span>' + '</span></td>';
                    nurse_view += '<td><span>' + alr.licence_number + '</span></td>';
		    nurse_view += '<td ><a style="color: #64c1b1; " href="/nurse_profile/' + alr.nurse_user.id + '/"class="fa fa-user-circle fa-lg" ></a></td>';
                    nurse_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.nurse_user.id + '" class="nurseedit fa fa-pencil-square-o "></a> </td>';
                    nurse_view += '<td><a style="color: #64c1b1; ;"  href="javascript:void(0)" data-id="' + alr.nurse_user.id + '" class="nursedelete fa fa-trash-o"></a></td>';
                    nurse_view += '</tr>';
                }
                $("#NursesTable").html(nurse_view)
            }
        });
    }
    var new_dialog = function (type, row, nurse_id) {
        var dlg = $("#nurse-form");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Create": save_nurse_data,
                "Cancel": function () {
                    dlg.dialog("close");
                }
            },
            close: function () {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            get_nurse_data_for_edit(row);
            delete (config.buttons['Create']);

            config.buttons['Save'] = function () {
                edit_nurse_data(nurse_id)
                row.remove();
            };
            config.buttons['Cancel'] = function () {

                dlg.dialog("close");
                $("#nursefname").val("");
                $("#nursemname").val("");
                $("#nurselname").val("");
                $("#nursecontact").val("");
                $("#nursegender,#nursegendername").val("").show();
                $("#nurseemail,#nurseemailname").val("").show();
                $("#nurseusername,#nurseusernamename").val("").show();
                $("#nursespeciality,#nursespecialityname").val("").show();
                $("#selectYear, #nurseexperience,#nursequalificationnamen,#nursequalificationname").val("").show();
                $("#nurseexperiencenamen,#nurseexperiencename").val("").show();

                $("#nurselicense,#nurselicensename").val("").show();
            };
        }
        dlg.dialog(config);
        function get_nurse_data_for_edit(row) {
            $("#nursefname").val($(row.children().find('span').get(0)).text());
            $("#nursemname").val($(row.children().find('span').get(1)).text());
            $("#nurselname").val($(row.children().find('span').get(2)).text());
            $("#nursecontact").val($(row.children().find('span').get(4)).text());
//            $("#nursegender").val($(row.children().find('span').get(3)).text());
            $("#nursegender,#nursegendername").hide();

            $("#nurseemail").val($(row.children().find('span').get(6)).text());

            $("#nurseusername,#nurseusernamename").hide();
//            $("#nursequalification").val($(row.children().find('span').get(8)).text());
            $("#nursequalification,#nursequalificationname").hide();

            $("#nurseexperiencenamen,#nurseexperiencename").val($(row.children().find('span').get(9)).text());
            var experience = $(row.children().find('span').get(9)).text();
            var splitExperience=experience.split(" ");
            var year= splitExperience[0];
            var month= splitExperience[2];
            $("#selectYear").val(year);
            $("#nurseexperience").val(month);
            $("#nursespeciality,#nursespecialityname").val($(row.children().find('span').get(7)).text());
            $("#nurselicense").val($(row.children().find('span').get(11)).text());

        }
        function edit_nurse_data(nurse_id) {
            var fname = $("#nursefname").val();
            var mname = $("#nursemname").val();
            var lname = $("#nurselname").val();
            var countryCode = $("#countryCode").val();
            var contactNo = $("#nursecontact").val();
            var contact = countryCode + ' ' + contactNo;
            var gender = $("#nursegender").val();
            var email = $("#nurseemail").val();
            var username = $("#nurseusername").val();

            var speciality = $("#nursespeciality").val();
            var nursequalification = $("#nursequalification").val();
            if (nursequalification !== null) {
                var qualification = nursequalification.join();
            }
            else {
                var qualification = "";
            }
            var experiencemonth = $("#nurseexperience").val(); 
            var experienceyear = $("#selectYear").val();
            var experience = experienceyear + ' years ' + experiencemonth + ' months'

            // var experience = $("#nurseexperience").val();
            var license = $("#nurselicense").val();

            var nurse_data = {
                "nurse_user": {
                    "id": nurse_id,
                },
                "pro": {
//                    "gender": gender,
                    "email": email,
                    "first_name": fname,
                    "middle_name": mname,
                    "last_name": lname,
//                    "Qualification": qualification,
                    "user_type": 5,
                    "phone": contact,
                },
                "speciality": speciality,
                "experience": experience,
                "licence_number": license,
            }

            //console.log(nurse_data)
            update_nurse(nurse_data, function (data, status) {
                if (status == "success") {

                    $("#nursefname").val("");
                    $("#nursemname").val("");
                    $("#nurselname").val("");
                    $("#nursecontact").val("");
                    $("#nursegender,#nursegendername").val("").show();
                    $("#nurseemail").val("");
                    $("#nurseusername,#nurseusernamename").val("").show();
                    $("#nursespeciality").val("");
                    $("#nursequalification,#nursequalification").val("").show();
                    $("#selectYear, #nurseexperience,#nurseexperiencenamen,#nurseexperience").val("");
                    $("#nurselicense").val("");
                    load_nurse();
                    dlg.dialog("close");
                }
            });
        }
        function save_nurse_data() {
            var fname = $("#nursefname").val();
            var mname = $("#nursemname").val();
            var lname = $("#nurselname").val();

            var countryCode = $("#countryCode").val();

            var contactNo = $("#nursecontact").val();
            var contact = countryCode + ' ' + contactNo;
            var gender = $("#nursegender").val();
            var email = $("#nurseemail").val();
            var username = $("#nurseusername").val();
            var speciality = $("#nursespeciality").val();
            var nursequalification = $("#nursequalification").val();
            if (nursequalification !== null) {
                var qualification = nursequalification.join();
            }
            else {
                var qualification = "";
            }
            //var qualification=nursequalification.join()
            var experiencemonth = $("#nurseexperience").val();
            var experienceyear = $("#selectYear").val();
            var experience = experienceyear + ' years ' + experiencemonth + ' months'

            // var experience = $("#nurseexperience").val();
            var license = $("#nurselicense").val();
            // if (fname=='' || lname=='' || contactNo =='' ||email=='' || username =='' ||qualification =='' || speciality =='' || experience=='0 years 0 months' || license==''){
            if (fname == '') {
                $("#dialogboxNurse").show();
                $("#errorMsgFname").html('First name is mandatory');
                $("#dialogboxNurse").delay(4000).fadeOut();
            }
            else if (lname == '') {
                $("#dialogboxNurse8").show();
                $("#errorMsglname").html('Last name is mandatory');
                $("#dialogboxNurse8").delay(4000).fadeOut();
            }
            else if (contactNo == '') {
                $("#dialogboxNurse1").show();
                $("#errorMsgContact").html('Contact number is mandatory');
                $("#dialogboxNurse1").delay(4000).fadeOut();
            }
            else if (email == '') {
                $("#dialogboxNurse7").show();
                $("#errorMsgemail").html('Email address is mandatory');
                $("#dialogboxNurse7").delay(4000).fadeOut();
            }


            else if (username == '') {
                $("#dialogboxNurse2").show();
                $("#errorMsgUsername").html('Username is mandatory');
                $("#dialogboxNurse2").delay(4000).fadeOut();
            }

            else if (speciality == null) {
                $("#dialogboxNurse3").show();
                $("#errorMsgSpeciality").html('Speciality is mandatory');
                $("#dialogboxNurse3").delay(4000).fadeOut();
            }
            else if (experience == '0 years 0 months') {
                $("#dialogboxNurse4").show();
                $("#errorMsgExperience").html('Experience is mandatory');
                $("#dialogboxNurse4").delay(4000).fadeOut();
            }
            else if (license == '') {
                $("#dialogboxNurse5").show();
                $("#errorMsgLicense").html('License number is mandatory');
                $("#dialogboxNurse5").delay(4000).fadeOut();
            }
            else if (qualification == '') {
                $("#dialogboxNurse6").show();
                $("#errorMsgQualification").html('Qualification is mandatory');
                $("#dialogboxNurse6").delay(4000).fadeOut();
            }

            // }
            else {
                var nurse_data = {

                    "nurse_user": {
                        "username": username,
                    },
                    "pro": {
                        "gender": gender,
                        "email": email,
                        "first_name": fname,
                        "middle_name": mname,
                        "last_name": lname,
                        "Qualification": qualification,
                        "user_type": 5,
                        "phone": contact,
                    },
                    "speciality": speciality,
                    "experience": experience,
                    "licence_number": license,
                }

                save_nurse(nurse_data, function (data, status) {
                    if (status == "success") {
                        $("#nursefname").val("");
                        $("#nursemname").val("");
                        $("#nurselname").val("");
                        $("#nursecontact").val("");
                        $("#nursegender,#nursegender").val("").show();
                        $("#nurseemail,#nurseemailname").val("").show();
                        $("#nurseusername,#nurseusernamename").val("").show();
                        $("#nursespeciality,#nursespecialityname").val("").show();
                        $("#nursequalificationnamen,#nursequalificationname").val("").show();
                        $("#nurseexperiencenamen,#nurseexperiencename").val("").show();
                        $("#nurselicense,#nurselicensename").val("").show();
                        load_nurse();
                        dlg.dialog("close");
                    }
                });
            }
        }
    };
    $(document).on('click', 'a.nursedelete', function () {
        id = $(this).data('id');
        //        alert("delete ::"+id);
        delete_nurse(id, function (data, status) {
            load_nurse();
        });
        return false;
    });
    $(document).on('click', 'td a.nurseedit', function () {
        new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
        return false;
    });
    $(".nurse-adduser").button().click(new_dialog);

    load_nurse();

});
//pharma
$(function () {
    var load_pharma = function () {
        get_pharma_data(function (data, status) {
            var pharma_view = ""
            if (data.length >= 0) {
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    pharma_view += '<tr >';
                    pharma_view += '<td><span>' + alr.pro.first_name + " " + '</span><span> ' + alr.pro.middle_name + " " + '</span><span>' + alr.pro.last_name + '</span></td>';
                    // pharma_view += '<td style="display: none;" ><span>'+ alr.pro.last_name + '</span></td>';
                    pharma_view += '<td style="display: none;" ><span>' + alr.pro.gender + '</span></td>';
                    var a = alr.pro.phone.split(" ");
                    var phon = a[1]
                    pharma_view += '<td style="display: none;" ><span>' + phon + '</span></td>';
                    pharma_view += '<td style="display: none;" ><span>' + alr.pharma_user.username + '</span></td>';
                    pharma_view += '<td><span>' + alr.pro.email + '</span></td>';
                    //                    pharma_view += '<td><span>'+ alr.speciality + '</span></td>';
                    pharma_view += '<td><span>' + alr.pro.Qualification + '</span></td>';
                    //                    pharma_view += '<td><span>'+ alr.Experience + 'years'+'</span></td>';
                    pharma_view += '<td><span>' + alr.licence_number + '</span></td>';
		    pharma_view += '<td ><a style="color: #64c1b1; " href="/pharma_profile/' + alr.pharma_user.id + '/"class="fa fa-user-circle fa-lg" ></a></td>';
                    pharma_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.pharma_user.id + '" class="pharmaedit fa fa-pencil-square-o "></a> </td>';
                    pharma_view += '<td><a style="color: #64c1b1; ;"  href="javascript:void(0)" data-id="' + alr.pro.id + '" class="pharamadelete fa fa-trash-o"></a></td>';

                    pharma_view += '</tr>';
                }
                $("#PharmasistTable").html(pharma_view)
            }
        });
    }
    var new_dialog = function (type, row, pharma_id) {
        var dlg = $("#pharma-form");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Create": save_pharma_data,
                "Cancel": function () {
                    dlg.dialog("close");
                }
            },
            close: function () {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {
            get_pharma_data_for_edit(row);
            delete (config.buttons['Create']);
            config.buttons['Save'] = function () {
                edit_pharma_data(pharma_id)
                row.remove();
            };
            config.buttons['Cancel'] = function () {
                dlg.dialog("close");
                $("#pharmafname").val("");
                $("#pharmamname").val("");
                $("#pharmalname").val("");
                $("#pharmacontact").val("");
                $("#pharmagender,#pharmagendername").val("").show();
                $("#pharmaemail,#pharmaemailname").val("").show();
                $("#pharmausername,#pharmausernamename,#pharmausernamenamen").val("").show();
                //               $("#pharmapass,#pharmaPasswordname").val("").show();
                $("#pharmaqualificationnamen,#pharmaqualificationname").val("").show();
                $("#pharmalicense,#pharmalicensename").val("").show();
            };
        }
        dlg.dialog(config);
        function get_pharma_data_for_edit(row) {
            $("#pharmafname").val($(row.children().find('span').get(0)).text());
            $("#pharmamname").val($(row.children().find('span').get(1)).text());
            $("#pharmalname").val($(row.children().find('span').get(2)).text());
            $("#pharmacontact").val($(row.children().find('span').get(4)).text());
//            $("#pharmagender").val($(row.children().find('span').get(3)).text());
            $("#pharmagender,#pharmagendername").hide();

            $("#pharmaemail").val($(row.children().find('span').get(6)).text());
            $("#pharmausername,#pharmausernamename,#pharmausernamenamen").hide();
            $("#pharmapass,#pharmaPasswordname").hide();
//            $("#pharmaqualificationnamen,#pharmaqualificationname").val($(row.children().find('span').get(7)).text());
              $("#pharmaqualification,#pharmaqualificationname").hide();

            $("#pharmalicense,#pharmalicensename").val($(row.children().find('span').get(8)).text());
        }
        function edit_pharma_data(pharma_id) {
            var fname = $("#pharmafname").val();
            var mname = $("#pharmamname").val();
            var lname = $("#pharmalname").val();
            var countryCode = $("#countryCode").val();
            var contactNo = $("#pharmacontact").val();
            var contact = countryCode + ' ' + contactNo;

            var gender = $("#pharmagender").val();
            var username = $("#pharmausername").val();
            var email = $("#pharmaemail").val();
            var pharmaqualification = $("#pharmaqualification").val();
            if (pharmaqualification !== null) {
                var qualification = pharmaqualification.join();
            }
            else {
                var qualification = "";
            }
            //  var qualification = pharmaqualification.join();
            //            var Password = $("#pharmaPassword").val();


            var license = $("#pharmalicense").val();

            var pharma_data = {
                "pharma_user": {
                    "id": pharma_id,
                },
                "pro": {
//                    "gender": gender,
                    "email": email,
                    "first_name": fname,
                    "middle_name": mname,
                    "last_name": lname,
//                    "Qualification": qualification,
                    "user_type": 4,
                    "phone": contact,
                },
                "licence_number": license
            }


            //console.log(pharma_data)
            update_pharma(pharma_data, function (data, status) {
                if (status == "success") {
                    $("#pharmafname").val("");
                    $("#pharmamname").val("");
                    $("#pharmalname").val("");
                    $("#pharmacontact").val("");
                    $("#pharmagender,#pharmagendername").val("").show();
                    $("#pharmaemail").val("");
                    $("#pharmausername,#pharmausernamename,#pharmausernamenamen").val("").show();
                    $("#pharmapass,#pharmaPasswordname").val("").show();
                    $("#pharmaqualificationnamen,#pharmaqualificationname").val("").show();

                    $("#pharmalicense,#pharmalicensename").val("").show();

                    load_pharma();

                    //$("#Allergy tbody").append("<tr>" + "<td>" + AllergyType + "</td>" + "<td>" + Allergen + "</td>" + "<td>" + AllergyDescription + "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }

        function save_pharma_data() {
            var fname = $("#pharmafname").val();
            var mname = $("#pharmamname").val();
            var lname = $("#pharmalname").val();
            var countryCode = $("#countryCode").val();
            var contactNo = $("#pharmacontact").val();
            var contact = countryCode + ' ' + contactNo;
            var gender = $("#pharmagender").val();
            var email = $("#pharmaemail").val();
            var username = $("#pharmausername").val();
            var Password = $("#pharmaPassword").val();
            var pharmaqualification = $("#pharmaqualification").val();
            if (pharmaqualification !== null) {
                var qualification = pharmaqualification.join();
            }
            else {
                var qualification = "";
            }
            //var qualification = pharmaqualification.join();
            var license = $("#pharmalicense").val();
            //   if (fname=='' || lname=='' || contactNo =='' || email =='' || username =='' || qualification==''|| license==''){
            if (fname == '') {
                $("#dialogboxPharma1").show();
                $("#errorMsgFirstName").html('First name is mandatory');
                $("#dialogboxPharma1").delay(4000).fadeOut();
            }
            else if (lname == '') {
                $("#dialogboxPharma5").show();
                $("#errorMsglname").html('Last name is mandatory');
                $("#dialogboxPharma5").delay(4000).fadeOut();
            }
            else if (contactNo == '') {
                $("#dialogboxPharma2").show();
                $("#errorMsgContact1").html('Contact number is mandatory');
                $("#dialogboxPharma2").delay(4000).fadeOut();
            }
            else if (email == '') {
                $("#dialogboxPharma6").show();
                $("#errorMsgemail").html('Email address is mandatory');
                $("#dialogboxPharma6").delay(4000).fadeOut();
            }

            else if (username == '') {
                $("#dialogboxPharma3").show();
                $("#errorMsgUsername").html('Username is mandatory');
                $("#dialogboxPharma3").delay(4000).fadeOut();
            }

            else if (license == '') {
                $("#dialogboxPharma4").show();
                $("#errorMsgLicensename").html('License number is mandatory');
                $("#dialogboxPharma4").delay(4000).fadeOut();
            }
            else if (qualification == '') {
                $("#dialogboxPharma7").show();
                $("#errorMsgqualification").html('Qualification is mandatory');
                $("#dialogboxPharma7").delay(4000).fadeOut();
            }



            // }
            else {
                var pharma_data = {
                    "pharma_user": {
                        "username": username,
                    },
                    "pro": {
                        "gender": gender,
                        "email": email,
                        "first_name": fname,
                        "middle_name": mname,
                        "last_name": lname,
                        "Qualification": qualification,
                        "user_type": 4,
                        "phone": contact,
                    },
                    "licence_number": license
                }

                save_pharma(pharma_data, function (data, status) {
                    if (status == "success") {
                        $("#pharmafname").val("");
                        $("#pharmamname").val("");
                        $("#pharmalname").val("");
                        $("#pharmacontact").val("");
                        $("#pharmagender").val("").show();
                        $("#pharmaemail,#pharmaemailname").val("").show();
                        $("#pharmausername,#pharmausernamename").val("").show();
                        $("#pharmapass,#pharmaPasswordname").val("").show();
                        $("#pharmaqualificationnamen,#pharmaqualificationname").val("").show();
                        $("#pharmalicense,#pharmalicensename").val("").show();


                        // $("#Allergy tbody").append("<tr>" + "<td>" + AllergyType + "</td>" + "<td>" + Allergen + "</td>" + "<td>" + AllergyDescription + "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" + "</tr>");
                        load_pharma();

                        dlg.dialog("close");
                    }
                });
            }
        }
    };


    $(document).on('click', 'a.pharamadelete', function () {
        id = $(this).data('id');
        //        alert("delete ::"+id);
        delete_pharma(id, function (data, status) {
            load_pharma();

            //$(this).parents('tr:first').remove()
        });
        return false;
    });
    $(document).on('click', 'td a.pharmaedit', function () {
        new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
        return false;
    });
    $(".pharma-adduser").button().click(new_dialog);

    load_pharma();

});

//receptionist
$(function () {
    var load_receptionist = function () {
        get_receptionist_data(function (data, status) {
            var receptionist_view = ""
            if (data.length >= 0) {
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    receptionist_view += '<tr >';
                    receptionist_view += '<td><span>' + alr.first_name + " " + '</span><span>' + alr.middle_name + " " + '</span><span> ' + alr.last_name + '</span></td>';

                    receptionist_view += '<td style="display: none;" ><span>' + alr.gender + '</span></td>';
                    var a = alr.phone.split(" ");

                    var phon = a[1]
                    receptionist_view += '<td style="display: none;" ><span>' + phon + '</span></td>';
                    receptionist_view += '<td><span>' + alr.email + '</span></td>';
                    receptionist_view += '<td style="display: none;"><span>' + alr.Qualification + '</span></td>';
		    receptionist_view += '<td ><a style="color: #64c1b1; " href="/receptionist_profile/' + alr.user.id + '/"class="fa fa-user-circle fa-lg" ></a></td>';

                    receptionist_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.user.id + '" class="receptionistedit fa fa-pencil-square-o "></a> </td>';
                    // console.log(alr,"alr")
                    receptionist_view += '<td><a style="color: #64c1b1; ;"  href="javascript:void(0)" data-id="' + alr.user.id + '" class="receptionistdelete fa fa-trash-o"></a></td>';

                    receptionist_view += '</tr>';
                }
                $("#receptionistTable").html(receptionist_view)
            }
        });
    }
    var new_dialog = function (type, row, receptionist_id) {
        var dlg = $("#receptionist-form");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Create": save_receptionist_data,
                "Cancel": function () {
                    dlg.dialog("close");
                }
            },
            close: function () {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            get_receptionist_data_for_edit(row);
            delete (config.buttons['Create']);
            config.buttons['Save'] = function () {
                edit_receptionist_data(receptionist_id)
                row.remove();

            };
            config.buttons['Cancel'] = function () {

                dlg.dialog("close");
                $("#receptionistfname").val("");
                $("#receptionistmname").val("");
                $("#receptionistlname").val("");
                $("#receptionistcontact").val("");
                $("#receptionistgender,#receptionistgendername").val("").show();
                $("#receptionistemail").val("");
                $("#receptionistusername,#receptionistusernamename").val("").show();
                //                $("#receptionistPassword,#receptionistPasswordname").val("").show();
                $("#receptionistqualificationnamen,#receptionistqualificationname").show();


            };

        }
        dlg.dialog(config);
        function get_receptionist_data_for_edit(row) {
            $("#receptionistfname").val($(row.children().find('span').get(0)).text());
            $("#receptionistmname").val($(row.children().find('span').get(1)).text());
            $("#receptionistlname").val($(row.children().find('span').get(2)).text());
            $("#receptionistcontact").val($(row.children().find('span').get(4)).text());
//            $("#receptionistgender").val($(row.children().find('span').get(3)).text());
            $("#receptionistgender,#receptionistgendername").hide();

            $("#receptionistemail").val($(row.children().find('span').get(5)).text());
            $("#receptionistusername,#receptionistusernamename").hide();
            //            $("#receptionistPassword,#receptionistPasswordname").hide();
//            $("#receptionistqualificationnamen,#receptionistqualificationname").val($(row.children().find('span').get(6)).text());
            $("#receptionistqualification,#receptionistqualificationname").hide();

        }
        function edit_receptionist_data(receptionist_id) {
            var fname = $("#receptionistfname").val();
            var mname = $("#receptionistmname").val();
            var lname = $("#receptionistlname").val();
            var countryCode = $("#countryCode").val();
            //            alert(countryCode);
            var contactNo = $("#receptionistcontact").val();
            var contact = countryCode + ' ' + contactNo;
            var gender = $("#receptionistgender").val();
            var username = $("#receptionistusername").val();
            var qualification = $("#receptionistqualification").val();
            var email = $("#receptionistemail").val();
            // if (receptionqualification !== null) {
            //     var qualification = receptionqualification.join();
            // }
            // else {
            //     var qualification = "";
            // }
            // var receptionqualification = $("#receptionistqualification").val();

            var receptionist_data = {
                "user": receptionist_id,
                "email": email,
                "first_name": fname,
                "last_name": lname,
                "user_type": 2,
//                "gender": gender,
//                "Qualification": qualification,
                "middle_name": mname,
                "phone": contact,
            }

            //console.log(receptionist_data)
            update_receptionist(receptionist_data, function (data, status) {
                if (status == "success") {
                    $("#receptionistfname").val("");
                    $("#receptionistmname").val("");
                    $("#receptionistlname").val("");
                    $("#receptionistcontact").val("");
                    $("#receptionistgender,#receptionistgendername").val("").show();
                    $("#receptionistemail").val("");
                    $("#receptionistusername,#receptionistusernamename").val("").show();
                    $("#receptionistPassword,#receptionistPasswordname").val("").show();
                    $("#receptionistqualificationnamen,#receptionistqualificationname").show();

                    load_receptionist();

                    //$("#Allergy tbody").append("<tr>" + "<td>" + AllergyType + "</td>" + "<td>" + Allergen + "</td>" + "<td>" + AllergyDescription + "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }

        function save_receptionist_data() {
            var fname = $("#receptionistfname").val();
            var mname = $("#receptionistmname").val();
            var lname = $("#receptionistlname").val();

            var countryCode = $("#countryCode").val();
            var contactNo = $("#receptionistcontact").val();
            var contact = countryCode + ' ' + contactNo;

            var gender = $("#receptionistgender").val();
            var email = $("#receptionistemail").val();
            var username = $("#receptionistusername").val();
            var Password = $("#receptionistPassword").val();
            var receptionqualification = $("#receptionistqualification").val();
            if (receptionqualification !== null) {
                var qualification = receptionqualification.join();
            }
            else {
                var qualification = "";
            }
            //var qualification = receptionqualification.join();
            // if (fname=='' || lname=='' || email=='' || contactNo =='' || username =='' || qualification=='' ){
            if (fname == '') {
                $("#dialogboxRecep1").show();
                $("#errorMsgFirstName").html('First name is mandatory');
                $("#dialogboxRecep1").delay(4000).fadeOut();
            }
            else if (lname == '') {
                $("#dialogboxRecep4").show();
                $("#errorMsglname").html('Last name is mandatory');
                $("#dialogboxRecep4").delay(4000).fadeOut();
            }
            else if (contactNo == '') {
                $("#dialogboxRecep2").show();
                $("#errorMsgContact").html('Contact number is mandatory');
                $("#dialogboxRecep2").delay(4000).fadeOut();
            }
            else if (email == '') {
                $("#dialogboxRecep5").show();
                $("#errorMsgemail").html('Email address is mandatory');
                $("#dialogboxRecep5").delay(4000).fadeOut();
            }

            else if (username == '') {
                $("#dialogboxRecep3").show();
                $("#errorMsgUsername").html('Username is mandatory');
                $("#dialogboxRecep3").delay(4000).fadeOut();
            }
            // else if  (qualification ==''){
            //     $("#dialogboxRecep6").show();
            //    $("#errorMsgqualification").html('Qualification is mandatory');
            //    $("#dialogboxRecep6").delay(4000).fadeOut();
            // }



            // }
            else {
                var receptionist_data = {

                    "user": {

                        "username": username
                    },
                    "email": email,
                    "first_name": fname,
                    "last_name": lname,
                    "user_type": 2,
                    "gender": gender,
                    "Qualification": qualification,
                    "middle_name": mname,
                    "phone": contact,
                }

                save_receptionist(receptionist_data, function (data, status) {

                    if (status == "success") {
                        $("#receptionistfname").val("");
                        $("#receptionistmname").val("");
                        $("#receptionistlname").val("");
                        $("#receptionistcontact").val("");
                        $("#receptionistgender").val("").show();
                        $("#receptionistemail").val("");
                        $("#receptionistusername,#receptionistusernamename").val("").show();
                        //                    $("#receptionistPassword,#receptionistPasswordname").val("").show();
                        $("#receptionistqualificationnamen,receptionistqualificationname").val("");


                        // $("#Allergy tbody").append("<tr>" + "<td>" + AllergyType + "</td>" + "<td>" + Allergen + "</td>" + "<td>" + AllergyDescription + "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" + "</tr>");
                        load_receptionist();

                        dlg.dialog("close");
                    }
                });
            }
        }
    };


    $(document).on('click', 'a.receptionistdelete', function () {
        id = $(this).data('id');
        //        alert("delete ::"+id);
        delete_receptionist(id, function (data, status) {
            load_receptionist();

            //$(this).parents('tr:first').remove()
        });
        return false;
    });
    $(document).on('click', 'td a.receptionistedit', function () {
        new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
        return false;
    });
    $(".receptionist-adduser").button().click(new_dialog);

    load_receptionist();

});

//laboratorist
$(function () {
    var load_laboratorist = function () {
        get_laboratorist_data(function (data, status) {
            //console.log("********");
            var laboratorist_view = ""

            if (data.length >= 0) {

                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    laboratorist_view += '<tr >';
                    laboratorist_view += '<td><span>' + alr.pro.first_name + " " + '</span><span> ' + alr.pro.middle_name + " " + '</span><span>' + alr.pro.last_name + '</span></td>';
                    // laboratorist_view += '<td style="display: none;" ><span>'+ alr.pro.middle_name +'</span></td>' ;
                    // laboratorist_view += '<td style="display: none;" ><span>'+ alr.pro.last_name + '</span></td>';
                    laboratorist_view += '<td style="display: none;" ><span>' + alr.pro.gender + '</span></td>';
                    var a = alr.pro.phone.split(" ");

                    var phon = a[1]

                    laboratorist_view += '<td style="display: none;" ><span>' + phon + '</span></td>';
                    laboratorist_view += '<td style="display: none;" ><span>' + alr.lab_user.username + '</span></td>';
                    laboratorist_view += '<td><span>' + alr.pro.email + '</span></td>';
                    //                    pharma_view += '<td><span>'+ alr.speciality + '</span></td>';
                    laboratorist_view += '<td><span>' + alr.pro.Qualification + '</span></td>';
                    //                    pharma_view += '<td><span>'+ alr.Experience + 'years'+'</span></td>';
                    laboratorist_view += '<td><span>' + alr.licence_number + '</span></td>';
		    laboratorist_view += '<td ><a style="color: #64c1b1; " href="/laboratorist_profile/' + alr.lab_user.id + '/"class="fa fa-user-circle fa-lg" ></a></td>';
                    laboratorist_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.lab_user.id + '" class="laboratoristedit fa fa-pencil-square-o "></a> </td>';
                    laboratorist_view += '<td><a style="color: #64c1b1; ;"  href="javascript:void(0)" data-id="' + alr.pro.id + '" class="laboratoristdelete fa fa-trash-o"></a></td>';

                    laboratorist_view += '</tr>';
                }
                $("#laboratoristTable").html(laboratorist_view)
            }
        });
    }
    var new_dialog = function (type, row, laboratorist_id) {
        var dlg = $("#laboratorist-form");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Create": save_laboratorist_data,
                "Cancel": function () {
                    dlg.dialog("close");
                }
            },
            close: function () {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            get_laboratorist_data_for_edit(row);
            delete (config.buttons['Create']);
            config.buttons['Save'] = function () {
                edit_laboratorist_data(laboratorist_id)
                row.remove();
            };
            config.buttons['Cancel'] = function () {
                dlg.dialog("close");
                $("#laboratoristfname").val("");
                $("#laboratoristmname").val("");
                $("#laboratoristlname").val("");
                $("#laboratoristcontact").val("");
                $("#laboratoristgender,#laboratoristgendername").val("").show();
                $("#laboratoristusername,#laboratoristusernamename").val("").show();
                $("#laboratoristemail,#laboratoristemailname").val("").show();
                //                $("#laboratoristPassword,#laboratoristPasswordname").val("").show();
                $("#laboratoristqualificationnamen,#laboratoristqualificationname").val("").show();
                $("#laboratoristlicense,#laboratoristlicensename").val("").show();

            };

        }
        dlg.dialog(config);
        function get_laboratorist_data_for_edit(row) {
            $("#laboratoristfname").val($(row.children().find('span').get(0)).text());
            $("#laboratoristmname").val($(row.children().find('span').get(1)).text());
            $("#laboratoristlname").val($(row.children().find('span').get(2)).text());
//            $("#laboratoristgender").val($(row.children().find('span').get(3)).text());
            $("#laboratoristgender,#laboratoristgendername").hide();

            $("#laboratoristcontact").val($(row.children().find('span').get(4)).text());
            $("#laboratoristusername,#laboratoristusernamename").hide();
            $("#laboratoristemail").val($(row.children().find('span').get(6)).text());
            //            $("#laboratoristPassword,#laboratoristPasswordname").hide();
//            $("#laboratoristqualificationnamen,#laboratoristqualificationname").val($(row.children().find('span').get(7)).text());
            $("#laboratoristqualification,#laboratoristqualificationname").hide();
            $("#laboratoristlicense,#laboratoristlicensename").val($(row.children().find('span').get(8)).text());
        }
        function edit_laboratorist_data(laboratorist_id) {
            var fname = $("#laboratoristfname").val();
            var mname = $("#laboratoristmname").val();
            var lname = $("#laboratoristlname").val();
            var countryCode = $("#countryCode").val();
            var contactNo = $("#laboratoristcontact").val();
            var contact = countryCode + ' ' + contactNo;
            var gender = $("#laboratoristgender").val();
            var email = $("#laboratoristemail").val();
            var username = $("#laboratoristusername").val();
            var Password = $("#laboratoristPassword").val();
            var LabTechnicianqualification = $("#laboratoristqualification").val();
            if (LabTechnicianqualification !== null) {
                var qualification = LabTechnicianqualification.join();
            }
            else {
                var qualification = "";
            }
            var license = $("#laboratoristlicense").val();

            var laboratorist_data = {
                "lab_user": {
                    "id": laboratorist_id,
                },
                "pro": {

//                    "gender": gender,
                    "email": email,
                    "first_name": fname,
                    "middle_name": mname,
                    "last_name": lname,
//                    "Qualification": qualification,
                    "user_type": 1,
                    "phone": contact,
                },
                "licence_number": license,
            }




            update_laboratorist(laboratorist_data, function (data, status) {
                if (status == "success") {
                    $("#laboratoristfname").val("");
                    $("#laboratoristmname").val("");
                    $("#laboratoristlname").val("");
                    $("#laboratoristcontact").val("");
                    $("#laboratoristgender,#laboratoristgendername").val("").show();
                    $("#laboratoristusername,#laboratoristusernamename").val("").show();
                    $("#laboratoristemail,#laboratoristemailname").val("").show();
                    $("#laboratoristPassword,#laboratoristPasswordname").val("").show();
                    $("#laboratoristqualificationnamen,#laboratoristqualificationname").show();
                    $("#laboratoristlicense,#laboratoristlicensename").val("").show();
                    load_laboratorist();
                    dlg.dialog("close");
                }
            });
        }

        function save_laboratorist_data() {
            var fname = $("#laboratoristfname").val();
            var mname = $("#laboratoristmname").val();
            var lname = $("#laboratoristlname").val();

            var countryCode = $("#countryCode").val();
            var contactNo = $("#laboratoristcontact").val();
            var contact = countryCode + ' ' + contactNo;

            var gender = $("#laboratoristgender").val();
            var email = $("#laboratoristemail").val();
            var username = $("#laboratoristusername").val();
            //            var Password = $("#laboratoristPassword").val();
            var LabTechnicianqualification = $("#laboratoristqualification").val();
            if (LabTechnicianqualification !== null) {
                var qualification = LabTechnicianqualification.join();
            }
            else {
                var qualification = "";
            }
            // var qualification = LabTechnicianqualification.join();
            var license = $("#laboratoristlicense").val();
            // if (fname=='' || lname=='' || contactNo =='' || email=='' || username =='' || qualification =='' || license==''){
            if (fname == '') {
                $("#dialogboxLabTech1").show();
                $("#errorMsgFirstName").html('First name is mandatory');
                $("#dialogboxLabTech1").delay(4000).fadeOut();
            }
            else if (lname == '') {
                $("#dialogboxLabTech5").show();
                $("#errorMsglname").html('Last name is mandatory');
                $("#dialogboxLabTech5").delay(4000).fadeOut();
            }

            else if (contactNo == '') {
                $("#dialogboxLabTech2").show();
                $("#errorMsgContact").html('Contact number is mandatory');
                $("#dialogboxLabTech2").delay(4000).fadeOut();
            }
            else if (email == '') {
                $("#dialogboxLabTech6").show();
                $("#errorMsgemail").html('Email address is mandatory');
                $("#dialogboxLabTech6").delay(4000).fadeOut();
            }

            else if (username == '') {
                $("#dialogboxLabTech3").show();
                $("#errorMsgUsername").html('Username is mandatory');
                $("#dialogboxLabTech3").delay(4000).fadeOut();
            }

            else if (license == '') {
                $("#dialogboxLabTech4").show();
                $("#errorMsgLicensename").html('License number is mandatory');
                $("#dialogboxLabTech4").delay(4000).fadeOut();
            }
            else if (qualification == '') {
                $("#dialogboxLabTech7").show();
                $("#errorMsgqualification").html('Qualification is mandatory');
                $("#dialogboxLabTech7").delay(4000).fadeOut();
            }



            // }
            else {
                var laboratorist_data = {
                    "lab_user": {
                        "username": username,
                    },
                    "pro": {

                        "gender": gender,
                        "email": email,
                        "first_name": fname,
                        "middle_name": mname,
                        "last_name": lname,
                        "Qualification": qualification,
                        "user_type": 1,
                        "phone": contact,
                    },
                    "licence_number": license,
                }
                save_laboratorist(laboratorist_data, function (data, status) {
                    if (status == "success") {
                        $("#laboratoristfname").val("");
                        $("#laboratoristmname").val("");
                        $("#laboratoristlname").val("");
                        $("#laboratoristcontact").val("");
                        $("#laboratoristgender").val("");
                        $("#laboratoristusername,#laboratoristusernamename").val("").show();
                        $("#laboratoristemail,#laboratoristemailname").val("").show();
                        $("#laboratoristPassword,#laboratoristPasswordname").val("").show();
                        $("#laboratoristqualificationnamen,#laboratoristqualificationname").show();
                        $("#laboratoristlicense,#laboratoristlicensename").val("").show();

                        load_laboratorist();

                        dlg.dialog("close");
                    }
                });
            }
        }
    };
    $(document).on('click', 'a.laboratoristdelete', function () {
        id = $(this).data('id');
        //        alert("delete ::"+id);
        delete_laboratorist(id, function (data, status) {
            load_laboratorist();
        });
        return false;
    });
    $(document).on('click', 'td a.laboratoristedit', function () {
        new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
        return false;
    });
    $(".laboratorist-adduser").button().click(new_dialog);

    load_laboratorist();

});

//patient
$(function () {
    var load_patient = function () {
        get_patient_data(function (data, status) {
            var patient_view = ""
            if (data.length >= 0) {
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    patient_view += '<tr >';
                    // patient_view += '<td><span style="color: #64C1B1;font-weight: bolder;">'+ alr.UHID+'</span></td>';
                    // patient_view += '<td><span>'+ alr.pat.first_name +' '+'</span><span>'+ alr.pat.middle_name +' '+ '</span><span>'+ alr.pat.last_name + '</span></td>' ;
                    // patient_view += '<td style="display: none;" ><span>'+ alr.pat.gender + '</span></td>';
                    // patient_view += '<td style="display: none;" ><span>'+ alr.phone + '</span></td>';
                    // patient_view += '<td style="display: none;" ><span>'+ alr.username + '</span></td>';
                    // patient_view += '<td style="display: none;" ><span>'+ alr.pat.email + '</span></td>';

                    // patient_view += '<td ><a style="color: #64c1b1; " href="/patient__profile/'+String(alr.pat.id)+'/"class="fa fa-user-circle fa-lg" ></a></td>';
                    // patient_view += '<td ><a style="color: #64c1b1; " href="/summary/'+String(alr.pat.id)+'/"class="fa fa-file-text fa-lg" ></a></td>';
                    // patient_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.pat.id + '" class="patientedit fa fa-pencil-square-o "></a> </td>';
                    // patient_view += '<td><a style="color: #64c1b1; "  href="javascript:void(0)" data-id="' + alr.pat.id + '" class="patientdelete fa fa-trash-o fa-lg"></a></td>';

                    //patient_view += '<td ><a style="color: #64c1b1; " href="/patientpart/"class="fa fa-user-circle fa-lg" ></a></td>';

                    //rapa raap
                    patient_view += '<td><span style="color: #64C1B1;font-weight: bolder;">' + alr.UHID + '</span></td>';
                    patient_view += '<td><span>' + alr.pat.first_name + ' ' + '</span><span>' + alr.pat.middle_name + ' ' + '</span><span>' + alr.pat.last_name + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.pat.gender + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.pat.phone + '</span></td>';

                    patient_view += '<td style="display: none;" ><span>' + alr.pat.email + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.occupation + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.blood_group + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.maritial_status + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.ethnicity + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.address + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.address2 + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.city + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.state + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.zip_code + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.emergencycontactfname + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.emergencycontactno + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.emergencyrelationship + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.familyDoctorName + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.familycontactno + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.reason + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.country + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.emergencycontactlname + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.dob + '</span></td>';
                    patient_view += '<td style="display: none;" ><span>' + alr.age + '</span></td>'; //

                    patient_view += '<td ><a style="color: #64c1b1; " href="/patient__profile/' + String(alr.pat.id) + '/"class="fa fa-user-circle fa-lg" ></a></td>';
                    patient_view += '<td ><a style="color: #64c1b1; " href="/summary/' + String(alr.pat.id) + '/"class="fa fa-file-text fa-lg" ></a></td>';
                    patient_view += '<td ><a style="color: #64c1b1; " href="/appointments/' + alr.UHID + '/" class="patientLink fa fa-user-md fa-lg"></a></td>';
//                    patient_view += '<td ><a style="color: #64c1b1; " href="javascript:void(0)" data-id= "' + alr.UHID + '" class="patientLinkappoint fa fa-id-badge fa-lg"></a></td>';
                    patient_view += '<td ><a style="color: #64c1b1; " href="javascript:void(0)" data-id= "' + alr.UHID + '" class="getpatientlinks fa fa-id-badge fa-lg" data-toggle="modal" data-target="#assignedDoctorView"></a></td>';



                    patient_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.pat.id + '" class="patientedit fa fa-pencil-square-o fa-lg "></a> </td>';                    
                    //                    patient_view += '<td><a style="color: #64c1b1; "  href="javascript:void(0)" data-id="' + alr.pat.id + '" class="patientdelete fa fa-trash-o fa-lg"></a></td>';
                    //patient_view += '<td ><a style="color: #64c1b1; " href="/patientpart/"class="fa fa-user-circle fa-lg" ></a></td>';


                }
                $("#patienttable").html(patient_view);
            }
        });
    }
    var new_dialog = function (type, row, patient_id) {
        var dlg = $("#patient-form");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Create": save_patient_data,
                "Cancel": function () {
                    dlg.dialog("close");
                }
            },
            close: function () {
                dlg.dialog("close");
            }
        };

        if (type === 'Edit') {
            get_patient_data_for_edit(row);
            delete (config.buttons['Create']);
            config.buttons['Save'] = function () {
                edit_patient_data(patient_id)
                row.remove();
            };
            config.buttons['Cancel'] = function () {

                dlg.dialog("close");
               $("#patientfname").val("").show();
                $("#patientmname").val("").show();
                $("#patientlname").val("").show();//
                $("#patientstreetname").val("").show();
                $("#patientstreetname2").val("").show();
                $("#state").val("").show();
                $("#country").val("").show();
                // $("#patientcontactcode").val("").show();

                $("#patientcontactnumber").val("").show();
                $("#patientgender").val("").show();
                $("#patientdobn,#patientdob").val("").show();
                $("#patientAgen,#patientAge").val("").show();

                $("#patientemail,#patientemailname").val("").show();
                $("#patientusername,#patientusernamename").val("").show();
                $("#patientPassword,#patientpasswordname").val("").show();
                $("#patientbloodgroup").val("").show();
                $("#patientmaritialstatus").val("").show();
                $("#patientethnicity").val("").show();
                $("#patoccupation").val("").show();
                $("#patientecontactfname").val("").show();
                $("#patientecontactlname").val("").show();
                $("#patientrelation").val("").show();
                // $("#patientrelationcontactcode").val("").show();
                $("#patientrelationcontact").val("").show();
                $("#patientfdoctor").val("").show();
                // $("#patientdoctorcontactcode").val("").show();
                $("#patientdoctorcontact").val("").show();
                $("#patientage").val("").show();
                $("#patientcity").val("").show();
                $("#patientzip").val("").show();
                $("#patientnotes").val("").show();
                $("#patientguardian").val("").show();
		$("#patientreason").val("").show();
            };
        }
        dlg.dialog(config);
        function get_patient_data_for_edit(row) {
            // $("#patientfname,#patientfnamename").show();
            $("#patientfname").val($(row.children().find('span').get(1)).text());
            $("#patientmname").val($(row.children().find('span').get(2)).text());
            $("#patientlname").val($(row.children().find('span').get(3)).text());
            var pC = $(row.children().find('span').get(5)).text();
            var contactNo = pC.split(" ");
            var countryCode = contactNo[0];
            var contactNumber = contactNo[1];
            $("#patientcontactnumber").val($(row.children().find('span').get(5)).text());
            $("#patientcontactnumber").val(contactNumber);
            $("#patientgender").val($(row.children().find('span').get(4)).text());
            $("#patientemail").val($(row.children().find('span').get(6)).text());
            $("#patoccupation").val($(row.children().find('span').get(7)).text());

            $("#patientbloodgroup").val($(row.children().find('span').get(8)).text());
            $("#patientmaritialstatus").val($(row.children().find('span').get(9)).text());
            $("#patientethnicity").val($(row.children().find('span').get(10)).text());
            $("#patientdob").val($(row.children().find('span').get(24)).text());
            $("#patientAge").val($(row.children().find('span').get(25)).text());
            $("#patientstreetname").val($(row.children().find('span').get(11)).text());
            $("#patientstreetname2").val($(row.children().find('span').get(12)).text());
            $("#patientcity").val($(row.children().find('span').get(13)).text());
            $("#country").val($(row.children().find('span').get(22)).text()).change();
            $("#state").val($(row.children().find('span').get(14)).text()).change();
            $("#patientzip").val($(row.children().find('span').get(15)).text());
            $("#patientecontactfname").val($(row.children().find('span').get(16)).text());
            $("#patientecontactlname").val($(row.children().find('span').get(23)).text());
            $("#patientrelationcontact").val($(row.children().find('span').get(17)).text());
            var prl = $(row.children().find('span').get(17)).text();
            var pcontactNo = prl.split(" ");
            var pcontactNumber = pcontactNo[1];
            $("#patientrelationcontact").val(pcontactNumber);
            $("#patientrelation").val($(row.children().find('span').get(18)).text());
            $("#patientfdoctor").val($(row.children().find('span').get(19)).text());
            $("#patientdoctorcontact").val($(row.children().find('span').get(20)).text());
            var pdc = $(row.children().find('span').get(20)).text();
            var dcontactNo = pdc.split(" ");
            var dcontactNumber = dcontactNo[1];
            $("#patientdoctorcontact").val(dcontactNumber);
            $("#patientreason").val($(row.children().find('span').get(21)).text());

        }
        function edit_patient_data(patient_id) {
            var fname = $("#patientfname").val();
            var mname = $("#patientmname").val();
            var lname = $("#patientlname").val();
            var patientstreetname = $("#patientstreetname").val();
            var patientstreetname2 = $("#patientstreetname2").val();
            var patientcity = $("#patientcity").val();
            var patientstate = $("#state").val();
            var patientzip = $("#patientzip").val();
            var patientcountry = $("#country").val();
            var patientcontactcode = $("#patientcontactcode").val();
            var patientcontactnumber = $("#patientcontactnumber").val();
            var contact = patientcontactcode + " " + patientcontactnumber;
            var patientemail = $("#patientemail").val();
            var patientgender = $("#patientgender").val();
            var patientdob = $("#patientdob").val();
            var patientAge = $("#patientAge").val();
            var patientmaritialstatus = $("#patientmaritialstatus").val();
            var patientethnicity = $("#patientethnicity").val();
            var patientbloodgroup = $("#patientbloodgroup").val();
            var patientecontactfname = $("#patientecontactfname").val();
            var patientecontactlname = $("#patientecontactlname").val();

            // var relationname = patientecontactfname + " " + patientecontactlname;
            var patientrelation = $("#patientrelation").val();
            var patientrelationcontactcode = $("#patientrelationcontactcode").val();
            var patientrelationcontact = $("#patientrelationcontact").val();
            var emgcontact = patientrelationcontactcode + " " + patientrelationcontact;

            var patientfdoctor = $("#patientfdoctor").val();
            var patientdoctorcontactcode = $("#patientdoctorcontactcode").val();
            var patientdoctorcontact = $("#patientdoctorcontact").val();
            var patdoctorcontact = patientdoctorcontactcode + " " + patientdoctorcontact;
            var patoccupation = $("#patoccupation").val();
            var patientreason = $("#patientreason").val();

            var pat_data = {
                "pat": {
                    "id": patient_id,
                    "email": patientemail,
                    "first_name": fname,
                    "last_name": lname,
                    "middle_name": mname,
                    "phone": contact,
                    "gender": patientgender,
                    "user_type": 7
                },
                "occupation": patoccupation,
                "blood_group": patientbloodgroup,
                "maritial_status": patientmaritialstatus,
                "ethnicity": patientethnicity,
                "dob": patientdob,
                'age':patientAge,
                "address": patientstreetname,
                "address2": patientstreetname2,
                "city": patientcity,
                "state": patientstate,
                "country": patientcountry,
                "zip_code": patientzip,

                "emergencycontactfname": patientecontactfname,
                "emergencycontactlname": patientecontactlname,
                "emergencycontactno": emgcontact,
                "emergencyrelationship": patientrelation,
                "familyDoctorName": patientfdoctor,
                "familycontactno": patdoctorcontact,
                "reason": patientreason
            }
            //console.log(pat_data)
            update_patient(pat_data, function (data, status) {
                if (status == "success") {
                    $("#patientfname").val("");
                    $("#patientmname").val("");
                    $("#patientlname").val("");
                    $("#patientstreetname").val("");
                    $("#patientstreetname2").val("");
                    $("#patientcity").val("");
                    $("#state").val("");
                    $("#patientzip").val("");
                    $("#country").val("");
                    $("#patientcontactcode").val("");
                    $("#patientcontactnumber").val("");
                    $("#patientemail").val("");
                    $("#patientgender").val("");
                    $("#patientdob").val("");
                    $("#patientAge").val("");
                    $("#patientmaritialstatus").val("");
                    $("#patientethnicity").val("");
                    $("#patientbloodgroup").val("");
                    $("#patientecontactfname").val("");
                    $("#patientecontactlname").val("");
                    $("#patientrelation").val("");
                    $("#patientrelationcontactcode").val("");
                    $("#patientrelationcontact").val("");
                    $("#patientfdoctor").val("");
                    $("#patientdoctorcontactcode").val("");
                    $("#patientdoctorcontact").val("");
                    $("#patoccupation").val("");
                    $("#patientreason").val("");

                    // $("#patientfname").val();
                    // $("#patientlname").val();
                    // $("#patientcontact").val();
                    // $("#patientgender").val("").show;
                    // $("#patientemail,#patientemailname").val("").show();
                    // $("#patientusername,#patientusernamename").val("").show();
                    // $("#patientPassword,#patientpasswordname,#passfield").val("").show();
                    // $("#patientbloodgroup").val();
                    // $("#patientmaritialstatus").val();
                    // $("#patientethnicity").val();
                    // $("#patientage").val();
                    // $("#patientaddress").val();
                    // $("#patientcity").val();
                    // $("#patientstate").val();
                    // $("#patientcountry").val();
                    // $("#patientzipcode").val();
                    // $("#patientnotes").val();
                    // $("#patientguardian").val();
                    //     load_patient();
                    //     dlg.dialog("close");
                }
            });
        }

        function save_patient_data() {
            var fname = $("#patientfname").val();
            var mname = $("#patientmname").val();
            var lname = $("#patientlname").val();
            var patientstreetname = $("#patientstreetname").val();
            var patientstreetname2 = $("#patientstreetname2").val();
            var patientcity = $("#patientcity").val();
            var patientstate = $("#state").val();

            var patientzip = $("#patientzip").val();
            var patientcountry = $("#country").val();
            var patientcontactcode = $("#patientcontactcode").val();
            var patientcontactnumber = $("#patientcontactnumber").val();
            var contact = patientcontactcode + " " + patientcontactnumber;
            var patientemail = $("#patientemail").val();
            var patientgender = $("#patientgender").val();
            var patientdob = $("#patientdob").val();
            var patientAge = $("#patientAge").val();
            var patientmaritialstatus = $("#patientmaritialstatus").val();
            var patientethnicity = $("#patientethnicity").val();
            var patientbloodgroup = $("#patientbloodgroup").val();
            var patientecontactfname = $("#patientecontactfname").val();
            var patientecontactlname = $("#patientecontactlname").val();

            var relationname = patientecontactfname + " " + patientecontactlname;
            var patientrelation = $("#patientrelation").val();
            var patientrelationcontactcode = $("#patientrelationcontactcode").val();
            var patientrelationcontact = $("#patientrelationcontact").val();
            var emgcontact = patientrelationcontactcode + " " + patientrelationcontact;

            var patientfdoctor = $("#patientfdoctor").val();
            var patientdoctorcontactcode = $("#patientdoctorcontactcode").val();
            var patientdoctorcontact = $("#patientdoctorcontact").val();
            var patdoctorcontact = patientdoctorcontactcode + " " + patientdoctorcontact;
            var patoccupation = $("#patoccupation").val();
            var patientreason = $("#patientreason").val();

            //  if (fname=='' || lname  =='' || contact ==' ' || emgcontact==' '|| patientdob==''||  patientbloodgroup==null ||  patientecontactfname  =='' ||  patientrelation =='' ||  patientreason =='' || patientstreetname =='' || patientstreetname2 =='' || patientcity=='' || patientstate ==null || patientzip =='' || patientcountry==-1){
            //    console.log('inside if a condition')
            if (fname == '') {
                $("#dialogboxPatient1").show();
                $("#errorMsgPatient1").html('First name is mandatory');
                $("#dialogboxPatient1").delay(4000).fadeOut();
            }
            else if (lname == '') {
                $("#dialogboxPatient2").show();
                $("#errorMsgPatient2").html('Last name is mandatory');
                $("#dialogboxPatient2").delay(4000).fadeOut();
            }
            else if (contact == ' ') {
                $("#dialogboxPatient3").show();
                $("#errorMsgPatient3").html('Contact number is mandatory');
                $("#dialogboxPatient3").delay(4000).fadeOut();
            }
            else if (patientstreetname == '') {
                $("#dialogboxPatient4").show();
                $("#errorMsgPatient4").html('Street Address is mandatory');
                $("#dialogboxPatient4").delay(4000).fadeOut();
            }
            else if (patientstreetname2 == '') {
                $("#dialogboxPatient5").show();
                $("#errorMsgPatient5").html('Street Address line 2 is mandatory');
                $("#dialogboxPatient5").delay(4000).fadeOut();
            }
            else if (patientcity == '') {
                $("#dialogboxPatient6").show();
                $("#errorMsgPatient6").html('City is mandatory');
                $("#dialogboxPatient6").delay(4000).fadeOut();
            }
            else if (patientstate == null) {
                $("#dialogboxPatient7").show();
                $("#errorMsgPatient7").html('State is mandatory');
                $("#dialogboxPatient7").delay(4000).fadeOut();
            }
            else if (patientzip == '') {
                $("#dialogboxPatient8").show();
                $("#errorMsgPatient8").html('Zipcode is mandatory');
                $("#dialogboxPatient8").delay(4000).fadeOut();
            }
            else if (patientcountry == -1) {
                $("#dialogboxPatient9").show();
                $("#errorMsgPatient9").html('Country is mandatory');
                $("#dialogboxPatient9").delay(4000).fadeOut();
            }
            else if (patientdob == '' && patientAge == '') {
                $("#dialogboxPatient10").show();
                $("#errorMsgPatient10").html('Age is mandatory');
                $("#dialogboxPatient10").delay(4000).fadeOut();
            }
            else if (patientbloodgroup == null) {
                $("#dialogboxPatient11").show();
                $("#errorMsgPatient11").html('Blood group is mandatory');
                $("#dialogboxPatient11").delay(4000).fadeOut();
            }
            else if (patientecontactfname == '') {
                $("#dialogboxPatient12").show();
                $("#errorMsgPatient12").html('Emergency contact name is mandatory');
                $("#dialogboxPatient12").delay(4000).fadeOut();
            }
            else if (patientrelation == '') {
                $("#dialogboxPatient13").show();
                $("#errorMsgPatient13").html('Relation is mandatory');
                $("#dialogboxPatient13").delay(4000).fadeOut();
            }
            else if (patientreason == '') {
                $("#dialogboxPatient14").show();
                $("#errorMsgPatient14").html('Reason is mandatory');
                $("#dialogboxPatient14").delay(4000).fadeOut();
            }
            else if (emgcontact == ' ') {
                $("#dialogboxPatient15").show();
                $("#errorMsgPatient15").html('Emergency contact number is mandatory');
                $("#dialogboxPatient15").delay(4000).fadeOut();
            }

            // }
            else {

                var patient_data = {
                    "pat": {
                        "email": patientemail,
                        "first_name": fname,
                        "last_name": lname,
                        "middle_name": mname,
                        "phone": contact,
                        "gender": patientgender,
                        "user_type": 7
                    },
                    "occupation": patoccupation,
                    "blood_group": patientbloodgroup,
                    "maritial_status": patientmaritialstatus,
                    "ethnicity": patientethnicity,
                    "dob": patientdob,
                    'age': patientAge,
                    "address": patientstreetname,
                    "address2": patientstreetname2,
                    "city": patientcity,
                    "state": patientstate,
                    "country": patientcountry,
                    "zip_code": patientzip,

                    "emergencycontactfname": patientecontactfname,
                    "emergencycontactlname": patientecontactlname,
                    "emergencycontactno": emgcontact,
                    "emergencyrelationship": patientrelation,
                    "familyDoctorName": patientfdoctor,
                    "familycontactno": patdoctorcontact,
                    "reason": patientreason
                }
                save_patient(patient_data, function (data, status) {
                    if (status == "success") {
                        $("#patientfname").val("");
                    $("#patientmname").val("");
                    $("#patientlname").val("");
                    $("#patientstreetname").val("");
                    $("#patientstreetname2").val("");
                    $("#patientcity").val("");
                    $("#state").val("");
                    $("#patientzip").val("");
                    $("#country").val("");
                    $("#patientcontactcode").val("");
                    $("#patientcontactnumber").val("");
                    $("#patientemail").val("");
                    $("#patientgender").val("");
                    $("#patientdob").val("");
                    $("#patientAge").val("");
                    $("#patientmaritialstatus").val("");
                    $("#patientethnicity").val("");
                    $("#patientbloodgroup").val("");
                    $("#patientecontactfname").val("");
                    $("#patientecontactlname").val("");
                    $("#patientrelation").val("");
                    $("#patientrelationcontactcode").val("");
                    $("#patientrelationcontact").val("");
                    $("#patientfdoctor").val("");
                    $("#patientdoctorcontactcode").val("");
                    $("#patientdoctorcontact").val("");
                    $("#patoccupation").val("");
                    $("#patientreason").val("");
                        load_patient();
                        dlg.dialog("close");
                    }
                });
            }
        }
    };


    $(document).on('click', 'a.patientdelete', function () {
        id = $(this).data('id');
        //        alert("delete ::"+id);
        delete_patient(id, function (data, status) {
            load_patient();
        });
        return false;
    });
    $(document).on('click', 'td a.patientedit', function () {
        var id = $(this).data('id');
        //console.log("fdfd", id)
        new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
        return false;
    });
    $(".patient-adduser").button().click(new_dialog);

    load_patient();

});

//doctor at receptionist view
$(function () {
    get_doctor_data(function (data, status) {
        var doctor_view = ""
        if (data.length >= 0) {
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                doctor_view += '<tr >';
                doctor_view += '<td><span>' + alr.pro.first_name + ' ' + alr.pro.middle_name + ' ' + alr.pro.last_name + '</span></td>';
                doctor_view += '<td  style="display: none;"><span>' + alr.pro.last_name + '</span></td>';
                doctor_view += '<td style="display: none;" ><span>' + alr.pro.gender + '</span></td>';
                doctor_view += '<td style="display: none;" ><span>' + alr.pro.phone + '</span></td>';
                doctor_view += '<td style="display: none;" ><span>' + alr.doc.username + '</span></td>';
                doctor_view += '<td style="display: none;"><span>' + alr.pro.email + '</span></td>';
                doctor_view += '<td><span>' + alr.speciality + '</span></td>';
                doctor_view += '<td><span>' + alr.pro.Qualification + '</span></td>';
                doctor_view += '<td><span>' + alr.Experience + '</span></td>';
                doctor_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.doc.id + '" class="doctoravailability fa fa-address-card-o "></a> </td>';

                //                doctor_view += '<td><span>'+ alr.Licence_number  + '</span></td>';
                doctor_view += '</tr>';
            }
            $("#Doctorreceptionisttable").html(doctor_view);
        }
    });

//doctor at receptionist view
$(function () {
    get_doctor_data(function (data, status) {
        var doctor_view = ""
        if (data.length >= 0) {
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                doctor_view += '<tr >';
                doctor_view += '<td><span>' + alr.pro.first_name + ' ' + '</span><span>' + alr.pro.middle_name + ' ' + '</span><span>' + alr.pro.last_name + '</span></td>';

                doctor_view += '<td><span>' + alr.speciality + '</span></td>';
                doctor_view += '<td><span>' + alr.pro.Qualification + '</span></td>';
                doctor_view += '<td><span>' + alr.Experience + '</span></td>';
                doctor_view += '</tr>';
            }
            $("#Doctorreceptionistdashboardtable").html(doctor_view);
        }
    });

});

/*patientview in receptionist dashboard*/
$(function () {
    get_latestpatient_data(function (data, status) {
        var patient_view = ""
        if (data.length >= 0) {
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                patient_view += '<tr >';
                patient_view += '<td><span style="color: #64C1B1;font-weight: bolder;">' + alr.UHID + '</span></td>';
                patient_view += '<td><span>' + alr.pat.first_name + ' ' + '</span><span>' + alr.pat.middle_name + " " + '</span><span>' + alr.pat.last_name + '</span></td>';
                patient_view += '<td  ><span>' + alr.pat.phone + '</span></td>';

            }
            $("#patientreceptiondashboard").html(patient_view);
        }
    });
});

$(function () {
    get_patient_data(function (data, status) {
        var patient_view = ""
        if (data.length >= 0) {
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                patient_view += '<tr >';
                patient_view += '<td><span style="color: #64C1B1;font-weight: bolder;">' + alr.UHID + '</span></td>';
                patient_view += '<td><span>' + alr.pat.first_name + ' ' + '</span><span>' + alr.pat.middle_name + " " + '</span><span>' + alr.pat.last_name + '</span></td>';
                patient_view += '<td  ><span>' + alr.pat.phone + '</span></td>';

            }
            $("#patientreceptiondashboardtable").html(patient_view);
        }
    });
});
//patientphysiciandashboardtable
$(function () {
    get_patient_data(function (data, status) {
        var patient_view = ""
        if (data.length >= 0) {
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                patient_view += '<tr >';
                patient_view += '<td><span>' + alr.pat.first_name + '</span></td>';
                patient_view += '<td><span>' + alr.pat.last_name + '</span></td>';
                patient_view += '<td  ><span>' + alr.pat.phone + '</span></td>';
                patient_view += '<td><span>' + alr.pat.email + '</span></td>';

                patient_view += '<td ><span>' + alr.pat.gender + '</span></td>';
                patient_view += '<td><span>' + alr.blood_group + '</span></td>';
                patient_view += '<td><span>' + alr.age + '</span></td>';
            }
            $("#patientphysiciandashboardtable").html(patient_view);
        }
    });
});

//patientnursedashboardtable
$(function () {
    get_patient_data(function (data, status) {
        var patient_view = ""
        if (data.length >= 0) {
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                patient_view += '<tr >';
                patient_view += '<td><span>' + alr.pat.first_name + '</span></td>';
                patient_view += '<td><span>' + alr.pat.last_name + '</span></td>';
                patient_view += '<td  ><span>' + alr.pat.phone + '</span></td>';
                patient_view += '<td><span>' + alr.pat.email + '</span></td>';
                patient_view += '<td ><span>' + alr.pat.gender + '</span></td>';
                patient_view += '<td><span>' + alr.blood_group + '</span></td>';
                patient_view += '<td><span>' + alr.age + '</span></td>';
            }
            $("#patientnursedashboardtable").html(patient_view);
        }
    });
});
//patient ehr in physician
$(function () {
    get_patientindoctor_data(function (data, status) {
        var patient_view = ""
        if (data.length >= 0) {
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                patient_view += '<tr >';
                patient_view += '<td  ><span style="color: #64C1B1;font-weight: bolder;">' + alr.UHID + '</span></td>';
                patient_view += '<td><span>' + alr.pat.first_name + " " + '</span><span>' + alr.pat.middle_name + " " + '</span><span>' + alr.pat.last_name + '</span></td>';
                patient_view += '<td style="display:none"><span>' + alr.pat.last_name + '</span></td>';

                patient_view += '<td ><a style="color: #64c1b1; " href="/patient_profile/' + String(alr.pat.id) + '/"class="fa fa-user-circle fa-lg" ></a></td>';
                patient_view += '<td ><a style="color: #64c1b1; " href="/health_record/' + String(alr.pat.id) + '/"class="fa fa-file-text fa-lg" ></a></td>';
              //  patient_view += '<td ><a style="color: #64c1b1; " href="javascript:void(0)" data-id= "' + alr.UHID + '" class="allotedtime fa fa-clock-o fa-lg" data-toggle="modal" data-target="#patientallotedtime"></a></td>';
            }
            $("#patientphysicianehrtable").html(patient_view);
        }


});
var new_dialogallottime = function (id) {
        var dlg = $("#doctor-form");
        type = type || 'Create';
//        var config = {
//            autoOpen: true,
//            height: 300,
//            width: 350,
//            modal: true,
//            buttons: {
//                "Create": save_doctor_data,
//                "Cancel": function () {
//                    dlg.dialog("close");
//                }
//            },
//            close: function () {
//                dlg.dialog("close");
//            }
//        };
        alert("Hi");
    };
$(".allotedtime").button().click(new_dialogallottime);
//patient ehr in nurse
});
$(function () {
    get_patient_data(function (data, status) {
        var patient_view = ""
        if (data.length >= 0) {
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                patient_view += '<tr >';
                patient_view += '<td  ><span  style="color: #64C1B1;font-weight: bolder;">' + alr.UHID + '</span></td>';
                patient_view += '<td><span>' + alr.pat.first_name + ' ' + '</span><span>' + alr.pat.middle_name + ' ' + '</span><span>' + alr.pat.last_name + '</span></td>';
                patient_view += '<td style="display:none"><span>' + alr.pat.last_name + '</span></td>';


                patient_view += '<td ><a style="color: #64c1b1; " href="/patient-profile/' + String(alr.pat.id) + '/"class="fa fa-user-circle fa-lg" ></a></td>';
                patient_view += '<td ><a style="color: #64c1b1; " href="/health-record/' + String(alr.pat.id) + '/"class="fa fa-file-text fa-lg" ></a></td>';

            }
            $("#patientnurseehrtable").html(patient_view);
        }
    });
});
/* patientinformation11111111111*/
$(function () {
    get_alternatecontact_data(function (data, status) {
        //console.log("***pinformation*****");
        var patientinformation_view = ""
        //console.log(data)
        patientinformation_view += '<tbody style="border:5px">';
        patientinformation_view += '<tr>';
        //                patientinformation_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="piedit">Edit</a></td>';
        patientinformation_view += '</tr>';

        patientinformation_view += '</tbody>';

        $("#information").html(patientinformation_view)

    });
});
/*personal111111111*/
$(function () {
    get_alternatecontact_data(function (data, status) {
        //console.log("********");
        var patientpersonal_view = ""


        patientpersonal_view += '<tbody style="border:5px">';
        patientpersonal_view += '<tr>';
        patientpersonal_view += '<td ><div><div>PATIENT NAME </div><div style="font-size:17px !important;color:black !important;">' + data.pat.first_name + " " + data.pat.middle_name + " " + data.pat.last_name + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td ><div><div>GENDER </div><div style="font-size:17px !important;color:black !important;">' + data.pat.gender + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td ><div><div>AGE</div><div style="font-size:17px !important;;color:black !important;">' + data.age + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td ><div><div>OCCUPATION </div><div style="font-size:17px !important;color:black !important;">' + data.occupation + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>BLOOD GROUP </div><div style="font-size:17px !important;color:black !important;">' + data.blood_group + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>MARITAL STATUS </div><div style="font-size:17px !important;color:black !important;">' + data.maritial_status + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>ETHNICITY </div><div style="font-size:17px !important;color:black !important;">' + data.ethnicity + '</div> </div></td>';
        // patientpersonal_view += '<td><hr></td>';



        //                patientpersonal_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="ppedit">Edit</a></td>';
        patientpersonal_view += '</tr>';

        patientpersonal_view += '</tbody>';

        $("#patientpersonaldetails").html(patientpersonal_view)

    });
});
$(function () {
    get_alternatecontact_data(function (data, status) {
        //console.log("********");
        var patientpersonal_view = ""

        patientpersonal_view += '<tbody style="border:5px">';
        patientpersonal_view += '<tr>';
        patientpersonal_view += '<td><div><div>EMAIL ADDRESS </div><div style="font-size:17px !important;color:black !important;">' + data.pat.email + '<div> </div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>PHONE NUMBER</div><div style="font-size:17px !important;color:black !important;">' + data.pat.phone + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>ADDRESS </div><div style="font-size:17px !important;color:black !important;">' + data.address + ", " + data.address2 + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>CITY </div><div style="font-size:17px !important;color:black !important;">' + data.city + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>STATE </div><div style="font-size:17px !important;color:black !important;">' + data.state + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>COUNTRY </div><div style="font-size:17px !important;color:black !important;">' + data.country + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td ><div><div>ZIP CODE</div><div style="font-size:17px!important;color:black !important;">' + data.zip_code + '</div></div></td>';


        //                patientpersonal_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="ppedit">Edit</a></td>';
        patientpersonal_view += '</tr>';

        patientpersonal_view += '</tbody>';

        $("#patientpersonaldetails2").html(patientpersonal_view)

    });
});
$(function () {
    get_alternatecontact_data(function (data, status) {
        //console.log("********");
        var patientpersonal_view = ""

        patientpersonal_view += '<tbody style="border:5px">';
        patientpersonal_view += '<tr>';

        patientpersonal_view += '<td><div><div>EMERGENCY CONTACT NAME </div><div style="font-size:17px !important;color:black !important;">' + data.emergencycontactfname + " " + data.emergencycontactlname + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>RELATIONSHIP </div><div style="font-size:17px !important;color:black !important;">' + data.emergencyrelationship + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>CONTACT NUMBER </div><div style="font-size:17px !important;color:black !important;">' + data.emergencycontactno + '</div></div></td>';


        //                patientpersonal_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="ppedit">Edit</a></td>';
        patientpersonal_view += '</tr>';

        patientpersonal_view += '</tbody>';

        $("#patientpersonaldetails3").html(patientpersonal_view)

    });
});
$(function () {
    get_alternatecontact_data(function (data, status) {
        //console.log("********");
        var patientpersonal_view = ""


        patientpersonal_view += '<tbody style="border:5px">';
        patientpersonal_view += '<tr>';

        patientpersonal_view += '<td><div><div>FAMILY DOCTOR NAME </div><div style="font-size:17px !important;color:black !important;">' + data.familyDoctorName + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>CONTACT NUMBER </div><div style="font-size:17px !important;color:black !important;">' + data.familycontactno + '</div></div></td>';
        patientpersonal_view += '<td><hr></td>';
        patientpersonal_view += '<td><div><div>REASON FOR REGISTRATION </div><div style="font-size:17px !important;color:black !important;">' + data.reason + '</div></div></td>';


        //                patientpersonal_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="ppedit">Edit</a></td>';
        patientpersonal_view += '</tr>';

        patientpersonal_view += '</tbody>';

        $("#patientpersonaldetails4").html(patientpersonal_view)

    });
});
/*contact111111111111111111*/
$(function () {
    get_alternatecontact_data(function (data, status) {
        //console.log("********");
        //console.log(data)
        var patientcontact_view = ""
        //console.log(data)
        patientcontact_view += '<tbody style="border:5px">';
        patientcontact_view += '<tr>';
        patientcontact_view += '<td><span style="color:#017b8b";>Email </span>:<span>' + data.pat.email + '</span></td>';
        patientcontact_view += '<td><span style="color:#017b8b";>Phone </span>:<span>' + data.phone + '</span></td>';

        patientcontact_view += '<td><span style="color:#017b8b";>Address </span>:<span>' + data.address + '</span></td>';
        patientcontact_view += '<td><span style="color:#017b8b";>City </span>:<span>' + data.city + '</span></td>';
        patientcontact_view += '<td><span style="color:#017b8b";>State </span>:<span>' + data.state + '</span></td>';
        patientcontact_view += '<td><span style="color:#017b8b";>Country </span>:<span>' + data.country + '</span></td>';
        patientcontact_view += '<td><span style="color:#017b8b";>Zip Code </span>:<span>' + data.zip_code + '</span></td>';
        //patientcontact_view += '<td><span style="color:#017b8b";>Note</span>:<span>'+ data.notes + '</span></td>';
        // patientcontact_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="pcedit">Edit</a></td>';
        patientcontact_view += '</tr>';
        patientcontact_view += '</tbody>';

        $("#patientcontactdetails").html(patientcontact_view)

    });
});
/* patientinformation in nurse ehr*/
$(function () {
    get_alternatecontact_data(function (data, status) {
        //console.log("***pinformation*****");
        var patientinformation_view = ""
        if (data.length >= 0) {
            for (var i = 0; i < data.length; i++) {
                var data = data[i]
                patientinformation_view += '<tbody style="border:5px">';
                patientinformation_view += '<tr>';
                patientinformation_view += '<td><span style="color:#017b8b";>Patient Name </span>:<span>' + data.pat.first_name + '</span><span>' + data.pat.last_name + '</span></td>';
                patientinformation_view += '<td><span style="color:#017b8b";>Email </span>:<span>' + data.pat.email + '</span></td>';
                patientinformation_view += '<td><span style="color:#017b8b";>Phone </span>:<span>' + data.pat.phone + '</span></td>';
                patientinformation_view += '<td><span style="color:#017b8b";>Gender </span>:<span>' + data.pat.gender + '</span></td>';
                patientinformation_view += '<td><span style="color:#017b8b";>DOB: </span>:<span>' + data.age + '</span></td>';
                //                patientinformation_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="piedit">Edit</a></td>';
                patientinformation_view += '</tr>';

                patientinformation_view += '</tbody>';
            }
            $("#informationnurse").html(patientinformation_view)
        }
    });
});


/*contact in nurse ehr*/
$(function () {
    get_alternatecontact_data(function (data, status) {
        //console.log("********");
        //console.log(data)
        var patientcontact_view = ""
        //console.log(data)
        patientcontact_view += '<tbody style="border:5px">';
        patientcontact_view += '<tr>';
        patientcontact_view += '<td><span style="color:#017b8b";>Address </span>:<span>' + data.address + '</span></td>';
        patientcontact_view += '<td><span style="color:#017b8b";>City </span>:<span>' + data.city + '</span></td>';
        patientcontact_view += '<td><span style="color:#017b8b";>State </span>:<span>' + data.state + '</span></td>';
        patientcontact_view += '<td><span style="color:#017b8b";>Country </span>:<span>' + data.country + '</span></td>';
        patientcontact_view += '<td><span style="color:#017b8b";>Zip Code </span>:<span>' + data.zip_code + '</span></td>';
        // patientcontact_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="pcedit">Edit</a></td>';
        patientcontact_view += '</tr>';
        patientcontact_view += '</tbody>';

        $("#patientcontactdetailsnurse").html(patientcontact_view)

    });
});
/*alternatecontact*/
$(function () {
    get_alternatecontact_data(function (data, status) {
        //console.log("********");
        //console.log(data)
        var alternatecontact_view = ""
        if (data.length >= 0) {
            //console.log(data)
            alternatecontact_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                alternatecontact_view += '<tbody style="border:5px">';
                alternatecontact_view += '<tr>';
                alternatecontact_view += '<td><span style="color:#017b8b";>Name </span>:<span>' + alr.fullname + '</span></td>';
                alternatecontact_view += '<td><span style="color:#017b8b";>Relation </span>:<span>' + alr.relativedby + '</span></td>';
                alternatecontact_view += '<td><span style="color:#017b8b";>Contact </span>:<span>' + alr.contactdetails + '</span></td>';
                // alternatecontact_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="paedit">Edit</a></td>';
                alternatecontact_view += '<td><hr></td>';
                alternatecontact_view += '</tr>';
            }
            alternatecontact_view += '</tbody>';

            $("#alternatecontact").html(alternatecontact_view)
        }
    });
});

/*patient details view*/
$(function () {
    get_alternatecontact_data(function (data, status) {
        //console.log("********");
        //console.log(data)

        var alternatecontact_view = ""
        if (data.length >= 0) {
            //console.log(data)

            alternatecontact_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]


                alternatecontact_view += '<tbody style="border:5px">';
                alternatecontact_view += '<tr>';
                alternatecontact_view += '<td><span>' + alr.pat.first_name + alr.pat.last_name + '</span></td>';
                alternatecontact_view += '<td><span>' + alr.pat.phone + '</span></td>';
                alternatecontact_view += '<td>:<span>' + alr.pat.email + '</span></td>';
                alternatecontact_view += '<td>:<span>' + alr.pat.blood_group + '</span></td>';
                alternatecontact_view += '<td>:<span>' + alr.pat.age + '</span></td>';
                // alternatecontact_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="paedit">Edit</a></td>';
                alternatecontact_view += '<td><hr></td>';
                alternatecontact_view += '</tr>';
            }
            alternatecontact_view += '</tbody>';

            $("#alternatecontact").html(alternatecontact_view)
        }
    });
});



//patient in reception edit
$(function () {
    get_patientreception_data(function (data, status) {
        var patient_view = ""
        patient_view += '<tr >';
        patient_view += '<td><span>' + pat.first_name + '</span></td>';
        patient_view += '<td><span>' + pat.last_name + '</span></td>';
        patient_view += '<td ><span>' + pat.gender + '</span></td>';
        patient_view += '<td style="display: none;"><span>' + pat.occupation + '</span></td>';
        patient_view += '<td style="display: none;"><span>' + blood_group + '</span></td>';
        patient_view += '<td style="display: none;"><span>' + maritial_status + '</span></td>';
        patient_view += '<td style="display: none;"><span>' + ethnicity + '</span></td>';

        patient_view += '<td style="display: none;"><span>' + age + '</span></td>';
        patient_view += '<td style="display: none;"><span>' + address + '</span></td>';
        patient_view += '<td style="display: none;"><span>' + city + '</span></td>';
        patient_view += '<td style="display: none;"><span>' + state + '</span></td>';
        patient_view += '<td style="display: none;"><span>' + country + '</span></td>';

        patient_view += '<td style="display: none;"><span>' + zip_code + '</span></td>';
        patient_view += '<td style="display: none;"><span>' + notes + '</span></td>';
        patient_view += '<td style="display: none;"><span>' + guardian + '</span></td>';


        patient_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.pat.id + '" class="patientreceptionistedit fa fa-pencil-square-o fa-lg "></a> </td>';
        patient_view += '<td><a style="color: #64c1b1; "  href="javascript:void(0)" data-id="' + alr.pat.id + '" class="patientdelete fa fa-trash-o fa-lg"></a></td>';
        patient_view += '<td ><a style="color: #64c1b1; " href="/patientprofile/' + String(alr.pat.id) + '/"class="fa fa-user-circle fa-lg" ></a></td>';
        patient_view += '<td ><a style="color: #64c1b1; " href="/healthrecordview/' + String(alr.pat.id) + '/"class="fa fa-file-text fa-lg" ></a></td>';
        //patient_view += '<td ><a style="color: #64c1b1; " href="/patientpart/"class="fa fa-user-circle fa-lg" ></a></td>';


        $("#patienttable").html(patient_view);
    });


    var new_dialog = function (type, row, patient_id) {
        var dlg = $("#patientreception-form");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 300,

            width: 350,
            modal: true,
            buttons: {
                "Create": save_patient_data,
                "Cancel": function () {

                    dlg.dialog("close");
                }
            },
            close: function () {
                dlg.dialog("close");
            }
        };

        if (type === 'Edit') {
            get_patient_data_for_edit(row);
            delete (config.buttons['Create']);
            config.buttons['Save'] = function () {
                edit_patient_data(pat.id)
                row.remove();
            };
            config.buttons['Cancel'] = function () {
                location.reload();

            };
        }
        dlg.dialog(config);

        function get_patient_data_for_edit(row) {
            $("#patientfname,#patientuserfname").hide();
            $("#patientlname,#patientuserlname").hide();
            $("#patientcontact,#patientusercontant").hide();
            $("#patientgender,#patientusergender").hide();
            $("#patientemail,#patientemailname").hide();
            $("#patientusername,#patientusernamename").hide();
            $("#patientPassword,#patientpasswordname,#passfield").hide();
            $("#patientoccupation").val($(row.children().find('span').get(9)).text());
            $("#patientbloodgroup").val();
            $("#patientmaritialstatus").val();
            $("#patientethnicity").val();
            $("#patientage").val($(row.children().find('span').get(7)).text());
            $("#patientaddress").val($(row.children().find('span').get(21)).text());
            $("#patientcity").val($(row.children().find('span').get(23)).text());
            $("#patientstate").val($(row.children().find('span').get(25)).text());
            $("#patientcountry").val($(row.children().find('span').get(27)).text());
            $("#patientzipcode").val($(row.children().find('span').get(29)).text());
            $("#patientnotes,#patientnotesname").hide();
            $("#patientguardian,#patientguardian_name").hide();
        }
        function edit_patient_data(id) {

            var fname = $("#patientfname").val();
            var mname = $("#patientmname").val();
            var lname = $("#patientlname").val();
            var patientstreetname = $("#patientstreetname").val();
            var patientstreetname2 = $("#patientstreetname2").val();
            var patientcity = $("#patientcity").val();
            var patientstate = $("#state").val();
            var patientzip = $("#patientzip").val();
            var patientcountry = $("#country").val();
            var patientcontactcode = $("#patientcontactcode").val();
            var patientcontactnumber = $("#patientcontactnumber").val();
            var contact = patientcontactcode + " " + patientcontactnumber;
            var patientemail = $("#patientemail").val();
            var patientgender = $("#patientgender").val();
            var patientdob = $("#patientdob").val();
            var patientAge = $("#patientAge").val();
            var patientmaritialstatus = $("#patientmaritialstatus").val();
            var patientethnicity = $("#patientethnicity").val();
            var patientbloodgroup = $("#patientbloodgroup").val();
            var patientecontactfname = $("#patientecontactfname").val();
            var patientecontactlname = $("#patientecontactlname").val();

            var relationname = patientecontactfname + " " + patientecontactlname;
            var patientrelation = $("#patientrelation").val();
            var patientrelationcontactcode = $("#patientrelationcontactcode").val();
            var patientrelationcontact = $("#patientrelationcontact").val();
            var emgcontact = patientrelationcontactcode + " " + patientrelationcontact;

            var patientfdoctor = $("#patientfdoctor").val();
            var patientdoctorcontactcode = $("#patientdoctorcontactcode").val();
            var patientdoctorcontact = $("#patientdoctorcontact").val();
            var patdoctorcontact = patientdoctorcontactcode + " " + patientdoctorcontact;
            var patoccupation = $("#patoccupation").val();
            var patientreason = $("#patientreason").val();



            var patient_data = {
                "pat": {

                    "email": patientemail,
                    "first_name": fname,
                    "last_name": lname,
                    "middle_name": mname,
                    "phone": contact,
                    "gender": patientgender,
                    "user_type": 7
                },
                "occupation": patoccupation,
                "blood_group": patientbloodgroup,
                "maritial_status": patientmaritialstatus,
                "ethnicity": patientethnicity,
                "dob": patientdob,
                'age': patientAge,
                "address": patientstreetname,
                "address2": patientstreetname2,
                "city": patientcity,
                "state": patientstate,
                "country": patientcountry,
                "zip_code": patientzip,

                "emergencycontactname": relationname,
                "emergencycontactno": emgcontact,
                "emergencyrelationship": patientrelation,
                "familyDoctorName": patientfdoctor,
                "familycontactno": patdoctorcontact,
                "reason": patientreason

            }
            //console.log(patient_data)
            update_patient(patient_data, function (data, status) {
                if (status == "success") {
                    location.reload();

                }
            });
        }

        function save_patient_data() {
            //console.log('suhas');
            var fname = $("#patientfname").val();
            var lname = $("#patientlname").val();
            var contact = $("#patientcontact").val();
            var gender = $("#patientgender").val();
            var email = $("#patientemail").val();
            var username = $("#patientusername").val();
            var password = $("#patientPassword").val();
            var occupation = $("#patientoccupation").val();
            var blood_group = $("#patientbloodgroup").val();
            var maritial_status = $("#patientmaritialstatus").val();
            var ethnicity = $("#patientethnicity").val();
            var age = $("#patientage").val();
            var address = $("#patientaddress").val();
            var city = $("#patientcity").val();
            var state = $("#patientstate").val();
            var country = $("#patientcountry").val();
            var zip_code = $("#patientzipcode").val();
            var notes = $("#patientnotes").val();
            var guardian = $("#patientguardian").val();

            var patient_data = {
                "pat": {
                    "username": username,
                    "gender": gender,
                    "Qualification": 'null',
                    "first_name": fname,
                    "last_name": lname,
                    "phone": contact,
                    "email": email,
                    "password": password,
                    "user_type": 7
                },
                "occupation": occupation,
                "blood_group": blood_group,
                "maritial_status": maritial_status,
                "ethnicity": ethnicity,
                "age": age,
                "address": address,
                "city": city,
                "state": state,
                "country": country,
                "zip_code": zip_code,
                "notes": notes,
                "guardian": guardian
            }
            save_patient(patient_data, function (data, status) {
                if (status == "success") {
                    $("#patientfname,#patientuserfname").val("");
                    $("#patientlname,#patientuserlname").val("").show();
                    $("#patientcontact,#patientusercontant").val("").show();
                    $("#patientgender,#patientusergender").val("").show();
                    $("#patientemail,#patientemailname").val("").show();
                    $("#patientusername,#patientusernamename").val("").show();
                    $("#patientPassword,#patientpasswordname,#passfield").val("").show();
                    $("#patientoccupation").val();
                    $("#patientbloodgroup").val();
                    $("#patientmaritialstatus").val();
                    $("#patientethnicity").val();
                    $("#patientage").val();
                    $("#patientaddress").val();
                    $("#patientcity").val();
                    $("#patientstate").val();
                    $("#patientcountry").val();
                    $("#patientzipcode").val();
                    $("#patientnotes").val();
                    $("#patientguardian").val();
                    load_patient();
                    dlg.dialog("close");
                }
            });
        }
    };


    $(document).on('click', 'a.patientdelete', function () {
        id = $(this).data('id');
        alert("delete ::" + id);
        delete_patient(id, function (data, status) {
            load_patient();
        });
        return false;
    });
    $(document).on('click', '.patientreceptionistedit', function () {
        new_dialog('Edit', $(this).parents('div'), $(this).data('id'));
        return false;
    });
    $(".patient-adduser").button().click(new_dialog);


});
//patient list in physician
$(function () {
    get_patient_data(function (data, status) {
        var patient_view = ""
        if (data.length >= 0) {
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                patient_view += '<tr >';
                patient_view += '<td><span>' + alr.pat.first_name + '</span></td>';
                patient_view += '<td><span>' + alr.pat.last_name + '</span></td>';
                patient_view += '<td ><span>' + alr.pat.gender + '</span></td>';
                patient_view += '<td><span>' + alr.pat.email + '</span></td>';
                patient_view += '<td style="display: none;" ><span>' + alr.phone + '</span></td>';
                //                    patient_view += '<td style="display: none;" ><span>'+ alr.username + '</span></td>';

                ////                    patient_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.pat.id + '" class="patientedit fa fa-pencil-square-o fa-lg "></a> </td>';
                //                    patient_view += '<td><a style="color: #64c1b1; "  href="javascript:void(0)" data-id="' + alr.pat.id + '" class="patientdelete fa fa-trash-o fa-lg"></a></td>';
                //                    patient_view += '<td ><a style="color: #64c1b1; " href="/patientpart/'+String(alr.pat.id)+'/"class="fa fa-user-circle fa-lg" ></a></td>';
                patient_view += '<td ><a style="color: #64c1b1; " href="/healthrecordview/' + String(alr.pat.id) + '/"class="fa fa-file-text fa-lg" ></a></td>';
                //patient_view += '<td ><a style="color: #64c1b1; " href="/patientpart/"class="fa fa-user-circle fa-lg" ></a></td>';

            }
            $("#patientphysiciantable").html(patient_view);
        }
    });
});

//patient_doctor_link
// 
//patient_doctor_link

//$(document).on('click', 'a.patientLink', function () {
//    var id = $(this).data('id');
//    console.log('pat_id', id);
//    //var date = $("#appointmentDate").val();
//
//    //  if (date!=''){
//        $("#appointmentDate").on("change", function () {
//    //        $('#appointmentDate').on('click', function() {
//             var date = $("#appointmentDate").val();
//
//            //         console.log("hgahgahgas",dateLength,typeof(dateLength))
//            //         alert(date.length)
//    //        console.log("date check"+date)
//            var doctorNameSpeciality = $("#doctorNameSpeciality").val();
//            console.log("check input value"+doctorNameSpeciality);
//            list = []
//            list = doctorNameSpeciality.split(' ');
//            var pat_id = id;
//
//            var doc_id = parseInt(list[0]);
//           console.log("id" + id)
//            var new_data = {
//                "patient": pat_id,
//                "doctor": doc_id,
//                "bookingdate":date,
//            };
//            update_booking_patient(new_data, function (sadata, status) {
//                slotbooking_patient(new_data, function (data, status) {
//
//    //                console.log("asas",data)
//                    var time=[]
//                    time += "<label>Select Time slot</label>"
//                    time += "<select class='form-control' id='doctorSlots'>"
//                    time += "<option value='' selected disabled>select</option>"
//                    for(i in data){
//
//                        time+="<option value='"+data[i]+"'>"+data[i]+"</option>"
//
//                    }
//                    time+="</select>"
//
//
//    //                console.log("dd",time)
//                    $("#slots").html(time)
//
//
//                });
//            });
//
//        });
//    //    }
//
//        /* appointment*/
//
//        $("#submitDoctorSpeciality").on("click", function () {
//            var doctorNameSpeciality = String($("#doctorNameSpeciality").val());
//            list = []
//            list = doctorNameSpeciality.split(' ');
//            var pat_id = id;
//            var doc_id = parseInt(list[0]);
//           var  date = $("#appointmentDate").val();
//           var time = $('#doctorSlots').val();
//    //        2019-05-29T09:30:00+05:30
//            console.log("submit enter" + doc_id)
//            var slot_data = {
//                "patient": pat_id,
//                "doctor": doc_id,
//                "bookingdate":date,
//                "bookingtime":time
//
//            };
//            var allot_data = {
//                "UHID": pat_id,
//                "doc_link": [doc_id],
//            };
//            slotbooking_patient(slot_data, function (data, status) {
//                    console.log("assign enter" + doc_id)
//                assign_patient(allot_data, function (data, status) {});
//            });
//
//
//
//        });
//    });



var new_dialog = function (type,id) {
//alert('pop up');
        var dlg = $("#doctoravailability-form");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                'Create' : function () {
                    save_doctor_available(id)
                        },
                "Cancel": function () {
                    dlg.dialog("close");
                }
            },
            close: function () {
                dlg.dialog("close");
            }
           };
        dlg.dialog(config)
    // });


        function save_doctor_available(id) {
//            alert(id,"dialogbox")
            var stime = $("#stime").val();

            var etime = $("#etime").val();
             var bstime = $("#bstime").val();
             var betime = $("#betime").val();
            var duration = $("#duration").val();
//            var doctor = $("#duration").val();
            var cfee =$("#cfee").val();
            //console.log(stime,etime,bstime,betime,duration,cfee)

            var save_slot_time =
            {
                "starttime": stime,
                "endtime": etime,
                 "breakstart": bstime,
                 "breakend"  : betime,
                "appointmnetduration":duration,
                "doctor": id,
                "consultationfee":cfee
            }

            //console.log(save_slot_time)
            doctor_available(save_slot_time, function (data, status) {
                        if (status == "success") {
                            $("#stime").val("");
                            $("#etime").val("");
                            $("#bstime").val();
                            $("#betime").val();
                            $("#duration").val("");
                            $("#cfee").val('');
//                            $("#doctor").val("");


                            // load_doctor();

                            dlg.dialog("close");
                            $("Create").click(function(){
                                $("p").off("click");
                              });
                        }

                    });


        }

    }

$(document).on('click', 'td a.doctoravailability', function () {
    id = $(this).data('id');
//     alert(id);
    // alert("doctor availability"+id)
    new_dialog('Create', id);
//    alert(id);
    return false;
    });
});

// doctor availability
//$(document).on('click', 'td a.doctoravailability', function () {
////alert('doctor availabilityy');
//    id = $(this).data('id');
////     alert(id);
//    // alert("doctor availability"+id)
//    new_dialog('Create',id);
////    alert(id);
//    return false;
//    });

//appointdoctorcontentment time get


$(document).on('click', 'a.getpatientlinks', function () {
    var id = $(this).data('id');
    //console.log('patient_id', id);

    get_appointmenttime_data(id,function(data,status){
            var t ='';
            for(var i = 0; i < data.length; i++){
            alr =data[i]
//            t += '<li><span>'+alr.doctor+'---'+alr.bookingtime+' ('+alr.bookingdate+')'+'</span></li>'
              t +='<tr>'
              t+='<td><span>'+alr.doctor+'</span></td>'
              t+='<td><span>'+alr.bookingtime+'</span></td>'
              t+='<td><span>'+alr.bookingdate+'</span></td>'
              t+='<td><a href="javascript:void(0)" data-id= "' + alr.doctor_id + '" data-bookingdate="' + alr.bookingdate + '" data-bookingtime="' + alr.bookingtime + '" class="cancelappoint fa fa-calendar-times-o" ></a></td>'
             
            }
           // console.log(t,'tttttttttt');
            $("#doctorbookingtable").html(t)

    });
});
//    function feed_dialog(type, t) {
////        var data = tij
//    console.log(type,'getttt')
//    console.log(t,'data')
////        alert('gsdfxvh',type)
//    $("#doctorcontent-form").show();
//        var dlg = $("#assignedDoctorView");
//        $('#doctorcontent').html(t)
//        type = type || 'get';
//        var config = {
//            autoOpen: true,
//            height: 300,
//            width: 350,
//            modal: true,
//            buttons: {
//                "Cancel": function () {
//                    dlg.dialog("close");
//                }
//            },
//            close: function () {
//                dlg.dialog("close");
//            }
//        };
//
//        dlg.dialog(config)
//        }
//    });

//alloted time in physician

$(document).on('click','a.allotedtime', function(id){
        var id = $(this).data('id');
//        alert(id)

    get_allotedtime_data(id,function(data,status){
            var t ='<table>';
            for(var i = 0; i < data.length; i++){

            alr =data[i]
            t += '<li><span>'+'<span style="color:#64c1b1">'+'Alloted Time : '+'</span>'+alr.bookingtime+' ('+alr.bookingdate+')'+'</span></li>'
            }
            t+='</table>'
            $("#patientbookedtime").html(t)
            //console.log(t,'tttttttttt');

    });
});
$(document).on('click','a.cancelappoint', function(id){

 var id = $(this).data('id');
 var bookingdate = $(this).data('bookingdate')
 var bookingtime = $(this).data('bookingtime')
// console.log('patient_id', id, bookingdate, bookingtime);
data ={
"id":id,
"bookingdate":bookingdate,
"bookingtime":bookingtime

}

cancelappoint(data,function(data,status){
//load_cancelappoint();
//console.log("p",data)
get_appointmenttime_data(data["patient_id"],function(data,status){
            var t ='';
            for(var i = 0; i < data.length; i++){
            alr =data[i]
//            t+= '<li><span>'+alr.doctor+'---'+alr.bookingtime+' ('+alr.bookingdate+')'+'</span></li>'
              t+='<tr>'

              t+='<td><span>'+alr.doctor+'</span></td>'
              t+='<td><span>'+alr.bookingtime+'</span></td>'
              t+='<td><span>'+alr.bookingdate+'</span></td>'
              t+='<td><a href="javascript:void(0)" data-id= "' + alr.doctor_id + '" data-bookingdate="' + alr.bookingdate + '" data-bookingtime="' + alr.bookingtime + '" class="cancelappoint fa fa-calendar-times-o" ></a></td>'
            }
            //console.log(t,'tttttttttt');
            $("#doctorbookingtable").html(t)

    });

})


});




