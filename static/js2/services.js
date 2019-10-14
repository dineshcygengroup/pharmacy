//111111allergy post get update delete

//function get_user_info(call_back){
//        console.log(" ### get_user_info ###");
//         $.ajax({
//             type: "GET",
//             url: "/getuserinfo/",
//             contentType: "application/json",
//             dataType: "json",
//             success: function (data, status) {
//                    call_back(data,status);
//                },
//                error: function (XMLHttpRequest, textStatus, errorThrown) {
//                //Process error actions
//                alert( XMLHttpRequest.responseText);
//                console.log(XMLHttpRequest.status + ' ' +
//                    XMLHttpRequest.statusText);
//                return false;
//              }
//        });
//}




function save_allergy(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createallergie/",
 data: JSON.stringify(data),
 contentType: "application/json",
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log(XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_allergy_data(call_back){
 console.log(" ### get_allergy_data ###");
         $.ajax({
             type: "GET",
             url: "/getallergie/"+patient_id+"/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
            console.log(data)
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
function update_allergy(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udallergie/"+data.id+"/",
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
function delete_allergy(id, call_back) {
    jQuery.ajax({
        url: '/udallergie/' + id +"/",
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

//22222222222222social history post get update delete

function save_socialhistory(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createsocialhistory/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_socialhistory_data(call_back){
 console.log(" ### get_socialhistory_data ###");
         $.ajax({
             type: "GET",
             url: "/getsocialhistory/"+patient_id+"/",
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
function update_socialhistory(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udsocialhistory/"+data.id+"/",
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
function delete_socialhistory(id,call_back) {
    jQuery.ajax({
        url: '/udsocialhistory/' + id +"/",
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

//333333333333family history post get update delete

function save_familyhistory(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createfamilyhistory/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_familyhistory_data(call_back){
 console.log(" ### get_familyhistory_data ###");
         $.ajax({
             type: "GET",
             url: "/getfamilyhistory/"+patient_id+"/",
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
function update_familyhistory(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udfamilyhistory/"+ data.id +"/",
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
function delete_familyhistory(id,call_back) {
    jQuery.ajax({
        url: '/udfamilyhistory/' + id +"/",
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

//4444444444444444 vitals post get update delete

function save_vital(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createvital/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_vital_data(call_back){
 console.log(" ### get_vital_data ###");
         $.ajax({
             type: "GET",
             url: "/getvital/"+patient_id+"/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
            console.log("dgsgjgk",data);
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

function update_vital(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udvital/"+data.id+"/",
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
function delete_vital(id,call_back) {
    jQuery.ajax({
        url: '/udvital/'+ id +"/",
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

//555555555 problem post get update delete

function save_problems(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createproblems/",
 data: JSON.stringify(data),
 contentType: "application/json",
 dataType: "json",
 success: function (data, status) {
//        alert("Data: " + data + "\nStatus: " + status);
        call_back(data,status);
    },
    error: function (data, status) {
    console.log(data);
    console.log(status);

    }
});
}
function get_problems_data(call_back){
 console.log(" ### get_vital_data ###");
         $.ajax({
             type: "GET",
             url: "/getproblems/"+patient_id+"/",
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
function update_problems(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udproblems/"+data.id+"/",
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
function delete_problems(id,call_back) {
    jQuery.ajax({
        url: '/udproblems/' + id +"/",
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

//666666666666visitreason post get update delete

function save_visitreason(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createvisitreason/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_visitreason_data(call_back){
 console.log(" ### get_visitreason_data ###");
         $.ajax({
             type: "GET",
             url: "/getvisitreason/"+patient_id+"/",
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
function update_visitreason(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udvisitreason/"+data.id+"/",
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
function delete_visitreason(id,call_back) {
    jQuery.ajax({
        url: '/udvisitreason/' + id +"/",
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
//777777777777777procedure post get update delete

function save_procedure(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createprocedure/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_procedure_data(call_back){
 console.log(" ### get_procedure_data ###");
         $.ajax({
             type: "GET",
             url: "/getprocedure/"+patient_id+"/",
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
function update_procedure(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udprocedure/"+data.id+"/",
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
function delete_procedure(id,call_back) {
    jQuery.ajax({
        url: '/udprocedure/' + id +"/",
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

//88888888888888888diagnostic post get update delete

function save_diagnostic(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createtestsresults/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_diagnostic_data(call_back){
 console.log(" ### get_diagnostic_data ###");
         $.ajax({
             type: "GET",
             url: "/gettestsresults/"+patient_id+"/",
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
function update_diagnostic(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udtestsresults/"+data.id+"/",
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
function delete_diagnostic(id,call_back) {
    jQuery.ajax({
        url: '/udtestsresults/' + id +"/",
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

//999999999999999 medications post get update delete

function save_medications(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createmedications/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_medications_data(call_back){
 console.log(" ### get_medication_data ###");
         $.ajax({
             type: "GET",
             url: "/getmedications/"+patient_id+"/",
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
function update_medications(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udmedications/"+data.id+"/",
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
function delete_medications(id,call_back) {
    jQuery.ajax({
        url: '/udmedications/' + id +"/",
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

//1010101010101010101010 vaccine

function save_vaccine(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createvaccine/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_vaccine_data(call_back){
 console.log(" ### get_medication_data ###");
         $.ajax({
             type: "GET",
             url: "/getvaccine/"+patient_id+"/",
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
function update_vaccine(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udvaccine/"+data.id+"/",
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
function delete_vaccine(id,call_back) {
    jQuery.ajax({
        url: '/udvaccine/' + id +"/",
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

//1111111111111 status

function save_status(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createstatus/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_status_data(call_back){
 console.log(" ### get_medication_data ###");
         $.ajax({
             type: "GET",
             url: "/getstatus/"+patient_id+"/",
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
function update_status(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udstatus/"+data.id+"/",
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
function delete_status(id,call_back) {
    jQuery.ajax({
        url: '/udstatus/' + id +"/",
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

//1212121212121212121212121212 amendments

function save_amendments(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createamendements/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_amendments_data(call_back){
 console.log(" ### get_medication_data ###");
         $.ajax({
             type: "GET",
             url: "/getamendements/"+patient_id+"/",
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
function update_amendments(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udamendements/"+data.id+"/",
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
function delete_amendments(id,call_back) {
    jQuery.ajax({
        url: '/udamendements/' + id +"/",
        type: 'DELETE',
        success: function(data,status) {
            call_back(data,status);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                alert( XMLHttpRequest.responseText);
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
    });
}


//13131313131313131313131313131313 advane directives

function save_advancedirectives(data, call_back){
    $.ajax({
 type: "POST",
 url: "/creatadvancederivatives/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_advancedirectives_data(call_back){
 console.log(" ### get_medication_data ###");
         $.ajax({
             type: "GET",
             url: "/getadvancederivatives/"+patient_id+"/",
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
function update_advancedirectives(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udadvancederivatives/"+data.id+"/",
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
function delete_advancedirectives(id,call_back) {
    jQuery.ajax({
        url: '/udadvancederivatives/' + id +"/",
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

//1414141414144141414141414 allert

function save_allert(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createalert/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_allert_data(call_back){
 console.log(" ### get_medication_data ###");
         $.ajax({
             type: "GET",
             url: "/getalert/"+patient_id+"/",
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
function update_allert(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udalert/"+data.id+"/",
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
function delete_allert(id,call_back) {
    jQuery.ajax({
        url: '/udalert/' + id +"/",
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


//1515151515151515151515 note

function save_note(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createnote/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_note_data(call_back){
 console.log(" ### get_note_data ###");
         $.ajax({
             type: "GET",
             url: "/getnote/"+patient_id+"/",
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
function update_note(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udnote/"+data.id+"/",
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
function delete_note(id,call_back) {
    jQuery.ajax({
        url: '/udnote/' + id +"/",
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

//16161616616161616161616161 goal

function save_goal(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createehrgoal/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_goal_data(call_back){
 console.log(" ### get_note_data ###");
         $.ajax({
             type: "GET",
             url: "/getehrgoal/"+patient_id+"/",
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
function update_goal(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udehrgoal/"+data.id+"/",
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
function delete_goal(id,call_back) {
    jQuery.ajax({
        url: '/udehrgoal/' + id +"/",
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

//1717171717171717171717 symptoms

function save_symptoms(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createsymtoms/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_symptoms_data(call_back){
 console.log(" ### get_note_data ###");
         $.ajax({
             type: "GET",
             url: "/getsymtoms/"+patient_id+"/",
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
function update_symptoms(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udsymtoms/"+data.id+"/",
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
function delete_symptoms(id,call_back) {
    jQuery.ajax({
        url: '/udsymtoms/' + id +"/",
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

//18181818181818181818111 inpatient

function save_inpatient(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createinpatientdetails/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_inpatient_data(call_back){
 console.log(" ### get_note_data ###");
         $.ajax({
             type: "GET",
             url: "/getinpatientdetails/"+patient_id+"/",
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
function update_inpatient(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udinpatientdetails/"+data.id+"/",
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
function delete_inpatient(id,call_back) {
    jQuery.ajax({
        url: '/udinpatientdetails/' + id +"/",
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

//1919191919191919191919191 attachfile

function save_attachfile(data, call_back){
 $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/createattachfile/",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
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
function get_attachfile_data(call_back){
 console.log(" ### get_note_data ###");




         $.ajax({
             type: "GET",
             url: "/getattachfile/"+patient_id+"/",
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
function update_attachfile(data,call_back){
 $.ajax({
          type: "PUT",
            enctype: 'multipart/form-data',
            url: "/udattachfile/"+data.id+"/",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
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
//
// type: "PUT",
// url: "/udattachfile/"+data.id+"/",
// contentType: "application/json",
// data:JSON.stringify(data),
// dataType: "json",
// success: function (data, status) {
////        alert("Data: " + data + "\nStatus: " + status);
//        call_back(data,status);
//    },
//    error: function (XMLHttpRequest, textStatus, errorThrown) {
//                //Process error actions
//                console.log( XMLHttpRequest.responseText);
//                console.log(XMLHttpRequest.status + ' ' +
//                    XMLHttpRequest.statusText);
//                return false;
//              }
//});
}
function delete_attachfile(id,call_back) {
    jQuery.ajax({
        url: '/udattachfile/' + id +"/",
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

//2020202020202020202020202 refferel

function save_refferel(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createrefferal/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_refferel_data(call_back){
 console.log(" ### get_note_data ###");
         $.ajax({
             type: "GET",
             url: "/getrefferal/"+patient_id+"/",
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
function update_refferel(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udrefferal/"+data.id+"/",
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
function delete_refferel(id,call_back) {
    jQuery.ajax({
        url: '/udrefferal/' + id +"/",
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

//patient details in ehr
function save_patient(data, call_back){
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_patient_data(call_back){
 console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/patients/"+orgnastion_id+"/",
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
         $.ajax({
 type: "PUT",
 url: "/rudpatient/"+data.id+"/",
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
function delete_patient(id,call_back) {
    jQuery.ajax({
        url: '/rudpatient/' + id +"/",
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

function get_patientpersonal_data(call_back){
 console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/getpatient/"+pat_id+"/",
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

//patient image in patient part
function save_patientimage(data, call_back){
    $.ajax({
 type: "POST",
 url: "/patientphoto/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_patientimage_data(call_back){
 console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/patientphoto/"+patient_id+"/",
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


//information in patient part
function save_patientinformation(data, call_back){
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_patientinformation_data(call_back){
 console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/rudpatientdetails/"+patient_id+"/",
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
function update_patientinformation(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/rudpatient/"+data.id+"/",
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
function delete_patientinformation(id,call_back) {
    jQuery.ajax({
        url: '/rudpatient/' + id +"/",
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


//patient personal details
function save_patientpersonal(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createpatientprofile/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_patientpersonalprofile_data(call_back){
 console.log(" ### get_allergy_data ###");
         $.ajax({
             type: "GET",
             url: "/getpatientprofile/"+patient_id+"/",
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
function update_patientpersonal(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/rudpatientprofile/"+data.id+"/",
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
function delete_patientpersonal(id, call_back) {
    jQuery.ajax({
        url: '/rudpatientprofile/' + id +"/",
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


//patient contact
function save_patientcontact(data, call_back){
    $.ajax({
 type: "POST",
 url: "/creatpatientdetails/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_patientcontact_data(call_back){
 console.log(" ### get_allergy_data ###");
         $.ajax({
             type: "GET",
             url: "/getpatientdetails/"+patient_id+"/",
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
function update_patientcontact(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/rudpatientdetails/"+data.id+"/",
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
function delete_patientcontact(id, call_back) {
    jQuery.ajax({
        url: '/rudpatientdetails/' + id +"/",
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

function get_patientcontact_data(call_back){
 console.log(" ### get_allergy_data ###");
         $.ajax({
             type: "GET",
             url: "/getpatientdetails/"+patient_id+"/",
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
//alternate contact
function save_alternatecontact(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createpatientalternatecontact/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_alternatecontact_data(call_back){
 console.log(" ### get_allergy_data ###");
         $.ajax({
             type: "GET",
             url: "/getpatientalternatecontact/"+patient_id+"/",
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
function update_alternatecontact(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/rudpatientalternatecontact/"+data.id+"/",
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
function delete_alternatecontact(id, call_back) {
    jQuery.ajax({
        url: '/rudpatientalternatecontact/' + id +"/",
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


//user information in user part
function save_userinformation(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createuser/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_userinformation_data(call_back){
 console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/ruduser/"+user_id+"/",
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
function update_userinformation(data,call_back){
         $.ajax({
 type: "PATCH",
 url: "/ruduser/"+data.id+"/",
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
//function delete_userinformation(id,call_back) {
//    jQuery.ajax({
//        url: '/ruduser/' + id +"/",
//        type: 'DELETE',
//        success: function(data,status) {
//            call_back(data,status);
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//                //Process error actions
//                alert( XMLHttpRequest.responseText);
//                console.log(XMLHttpRequest.status + ' ' +
//                    XMLHttpRequest.statusText);
//                return false;
//              }
//    });
//}


//user personal details
function save_userpersonal(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createemployeepersonal/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_userpersonal_data(call_back){
 console.log(" ### get_allergy_data ###");
         $.ajax({
             type: "GET",
             url: "/employeepersonal/"+user_id+"/",
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
function update_userpersonal(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/employeepersonal/"+user_id+"/",
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
function delete_userpersonal(id, call_back) {
    jQuery.ajax({
        url: '/employeepersonal/' +user_id +"/",
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


//user contact
function save_usercontact(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createemployeeadress/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_usercontact_data(call_back){
 console.log(" ### get_allergy_data ###");
         $.ajax({
             type: "GET",
             url: "/employeeadress/"+user_id+"/",
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
function update_usercontact(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/employeeadress/"+user_id+"/",
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



//speciality
function save_useralternatecontact(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createemployeespeciality/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_useralternatecontact_data(call_back){
 console.log(" ### get_allergy_data ###");
         $.ajax({
             type: "GET",
             url: "/employeespeciality/"+user_id+"/",
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
function update_useralternatecontact(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/employeespeciality/"+user_id+"/",
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
function delete_useralternatecontact(id, call_back) {
    jQuery.ajax({
        url: '/employeespeciality/' + user_id +"/",
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


//this manageuser list
function save_manageuser(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createuser/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}
function get_manageuser_data(call_back){
 console.log(" ### get_patient_data ###");
         $.ajax({
             type: "GET",
             url: "/stafflist/"+orgnastion_id+"/",
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


function send_patientreferal(data, call_back){
    $.ajax({
 type: "POST",
 url: "/sendreferalinmail/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}


function send_patienttest(data, call_back){
    $.ajax({
 type: "POST",
 url: "/sendtestinmail/",
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
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
});
}

//vaccine codea

function get_vaccine_code_data(call_back){
         $.ajax({
             type: "GET",
             url: "/vaccine/",
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
//problem code

function get_problem_code_data(call_back){
         $.ajax({
             type: "GET",
             url: "/problems/",
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
//symptoms code

function get_symptoms_code_data(call_back){
         $.ajax({
             type: "GET",
             url: "/systoms/",
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

//test code

function get_test_code_data(call_back){
         $.ajax({
             type: "GET",
             url: "/test/",
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

//icd10procedure code

function get_icd10procedure_code_data(call_back){
         $.ajax({
             type: "GET",
             url: "/icd10procedure/",
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

//Cptprocedure code

function get_Cptprocedure_code_data(call_back){
         $.ajax({
             type: "GET",
             url: "/Cptprocedure/",
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

//hspcsprocedure code

function get_hspcsprocedure_code_data(call_back){
         $.ajax({
             type: "GET",
             url: "/hspcsprocedure/",
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

//medication codes
function get_medication_code_data(call_back){
         $.ajax({
             type: "GET",
             url: "/medicationcodes/",
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