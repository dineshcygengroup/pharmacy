
/******************procedure********************/
function save_procedure(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createprocedurecode/",
 data: JSON.stringify(data),
 contentType: "application/json; charset=utf-8",
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
             url: "/getprocedurecodes/"+orgnastion_id+"/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}
function update_procedure(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udprocedurecode/"+data.id+"/",
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
function delete_procedure(id, call_back) {
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
/**********************procedure-end*******************************/
/******************drug*****************************/
function save_drug(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createdrugcode/",
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
function get_drug_data(call_back){
 console.log(" ### get_drug_data ###");
         $.ajax({
             type: "GET",
             url: "/getdrugcodes/"+orgnastion_id+"/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}
function update_drug(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/uddrugcode/"+data.id+"/",
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
function delete_drug(id, call_back) {
    jQuery.ajax({
        url: '/uddrug/' + id +"/",
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
/************************drug-end****************************/
/******************test*****************************/
function save_test(data, call_back){
    $.ajax({
 type: "POST",
 url: "/createtestcode/",
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
function get_test_data(call_back){
 console.log(" ### get_drug_data ###");
         $.ajax({
             type: "GET",
             url: "/gettestcodes/"+orgnastion_id+"/",
             contentType: "application/json",
             dataType: "json",
             success: function (data, status) {
            //        alert("Data: " + data + "\nStatus: " + status);
                    call_back(data,status);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                console.log(XMLHttpRequest.status + ' ' +
                    XMLHttpRequest.statusText);
                return false;
              }
        });
}
function update_test(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udtestcode/"+data.id+"/",
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
function delete_test(id, call_back) {
    jQuery.ajax({
        url: '/udtest/' + id +"/",
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
/************************drug-end****************************/
/*************hospital logo******************/
function save_hospitallogofile(data, call_back){
 $.ajax({
            type: "POST",
            enctype:'multipart/form-data',
            url:"/createhhospitllogo/",
            data:data,
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
function get_hospitallogofile_data(call_back){
 console.log(" ### get_note_data ###");
         $.ajax({
             type: "GET",
             url: "/gethospitllogo/"+orgnastion_id+"/",
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
function update_hospitallogofile(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/udhospitllogo/"+data.id+"/",
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
function delete_hospitallogofile(id,call_back) {
    jQuery.ajax({
        url: '/udhospitllogo/' + id +"/",
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

/*************hospital logo******************/
function save_doctorsignfile(data, call_back){
 $.ajax({
            type: "POST",
            enctype:'multipart/form-data',
            url:"/createtedoctorsignature/",
            data:data,
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
function get_doctorsignfile_data(call_back){
 console.log(" ### get_note_data ###");
         $.ajax({
             type: "GET",
             url: "/getdoctorsignature/"+orgnastion_id+"/",
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
function update_doctorsignfile(data,call_back){
         $.ajax({
 type: "PUT",
 url: "/uddoctorsignature/"+data.id+"/",
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
function delete_doctorsignfile(id,call_back) {
    jQuery.ajax({
        url: '/uddoctorsignature/' + id +"/",
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

//function update_changepassword(data,call_back){
//         $.ajax({
// type: "PUT",
// enctype:'multipart/form-data',
//            url:"/changepassword/",
//            data:data,
//            processData: false,
//            contentType: false,
//            cache: false,
//            timeout: 600000,
//            success: function (data, status) {
//            //        alert("Data: " + data + "\nStatus: " + status);
//                    call_back(data,status);
//                },
//                error: function (XMLHttpRequest, textStatus, errorThrown) {
//                //Process error actions
//                console.log( XMLHttpRequest.responseText);
//                console.log(XMLHttpRequest.status + ' ' +
//                    XMLHttpRequest.statusText);
//                return false;
//            }
//});
//}

function update_changepassword(data,call_back){
 $.ajax({
 type: "PUT",
 url: "/changepassword/",
 contentType: "application/json",
 data:JSON.stringify(data),
 dataType: "json",
 success: function (data, status) {
        window.location.pathname='/userlogin/';
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