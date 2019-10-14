//doctor
function save_doctor(data, call_back){
//console.log('suhas services');
    $.ajax({
 type: "POST",
 url: "/createdoctor/",
 data: JSON.stringify(data),
 contentType: "application/json",
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                //console.log(XMLHttpRequest.responseText);
                //console.log(XMLHttpRequest.responseText);
                var abc = XMLHttpRequest.responseJSON;
                //console.log(abc);
                var a=JSON.parse( XMLHttpRequest.responseText);
                //console.log('json object of a :', a)
                var b=a.doc;
                //if (a.doc.username=="user with this username already exists."){
                if (a.doc.username == "A user with that username already exists."){
                //console.log('this is inside of username error comming from database')
                $("#dialogboxUsername").show();
                $("#errorMsgUserName1").html("username already exists");
                $("#dialogboxUsername").delay(2000).fadeOut();
                }
//                var a=JSON.parse( XMLHttpRequest.responseText);
//                var b=a.doc
//                var keys1=Object.keys(a)
//
//                var keys=Object.keys(b)
//
//                 var keys=(keys.concat(keys1));
//
//                 var str= String(keys);
//
//                var str2='Please fill out thease fields                         ';
//
//                 alert(str2.concat(str));
                    $("#dialogbox").show();
            $("#dialogbox").delay(2000).fadeOut();




//                document.getElementById("demo").innerHtml=keys;
//                alert(XMLHttpRequest.status + ' ' +
//                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_doctor_data(call_back){
 console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/getdoctor/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);

                return false;
              }
        });
}
function  update_doctor(data,call_back){
    $.ajax({
             type: "PUT",
             
             url: "/rud_doctor_details/"+data.doc.id+"/",
            
             contentType: "application/json",
             data:JSON.stringify(data),
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //Process error actions
                            console.log( XMLHttpRequest.responseText);
                            console.log(XMLHttpRequest.status + ' ' +
                                XMLHttpRequest.statusText);
                            return false;
                          }
            });
            }
function delete_doctor(id,call_back) {
    jQuery.ajax({
        url: '/rudusers_delete/' + id +"/",
        type: 'DELETE',
        success: function(data,status) {
            call_back(data,status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
    });
}

//nurse

function save_nurse(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createnurse/",
 data: JSON.stringify(data),
 contentType: "application/json",
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                 console.log(XMLHttpRequest.responseText);
                var abc = XMLHttpRequest.responseJSON;
                console.log('abc',abc);
                var a=JSON.parse( XMLHttpRequest.responseText);
//                console.log('json object of a :', a)
                console.log('a.nurse_user.username',a.nurse_user.username);
                //if (a.doc.username=="user with this username already exists."){
                //if (a.nurse_user.username=="user with this username already exists."){
                if (a.nurse_user.username == "A user with that username already exists."){
                console.log('this is inside of username error comming from database')
                $("#dialogboxUsername").show();
                $("#errorMsgUserName1").html("username already exists");
                $("#dialogboxUsername").delay(2000).fadeOut();
                }
//                var a=JSON.parse( XMLHttpRequest.responseText);
//                var b=a.nurse_user;
//                var keys1=Object.keys(a)
//
//                var keys=Object.keys(b)
//
//                 var keys=(keys.concat(keys1));
//
//                 var str= String(keys);
//
//                var str2='Please fill out thease fields                         ';
//
//                 alert(str2.concat(str));

//                console.log(XMLHttpRequest.status + ' ' +
//                    XMLHttpRequest.statusText);
                $("#dialogbox").show();
                 $("#dialogbox").delay(2000).fadeOut();



                return false;
              }
});
}
function get_nurse_data(call_back){
 console.log(" ### get_nurse_data ###");
         $.ajax({
             type: "GET",
             url: "/getnurses/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}
function  update_nurse(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/rud_nurse_details/"+data.nurse_user.id+"/",
 contentType: "application/json",
 data:JSON.stringify(data),
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function delete_nurse(id,call_back) {
    jQuery.ajax({
        url: '/rudusers_delete/' + id +"/",
        type: 'DELETE',
        success: function(data,status) {
            call_back(data,status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
    });
}

function get_nursepersonal_data(call_back){
 console.log(" ### get_nurses_data ###");
         $.ajax({
             type: "GET",
             url: "/getnurses/"+doctor_id+"/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}

//pharma


function save_pharma(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createpharmasist/",
 data: JSON.stringify(data),
 contentType: "application/json",
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                 console.log('XMLHttpRequest.responseText')
                console.log(XMLHttpRequest.responseText);
                var abc = XMLHttpRequest.responseJSON;
                console.log('abc',abc);
                var a=JSON.parse( XMLHttpRequest.responseText);
//                console.log('json object of a :', a)
                console.log('a.nurse_user.username',a.pharma_user.username);
                //if (a.doc.username=="user with this username already exists."){
                //if (a.pharma_user.username=="user with this username already exists."){
                if (a.pharma_user.username == "A user with that username already exists."){
                console.log('this is inside of username error comming from database')
                $("#dialogboxUsername").show();
                $("#errorMsgUserName1").html("username already exists");
                $("#dialogboxUsername").delay(2000).fadeOut();
                }
//                var a=JSON.parse( XMLHttpRequest.responseText);
//                var b=a.pharma_user
//                var keys1=Object.keys(a)
//
//                var keys=Object.keys(b)
//
//                 var keys=(keys.concat(keys1));
//
//                 var str= String(keys);
//
//                var str2='Please fill out thease fields                         ';
//
//                 alert(str2.concat(str));
$("#dialogbox").show();
            $("#dialogbox").delay(2000).fadeOut();



//                console.log(XMLHttpRequest.status + ' ' +
//                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_pharma_data(call_back){
 console.log(" ### get_pharma_data ###");
         $.ajax({
             type: "GET",
             url: "/getpharmasist/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}
function  update_pharma(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/rud_Pharmacist_details/"+data.pharma_user.id+"/",
 contentType: "application/json",
 data:JSON.stringify(data),
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function delete_pharma(id,call_back) {
    jQuery.ajax({
        url: "/rudusers_delete/"+id+"/",
        type: 'DELETE',
        success: function(data,status) {
            call_back(data,status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
    });
}

function get_pharmapersonal_data(call_back){
 console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/getpharma/"+doctor_id+"/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}

//receptionist


function save_receptionist(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createreceptionist/",
 data: JSON.stringify(data),
 contentType: "application/json",
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                  console.log( XMLHttpRequest.responseText);
               var a=JSON.parse( XMLHttpRequest.responseText);
                console.log('error in save receptionist')
                //if (a.username=="user with this username already exists."){
                if (a.user.username == "A user with that username already exists."){
                console.log('this is inside of username error comming from database')
                $("#dialogboxUsername").show();
                $("#errorMsgUserName1").html("username already exists");
                $("#dialogboxUsername").delay(2000).fadeOut();
                }
//                var a=JSON.parse( XMLHttpRequest.responseText);
//
//
//                var keys=Object.keys(a)
//
//
//                 var str= String(keys);
//
//                var str2='Please fill out thease fields                         ';
//
//                 alert(str2.concat(str));
//
$("#dialogbox").show();
            $("#dialogbox").delay(2000).fadeOut();



////                console.log(XMLHttpRequest.status + ' ' +
////                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_receptionist_data(call_back){
 console.log(" ### get_receptionist_data ###");
         $.ajax({
             type: "GET",
             url: "/getReceptionistList/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}
function  update_receptionist(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/ruduser/"+data.user+"/",
 contentType: "application/json",
 data:JSON.stringify(data),
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function delete_receptionist(id,call_back) {
    jQuery.ajax({
        url: '/rudusers_delete/' + id +"/",
        type: 'DELETE',
        success: function(data,status) {
            call_back(data,status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
    });
}

function get_receptionistpersonal_data(call_back){
 console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/getreceptionist/"+doctor_id+"/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}
//laboratorist
function save_laboratorist(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createlaboratorist/",
 data: JSON.stringify(data),
 contentType: "application/json",
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                var a=JSON.parse( XMLHttpRequest.responseText);
                var b=a.lab_user
                 console.log('XMLHttpRequest.responseText')
                console.log(XMLHttpRequest.responseText);
                var abc = XMLHttpRequest.responseJSON;
                console.log('abc',abc);
                var a=JSON.parse( XMLHttpRequest.responseText);
//                console.log('json object of a :', a)
                console.log('a.lab_user.username',a.lab_user.username);
                //if (a.doc.username=="user with this username already exists."){
                //if (a.lab_user.username=="user with this username already exists."){
                if (a.lab_user.username == "A user with that username already exists."){
                console.log('this is inside of username error comming from database')
                $("#dialogboxUsername").show();
                $("#errorMsgUserName1").html("username already exists");
                $("#dialogboxUsername").delay(2000).fadeOut();
                }
//                var keys1=Object.keys(a)
//
//                var keys=Object.keys(b)
//
//                 var keys=(keys.concat(keys1));
//
//                 var str= String(keys);
//
//                var str2='Please fill out thease fields                         ';
//
//                 alert(str2.concat(str));
$("#dialogbox").show();
            $("#dialogbox").delay(2000).fadeOut();



//                console.log(XMLHttpRequest.status + ' ' +
//                    XMLHttpRequest.statusText);
//                return false;
              }
});
}
function get_laboratorist_data(call_back){
 console.log(" ### get_laboratorist_data ###");
         $.ajax({
             type: "GET",
             url: "/getLabTechnicianList",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}
function  update_laboratorist(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/rud_Laboratorist_details/"+data.lab_user.id+"/",
 contentType: "application/json",
 data:JSON.stringify(data),
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function delete_laboratorist(id,call_back) {
    jQuery.ajax({
        url: '/rudusers_delete/' + id +"/",
        type: 'DELETE',
        success: function(data,status) {
            call_back(data,status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
    });
}

//patientlist
function save_patient(data, call_back){
console.log('suhas services');
    $.ajax({
 type: "POST",
 url: "/createpatient/",
 data: JSON.stringify(data),
 contentType: "application/json",
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
//                var a=JSON.parse( XMLHttpRequest.responseText);
//                var b=a.pat
//                var keys1=Object.keys(a)
//
//                var keys=Object.keys(b)
//
//                 var keys=(keys.concat(keys1));
//
//                 var str= String(keys);
//
$("#dialogbox").show();
            $("#dialogbox").delay(2000).fadeOut();



//                var str2='Please fill out thease fields                         ';
//
//                 alert(str2.concat(str));

                return false;
              }
});
}
function get_patient_data(call_back){
//  console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/getpatients/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}
function update_patient(data,call_back){
        console.log('dsdsd',data)
         $.ajax({
 type: "PATCH",
 url: "/update_Patient_details/"+data.pat.id+"/",
 contentType: "application/json",
 data:JSON.stringify(data),
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        console.log("pro",data.pat.id)
        call_back(data,status);
        window.location.pathname="/patient__profile/"+data.pat.id+"/";
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function delete_patient(id,call_back) {
    jQuery.ajax({
        url: '/ruduser/' + id +"/",
        type: 'DELETE',
        success: function(data,status) {
            call_back(data,status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
         }
    });
}

function get_laboratoristpersonal_data(call_back){
 console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/getlaboratorist/"+doctor_id+"/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}

function get_usercount_data(call_back){
 console.log(" ### get_userlog_data ###");
}

//patient data in profile

function get_alternatecontact_data(call_back){
     $.ajax({
         type: "GET",
         url: "/rudpatientdetails/"+pat_id+"/",
         contentType: "application/json",
         dataType: "json",
         success: function (data, status) {
                call_back(data,status);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //Process error actions
            console.log( XMLHttpRequest.responseText);
            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
         }
     });
}

function get_patientreception_data(call_back){
    $.ajax({
        type: "GET",
        url: "/rudpatientdetails/"+pat_id+"/",
        contentType: "application/json",
        dataType: "json",
        success: function (data, status) {
               call_back(data,status);
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
           //Process error actions
           console.log( XMLHttpRequest.responseText);
           console.log(XMLHttpRequest.status + ' ' +
               XMLHttpRequest.statusText);
           return false;
        }
    });
}




function get_patient_receptionist_dashboard_data(call_back){
 console.log(" ### get_patient_data ###");

         $.ajax({
             type: "GET",
             url: "/getpatients/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}

//ansakasak
//appointment
function slotbooking_patient(data,call_back) {
    console.log(" ### get_patient_data ###",data);
//    alert(data.dateLength);
    $.ajax({
        type: "GET",
        url: "/get_appointment/get/"+data.patient+"/",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data, status) {
        //    console.log(data[0].choices)
           var timeSlots =data[0].choices.split(',')
           console.log(timeSlots)
           call_back(timeSlots)
//            window.location.pathname = '/patient_list/';
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    })
}
function update_booking_patient(data,call_back) {
    console.log(" ### get_patient_data ###",data);
//    alert(data.dateLength);
    $.ajax({
        type: "PUT",
        url: "/appointment/put/"+data.doctor+"/",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data, status) {
           
           call_back(data)
//            window.location.pathname = '/patient_list/';
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    })
}
//link patient

function assign_patient(data,call_back) {
    console.log(" ### get_patient_data ###",data);
    console.log('sss',data.UHID,'doc_link id',data.doc_link)
    $.ajax({
        type: "PUT",
        url: "/link_patient/"+data.UHID+"/",
        // data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data, status) {
            window.location.pathname = '//';
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    })
}

//link patient

// function assign_patient(data,call_back) {
//     console.log(" ### get_patient_data ###",data);
//     console.log('sss',data.pat,'doc_link id',data.doc_link)
//     $.ajax({
//         type: "PUT",
//         url: "/link_patient/"+data.pat+"/",
//         data: JSON.stringify(data),
//         contentType: "application/json",
//         dataType: "json",
//         success: function (data, status) {
//             window.location.pathname = '/patient_list/';
//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {
//             //Process error actions
// //            alert(XMLHttpRequest.responseText);
//             console.log(XMLHttpRequest.status + ' ' +
//                 XMLHttpRequest.statusText);
//             return false;
//         }
//     })
// }


function get_patientindoctor_data(call_back){
 console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/getpatientsdoctor/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}
//changes appointment june
function doctor_available(data,call_back){
  console.log(" ### create_doctor_availablity_data ###");
        $.ajax({
            type: "POST",
            url: "/doctoravailability/",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",
            success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            //Process error actions
            console.log( XMLHttpRequest.responseText);
            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
            }
        });
   }

//link patient
 function assign_patient(data,call_back) {
    console.log(" ### get_patient_data ###",data);
    console.log('sss',data.UHID,'doc_link id',data.doc_link)
    $.ajax({
        type: "PUT",
        url: "/link_patient/"+data.UHID+"/",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data, status) {
//        alert(data)
//            window.location.pathname = '/patient_list/';
        call_back(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;

        }
    })
}

//update patient booking
function update_booking_patient(data,call_back) {
    console.log(" ### get_patient_data ###",data);
//    alert(data.dateLength);
    $.ajax({
        type: "PUT",
        url: "/appointment/",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data, status) {

           call_back(data)
//            window.location.pathname = '/patient_list/';
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    })
}


function appointment_booking_patientpatient(data,call_back) {
    console.log(" ### get_patient_data ###",data);
//    alert(data.dateLength);
    $.ajax({
        type: "POST",
        url: "/appointment/",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: function (data, status) {
//           console.log(data[0].choices)
//           var timeSlots =data[0].choices.split(',')
//           console.log(timeSlots)
//           call_back(timeSlots)
//            window.location.pathname = '/patient_list/';
                call_back(data)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    })
}


//ansakasakslotbooking_patient
//appointment
function slotbooking_patient(data,call_back) {
    console.log(" ### get_patient_data ###",data);
//    alert(data.dateLength);
    $.ajax({
        type: "GET",
        url: "/get_appointment/get/"+data.doctor+"/",
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function (data, status) {
           console.log(data.choices)

           var timeSlots =data.choices
           console.log(timeSlots)
           call_back(timeSlots)
//            window.location.pathname = '/patient_list/';
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    })
}

//create cbc test details
function lab_test_details(data, call_back) {
    // console.log(" ### create_Laboratory_test_details ###", data);
    // console.log("dsa", data)
    $.ajax({
        type: "POST",
        url: "/create_cbc/",
        contentType: "application/json",
        headers: { "X-CSRFToken": $crf_token },
        data: JSON.stringify(data),
        dataType: "json",
        success: function (data, status) {
            call_back(data, status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    });
}
//delete cbc test details
function delete_cbc_labtest_data(id,call_back) {
    jQuery.ajax({
        url: '/delete_cbc_labtest_data/' + id +"/",
        type: 'DELETE',
        headers:{"X-CSRFToken": $crf_token},
        success: function(data,status) {
            call_back(data,status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
    });
}
//get cbc test details
function get_cbc_labtest_data(call_back) {
    $.ajax({
        type: "GET",
        url: "/get_cbc/" + pat_id + "/",
        contentType: "application/json",
        dataType: "json",
        success: function (data, status) {
            call_back(data, status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    });
}

function  update_cbc_labtest_data(data,call_back){
    // console.log('sssss'+data.id);
    
    $.ajax({
        
        type: "PUT",
        url: "/update_cbc_labtest_data/"+data.id+"/",
        contentType: "application/json",
        data:JSON.stringify(data),
        dataType: "json",
        // data:JSON.stringify(data),
        headers:{"X-CSRFToken": $crf_token},
        success: function (data, status) {
            call_back(data,status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log( XMLHttpRequest.responseText);
            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    });
}

//get appointment time


//billing

function consultfee(data, call_back){
console.log(data,'fiiiiii')
  $.ajax({
        type: "POST",
        url: "/consultfee/",
        contentType: "application/json",
        dataType: "json",
        data:JSON.stringify(data),
        success: function (data, status){
            call_back(data, status);
        },

               error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    });
}

function bill(data, call_back){
console.log(data,'fiiiiii')
  $.ajax({
        type: "POST",
        url: "/bill/",
        contentType: "application/json",
        dataType: "json",
        data:JSON.stringify(data),
        success: function (data, status){
            call_back(data, status);
        },

               error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    });
}
//get_appointment times in receptionist
function get_appointmenttime_data(data,call_back) {
console.log("get app data",data)
    $.ajax({
        type: "GET",
        url: "/getappointtime/get/" + data + "/",
        contentType: "application/json",
        dataType:  "json",
        success: function (data, status) {
            console.log("appointment time data",data)
            call_back(data, status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    });
}

//get latest patients list

function cancelappoint(data,gtee) {
//console.log("get allot data",data)
    $.ajax({
        type: "DELETE",
        url: "/appointment/"+data["id"]+"/?bookingdate="+data["bookingdate"]+"&bookingtime="+data["bookingtime"],
        contentType: "application/json",
        dataType:  "json",
        data:JSON.stringify(data),
        success: function (data, status) {
            console.log("appointment time data",data)
            gtee(data, status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    });
}

function get_latestpatient_data(call_back){
//  console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/getpatientslatest/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}

//get alloted times in physician dashboard


function get_allotedtime_data(data,call_back) {
console.log("get allot data",data)
    $.ajax({
        type: "GET",
        url: "/getappointtime/get/" + data + "/",
        contentType: "application/json",
        dataType:  "json",
        success: function (data, status) {
            console.log("appointment time data",data)
            call_back(data, status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
            console.log(XMLHttpRequest.status + ' ' +
                XMLHttpRequest.statusText);
            return false;
        }
    });
}
