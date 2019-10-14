/*1111111111111111111111111111111111111 Allergy info */
$(function() {
    var load_allergies = function(){
         get_allergy_data(function(data, status) {
            console.log("********");
            console.log("allergy"+data)
            console.log("allergy"+data.length)
            var allergy_view = ""

            if (data.length >= 0) {
                console.log(data)
                allergy_view += '<tbody style="border:5px">';
                //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    allergy_view += '<tr>';
                    allergy_view += '<td><span style="color:#017b8b";>Allergy type:</span><span>'+ alr.alergytype + '</span></td>' ;
                    allergy_view += '<td><span style="color:#017b8b"; >Allergien:</span><span>'+ alr.allergien + '</span></td>';
                    allergy_view += '<td><span style="color:#017b8b";>Allergy Reaction:</span><span>'+ alr.reaction + '</span></td>';
                    allergy_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';

//                    allergy_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="Allergyedit">Edit</a>' +
//                        '<a href="javascript:void(0)" data-id="' + alr.id + '" class="Allergydelete ">Delete</a></td>';
                    allergy_view += '</tr>';
                    allergy_view += '<td><hr></td>';
                }
                allergy_view += '</tbody>';

                $("#Allergy").html(allergy_view)
            }
         });
    }

    var new_dialog = function(type, row, allergy_id) {
        var dlg = $("#dialog-form-allergy");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_allergy_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {
            config.title = "Allergy";
            get_allergy_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_allergy_data(allergy_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_allergy_data_for_edit(row) {
            $("#AllergyType").val($(row.children().find('span').get(1)).text());
            $("#Allergen").val($(row.children().find('span').get(3)).text());
            $("#AllergyDescription").val($(row.children().find('span').get(5)).text());
        }

        function edit_allergy_data(id) {
            var AllergyType = $("#AllergyType").val();
            var Allergen = $("#Allergen").val();
            var AllergyDescription = $("#AllergyDescription").val();
            console.log(AllergyType, Allergen, AllergyDescription);

            var allergy_data = {
                "id": id,
                "alergytype": AllergyType,
                "allergien": Allergen,
                "reaction": AllergyDescription
            }
            console.log(allergy_data)
            update_allergy(allergy_data, function(data, status) {
                if (status == "success") {
                    $("#AllergyType").val("");
                    $("#Allergen").val("");
                    $("#AllergyDescription").val("");

                    load_allergies();

                    //$("#Allergy tbody").append("<tr>" + "<td>" + AllergyType + "</td>" + "<td>" + Allergen + "</td>" + "<td>" + AllergyDescription + "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }

        function save_allergy_data() {
            var AllergyType = $("#AllergyType").val();
            var Allergen = $("#Allergen").val();
            var AllergyDescription = $("#AllergyDescription").val();


            var allergy_data = {
                "alergytype": AllergyType,
                "allergien": Allergen,
                "reaction": AllergyDescription,
                "user": user_id,
                "patient": patient_id
            }
//            console.log(patient_id)
//            console.log(UHID)
            save_allergy(allergy_data, function(data, status) {
                if (status == "success") {
                    $("#AllergyType").val("");
                    $("#Allergen").val("");
                    $("#AllergyDescription").val("");
                   // $("#Allergy tbody").append("<tr>" + "<td>" + AllergyType + "</td>" + "<td>" + Allergen + "</td>" + "<td>" + AllergyDescription + "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" + "</tr>");
                    load_allergies();

                    dlg.dialog("close");
                }
            });
        }
    };

    $(document).on('click', 'td a.Allergydelete', function()  {
        id = $(this).data('id');
        console.log("delete ::"+id);
        delete_allergy( id, function(data, status) {
             load_allergies();

           //$(this).parents('tr:first').remove()
        });
        return false;
    });
    $(document).on('click', 'td a.Allergyedit', function() {
        new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
        return false;
    });
    $("#create-Allergy").button().click(new_dialog);

    // get allergy data on page load

//    get_user_info(function(data, status){
//        user_id = data.user;
//        patient_id = data.patient_id;
//
//
//        load_allergies();
//
//        load_abc();
//
//    });
    load_allergies();


});

/*2222222222222222222222222222222222222 social history */
$(function () {
    var load_socialhistory = function(){
        get_socialhistory_data(function(data, status) {
            console.log("****socialdata****");

            var socialhistory_view = ""

            if (data.length >= 0) {
                console.log(data)
                socialhistory_view += '<tbody style="border:5px">';
                //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
                for (var i = 0; i < data.length; i++) {
                    var soc = data[i]
                    socialhistory_view += '<tr>';
                    socialhistory_view += '<td><span style="color:#017b8b";>Social History:</span><span>'+ soc.social_type + '</span></td>' ;
                    socialhistory_view += '<td><span style="color:#017b8b";>Description:</span><span>'+ soc.description + '</span></td>';
                    socialhistory_view += '<td><span style="color:#017b8b";>From Date:</span><span>'+ soc.fromwhen + '</span></td>';
                    socialhistory_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ soc.created_date + '</span></td>';


//                    socialhistory_view += '<td><a href="javascript:void(0)" data-id="' + soc.id + '" class="socialhistoryedit">Edit</a>' +
//                        '<a href="javascript:void(0)" data-id="' + soc.id + '" class="socialhistorydelete">Delete</a></td>';
                    socialhistory_view += '</tr>';
                    socialhistory_view += '<td><hr></td>';
                }
                socialhistory_view += '</tbody>';

                $("#socialhistory").html(socialhistory_view)
            }
        });
    }

    var new_dialog = function (type, row,socialhistory_id) {
          var dlg = $("#dialog-form-socialhistory");
          type = type || 'Create';
          var config = {
               autoOpen: true,
               height: 400,
               width: 450,
               modal: true,
               buttons: {
                   "Save": save_socialhistory_data,
                    "Cancel": function () {
                        dlg.dialog("close");
                    }
               },
                close: function () {
                    dlg.dialog("close");
               }
          };
          if (type === 'Edit') {
             config.title = "Social History";
             get_socialhistory_data_for_edit(row);
             delete (config.buttons['Save']);
                config.buttons['Edit'] = function () {
                edit_socialhistory_data(socialhistory_id);
                row.remove();

             };
          }
          dlg.dialog(config);
          function get_socialhistory_data_for_edit(row) {
                $("#socialhistoryType").val($(row.children().find('span').get(1)).text());
                $("#socialhistoryDescription").val($(row.children().find('span').get(3)).text());
                $("#fromdate").val($(row.children().find('span').get(5)).text());
          }
          function edit_socialhistory_data(id) {
            var socialhistoryType = $("#socialhistoryType").val();
            var socialhistoryDescription = $("#socialhistoryDescription").val();
            var fromdate = $("#fromdate").val();
            console.log(socialhistoryType,socialhistoryDescription,fromdate)
            var socialhistory_data = {
                "id": id,
                "social_type": socialhistoryType,
                "description": socialhistoryDescription,
                "fromwhen": fromdate,

            }
            console.log(socialhistory_data)
            update_socialhistory(socialhistory_data, function(data, status) {
                if (status == "success") {
                    $("#socialhistoryType").val("");
                    $("#socialhistoryDescription").val("");
                    $("#fromdate").val("");

                    load_socialhistory();
                    //$("#socialhistory tbody").append("<tr>" + "<td>" + socialhistoryType + "</td>" + "<td>" + socialhistoryDescription + "</td>" + "<td>" + fromdate + "</td>" + "<td><a href='' class='socialhistoryedit'>Edit</a> <a href='' class='socialhistorydelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
         }

         function save_socialhistory_data() {
            var socialhistoryType = $("#socialhistoryType").val();
            var socialhistoryDescription = $("#socialhistoryDescription").val();
            var fromdate = $("#fromdate").val();
            console.log(socialhistoryType,socialhistoryDescription,fromdate);

            var socialhistory_data = {
                "social_type": socialhistoryType,
                "description": socialhistoryDescription,
                "fromwhen": fromdate,
                "user": user_id,
                "patient": patient_id

            }

            save_socialhistory(socialhistory_data, function(data, status) {
                if (status == "success") {
                    $("#socialhistoryType").val("");
                    $("#socialhistoryDescription").val("");
                    $("#fromdate").val("");
                   // $("#socialhistory tbody").append("<tr>" + "<td>" + socialhistoryType + "</td>" + "<td>" + socialhistoryDescription + "</td>" + "<td>" + fromdate + "</td>" + "<td><a href='' class='socialhistoryedit'>Edit</a> <a href='' class='socialhistorydelete'>Delete</a></td>" + "</tr>");
                    load_socialhistory();
                    dlg.dialog("close");
                }

            });

         }
    };
    $(document).on('click', 'td a.socialhistorydelete', function () {
        id = $(this).data('id');
        console.log("delete ::"+id);
             delete_socialhistory(id, function(data, status) {

                load_socialhistory();
        //             $(this).parents('tr:first').remove(), $(this).data('id') ;
        });
          return false;
    });
     $(document).on('click', 'td a.socialhistoryedit', function () {
       new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
      return false;
     });
     $("#create-socialhistory").button().click(new_dialog);
     load_socialhistory();
});

/*3333333333333333333333333333333333333 family history  */
$(function () {
    var load_familyhistory= function(){
        get_familyhistory_data(function(data, status) {
        console.log("********");
        var familyhistory_view = ""
            if (data.length >= 0) {
                console.log(data)
                familyhistory_view += '<tbody style="border:5px">';
                //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
                for (var i = 0; i < data.length; i++) {
                    var family = data[i]
                    familyhistory_view += '<tr>';
                    familyhistory_view += '<td><span style="color:#017b8b";>Relation:</span><span>'+ family.relationtype + '</span></td>' ;
                    familyhistory_view += '<td><span style="color:#017b8b"; >Description:</span><span>'+ family.description + '</span></td>';
                    familyhistory_view += '<td><span style="color:#017b8b";>Note:</span><span>'+ family.notes + '</span></td>';
                    familyhistory_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ family.created_date + '</span></td>';
//                    familyhistory_view += '<td><a href="javascript:void(0)" data-id="' + family.id + '" class="familyedit">Edit</a>' +
//                        '<a href="javascript:void(0)" data-id="' + family.id + '" class="familydelete">Delete</a></td>';
                    familyhistory_view += '</tr>';
                    familyhistory_view += '<td><hr></td>';
                }
                familyhistory_view += '</tbody>';
                $("#familyhealthhistory").html(familyhistory_view)
            }
        });
    }
    var new_dialog = function (type, row ,familyhistory_id) {
        var dlg = $("#dialog-form-familyhealthhistory");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_familyhistory_data,
                "Cancel": function () {
                    dlg.dialog("close");
                 }
            },
             close: function () {
                dlg.dialog("close");
             }
        };
        if (type === 'Edit') {
            config.title = "Family Health History";
            get_familyhistory_data_for_edit(row);
             delete (config.buttons['Save']);
             config.buttons['Edit'] = function () {
                edit_familyhistory_data(familyhistory_id);
                row.remove();
             };
        }
        dlg.dialog(config);
        function get_familyhistory_data_for_edit(row) {
            $("#relationType").val($(row.children().find('span').get(1)).text());
            $("#FamilyDescription").val($(row.children().find('span').get(3)).text());
            $("#Familynote").val($(row.children().find('span').get(5)).text());
        }
        function edit_familyhistory_data(id) {
            var relationType = $("#relationType").val();
            var FamilyDescription = $("#FamilyDescription").val();
            var Familynote = $("#Familynote").val();
            console.log(relationType, FamilyDescription, Familynote);

            var familyhistory_data = {
                "id": id,
                "relationtype": relationType,
                "description": FamilyDescription,
                "notes": Familynote,

            }
            console.log(familyhistory_data)
            update_familyhistory(familyhistory_data, function(data, status) {
                if (status == "success") {
                    $("#relationType").val("");
                    $("#FamilyDescription").val("");
                    $("#Familynote").val("");

                     load_familyhistory();
                    //$("#familyhealthhistory tbody").append("<tr>" + "<td>" + relationType + "</td>" + "<td>" + FamilyDescription + "</td>" + "<td>" + Familynote + "</td>" + "<td><a href='' class='familyedit'>Edit</a> <a href='' class='familydelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }
        function save_familyhistory_data() {
            var relationType = $("#relationType").val();
            var FamilyDescription = $("#FamilyDescription").val();
            var Familynote = $("#Familynote").val();
            console.log(relationType, FamilyDescription, Familynote);

            var familyhistory_data = {
                "relationtype": relationType,
                "description": FamilyDescription,
                "notes": Familynote,
               "user": user_id,
                "patient": patient_id
            }

            save_familyhistory(familyhistory_data, function(data, status) {
                if (status == "success") {
                    $("#relationType").val("");
                    $("#FamilyDescription").val("");
                    $("#Familynote").val("");
                    load_familyhistory();
                    //$("#familyhealthhistory tbody").append("<tr>" + "<td>" + relationType + "</td>" + "<td>" + FamilyDescription + "</td>" + "<td>" + Familynote + "</td>" + "<td><a href='' class='familyedit'>Edit</a> <a href='' class='familydelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }


    };
    $(document).on('click', 'td a.familydelete', function () {
        id=$(this).data('id');
        console.log("delete ::"+id);
        delete_familyhistory(id, function(data, status) {
           load_familyhistory();
        });
        return false;
    });
    $(document).on('click', 'td a.familyedit', function () {
        new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
        return false;
    });
    $("#create-familyhealthhistory").button().click(new_dialog);

    load_familyhistory();
});

/*444444444444444444444444444444444444444444444 vital info */
$(function () {
      var load_vital = function(){
          get_vital_data(function(data, status) {
          console.log("********");
          var vital_view = ""
         if (data.length >= 0) {
            console.log(data)
            vital_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                vital_view += '<tr>';
                vital_view += '<td><div class=row ><div class=col-xs-7 style="font-weight:bold;color:#017b8b"; margin-right:5px; "><span>Height </span></div><div class=col-xs-4><span style="font-weight:bold;color:black;">' + alr.height+ '\'' +alr.height_inch+'\"'+'</span></div></div></td>';
                vital_view += '<td><hr></td>';
                vital_view += '<td><div class=row ><div class=col-xs-7 style="font-weight:bold;color:#017b8b"; margin-right:5px;"><span>Weight </span></div><div class=col-xs-4><span style="font-weight:bold;color:black;">' + alr.weight +' '+'kg'+'</span></div></div></td>';
                vital_view += '<td><hr></td>';
                vital_view += '<td><div class=row ><div class=col-xs-7 style="font-weight:bold;color:#017b8b"; margin-right:5px;"><span>Temp </span></div><div class=col-xs-4><span style="font-weight:bold;color:black;">' + alr.temprature +' '+'°C'+'</span></div></div></td>';
                vital_view += '<td><hr></td>';
                vital_view += '<td><div class=row ><div class=col-xs-7 style="font-weight:bold;color:#017b8b"; margin-right:5px;"><span>BP </span></div><div class=col-xs-4><span style="font-weight:bold;color:black;">' + alr.systolicbp +'/'+alr.diastolicbp+' '+'mmHg'+'</span></div></div></td>';
                vital_view += '<td><hr></td>';
                vital_view += '<td><div class=row ><div class=col-xs-7 style="font-weight:bold;color:#017b8b"; margin-right:5px;"><span>SpO2 </span></div><div class=col-xs-4><span style="font-weight:bold;color:black;">' + alr.oxisaturation +' '+'%'+'</span></div></div></td>';
                vital_view += '<td><hr></td>';
                vital_view += '<td><div class=row ><div class=col-xs-7 style="font-weight:bold;color:#017b8b"; margin-right:5px;"><span>HR </span></div><div class=col-xs-4><span style="font-weight:bold;color:black;">' + alr.heartrate +' '+'/min'+'</span></div></div></td>';
                vital_view += '<td><hr></td>';
                vital_view += '<td><div class=row ><div class=col-xs-7 style="font-weight:bold;color:#017b8b"; margin-right:5px;"><span>Glucose </span></div><div class=col-xs-4><span style="font-weight:bold;color:black;">' + alr.glucose+' '+'mg/dl'+'</span></div></div></td>';
                vital_view += '<td><hr></td>';
                vital_view += '<td><div class=row ><div class=col-xs-7 style="font-weight:bold;color:#017b8b"; margin-right:5px;"><span>RR </span></div><div class=col-xs-4><span style="font-weight:bold;color:black;">' + alr.resporitoryrate+' '+'/min'+'</span></div></div></td>';
                vital_view += '<td><hr></td>';
                vital_view += '<td><div class=row ><div class=col-xs-7 style="font-weight:bold; color:#017b8b"; margin-right:5px;"><span>Created On </span></div><div class=col-xs-4><span style="font-weight:bold;color:black;">' + alr.created_date+' '+'</span></div></div></td>';
                vital_view += '<td><button><a style="color:white !important";font-size:20px;" href="/Vital_summary/'+String(pat_id)+'">Vital summary </a></button></td>';
//                vital_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="vitalsedit">Edit</a>' +
//                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="vitalsdelete">Delete</a></td>';
                vital_view += '</tr>';

            }
            vital_view += '</tbody>';

            $("#vitals").html(vital_view)
        }
         });
      }
      var new_dialog = function(type, row, vital_id) {
        var dlg = $("#dialog-form-vitals");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_vital_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Vitals";
            get_vital_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_vital_data(vital_id);
                row.remove();
            };
        }
        dlg.dialog(config);
         function get_vital_data_for_edit(row) {
               $("#heightfeet").val($(row.children().find('span').get(1)).text());
               $("#heightinch").val($(row.children().find('span').get(2)).text());
               $("#weight").val($(row.children().find('span').get(4)).text());
               $("#temparature").val($(row.children().find('span').get(6)).text());
               $("#systolicbp").val($(row.children().find('span').get(8)).text());
               $("#diastolicbp").val($(row.children().find('span').get(10)).text());
               $("#oxygensaturation").val($(row.children().find('span').get(12)).text());
               $("#pulse").val($(row.children().find('span').get(14)).text());
               $("#glucose").val($(row.children().find('span').get(16)).text());
               $("#respiratoryrate").val($(row.children().find('span').get(18)).text());
         }

          function edit_vital_data(id) {
            var heightfeet = $("#heightfeet").val();
            var heightinch = $("#heightinch").val();
            var weight = $("#weight").val();
            var temparature = $("#temparature").val();
            var systolicbp = $("#systolicbp").val();
            var diastolicbp = $("#diastolicbp").val();
            var oxygensaturation = $("#oxygensaturation").val();
            var pulse = $("#pulse").val();
            var glucose = $("#glucose").val();
            var respiratoryrate = $("#respiratoryrate").val();

             var vital_data = {
                "id": id,
                "height": heightfeet,
                "height_inch": heightinch,
                "weight": weight,
                "heartrate": pulse,
                "temprature": temparature,
                "oxisaturation": oxygensaturation,
                "diastolicbp": diastolicbp,
                "systolicbp": systolicbp,
                "glucose": glucose,
                "resporitoryrate": respiratoryrate,

            }
            console.log(vital_data)
            update_vital(vital_data, function(data, status) {
                if (status == "success") {
                    $("#heightfeet").val("");
                    $("#heightinch").val("");
                    $("#weight").val("");
                    $("#temprature").val("");
                    $("#oxisaturation").val("");
                    $("#diastolicbp").val("");
                    $("#systolicbp").val("");
                    $("#diastolicbp").val("");
                    $("#pulse").val("");
                    $("#respiratoryrate").val("");
                    $("#glucose").val("");

                    load_vital();
                    //$("#vitals tbody").append("<tr>" + "<td>" + heightfeet + "</td>"+ "<td>" + weight + "</td>"+ "<td>" + temprature + "</td>"+ "<td>" + diastolicbp + "</td>"+ "<td>" + systolicbp + "</td>"+ "<td>" + pulse + "</td>"+ "<td>" + respiratoryrate + "</td>"+ "<td>" + glucose + "</td>" + "<td><a href='' class='vitalsedit'>Edit</a> <a href='' class='vitalsdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
          }
         function save_vital_data() {
            var heightfeet = $("#heightfeet").val();
            var heightinch = $("#heightinch").val();
            var weight = $("#weight").val();
            var temparature = $("#temparature").val();
            var systolicbp = $("#systolicbp").val();
            var diastolicbp = $("#diastolicbp").val();
            var oxygensaturation = $("#oxygensaturation").val();
            var pulse = $("#pulse").val();
            var glucose = $("#glucose").val();
            var respiratoryrate = $("#respiratoryrate").val();

            var vital_data = {
                "weight": weight,
                "height": heightfeet,
                "height_inch": heightinch,
                "heartrate": pulse,
                "temprature": temparature,
                "oxisaturation": oxygensaturation,
                "diastolicbp": diastolicbp,
                "systolicbp": systolicbp,
                "glucose": glucose,
                "resporitoryrate": respiratoryrate,
                 "user": user_id,
                "patient": patient_id
             }
              save_vital(vital_data, function(data, status) {
                if (status == "success") {
                    $("#heightfeet").val("");
                    $("#heightinch").val("");
                    $("#weight").val("");
                    $("#temparature").val("");
                    $("#oxisaturation").val("");
                    $("#diastolicbp").val("");
                    $("#systolicbp").val("");
                    $("#pulse").val("");
                    $("#respiratoryrate").val("");
                    $("#glucose").val("");
                    load_vital();
                    //$("#vitals tbody").append("<tr>" + "<td>" + heightfeet + "</td>"+ "<td>" + weight + "</td>"+ "<td>" + temparature + "</td>"+ "<td>" + diastolicbp + "</td>"+ "<td>" + systolicbp + "</td>"+ "<td>" + pulse + "</td>"+ "<td>" + respiratoryrate + "</td>"+ "<td>" + glucose + "</td>" + "<td><a href='' class='vitalsedit'>Edit</a> <a href='' class='vitalsdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                 }
            });
         }
      };
      $(document).on('click', 'td a.vitalsdelete', function () {
        id = $(this).data('id');

             delete_vital(id, function(data, status) {
                load_vital();
             });

        return false;
      });
      $(document).on('click', 'td a.vitalsedit', function () {
           new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
          return false;
      });
      $("#create-vitals").button().click(new_dialog);
      load_vital();
});

/* 55555555555555555555555555555555555555555 problems have to change model names   */
$(function () {
    var load_problems=function(){
        get_problems_data(function(data, status) {
        console.log("********");
        var problems_view = ""

        if (data.length >= 0) {
            console.log(data)
            problems_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                 problems_view += '<td><span style="color:#017b8b";>Diagnosis:</span><span>'+ alr.problems + '</span></td>' ;
                 problems_view += '<td><span style="color:#017b8b"; >Description:</span><span>'+ alr.description + '</span></td>';
                 problems_view += '<td><span style="color:#017b8b";>From date:</span><span>'+ alr.fromdate + '</span></td>';
                 problems_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';
//                problems_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="problemedit">Edit</a>' +
//                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="problemdelete">Delete</a></td>';
                problems_view += '</tr>';
                problems_view += '<td><hr></td>';
            }
            problems_view += '</tbody>';

            $("#problems").html(problems_view)
        }
    });
    }
    var new_dialog = function(type, row, problems_id) {
        var dlg = $("#dialog-form-problems");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_problems_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Problems";
            get_problems_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_problems_data(problems_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_problems_data_for_edit(row) {
            $("#Problem").val($(row.children().find('span').get(1)).text());
            $("#ProblemDescription").val($(row.children().find('span').get(3)).text());
            $("#Problemfromdate").val($(row.children().find('span').get(5)).text());
        }

        function edit_problems_data(id) {
            var Problem = $("#Problem").val();
            var ProblemDescription = $("#ProblemDescription").val();
            var Problemfromdate = $("#Problemfromdate").val();
            console.log(Problem, ProblemDescription, Problemfromdate);

            var problems_data = {
                "id": id,
                "problems": Problem,
                "description": ProblemDescription,
                "fromdate": Problemfromdate,

            }
            console.log(problems_data)
            update_problems(problems_data, function(data, status) {
                if (status == "success") {
                    $("#Problem").val("");
                    $("#ProblemDescription").val("");
                    $("#Problemfromdate").val("");

                     load_problems();
                    //$("#problems tbody").append("<tr>" + "<td>" + Problem + "</td>" + "<td>" + ProblemDescription + "</td>" + "<td>" + Problemfromdate + "</td>" + "<td><a href='' class='problemedit'>Edit</a> <a href='' class='problemdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_problems_data() {
            var Problem = $("#Problem").val();
            var ProblemDescription = $("#ProblemDescription").val();
            var Problemfromdate = $("#Problemfromdate").val();
            console.log(Problem, ProblemDescription, Problemfromdate);

            var problems_data = {
                "problems": Problem,
                "description": ProblemDescription,
                "fromdate": Problemfromdate,
                "user": user_id,
                "patient": patient_id

            }

            save_problems(problems_data, function(data, status) {
                if (status == "success") {
                    $("#Problem").val("");
                    $("#ProblemDescription").val("");
                    $("#Problemfromdate").val("");
                    load_problems();
                    //$("#problems tbody").append("<tr>" + "<td>" + Problem + "</td>" + "<td>" + ProblemDescription + "</td>" + "<td>" + Problemfromdate + "</td>" + "<td><a href='' class='problemedit'>Edit</a> <a href='' class='problemdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
    $(document).on('click', 'td a.problemdelete', function () {
        id = $(this).data('id');

        delete_problems( id, function(data, status) {
             load_problems();

           //$(this).parents('tr:first').remove()
        });
      return false;
  });
 $(document).on('click', 'td a.problemedit', function () {
       new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
      return false;
 });
 $("#create-problems").button().click(new_dialog);
 load_problems();
});

/*6666666666666666666666666666666666 visit reason  */
$(function () {
    load_visitreason = function(){
            get_visitreason_data(function(data, status) {
                console.log("********");
                var visitreason_view = ""
                if (data.length >= 0) {
                    console.log(data)
                    visitreason_view += '<tbody style="border:5px">';
                    //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
                        for (var i = 0; i < data.length; i++) {
                            var alr = data[i]
                            visitreason_view += '<tr>';

                            visitreason_view += '<td><span style="color:#017b8b";>Description:</span><span>'+ alr.description + '</span></td>' ;
                            visitreason_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';
//                            visitreason_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="visitreasonedit">Edit</a>' +
//                                '<a href="javascript:void(0)" data-id="' + alr.id + '" class="visitreasondelete">Delete</a></td>';
                            visitreason_view += '</tr>';
                            visitreason_view += '<td><hr></td>';
                        }
                        visitreason_view += '</tbody>';

                        $("#visitreason").html(visitreason_view)
                }
            });
    }
     var new_dialog = function(type, row, visitreason_id) {
        var dlg = $("#dialog-form-visitreason");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_visitreason_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Visit reason";
            get_visitreason_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_visitreason_data(visitreason_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_visitreason_data_for_edit(row) {
            $("#visitreasonDescription").val($(row.children().find('span').get(1)).text());

        }

        function edit_visitreason_data(id) {
            var visitreasonDescription = $("#visitreasonDescription").val();
            console.log(ProblemDescription);

            var visitreason_data = {
                "id": id,
                "description": visitreasonDescription,

            }
            console.log(visitreason_data)
            update_visitreason(visitreason_data, function(data, status) {
                if (status == "success") {
                    $("#visitreasonDescription").val("");
                    //$("#visitreason tbody").append("<tr>" + "<td>" + visitreasonDescription + "<td><a href='' class='visitreasonedit'>Edit</a> <a href='' class='visitreasondelete'>Delete</a></td>" + "</tr>");
                    load_visitreason();
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_visitreason_data() {
            var visitreasonDescription = $("#visitreasonDescription").val();

            console.log(ProblemDescription);

            var visitreason_data = {
                "description": visitreasonDescription,
               "user": user_id,
                "patient": patient_id
            }

            save_visitreason(visitreason_data, function(data, status) {
                if (status == "success") {
                    $("#visitreasonDescription").val("");
                    load_visitreason();
                    //$("#visitreason tbody").append("<tr>" +  "<td>" + visitreasonDescription + "</td>" + "<td><a href='' class='visitreasonedit'>Edit</a> <a href='' class='visitreasondelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };

 $(document).on('click', 'td a.visitreasondelete', function () {
    id = $(this).data('id');

     delete_visitreason(id, function(data, status) {
             load_visitreason();

        });
      return false;
  });
 $(document).on('click', 'td a.visitreasonedit', function () {
   new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
   return false;
 });
 $("#create-visitreason").button().click(new_dialog);

     load_visitreason();
});

/*7777777777777777777777777777777777777777 procedure  */
$(function () {
    var load_procedure = function(){
             get_procedure_data(function(data, status) {
            console.log("********");
        var procedure_view = ""
            if (data.length >= 0) {
                console.log(data)
                procedure_view += '<tbody style="border:5px">';
                //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    procedure_view += '<tr>';
                    procedure_view += '<td><span style="color:#017b8b";>Procedure Code Type:</span><span>'+ alr.procedurecodetype + '</span></td>' ;
                    procedure_view += '<td><span style="color:#017b8b"; >Procedure Code:</span><span>'+ alr.procedurecode + '</span></td>';
                    procedure_view += '<td><span style="color:#017b8b";>Procedure:</span><span>'+ alr.procedure + '</span></td>';
                    procedure_view += '<td><span style="color:#017b8b";>Status:</span><span>'+ alr.status + '</span></td>';
                    procedure_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';

//                    procedure_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="procedureedit">Edit</a>' +
//                        '<a href="javascript:void(0)" data-id="' + alr.id + '" class="proceduredelete">Delete</a></td>';
                    procedure_view += '</tr>';
                    procedure_view += '<td><hr></td>';
                }
                procedure_view += '</tbody>';

                $("#procedure").html(procedure_view)
            }
        });
    }
    var new_dialog = function(type, row, procedure_id) {
        var dlg = $("#dialog-form-procedure");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_procedure_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {
            config.title = "Procedure";
            get_procedure_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_procedure_data(procedure_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_procedure_data_for_edit(row) {
            $("#procedurecodetype").val($(row.children().find('span').get(1)).text());
            $("#procedurecode").val($(row.children().find('span').get(3)).text());
            $("#proceduredescription").val($(row.children().find('span').get(5)).text());
            $("#proceduredestatus").val($(row.children().find('span').get(7)).text());
        }

        function edit_procedure_data(id) {
            var procedurecodetype = $("#procedurecodetype").val();

            var procedurecode = $(document.querySelector('.procedurecode')).val();
            var proceduredescription = $("#proceduredescription").val();
            var proceduredestatus = $("#proceduredestatus").val();
            console.log(procedurecodetype, procedurecode, proceduredescription,proceduredestatus);

            var procedure_data = {
                "id": id,
                "procedurecodetype": procedurecodetype,
                "procedurecode": procedurecode,
                "procedure": proceduredescription,
                "status": proceduredestatus,

            }
            console.log(procedure_data)
            update_procedure(procedure_data, function(data, status) {
                if (status == "success") {
                    $("#procedurecodetype").val("");
                    $("#procedurecode").val("");
                    $("#proceduredescription").val("");
                    $("#proceduredestatus").val("");
                     load_procedure();
                   //$("#procedure tbody").append("<tr>" + "<td>" + procedurecodetype + "</td>" + "<td>" + procedurecode + "</td>" + "<td>" + proceduredescription + "<td>" + proceduredestatus + "</td>" + "<td><a href='' class='procedureedit'>Edit</a> <a href='' class='proceduredelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



         function save_procedure_data() {
            var procedurecodetype = $("#procedurecodetype").val();
            // var procedurecode = $(document.querySelector('.procedurecode')).val();
            var ICD10PCS = $("#ICD-10-PCS").val();
            var CPT = $("#CPT").val();
            var HCPCS = $("#HCPCS").val();
            var PROCEDURECODEVALUE = $("#PROCEDURE-CODE").val();

            if(CPT== "" && HCPCS== "" && PROCEDURECODEVALUE== ""){
                var procedurecode = $("#ICD-10-PCS").val();
            }
            else if(ICD10PCS == "" &&  HCPCS== "" && PROCEDURECODEVALUE== ""){
                var procedurecode = $("#CPT").val();
            }
            else if(ICD10PCS == "" && CPT== "" && PROCEDURECODEVALUE== ""){
                var procedurecode = $("#HCPCS").val();
            }
            else if(ICD10PCS == "" && CPT== "" && HCPCS== "" && PROCEDURECODEVALUE== ""){
                var procedurecode = $("#PROCEDURE-CODE").val();
            }
            

            var proceduredescription = $("#proceduredescription").val();
            var proceduredestatus = $("#proceduredestatus").val();
            console.log(procedurecodetype, procedurecode, proceduredescription,proceduredestatus);

            var procedure_data = {
                "procedurecodetype": procedurecodetype,
                "procedurecode": procedurecode,
                "procedure": proceduredescription,
                "status": proceduredestatus,
                "user": user_id,
                "patient": patient_id
            }

            save_procedure(procedure_data, function(data, status) {
                if (status == "success") {
                    $("#procedurecodetype").val("");
                    $("#ICD-10-PCS").val("");
                    $("#CPT").val("");
                    $("#HCPCS").val("");
                    $("#PROCEDURE-CODE").val("");
                    $("#proceduredescription").val("");
                    $("#proceduredestatus").val("");
                    load_procedure();
                    //$("#procedure tbody").append("<tr>" + "<td>" + procedurecodetype + "</td>" + "<td>" + procedurecode + "</td>" + "<td>" + proceduredescription + "<td>" + proceduredestatus + "</td>" + "<td><a href='' class='procedureedit'>Edit</a> <a href='' class='proceduredelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
    $(document).on('click', 'td a.proceduredelete', function () {
        id = $(this).data('id');

        delete_procedure(id, function(data, status) {
            load_procedure();

        });
      return false;
  });
 $(document).on('click', 'td a.procedureedit', function () {
    new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
    return false;
 });
 $("#create-procedure").button().click(new_dialog);
    load_procedure();
});

/*8888888888888888888888888888888888888 diagnostic lab tets details */
$(function () {
    load_labtests = function(){
         get_diagnostic_data(function(data, status) {
        console.log("********");

        var diagnostic_view = ""

        if (data.length >= 0) {
            console.log(data)
            diagnostic_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                diagnostic_view += '<tr>';
                diagnostic_view += '<td class="testcode"><span style="color:#017b8b";>Test Name:</span><span>'+ alr.testcode + '</span></td>' ;
                //diagnostic_view += '<td class="resultumber"><span style="color:#017b8b";>Result:</span><span>'+ alr.resultumber + '</span>-<span>'+ alr.resultunit + '</span></td>' ;
                diagnostic_view += '<td class="notes"><span style="color:#017b8b";>Note:</span><span>'+ alr.notes + '</span></td>' ;
                diagnostic_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';
//                diagnostic_view += '<td ><a href="javascript:void(0)" data-id="' + alr.id + '" class="diagnosticedit">Edit</a>' +
//                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="diagnosticdelete">Delete</a></td>';
                    //diagnostic_view +='<td class="sendmalil">send</td>';
                diagnostic_view += '</tr>';
                diagnostic_view += '<td><hr></td>';
            }
            diagnostic_view += '</tbody>';

            $("#diagnosticlab").html(diagnostic_view)
        }
    });
    }
    var new_dialog = function(type, row, diagnostic_id) {
        var dlg = $("#dialog-form-diagnosticlab");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_diagnostic_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Diagnostic lab Test";
            get_diagnostic_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_diagnostic_data(diagnostic_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_diagnostic_data_for_edit(row) {
            $("#testname").val($(row.children().find('span').get(1)).text());
            $("#testresult").val($(row.children().find('span').get(3)).text());
            $("#testunits").val($(row.children().find('span').get(4)).text());
            $("#testnote").val($(row.children().find('span').get(6)).text());
        }

        function edit_diagnostic_data(id) {
            var testname = $("#testname").val();
            var testresult = $("#testresult").val();
            var testunits = $("#testunits").val();
            var testnote = $("#testnote").val();
            console.log(testname, testresult, testunits,testnote);

            var diagnostic_data = {
                "id": id,
                "testcode": testname,
                "resultumber": testresult,
                "resultunit": testunits,
                "notes": testnote

            }
            console.log(diagnostic_data)
            update_diagnostic(diagnostic_data, function(data, status) {
                if (status == "success") {
                    $("#testname").val("");
                    $("#testresult").val("");
                    $("#testunits").val("");
                    $("#testnote").val("");

                    load_labtests();
                    //$("#diagnosticlab tbody").append("<tr>" + "<td>" + testname + "</td>" + "<td>" + testresult + "</td>" + "<td>" + testunits + "</td>" + "</td>" + "<td>" + testnote + "</td>" +"<td><a href='' class='diagnosticedit'>Edit</a> <a href='' class='diagnosticdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }

        function save_diagnostic_data() {
            var testname = $("#testname").val();
            var testresult = $("#testresult").val();
            var testunits = $("#testunits").val();
            var testnote = $("#testnote").val();
            console.log(testname, testresult, testunits,testnote);

            var diagnostic_data = {
                "testcode": testname,
                "resultumber": testresult,
                "resultunit": testunits,
                "notes": testnote,
                "user": user_id,
                "patient": patient_id
            }

            save_diagnostic(diagnostic_data, function(data, status) {
                if (status == "success") {
                    $("#testname").val("");
                    $("#testresult").val("");
                    $("#testunits").val("");
                    $("#testnote").val("");
                    load_labtests();
                    //$("#diagnosticlab tbody").append("<tr>" + "<td>" + testname + "</td>" + "<td>" +testresult  + "</td>" + "<td>" + testunits + "</td>" + "</td>" + "<td>" + testnote + "</td>" +"<td><a href='' class='diagnosticedit'>Edit</a> <a href='' class='diagnosticdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };


    $(document).on('click', 'td a.diagnosticdelete', function () {
        id = $(this).data('id');
        console.log("delete ::"+id);
        delete_diagnostic(id, function(data, status) {
            load_labtests();

    });
      return false;
  });
    $(document).on('click', 'td a.diagnosticedit', function () {
    new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
    return false;
    });
    $("#create-diagnosticlab").button().click(new_dialog);

    load_labtests();
});

/* share lab details or send  share lab details */




/*9999999999999999999999999999999999999 medications details */
$(function () {
     var load_medications = function(){
        get_medications_data(function(data, status) {
        console.log("********");
        var medications_view = ""
        if (data.length >= 0) {
            console.log(data)
            medications_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                medications_view += '<tr>';
                var medname = alr.medicinname;
                var res = medname.split(':');
                console.log(res[0]);
                console.log(res[1])
//                var jes = medname.split('-')
//                jes=jes[jes.length - 1]
                medications_view += '<td><span style="color:#017b8b;">Medicine name:</span><span>'+ alr.medicinname+ '</span></td>'
                //medications_view +='<td><a style="color:green; font-weight:bold;"  target="_blank" href="https://medlineplus.gov/druginfo/meds/'+ res[0] +'.html ">'+ res[1] + '</a></td>'
                medications_view += '<td><span style="color:#017b8b;">Dosage:</span><span>'+ alr.doesage + '</span></td>';
                medications_view += '<td><span style="color:#017b8b;">Quantity:</span><span>'+ alr.quantity + '</span></td>';
                medications_view += '<td><span style="color:#017b8b;">Start date:</span><span>'+ alr.startdate + '</span><td>';
                medications_view += '<td><span style="color:#017b8b;">End date:</span><span>'+  alr.enddate  + '</span></td>';
                medications_view += '<td><span style="color:#017b8b;">Usage Directions:</span><span>'+ alr.usagedirections + '</span></td>';
                medications_view += '<td><span style="color:#017b8b;">Refills:</span><span>'+ alr.refills + '</span></td>';
                medications_view += '<td><span style="color:#017b8b;">Label of Medicine:</span><span>'+ alr.labelofmedication + '</span></td>';
                medications_view += '<td><span style="color:#017b8b;">Note:</span><span>'+ alr.notes + '</span></td>';
                medications_view +='<td><a style="color:blue!important; font-weight:bold;text-decoration: underline;"  target="_blank" href="https://medlineplus.gov/druginfo/meds/'+ res[0] +'.html ">'+ res[1] + '</a></td>'
                medications_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';

//                medications_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="medicationedit">Edit</a>' +
//                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="medicationdelete">Delete</a></td>';
                medications_view += '</tr>';
                medications_view += '<td><hr></td>';
            }
            medications_view += '</tbody>';

            $("#medications").html(medications_view)
        }
    });
     }
     var new_dialog = function (type, row,medications_id) {
      var dlg = $("#dialog-form-medications");

      type = type || 'Create';
      var config = {
         autoOpen: true,
         height: 400,
         width: 450,
         modal: true,
         buttons: {
           "Save": save_medications_data,
            "Cancel": function () {
            dlg.dialog("close");
            }
         },
         close: function () {
            dlg.dialog("close");
         }
      };
      if (type === 'Edit') {
          config.title = "Medications";
          get_medications_data_for_edit(row);
          delete (config.buttons['Save']);
          config.buttons['Edit'] = function () {
             edit_medications_data(medications_id);
             row.remove();
          };
      }
      dlg.dialog(config);
      function get_medications_data_for_edit(row) {
            $("#medicationname").val($(row.children().find('span').get(1)).text());
            $("#dossage").val($(row.children().find('span').get(3)).text());
            $("#quantity").val($(row.children().find('span').get(5)).text());
            $("#medstartdate").val($(row.children().find('span').get(7)).text());
            $("#medenddate").val($(row.children().find('span').get(9)).text());
            $("#directionstoussage").val($(row.children().find('span').get(11)).text());
            $("#refills").val($(row.children().find('span').get(13)).text());
            $("#company").val($(row.children().find('span').get(15)).text());
            $("#mednote").val($(row.children().find('span').get(17)).text());
        }

        function edit_medications_data(id) {
            var medicationname = $("#medicationname").val();
            var dossage = $("#dossage").val();
            var quantity = $("#quantity").val();
            var medstartdate = $("#medstartdate").val();
            var medenddate = $("#medenddate").val();
            var directionstoussage = $("#directionstoussage").val();
            var refills = $("#refills").val();
            var company = $("#company").val();
            var mednote = $("#mednote").val();

            console.log(medicationname,dossage,quantity,medstartdate,medenddate,directionstoussage,refills,company,mednote);

            var medications_data = {
                "id": id,
                "medicinname": medicationname,
                "doesage": dossage,
                "quantity": quantity,
                "startdate": medstartdate,
                "enddate": medenddate,
                "usagedirections": directionstoussage,
                "refills": refills,
                "labelofmedication": company,
                "notes": mednote

            }
            console.log(medications_data)
            update_medications(medications_data, function(data, status) {
                if (status == "success") {
                    $("#medicationname").val("");
                    $("#dossage").val("");
                    $("#quantity").val("");
                    $("#medstartdate").val("");
                    $("#medenddate").val("");
                    $("#directionstoussage").val("");
                    $("#refills").val("");
                    $("#company").val("");
                    $("#mednote").val("");
                    load_medications();
                    //$("#medications tbody").append("<tr>" + "<td>" + medicationname + "</td>" + "<td>" + dossage + "</td>" + "<td>" + quantity + "</td>"+ "<td>" + medstartdate + "</td>" + "<td>" + medenddate + "</td>"+ "<td>" +directionstoussage  + "</td>" + "<td>" + refills + "</td>"+ "<td>" + company + "</td>" + "<td>" + mednote + "</td>" + "<td><a href='' class='medicationedit'>Edit</a> <a href='' class='medicationdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_medications_data() {
            var medicationname = $("#medicationname").val();
            var dossage = $("#dossage").val();
            var quantity = $("#quantity").val();
            var medstartdate = $("#medstartdate").val();
            var medenddate = $("#medenddate").val();
            var directionstoussage = $("#directionstoussage").val();
            var refills = $("#refills").val();
            var company = $("#company").val();
            var mednote = $("#mednote").val();

            console.log(medicationname,dossage,quantity,medstartdate,medenddate,directionstoussage,refills,company,mednote);

            var medications_data = {
                "medicinname": medicationname,
                "doesage": dossage,
                "quantity": quantity,
                "startdate": medstartdate,
                "enddate": medenddate,
                "usagedirections": directionstoussage,
                "refills": refills,
                "labelofmedication": company,
                "notes": mednote,
                "user": user_id,
                "patient": patient_id
            }

            save_medications(medications_data, function(data, status) {
                if (status == "success") {
                    $("#medicationname").val("");
                    $("#dossage").val("");
                    $("#quantity").val("");
                    $("#medstartdate").val("");
                    $("#medenddate").val("");
                    $("#directionstoussage").val("");
                    $("#refills").val("");
                    $("#company").val("");
                    $("#mednote").val("");
                    load_medications();
                   // $("#medications tbody").append("<tr>" + "<td>" + medicationname + "</td>" + "<td>" + dossage + "</td>" + "<td>" + quantity + "</td>"+ "<td>" + medstartdate + "</td>" + "<td>" + medenddate + "</td>"+ "<td>" +directionstoussage  + "</td>" + "<td>" + refills + "</td>"+ "<td>" + company + "</td>" + "<td>" + mednote + "</td>" + "<td><a href='' class='medicationedit'>Edit</a> <a href='' class='medicationdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
     $(document).on('click', 'td a.medicationdelete', function () {
          id = $(this).data('id');
          console.log("delete ::"+id);
          delete_medications(id, function(data, status) {
                load_medications();
     });
          return false;
     });
     $(document).on('click', 'td a.medicationedit', function () {
       new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
       return false;
     });
     $("#create-medications").button().click(new_dialog);
     load_medications();
});

/* 1010101010101010101010101010101 vaccine details */
$(function () {
     var load_vaccine = function(){
         get_vaccine_data(function(data, status) {
         console.log("********");
         var vaccine_view = ""
             if (data.length >= 0) {
                console.log(data)
                vaccine_view += '<tbody style="border:5px">';
                    for (var i = 0; i < data.length; i++) {
                        var alr = data[i]
                        vaccine_view += '<tr>';
                        vaccine_view += '<td><span style="color:#017b8b";>Vaccine Code:</span><span>'+ alr.vaccinecode + '</span></td>' ;
                        vaccine_view += '<td><span style="color:#017b8b";>Status:</span><span>'+ alr.v_status + '</span></td>';
                        vaccine_view += '<td><span style="color:#017b8b";>Taken date:</span><span>'+ alr.takendate + '</span></td>';
                        vaccine_view += '<td><span style="color:#017b8b";>Note:</span><span>'+ alr.notes + '</span></td>';
                        vaccine_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';
//                        vaccine_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="vaccineedit">Edit</a>' +
//                            '<a href="javascript:void(0)" data-id="' + alr.id + '" class="vaccinedelete">Delete</a></td>';
                        vaccine_view += '</tr>';
                        vaccine_view += '<td><hr></td>';
                    }
                vaccine_view += '</tbody>';

                $("#vaccine").html(vaccine_view)
             }
         });
     }
     var new_dialog = function (type, row,vaccine_id) {
        var dlg = $("#dialog-form-vaccine");

        type = type || 'Create';
        var config = {
             autoOpen: true,
             height: 400,
             width: 450,
             modal: true,
             buttons: {
                   "Save": save_vaccine_data,
                   "Cancel": function () {
                      dlg.dialog("close");
                   }
             },
             close: function () {
                dlg.dialog("close");
             }
        };
        if (type === 'Edit') {
             config.title = "Vaccine";
             get_vaccine_data_for_edit(row);
             delete (config.buttons['Save']);
             config.buttons['Edit'] = function () {
                 edit_vaccine_data(vaccine_id);
                 row.remove();
             };
         }
        dlg.dialog(config);
         function get_vaccine_data_for_edit(row) {
              $("#vaccinename").val($(row.children().find('span').get(1)).text());
              $("#vaccinestatus").val($(row.children().find('span').get(3)).text());
              $("#vaccinetakendate").val($(row.children().find('span').get(5)).text());
              $("#vaccinenote").val($(row.children().find('span').get(7)).text());

          }

         function edit_vaccine_data(id) {
            var vaccinename = $("#vaccinename").val();
            var vaccinestatus = $("#vaccinestatus").val();
            var vaccinetakendate = $("#vaccinetakendate").val();
            var vaccinenote = $("#vaccinenote").val();
            console.log(vaccinename, vaccinestatus, vaccinetakendate,vaccinenote);

            var vaccine_data = {
                "id": id,
                "vaccinecode": vaccinename,
                "v_status": vaccinestatus,
                "takendate": vaccinetakendate,
                "notes": vaccinenote

            }
            console.log(vaccine_data)
            update_vaccine(vaccine_data, function(data, status) {
                if (status == "success") {
                    $("#vaccinename").val("");
                    $("#vaccinestatus").val("");
                    $("#vaccinetakendate").val("");
                    $("#vaccinenote").val("");

                    load_vaccine();
                    //$("#vaccine tbody").append("<tr>" + "<td>" + vaccinename + "</td>" + "<td>" + vaccinestatus + "</td>" + "<td>" + vaccinetakendate + "</td>"+ "<td>" + vaccinenote + "</td>"  + "<td><a href='' class='vaccineedit'>Edit</a> <a href='' class='vaccinedelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
         }
         function save_vaccine_data() {
             var vaccinename = $("#vaccinename").val();
             var vaccinestatus = $("#vaccinestatus").val();
             var vaccinetakendate = $("#vaccinetakendate").val();
             var vaccinenote = $("#vaccinenote").val();
             console.log(vaccinename, vaccinestatus, vaccinetakendate,vaccinenote);

            var vaccine_data = {
                "vaccinecode": vaccinename,
                "v_status": vaccinestatus,
                "takendate": vaccinetakendate,
                "notes": vaccinenote,
                "user": user_id,
                "patient": patient_id
            }

            save_vaccine(vaccine_data, function(data, status) {
                   if (status == "success") {
                    $("#vaccinename").val("");
                    $("#vaccinestatus").val("");
                    $("#vaccinetakendate").val("");
                    $("#vaccinenote").val("");
                    //$("#vaccine tbody").append("<tr>" + "<td>" + vaccinename + "</td>" + "<td>" + vaccinestatus + "</td>" + "<td>" + vaccinetakendate + "</td>"+ "<td>" + vaccinenote + "</td>"  + "<td><a href='' class='vaccineedit'>Edit</a> <a href='' class='vaccinedelete'>Delete</a></td>" + "</tr>");
                    load_vaccine();
                    dlg.dialog("close");
                    }
            });
         }
    };
    $(document).on('click', 'td a.vaccinedelete', function () {
        id = $(this).data('id');
        console.log("delete ::"+id);
        delete_vaccine(id, function(data, status) {
             load_vaccine();
        });
      return false;
    });
    $(document).on('click', 'td a.vaccineedit', function () {
        new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
        return false;
    });
    $("#create-vaccine").button().click(new_dialog);

    load_vaccine();
});

/* 111111111111111111 status details */
$(function () {
    var load_status = function(){
           get_status_data(function(data, status) {
        console.log("********");
        var status_view = ""

        if (data.length >= 0) {
            console.log(data)
            status_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                status_view += '<tr>';
                status_view += '<td><span style="color:#017b8b";>Status Type:</span><span>'+ alr.healthstatus + '</span></td>';
                status_view += '<td><span style="color:#017b8b"; >Effective date:</span><span>'+ alr.effectivedate + '</span></td>';
                status_view += '<td><span style="color:#017b8b";>Desccription:</span><span>'+ alr.description + '</span></td>';
                status_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';

//                status_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="statusedit">Edit</a>' +
//                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="statusdelete">Delete</a></td>';
                status_view += '</tr>';
                status_view += '<td><hr></td>';

            }
            status_view += '</tbody>';

            $("#status").html(status_view)
        }
    });
    }
    var new_dialog = function(type, row, status_id) {
        var dlg = $("#dialog-form-status");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_status_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Status";
            get_status_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_status_data(status_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_status_data_for_edit(row) {
            $("#statusselect").val($(row.children().find('span').get(1)).text());
            $("#effectivedate").val($(row.children().find('span').get(3)).text());
            $("#statusdiscription").val($(row.children().find('span').get(5)).text());
        }

        function edit_status_data(id) {
            var statusselect = $("#statusselect").val();
            var effectivedate = $("#effectivedate").val();
            var statusdiscription = $("#statusdiscription").val();
            console.log(statusselect, effectivedate, statusdiscription);

            var status_data = {
                "id": id,
                "healthstatus": statusselect,
                "effectivedate": effectivedate,
                "description": statusdiscription,

            }
            console.log(status_data)
            update_status(status_data, function(data, status) {
                if (status == "success") {
                    $("#statusselect").val("");
                    $("#effectivedate").val("");
                    $("#statusdiscription").val("");

                    load_status();
                    //$("#status tbody").append("<tr>" + "<td>" + statusselect + "</td>" + "<td>" + effectivedate + "</td>" + "<td>" + statusdiscription + "</td>" + "<td><a href='' class='statusedit'>Edit</a> <a href='' class='statusdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_status_data() {
            var statusselect = $("#statusselect").val();
            var effectivedate = $("#effectivedate").val();
            var statusdiscription = $("#statusdiscription").val();
            console.log(statusselect, effectivedate, statusdiscription);

            var status_data = {
                "healthstatus": statusselect,
                "effectivedate": effectivedate,
                "description": statusdiscription,
                "user": user_id,
                "patient": patient_id
            }

            save_status(status_data, function(data, status) {
                if (status == "success") {
                    $("#statusselect").val("");
                    $("#effectivedate").val("");
                    $("#statusdiscription").val("");
                    load_status();
                    //$("#status tbody").append("<tr>" + "<td>" + statusselect + "</td>" + "<td>" + effectivedate + "</td>" + "<td>" + statusdiscription + "</td>" + "<td><a href='' class='statusedit'>Edit</a> <a href='' class='statusdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
 $(document).on('click', 'td a.statusdelete', function () {
        id = $(this).data('id');
        console.log("delete ::"+id);
        delete_status(id, function(data, status) {
            load_status();
        });
      return false;
  });
 $(document).on('click', 'td a.statusedit', function () {
       new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
      return false;
 });
 $("#create-status").button().click(new_dialog);

    load_status();
});

/*12121212121212121212 completed backend have to done Amendments */
$(function () {
   var load_amendments=function(){
        get_amendments_data(function(data, status) {
            console.log("********");
            var amendments_view = ""

            if (data.length >= 0) {
                console.log(data)
                amendments_view += '<tbody style="border:5px">';

                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    amendments_view += '<tr>';
                    amendments_view += '<td><span style="color:#017b8b";>Source:</span><span>'+ alr.amendmentssource + '</span></td>' ;
                    amendments_view += '<td><span style="color:#017b8b"; >Description:</span><span>'+ alr.description + '</span></td>';
                    amendments_view += '<td><span style="color:#017b8b";>Status:</span><span>'+ alr.status + '</span></td>';
                    amendments_view += '<td><span style="color:#017b8b";>Reason for status:</span><span>'+ alr.statusdescription + '</span></td>';
                    amendments_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';

//                    amendments_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="amendmentsedit">Edit</a>' +
//                        '<a hre   f="javascript:void(0)" data-id="' + alr.id + '" class="amendmentsdelete">Delete</a></td>';
                    amendments_view += '</tr>';
                    amendments_view += '<td><hr></td>';
                }
                amendments_view += '</tbody>';

                $("#amendments").html(amendments_view)
            }
        });
   }
    var new_dialog = function(type, row, amendments_id) {
        var dlg = $("#dialog-form-amendments");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_amendments_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Amendments";
            get_amendments_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_amendments_data(amendments_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_amendments_data_for_edit(row) {
            $("#amendementssource").val($(row.children().find('span').get(1)).text());
            $("#amendementssourcediscription").val($(row.children().find('span').get(3)).text());
            $("#amendementsstatus").val($(row.children().find('span').get(5)).text());
            $("#amendementsstatusdiscription").val($(row.children().find('span').get(7)).text());
        }

        function edit_amendments_data(id) {
            var amendementssource = $("#amendementssource").val();
            var amendementssourcediscription = $("#amendementssourcediscription").val();
            var amendementsstatus = $("#amendementsstatus").val();
             var amendementsstatusdiscription = $("#amendementsstatusdiscription").val();
            console.log(amendementssource, amendementssourcediscription, amendementsstatus ,amendementsstatusdiscription);

            var amendments_data = {
                "id": id,
                "amendmentssource": amendementssource,
                "description": amendementssourcediscription,
                "status": amendementsstatus,
                "statusdescription": amendementsstatusdiscription,


            }
            console.log(amendments_data)
            update_amendments(amendments_data, function(data, status) {
                if (status == "success") {
                    $("#amendementssource").val("");
                    $("#amendementssourcediscription").val("");
                    $("#amendementsstatus").val("");
                    $("#amendementsstatusdiscription").val("");
                    load_amendments();
                    //$("#amendments tbody").append("<tr>" + "<td>" + amendementssource + "</td>" + "<td>" + amendementssourcediscription + "</td>" + "<td>" + amendementsstatus + "</td>" + "<td><a href='' class='amendementsedit'>Edit</a> <a href='' class='amendementsdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");


                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }
        function save_amendments_data() {
           var amendementssource = $("#amendementssource").val();
           var amendementssourcediscription = $("#amendementssourcediscription").val();
           var amendementsstatus = $("#amendementsstatus").val();
           var amendementsstatusdiscription = $("#amendementsstatusdiscription").val();
            var amendments_data = {
                "amendmentssource": amendementssource,
                "description": amendementssourcediscription,
                "status": amendementsstatus,
                "statusdescription": amendementsstatusdiscription,
                "user": user_id,
                "patient": patient_id
            }

            save_amendments(amendments_data, function(data, status) {
                if (status == "success") {
                    $("#amendementssource").val("");
                    $("#amendementssourcediscription").val("");
                    $("#amendementsstatus").val("");
                    $("#amendementsstatusdiscription").val("");
                    load_amendments();
                    //$("#amendments tbody").append("<tr>" + "<td>" + amendementssource + "</td>" + "<td>" + amendementssourcediscription + "</td>" + "<td>" + amendementsstatus + "</td>" + "<td><a href='' class='amendementsedit'>Edit</a> <a href='' class='amendementsdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };

 $(document).on('click', 'td a.amendmentsdelete', function () {
        id = $(this).data('id');
        console.log("delete ::"+id);
        delete_amendments(id, function(data, status) {
            load_amendments();
        });
      return false;
 });
 $(document).on('click', 'td a.amendmentsedit', function () {
      new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
      return false;
 });
 $("#create-amendments").button().click(new_dialog);

 load_amendments();
});

/*1313131313131 Advance directives have to done in backend */
$(function () {
    var load_advancedirectives = function(){
        get_advancedirectives_data(function(data, status) {
        console.log("********");
        var advancedirectives_view = ""

        if (data.length >= 0) {
            console.log(data)
            advancedirectives_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                advancedirectives_view += '<tr>';
                 advancedirectives_view += '<td><span style="color:#017b8b";>Directive:</span><span>'+ alr.derivatives + '</span></td>' ;
                 advancedirectives_view += '<td><span style="color:#017b8b"; >Description:</span><span>'+ alr.description + '</span></td>';
//                advancedirectives_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="ADedit">Edit</a>' +
//                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="ADdelete">Delete</a></td>';
                advancedirectives_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';
                advancedirectives_view += '</tr>';
                advancedirectives_view += '<td><hr></td>';
            }
            advancedirectives_view += '</tbody>';

            $("#advancedirectives").html(advancedirectives_view)
        }
    });
    }
    var new_dialog = function(type, row, advancedirectives_id) {
        var dlg = $("#dialog-form-advancedirectives");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_advancedirectives_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Advance directives";
            get_advancedirectives_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_advancedirectives_data(advancedirectives_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_advancedirectives_data_for_edit(row) {
            $("#directive").val($(row.children().find('span').get(1)).text());
            $("#ADdiscription").val($(row.children().find('span').get(3)).text());
        }

        function edit_advancedirectives_data(id) {
            var directive = $("#directive").val();
            var ADdiscription = $("#ADdiscription").val();
            console.log(directive, ADdiscription);

            var advancedirectives_data = {
                "id": id,
                "derivatives": directive,
                "description": ADdiscription,
                "user": user_id,
                "patient": patient_id
            }
            console.log(advancedirectives_data)
            update_advancedirectives(advancedirectives_data, function(data, status) {
                if (status == "success") {
                    $("#directive").val("");
                    $("#ADdiscription").val("");
                    load_advancedirectives();
                    //$("#advancedirectives tbody").append("<tr>" + "<td>" + directive + "</td>" + "<td>" + ADdiscription + "</td>"  + "<td><a href='' class='ADedit'>Edit</a> <a href='' class='ADdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_advancedirectives_data() {
            var directive = $("#directive").val();
            var ADdiscription = $("#ADdiscription").val();

            console.log(directive, ADdiscription);

            var advancedirective_data = {
                "derivatives": directive,
                "description": ADdiscription,
                "user": user_id,
                "patient": patient_id
            }

            save_advancedirectives(advancedirective_data, function(data, status) {
                if (status == "success") {
                    $("#directive").val("");
                    $("#ADdiscription").val("");
                    //$("#advancedirectives tbody").append("<tr>" + "<td>" + directive + "</td>" + "<td>" + ADdiscription + "</td>"  + "<td><a href='' class='ADedit'>Edit</a> <a href='' class='ADdelete'>Delete</a></td>" + "</tr>");
                    load_advancedirectives();
                    dlg.dialog("close");
                }
            });
        }
    };
 $(document).on('click', 'td a.ADdelete', function () {
      id = $(this).data('id');
      console.log("delete ::"+id);
      delete_advancedirectives( id, function(data, status) {
             load_advancedirectives();

           //$(this).parents('tr:first').remove()
      });

      return false;
  });
 $(document).on('click', 'td a.ADedit', function () {
    new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
    return false;
 });
 $("#create-advancedirectives").button().click(new_dialog);

 load_advancedirectives();
});

/* 141414141414141414141414 Allert */
$(function () {
    var load_allert = function(){
        get_allert_data(function(data, status) {

        var allert_view = ""

        if (data.length >= 0) {
            console.log(data)
            allert_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]

                allert_view += '<tr>';
                allert_view += '<td><span style="color:#017b8b";>Alert:</span><span>'+ alr.patientalert + '</span></td>' ;
                allert_view += '<td><span style="color:#017b8b"; >Visibility:</span><span>'+ alr.visiabilitytype + '</span></td>';
                allert_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';

//                allert_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="allertedit">Edit</a>' +
//                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="allertdelete">Delete</a></td>';
                allert_view += '</tr>';
                allert_view += '<td><hr></td>';
            }
            allert_view += '</tbody>';

            $("#allert").html(allert_view)
        }
    });
    }
    var new_dialog = function(type, row, allert_id) {
        var dlg = $("#dialog-form-allert");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_allert_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Alert";
            get_allert_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_allert_data(allert_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_allert_data_for_edit(row) {
            $("#alertdiscription").val($(row.children().find('span').get(1)).text());
            $("#alertvisibility").val($(row.children().find('span').get(3)).text());
        }

        function edit_allert_data(id) {
            var alertdiscription = $("#alertdiscription").val();
            var alertvisibility = $("#alertvisibility").val();
            console.log(alertdiscription, alertvisibility);

            var allert_data = {
                "id": id,
                "patientalert": alertdiscription,
                "visiabilitytype": alertvisibility
            }
            console.log(allert_data)
            update_allert(allert_data, function(data, status) {
                if (status == "success") {
                    $("#alertdiscription").val("");
                    $("#alertvisibility").val("");

                    load_allert();
                    //$("#allert tbody").append("<tr>" + "<td>" + alertdiscription + "</td>" + "<td>" + alertvisibility + "</td>" + "<td><a href='' class='allertedit'>Edit</a> <a href='' class='allertdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_allert_data() {
            var alertdiscription = $("#alertdiscription").val();
            var alertvisibility = $("#alertvisibility").val();
            console.log(alertdiscription, alertvisibility);

            var allert_data = {
                "patientalert": alertdiscription,
                "visiabilitytype": alertvisibility,
                "user": user_id,
                "patient": patient_id
            }

            save_allert(allert_data, function(data, status) {
               if (status == "success") {
                    $("#alertdiscription").val("");
                    $("#alertvisibility").val("");
                    load_allert();
                    //$("#allert tbody").append("<tr>" + "<td>" + alertdiscription + "</td>" + "<td>" + alertvisibility + "</td>" + "<td><a href='' class='allertedit'>Edit</a> <a href='' class='allertdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
    $(document).on('click', 'td a.allertdelete', function () {
     id = $(this).data('id');
     console.log("delete ::"+id);
        delete_allert( id,function(data, status) {
            load_allert();

     });
      return false;
    });
    $(document).on('click', 'td a.allertedit', function () {
    new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
    return false;
    });
    $("#create-allert").button().click(new_dialog);
    load_allert();
});

/*1515151515151515151 note */
$(function () {
    var load_note = function(){
        get_note_data(function(data, status) {
        console.log("********");
        var note_view = ""

            if (data.length >= 0) {
                console.log(data)
                note_view += '<tbody style="border:5px">';
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    note_view += '<tr>';

                    note_view += '<td><span style="color:#017b8b";></span><span>'+ alr.notes + '</span></td>' ;

                    note_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';

//                    note_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="noteedit">Edit</a>' +
//                        '<a href="javascript:void(0)" data-id="' + alr.id + '" class="notedelete">Delete</a></td>';
                    note_view += '</tr>';
                    note_view += '<td><hr></td>';
                }
                note_view += '</tbody>';

                $("#note").html(note_view)
            }
        });
    }
    var new_dialog = function(type, row, note_id) {
        var dlg = $("#dialog-form-note");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_note_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Note";
            get_note_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_note_data(note_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_note_data_for_edit(row) {
            $("#notesummary").val($(row.children().find('span').get(1)).text());
        }

        function edit_note_data(id) {
            var notesummary = $("#notesummary").val();

            console.log(notesummary);

            var note_data = {
                "id": id,
                "notes": notesummary,

            }
            console.log(note_data)
            update_note(note_data, function(data, status) {
                if (status == "success") {
                    $("#notesummary").val("");
                    //$("#note tbody").append("<tr>" + "<td>" + notesummary + "</td>"  + "<td><a href='' class='noteedit'>Edit</a> <a href='' class='notedelete'>Delete</a></td>" + "</tr>");
                    load_note();
                    dlg.dialog("close");


                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_note_data() {
            var notesummary = $("#notesummary").val();

            console.log(notesummary);

            var note_data = {
                "notes": notesummary,
                "user": user_id,
                "patient": patient_id

            }

            save_note(note_data, function(data, status) {
                if (status == "success") {
                    $("#notesummary").val("");
                    load_note();
                    //$("#note tbody").append("<tr>" + "<td>" + notesummary + "</td>"  + "<td><a href='' class='noteedit'>Edit</a> <a href='' class='notedelete'>Delete</a></td>" + "</tr>");




                    dlg.dialog("close");
                }
            });
        }
    };
 $(document).on('click', 'td a.notedelete', function () {
        id = $(this).data('id');
        console.log("delete ::"+id);
        delete_note( id,function(data, status) {
            load_note();
        });
      return false;
 });
 $(document).on('click', 'td a.noteedit', function () {
        new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
        return false;
 });
 $("#create-note").button().click(new_dialog);

    load_note();
});

/* 161616161616161616116  goal */
$(function () {
    var load_goal = function(){
        get_goal_data(function(data, status) {
        console.log("********");
        var goal_view = ""

        if (data.length >= 0) {
            console.log(data)
            goal_view += '<tbody style="border:5px">';
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                goal_view += '<tr>';
                goal_view += '<td><span style="color:#017b8b";>Description:</span><span>'+ alr.description + '</span></td>' ;
                goal_view += '<td><span style="color:#017b8b";>From Date:</span><span>'+ alr.fromdated + '</span></td>' ;
                goal_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';

//                goal_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="goaledit">Edit</a>' +
//                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="goaldelete">Delete</a></td>';
                goal_view += '</tr>';
                goal_view += '<td><hr></td>';
            }
            goal_view += '</tbody>';

            $("#goal").html(goal_view)
        }
    });
    }
        var new_dialog = function(type, row, goal_id) {
        var dlg = $("#dialog-form-goal");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_goal_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Goal";
            get_goal_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_goal_data(goal_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_goal_data_for_edit(row) {
            $("#goalsummary").val($(row.children().find('span').get(1)).text());
            $("#goalsdate").val($(row.children().find('span').get(3)).text());

        }

        function edit_goal_data(id) {
            var goalsummary = $("#goalsummary").val();
            var goalsdate = $("#goalsdate").val();
            console.log(goalsummary, goalsdate);

            var goal_data = {
                "id": id,
                "description": goalsummary,
                "fromdated": goalsdate

            }
            console.log(goal_data)
            update_goal(goal_data, function(data, status) {
                if (status == "success") {
                    $("#goalsummary").val("");
                    $("#goalsdate").val("");
                    load_goal();
                    //$("#goal tbody").append("<tr>" + "<td>" + goalsummary + "</td>" + "<td>" + goalsdate + "</td>"  + "<td><a href='' class='goaledit'>Edit</a> <a href='' class='goaldelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_goal_data() {
            var goalsummary = $("#goalsummary").val();
            var goalsdate = $("#goalsdate").val();
            console.log(Allergen, goalsdate);

            var goal_data = {
                "description": goalsummary,
                "fromdated": goalsdate,
                "user": user_id,
                "patient": patient_id
            }

            save_goal(goal_data, function(data, status) {
                if (status == "success") {
                    $("#goalsummary").val("");
                    $("#goalsdate").val("");
                    load_goal();
                    //$("#goal tbody").append("<tr>" + "<td>" + goalsummary + "</td>" + "<td>" + goalsdate + "</td>"  + "<td><a href='' class='goaledit'>Edit</a> <a href='' class='goaldelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };

 $(document).on('click', 'td a.goaldelete', function () {
     id = $(this).data('id');
     console.log("delete ::"+id);
     delete_goal(id, function(data, status) {
           load_goal();
     });
      return false;
 });
 $(document).on('click', 'td a.goaledit', function () {
      new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
      return false;
 });
 $("#create-goal").button().click(new_dialog);

 load_goal();
});

/* 1717171717171717171717171 symptoms */
$(function () {
    var load_sympotoms= function(){
         get_symptoms_data(function(data, status) {
        console.log("********");
        var symptoms_view = ""

        if (data.length >= 0) {
            console.log(data)
            symptoms_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                symptoms_view += '<tr>';
                symptoms_view += '<td><span style="color:#017b8b";>Symptoms:</span><span>'+ alr.symtomdescription + '</span></td>' ;
                symptoms_view += '<td><span style="color:#017b8b"; >From date:</span><span>'+ alr.fromdated + '</span></td>';
                symptoms_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';



//
//                symptoms_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="symptomedit">Edit</a>' +
//                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="symptomdelete">Delete</a></td>';
                symptoms_view += '</tr>';
                symptoms_view += '<td><hr></td>';
            }
            symptoms_view += '</tbody>';

            $("#symptoms").html(symptoms_view)
        }
    });
    }
    var new_dialog = function(type, row, symptoms_id) {
        var dlg = $("#dialog-form-symptoms");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_symptoms_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Symptoms";
            get_symptoms_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_symptoms_data(symptoms_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_symptoms_data_for_edit(row) {
            $("#symdescription").val($(row.children().find('span').get(1)).text());
            $("#sympstartdate").val($(row.children().find('span').get(3)).text());
        }

        function edit_symptoms_data(id) {
            var symdescription = $("#symdescription").val();
            var sympstartdate = $("#sympstartdate").val();
            console.log(symdescription, sympstartdate);
            var symptoms_data = {
                "id": id,
                "symtomdescription": symdescription,
                "fromdated": sympstartdate,

            }
            console.log(symptoms_data)
            update_symptoms(symptoms_data, function(data, status) {
                if (status == "success") {
                    $("#symdescription").val("");
                    $("#sympstartdate").val("");
                    load_sympotoms()
                    //$("#symptoms tbody").append("<tr>" + "<td>" + symdescription + "</td>" + "<td>" + sympstartdate + "</td>"  + "<td><a href='' class='symptomedit'>Edit</a> <a href='' class='symptomdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_symptoms_data() {
            var symdescription = $("#symdescription").val();
            var sympstartdate = $("#sympstartdate").val();
            console.log(Allergen, sympstartdate);

            var symptoms_data = {
                "symtomdescription": symdescription,
                "fromdated": sympstartdate,
               "user": user_id,
                "patient": patient_id
            }

            save_symptoms(symptoms_data, function(data, status) {
                if (status == "success") {
                    $("#symdescription").val("");
                    $("#sympstartdate").val("");
                    load_sympotoms();
                    //$("#symptoms tbody").append("<tr>" + "<td>" + symdescription + "</td>" + "<td>" + sympstartdate + "</td>"  + "<td><a href='' class='symptomedit'>Edit</a> <a href='' class='symptomdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };

    $(document).on('click', 'td a.symptomdelete', function () {
           id = $(this).data('id');
           console.log("delete ::"+id);
           delete_symptoms(id, function(data, status) {

                load_sympotoms();

           });


      return false;
  });
    $(document).on('click', 'td a.symptomedit', function () {
   new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
  return false;
 });
    $("#create-symptoms").button().click(new_dialog);

      load_sympotoms();
});

/*1818181818181818818181818 inpatient */
$(function () {
     var load_inpatient = function(){
        get_inpatient_data(function(data, status) {
        console.log("********");
        var inpatient_view = ""
            if (data.length >= 0) {
                console.log(data)
                inpatient_view += '<tbody style="border:5px">';

                    for (var i = 0; i < data.length; i++) {
                        var alr = data[i]
                        inpatient_view += '<tr>';


                        inpatient_view += '<td><span style="color:#017b8b";>Admission Date:</span><span>'+ alr.admintdate + '</span></td>' ;
                        inpatient_view += '<td><span style="color:#017b8b";>Discharge Date:</span><span>'+ alr.dischargedate + '</span></td>' ;
                        inpatient_view += '<td><span style="color:#017b8b"; >Admission type:</span><span>'+ alr.admissiontype + '</span></td>';
                        inpatient_view += '<td><span style="color:#017b8b";>Discharge Summary:</span><span>'+ alr.dischargesummary + '</span></td>';
                        inpatient_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';

//                        inpatient_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="inpatientedit">Edit</a>' +
//                            '<a href="javascript:void(0)" data-id="' + alr.id + '" class="inpatientdelete">Delete</a></td>';
                        inpatient_view += '</tr>';
                        inpatient_view += '<td><hr></td>';
                    }
                inpatient_view += '</tbody>';

                $("#inpatient").html(inpatient_view)
            }
        });
     }
    var new_dialog = function(type, row, inpatient_id) {
        var dlg = $("#dialog-form-inpatient");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_inpatient_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Inpatient";
            get_inpatient_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_inpatient_data(inpatient_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_inpatient_data_for_edit(row) {
            $("#adddate").val($(row.children().find('span').get(1)).text());
            $("#disdate").val($(row.children().find('span').get(3)).text());
            $("#distype").val($(row.children().find('span').get(5)).text());
            $("#dissum").val($(row.children().find('span').get(7)).text());
        }

        function edit_inpatient_data(id) {
            var adddate = $("#adddate").val();
            var disdate = $("#disdate").val();
            var distype = $("#distype").val();
            var dissum = $("#dissum").val();
            console.log(adddate, disdate, distype,dissum);

            var inpatient_data = {
                "id": id,
                "admintdate": adddate,
                "dischargedate": disdate,
                "admissiontype": distype,
                "dischargesummary": dissum,

            }
            console.log(inpatient_data)
            update_inpatient(inpatient_data, function(data, status) {
                if (status == "success") {
                    $("#adddate").val("");
                    $("#disdate").val("");
                    $("#distype").val("");
                    $("#dissum").val("");
                        load_inpatient();
                    //$("#inpatient tbody").append("<tr>" + "<td>" + adddate + "</td>" + "<td>" + disdate + "</td>" + "<td>" + distype + "</td>" + "<td>" + dissum + "</td>"+ "<td><a href='' class='inpatientedit'>Edit</a> <a href='' class='inpatientdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_inpatient_data() {
            var adddate = $("#adddate").val();
            var disdate = $("#disdate").val();
            var distype = $("#distype").val();
            var dissum = $("#dissum").val();
            console.log(adddate, disdate, distype,dissum);

            var inpatient_data = {
                "admintdate": adddate,
                "dischargedate": disdate,
                "admissiontype": distype,
                "dischargesummary": dissum,
                "user": user_id,
                "patient": patient_id
            }

            save_inpatient(inpatient_data, function(data, status) {
               if (status == "success") {
                    $("#adddate").val("");
                    $("#disdate").val("");
                    $("#distype").val("");
                    $("#dissum").val("");
                    load_inpatient();
                    //$("#inpatient tbody").append("<tr>" + "<td>" + adddate + "</td>" + "<td>" + disdate + "</td>" + "<td>" + distype + "</td>" + "<td>" + dissum + "</td>" + "<td><a href='' class='inpatientedit'>Edit</a> <a href='' class='inpatientdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
 $(document).on('click', 'td a.inpatientdelete', function () {
        id = $(this).data('id');
        console.log("delete ::"+id);

        delete_inpatient( id,function(data, status) {
            load_inpatient();
        });
         return false;
  });
 $(document).on('click', 'td a.inpatientedit', function () {
   new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
  return false;
 });
 $("#create-inpatient").button().click(new_dialog);

 load_inpatient();
});

/*191919191919191919191919 refferel */
$(function () {
    load_refferel= function(){
        get_refferel_data(function(data, status) {
            console.log("********");
            var refferel_view = ""

            if (data.length >= 0) {
            console.log(data)
            refferel_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                refferel_view += '<tr>';
                refferel_view += '<td><span style="color:#017b8b";>Doctor Name:</span><span>'+ alr.doctorname + '</span></td>' ;
                refferel_view += '<td><span style="color:#017b8b";>Doctor Contact:</span><span>'+ alr.doctorcontact + '</span></td>' ;
                refferel_view += '<td><span style="color:#017b8b"; >Doctor Email:</span><span>'+ alr.doctoremail + '</span></td>';
                refferel_view += '<td><span style="color:#017b8b";>Doctor Summary:</span><span>'+ alr.doctornote + '</span></td>';
                refferel_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';

//                refferel_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="doctoredit">Edit</a>' +
//                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="doctordelete">Delete</a></td>';
                refferel_view += '</tr>';
                refferel_view += '<td><hr></td>';
            }
            refferel_view += '</tbody>';

            $("#refferel").html(refferel_view)
        }
        });
    }
    var new_dialog = function(type, row, refferel_id) {
        var dlg = $("#dialog-form-refferel");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_refferel_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Allergy";
            get_refferel_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_refferel_data(refferel_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_refferel_data_for_edit(row) {
            $("#doctorname").val($(row.children().find('span').get(1)).text());
            $("#doctorcontact").val($(row.children().find('span').get(3)).text());
            $("#doctoremail").val($(row.children().find('span').get(5)).text());
            $("#doctornote").val($(row.children().find('span').get(7)).text());
        }

        function edit_refferel_data(id) {
            var doctorname = $("#doctorname").val();
            var doctorcontact = $("#doctorcontact").val();
            var doctoremail = $("#doctoremail").val();
             var doctornote = $("#doctornote").val();
            console.log(doctorname, doctorcontact, doctoremail,doctornote);

            var refferel_data = {
                "id": id,
                "doctorname": doctorname,
                "doctorcontact": doctorcontact,
                "doctoremail": doctoremail,
                "doctornote": doctornote,

            }
            console.log(refferel_data)
            update_refferel(refferel_data, function(data, status) {
                if (status == "success") {
                    $("#doctorname").val("");
                    $("#doctorcontact").val("");
                    $("#doctoremail").val("");
                    $("#doctornote").val("");
                    load_refferel();
                    //$("#refferel tbody").append("<tr>" + "<td>" + doctorname + "</td>" + "<td>" + doctorcontact + "</td>" + "<td>" + doctoremail + "</td>"+ "<td>" + doctornote + "</td>" + "<td><a href='' class='doctoredit'>Edit</a> <a href='' class=doctordelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_refferel_data() {
            var doctorname = $("#doctorname").val();
            var doctorcontact = $("#doctorcontact").val();
            var doctoremail = $("#doctoremail").val();
            var doctornote = $("#doctornote").val();
            console.log(doctorname, doctorcontact, doctoremail,doctornote);

            var refferel_data = {
                "doctorname": doctorname,
                "doctorcontact": doctorcontact,
                "doctoremail": doctoremail,
                "doctornote": doctornote,
                "user": user_id,
                "patient": patient_id
            }
        send_patientreferal(refferel_data, function(data, status) {
                if (status == "success") {
                    console.log("email sent sucessfully");


                }
            });
            save_refferel(refferel_data, function(data, status) {
                if (status == "success") {
                    $("#doctorname").val("");
                    $("#doctorcontact").val("");
                    $("#doctoremail").val("");
                    $("#doctornote").val("");
                    load_refferel();
                    //$("#refferel tbody").append("<tr>" + "<td>" + doctorname + "</td>" + "<td>" + doctorcontact + "</td>" + "<td>" + doctoremail + "</td>"+ "<td>" + doctornote + "</td>" + "<td><a href='' class='doctoredit'>Edit</a> <a href='' class=doctordelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };

 $(document).on('click', 'td a.doctordelete', function () {
     id = $(this).data('id');
     console.log("delete ::"+id);
     delete_refferel(id, function(data, status) {
            load_refferel();

     });


      return false;
  });
 $(document).on('click', 'td a.doctoredit', function () {

   new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
  return false;
 });
 $("#create-refferel").button().click(new_dialog);

 load_refferel();
});

/* 202020202020202020202020 attachfile */
$(function () {
    var load_attachfile = function(){
         get_attachfile_data(function(data, status) {
        console.log("********");
        var attachfile_view = ""
        if (data.length >= 0) {


            attachfile_view += '<tbody style="border:5px">';
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    attachfile_view += '<tr>';
                     attachfile_view += '<td><span style="color:#017b8b";>Attachment type:</span><span>'+ alr.filetype + '</span></td>' ;
                    attachfile_view += '<td><span style="color:#017b8b"; >Description:</span><span>'+ alr.description + '</span></td>';

                    attachfile_view += '<td><span><a style="color:green !important; font-weight:bold;"  target="_blank" href=" '+ alr.source +' ">View file</a></span></td>';
                    attachfile_view += '<td><span style="color:#017b8b";>Created on:</span><span>'+ alr.created_date + '</span></td>';

//                    attachfile_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="fileedit">Edit</a>' +
//                        '<a href="javascript:void(0)" data-id="' + alr.id + '" class="filedelete">Delete</a></td>';
                    attachfile_view += '</tr>';
                    attachfile_view += '<td><hr></td>';
                }
                attachfile_view += '</tbody>';

                $("#attachfile").html(attachfile_view)
            }
        });
    }
    var new_dialog = function(type, row, attachfile_id) {
        var dlg = $("#dialog-form-attachfile");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_attachfile_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {

            config.title = "Attachfile";
            get_attachfile_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_attachfile_data(attachfile_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_attachfile_data_for_edit(row) {
            $("#fieldtype").val($(row.children().find('span').get(1)).text());
           // $("#attachfileinput").val($(row.children().get(1)).text());
            $("#fielddescription").val($(row.children().find('span').get(3)).text());
            $("#fieldsource").val($(row.children().find('span').get('')).text());
        }

        function edit_attachfile_data(id) {
            var fieldtype = $("#fieldtype").val();
            //var attachfileinput = $("#attachfileinput").val();
            var fielddescription = $("#fielddescription").val();
            var fieldsource = $("#fieldsource").val();



            var form = $('#ehr_attach_report')[0];
            var data = new FormData(form);

            data.append("id",id);
            data.append("patient",patient_id);


            update_attachfile(data, function(data, status) {
                if (status == "success") {
                    $("#fieldtype").val("");
                    //$("#attachfileinput").val("");
                    $("#fielddescription").val("");
                    $("#fieldsource").val("");

                    load_attachfile();
                    //$("#attachfile tbody").append("<tr>" + "<td>" + filetype + "</td>" + "<td>" + attachfileinput + "</td>" + "<td>" + filediscription + "</td>"+ "<td>" + attachfilesource + "</td>" + "<td><a href='' class='attachfileedit'>Edit</a> <a href='' class='attachfiledelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }



        function save_attachfile_data() {


            var fieldtype = $("#fieldtype").val();
           // var attachfileinput = $("#attachfileinput").val();
            var fielddescription = $("#fielddescription").val();
            var fieldsource = $("#fieldsource").val();
//
//            var attachfile_data = {
//                "filetype": fieldtype,
//               // "upload":attachfileinput,
//                "description": fielddescription,
//                "source": fieldsource,
//                "user" :user_id,
//                "patient": patient_id
//            }
            var form = $('#ehr_attach_report')[0];


            var data = new FormData(form);
            data.append("patient",patient_id);


//
            save_attachfile(data, function(data, status) {
                if (status == "success") {
                    $("#fieldtype").val("");
                   // $("#attachfileinput").val("")
                    $("#fielddescription").val("");
                    $("#fieldsource").val("");
                    load_attachfile();
                    //$("#attachfile tbody").append("<tr>" + "<td>" + filetype + "</td>" + "<td>" + attachfileinput + "</td>" + "<td>" + filediscription + "</td>"+ "<td>" + attachfilesource + "</td>" + "<td><a href='' class='attachfileedit'>Edit</a> <a href='' class='attachfiledelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };


     $(document).on('click', 'td a.filedelete', function () {
        id = $(this).data('id');
        console.log("delete ::"+id);
        delete_attachfile( id, function(data, status) {
            load_attachfile();
        });
        return false;
     });
     $(document).on('click', 'td a.fileedit', function () {
        new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
        return false;
     });
     $("#create-attachfile").button().click(new_dialog);

      load_attachfile();
});



////////////////////////////////////////////////////////////////////////////////
/* show contact in ehr */
$(function () {
    get_patientcontact_data(function(data, status) {
            console.log("********");
            console.log(data)
            var patientcontact_view = ""
                console.log(data)
                patientcontact_view += '<tbody style="border:5px">';
                    patientcontact_view += '<tr>';
                    patientcontact_view += '<td><span>'+ data.address + '</span></td>' ;
                    patientcontact_view += '<td><span>'+ data.city + '</span>,<span>'+ data.state + '</span></td>';
                    patientcontact_view += '<td><span>'+data.country +'</span>,</td>';
                    patientcontact_view += '<td>PIN:<span>'+data.zipcode +'</span>.</td>';
//                    patientcontact_view += '<td><span>'+ data.emergencycontact +'</span></td>';
                    patientcontact_view += '</tr>';
                patientcontact_view += '</tbody>';

                $("#patientehrcontactdetails").html(patientcontact_view)

        });

});

//patient detail for EHR profile/
$(function () {
        get_patientpersonal_data(function(data, status) {
            console.log("********");
            var patient_view = ""
            console.log(data.id)
            console.log(data.first_name)
            console.log("this is patient"+data)
            patient_view += '<tbody style="border:5px">';
//                for (var i = 0; i < data.length; i++) {
//                    var alr = data[i]

                patient_view += '<tr>';
                patient_view += '<td><span style="color:#1779AE;font-size:18px;">'+ data.first_name+" " +data.last_name +'</span></td>' ;
                patient_view += '<td><span>'+ data.dob + '</span></td>';
                patient_view += '<td><span>'+ data.email + '</span></td>';
                patient_view += '<td><span>'+ data.phne + '</span></td>' ;
//                    patient_view += '<td><span>'+ data.gender + '</span></td>' ;
//                    patient_view += '<td><span>'+  + '</span></td>';
//                    patient_view += '<td><span>'+ alr.dob + '</span></td>';
//                    patient_view += '<td><span>'+ alr.orgnastion + '</span></td>' ;

//                    patient_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="patientedit">Edit</a>' +
//                        '<a href="javascript:void(0)" data-id="' + alr.id + '" class="patientdelete">Delete</a></td>';
                patient_view += '</tr>';
//                }
            patient_view += '</tbody>';

            $("#table").html(patient_view)

         });

});
//vaccine codes.
$( function() {
     get_vaccine_code_data(function(data, status) {
            var availableTags=[
                 ];
            
            for (var i in data){
                  a=data[i]
                  console.log(a)
                  for(j=0;j<a.length;j++){
                       var alr = a[j]
                       availableTags.push(alr.code+":"+alr.Description);
                  }
              }
         $( "#vaccinename" ).autocomplete({
                    source: availableTags
         });
     });
});
//problems code
$( function() {
    get_problem_code_data(function(data, status) {
                var availableproblemTags=[
                     ];
                for (var i in data){
                      a=data[i]

                      for(j=0;j<a.length;j++){
                           var alr = a[j]

                           availableproblemTags.push(alr.code+":"+alr.description);
                      }
                }
         $( "#Problem" ).autocomplete({
                    source: availableproblemTags
         });
    });
});
//synptoms code
$( function() {
    get_symptoms_code_data(function(data, status) {
                var availablesymptomTags=[
                     ];

                for (var i in data){
                      a=data[i]

                      for(j=0;j<a.length;j++){
                           var alr = a[j]

                           availablesymptomTags.push(alr.code+":"+alr.description);
                      }
                }
         $( "#symdescription" ).autocomplete({
                    source: availablesymptomTags
         });
    });
});
//test code
$( function() {
    get_test_code_data(function(data, status) {
                var availabletestTags=[
                     ];
                for (var i in data){
                      a=data[i]
                      
                      for(j=0;j<a.length;j++){
                           var alr = a[j]

                           availabletestTags.push(alr.codes+":"+alr.description);
                      }
                }
         $( "#testname" ).autocomplete({
                    source: availabletestTags
         });
    });
});

//icd10procedure code
$( function() {
    get_icd10procedure_code_data(function(data, status) {
                var availableprocedureTags=[
                     ];
                for (var i in data){
                      a=data[i]

                      for(j=0;j<a.length;j++){
                           var alr = a[j]
                           availableprocedureTags.push(alr.code+":"+alr.description);
                      }
                }
         $("#ICD-10-PCS").autocomplete({
                    source: availableprocedureTags
         });
    });
});

//Cptprocedure code
$( function() {
    get_Cptprocedure_code_data(function(data, status) {
                var availableprocedureTags=[
                     ];
                for (var i in data){
                      a=data[i]

                      for(j=0;j<a.length;j++){
                           var alr = a[j]
                           availableprocedureTags.push(alr.coodes+":"+alr.description);
                      }
                }
         $("#CPT").autocomplete({
                    source: availableprocedureTags
         });
    });
});
//hspcsprocedure code
$( function() {
    get_hspcsprocedure_code_data(function(data, status) {
                var availableprocedureTags=[
                     ];
                for (var i in data){
                      a=data[i]

                      for(j=0;j<a.length;j++){
                           var alr = a[j]
                           availableprocedureTags.push(alr.code+":"+alr.description);
                      }
                }
         $("#HCPCS").autocomplete({
                    source: availableprocedureTags
         });
    });
});


//medical codes
$( function() {
    get_medication_code_data(function(data, status) {
                var availablemedicationTags=[
                     ];
                for (var i in data){
                      a=data[i]

                      for(j=0;j<a.length;j++){
                           var alr = a[j]
                           availablemedicationTags.push(alr.code+":"+alr.url);
                      }
                }
         $("#medicationname").autocomplete({
                    source: availablemedicationTags
         });
    });
});

//vitals_list

