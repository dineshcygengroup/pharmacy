/* social history */
$(function () {
     get_socialhistory_data(function(data, status) {
        console.log("****socialdata****");

        var socialhistory_view = ""

        if (data.length > 0) {
            console.log(data)
            socialhistory_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var soc = data[i]
                socialhistory_view += '<tr>';
                socialhistory_view += '<td>' + soc.social_type + '</td>';
                socialhistory_view += '<td>' + soc.description + '</td>';
                socialhistory_view += '<td>' + soc.reaction + '</td>';
                socialhistory_view += '<td><a href="javascript:void(0)" data-id="' + soc.id + '" class="socialhistoryedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + soc.id + '" class="socialhistorydelete">Delete</a></td>';
                socialhistory_view += '</tr>';
            }
            socialhistory_view += '</tbody>';

            $("#socialhistory").html(socialhistory_view)
        }
    });


    var new_dialog = function (type, row,socialhistory_id) {
      var dlg = $("#dialog-form-socialhistory");
//   var socialhistoryType = dlg.find(("#socialhistoryType")),
//   socialhistoryDescription = dlg.find(("#socialhistoryDescription"));
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
            $("#socialhistoryType").val($(row.children().get(0)).text());
            $("#socialhistoryDescription").val($(row.children().get(1)).text());
            $("#fromdate").val($(row.children().get(2)).text());

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
                "user": 11,
                "patient": 1
            }
            console.log(socialhistory_data)
            update_socialhistory(socialhistory_data, function(data, status) {

                if (status == "success") {
                    $("#socialhistoryType").val("");
                    $("#socialhistoryDescription").val("");
                    $("#fromdate").val("");
                    $("#socialhistory tbody").append("<tr>" + "<td>" + socialhistoryType + "</td>" + "<td>" + socialhistoryDescription + "</td>" + "<td>" + fromdate + "</td>" + "<td><a href='' class='socialhistoryedit'>Edit</a> <a href='' class='socialhistorydelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });

        }

         function save_socialhistory_data() {
            var socialhistoryType = $("#socialhistoryType").val();
            var socialhistoryDescription = $("#socialhistoryDescription").val();
            var fromdate = $("#fromdate").val();
            console.log(socialhistoryType,socialhistoryDescription,fromdate);

            var allergy_data = {
                "social_type": socialhistoryType,
                "description": socialhistoryDescription,
                "fromwhen": fromdate,
                "user": 11,
                "patient": 1
            }

            save_socialhistory(socialhistory_data, function(data, status) {
                if (status == "success") {
                    $("#socialhistoryType").val("");
                    $("#socialhistoryDescription").val("");
                    $("#fromdate").val("");
                    $("#socialhistory tbody").append("<tr>" + "<td>" + socialhistoryType + "</td>" + "<td>" + socialhistoryDescription + "</td>" + "<td>" + fromdate + "</td>" + "<td><a href='' class='socialedit'>Edit</a> <a href='' class='socialdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }

            });

         }



      };
     $(document).on('click', 'td a.socialhistorydelete', function () {
        $(this).closest('tr').find('td').fadeOut(1000,
     function () {
     delete_allergy( function(data, status) {
             $(this).parents('tr:first').remove(), $(this).data('id') ;
        });

        });
          return false;
      });
     $(document).on('click', 'td a.socialhistoryedit', function () {
       new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
      return false;
     });
     $("#create-socialhistory").button().click(new_dialog);
});

/* familyhealthhistory info */
$(function () {
    get_familyhistory_data(function(data, status) {
        console.log("********");
        var familyhistory_view = ""
        if (data.length > 0) {
            console.log(data)
            familyhistory_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]

                familyhistory_view += '<tr>';
                familyhistory_view += '<td>' + alr.relationtype + '</td>';
                familyhistory_view += '<td>' + alr.description + '</td>';
                familyhistory_view += '<td>' + alr.notes + '</td>';
                familyhistory_view += '<td>' + alr.user + '</td>';
                familyhistory_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="familyedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="familydelete">Delete</a></td>';
                familyhistory_view += '</tr>';
            }
            familyhistory_view += '</tbody>';

            $("#familyhealthhistory").html(familyhistory_view)
        }
    });
    var new_dialog = function (type, row,familyhistory_id) {
        var dlg = $("#dialog-form-familyhealthhistory");

        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_data,
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
        $("#relationType").val($(row.children().get(0)).text());
        $("#FamilyDescription").val($(row.children().get(1)).text());
        $("#Familynote").val($(row.children().get(2)).text());
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
            "user": 11,
            "patient": 1
        }
        console.log(familyhistory_data)
        update_familyhistory(familyhistory_data, function(data, status) {
            if (status == "success") {
                $("#relationType").val("");
                $("#FamilyDescription").val("");
                $("#Familynote").val("");
                $("#familyhealthhistory tbody").append("<tr>" + "<td>" + relationType + "</td>" + "<td>" + FamilyDescription + "</td>" + "<td>" + Familynote + "</td>" + "<td><a href='' class='familyedit'>Edit</a> <a href='' class='familydelete'>Delete</a></td>" + "</tr>");
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
                "user": 11,
                "patient": 1
            }

            save_familyhistory(familyhistory_data, function(data, status) {
                if (status == "success") {
                    $("#relationType").val("");
                    $("#FamilyDescription").val("");
                    $("#Familynote").val("");
                    $("#familyhealthhistory tbody").append("<tr>" + "<td>" + relationType + "</td>" + "<td>" + FamilyDescription + "</td>" + "<td>" + Familynote + "</td>" + "<td><a href='' class='familyedit'>Edit</a> <a href='' class='familydelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });

         }

    };
     $(document).on('click', 'td a.familydelete', function () {
        $(this).closest('tr').find('td').fadeOut(1000,
             function () {
                delete_familyhistory( function(data, status) {
                    $(this).parents('tr:first').remove(),$(this).data('id') ;
                });
        });
          return false;
     });
     $(document).on('click', 'td a.familyedit', function () {
       new_dialog('Edit', $(this).parents('tr'));
      return false;
     });
     $("#create-familyhealthhistory").button().click(new_dialog);
 });

/* vital info */
$(function () {
     get_vital_data(function(data, status) {
        console.log("********");

        var vital_view = ""

        if (data.length > 0) {
            console.log(data)
            vital_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                vital_view += '<tr>';
                vital_view += '<td>' + alr.heightfeet + '</td>';
                vital_view += '<td>' + alr.heightinch + '</td>';
                vital_view += '<td>' + alr.weight + '</td>';
                vital_view += '<td>' + alr.temparature + '</td>';
                vital_view += '<td>' + alr.systolicbp + '</td>';
                vital_view += '<td>' + alr.diastolicbp + '</td>';
                vital_view += '<td>' + alr.oxygensaturation + '</td>';
                vital_view += '<td>' + alr.pulse + '</td>';
                vital_view += '<td>' + alr.glucose + '</td>';
                vital_view += '<td>' + alr.respiratoryrate + '</td>';
                vital_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="Allergyedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="Allergydelete">Delete</a></td>';
                vital_view += '</tr>';
            }
            vital_view += '</tbody>';

            $("#vitals").html(vital_view)
        }
     });
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

            config.title = "Allergy";
            get_vital_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_vital_data(vital_id);
                row.remove();
            };
        }
        dlg.dialog(config);
         function get_vital_data_for_edit(row) {
               $("#heightfeet").val($(row.children().get(0)).text());
               $("#heightinch").val($(row.children().get(1)).text());
               $("#weight").val($(row.children().get(2)).text());
               $("#temparature").val($(row.children().get(3)).text());
               $("#systolicbp").val($(row.children().get(4)).text());
               $("#diastolicbp").val($(row.children().get(5)).text());
               $("#oxygensaturation").val($(row.children().get(6)).text());
               $("#pulse").val($(row.children().get(7)).text());
               $("#glucose").val($(row.children().get(8)).text());
               $("#respiratoryrate").val($(row.children().get(9)).text());
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
                "weight": weight,
                "height": heightfeet,
                //"heightinch": heightinch,
                "heartrate": pulse,
                "temprature": temparature,
                "oxisaturation": oxygensaturation,
                "diastolicbp": diastolicbp,
                "systolicbp": systolicbp,
                "glucose": glucose,
                "resporitoryrate": resporitoryrate,
                "user": 11,
                "patient": 1
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
                    $("#pulse").val("");
                    $("#respiratoryrate").val("");
                    $("#glucose").val("");
                    $("#vitals tbody").append("<tr>" + "<td>" + heightfeet + "</td>"+ "<td>" + weight + "</td>"+ "<td>" + temprature + "</td>"+ "<td>" + diastolicbp + "</td>"+ "<td>" + systolicbp + "</td>"+ "<td>" + pulse + "</td>"+ "<td>" + respiratoryrate + "</td>"+ "<td>" + glucose + "</td>" + "<td><a href='' class='vitalsedit'>Edit</a> <a href='' class='vitalsdelete'>Delete</a></td>" + "</tr>");
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
                //"heightinch": heightinch,
                "heartrate": pulse,
                "temprature": temparature,
                "oxisaturation": oxygensaturation,
                "diastolicbp": diastolicbp,
                "systolicbp": systolicbp,
                "glucose": glucose,
                "resporitoryrate": resporitoryrate,
                "user": 11,
                "patient": 1
             }
            save_vital(vital_data, function(data, status) {
                if (status == "success") {
                    $("#heightfeet").val("");
                    $("#heightinch").val("");
                    $("#weight").val("");
                    $("#temprature").val("");
                    $("#oxisaturation").val("");
                    $("#diastolicbp").val("");
                    $("#systolicbp").val("");
                    $("#pulse").val("");
                    $("#respiratoryrate").val("");
                    $("#glucose").val("");
                    $("#vitals tbody").append("<tr>" + "<td>" + heightfeet + "</td>"+ "<td>" + weight + "</td>"+ "<td>" + temprature + "</td>"+ "<td>" + diastolicbp + "</td>"+ "<td>" + systolicbp + "</td>"+ "<td>" + pulse + "</td>"+ "<td>" + respiratoryrate + "</td>"+ "<td>" + glucose + "</td>" + "<td><a href='' class='vitalsedit'>Edit</a> <a href='' class='vitalsdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });

         }



      };
     $(document).on('click', 'td a.vitalsdelete', function () {
        $(this).closest('tr').find('td').fadeOut(1000,
             function () {
                 delete_vital( function(data, status) {
                    $(this).parents('tr:first').remove() , $(this).data('id');
                 });
             });
        return false;
      });
     $(document).on('click', 'td a.vitalsedit', function () {
       new_dialog('Edit', $(this).parents('tr'));
      return false;
     });
     $("#create-vitals").button().click(new_dialog);
});

/* problems  */
$(function () {
     get_problems_data(function(data, status) {
        console.log("********");
        var problems_view = ""

        if (data.length > 0) {
            console.log(data)
            problems_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                problems_view += '<td>' + alr.problem + '</td>';
                problems_view += '<td>' + alr.problemdescription + '</td>';
                problems_view += '<td>' + alr.problemfromdate + '</td>';
                problems_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="problemsedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="problemsdelete">Delete</a></td>';
                problems_view += '</tr>';
            }
            problems_view += '</tbody>';

            $("#problems").html(problems_view)
        }
    });
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
            $("#Problem").val($(row.children().get(0)).text());
            $("#ProblemDescription").val($(row.children().get(1)).text());
            $("#Problemfromdate").val($(row.children().get(2)).text());
        }

        function edit_problems_data(id) {
            var Problem = $("#Problem").val();
            var ProblemDescription = $("#ProblemDescription").val();
            var Problemfromdate = $("#Problemfromdate").val();
            console.log(Problem, ProblemDescription, Problemfromdate);

            var problems_data = {
                "id": id,
                "Problem": Problem,
                "ProblemDescription": ProblemDescription,
                "Problemfromdate": Problemfromdate,
                "user": 11,
                "patient": 1
            }
            console.log(problems_data)
            update_problems(problems_data, function(data, status) {
                if (status == "success") {
                    $("#Problem").val("");
                    $("#ProblemDescription").val("");
                    $("#Problemfromdate").val("");
                    $("#problems tbody").append("<tr>" + "<td>" + Problem + "</td>" + "<td>" + ProblemDescription + "</td>" + "<td>" + Problemfromdate + "</td>" + "<td><a href='' class='problemedit'>Edit</a> <a href='' class='problemdelete'>Delete</a></td>" + "</tr>");
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
                "Problem": problem,
                "ProblemDescription": problemDescription,
                "Problemfromdate": problemfromdate,
                "user": 11,
                "patient": 1
            }

            save_problems(problems_data, function(data, status) {
                if (status == "success") {
                    $("#Problem").val("");
                    $("#ProblemDescription").val("");
                    $("#Problemfromdate").val("");
                    $("#problems tbody").append("<tr>" + "<td>" + Problem + "</td>" + "<td>" + ProblemDescription + "</td>" + "<td>" + Problemfromdate + "</td>" + "<td><a href='' class='problemedit'>Edit</a> <a href='' class='problemdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    }
 $(document).on('click', 'td a.problemdelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
     delete_problems( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id');
                });
});
      return false;
  });
 $(document).on('click', 'td a.problemedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-problems").button().click(new_dialog);
});

/* visit reason  */
$(function () {
    get_visitreason_data(function(data, status) {
        console.log("********");
        var visitreason_view = ""
        if (data.length > 0) {
            console.log(data)
            visitreason_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                visitreason_view += '<tr>';
                visitreason_view += '<td>' + alr.description + '</td>';

                visitreason_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="visitreasonedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="visitreasondelete">Delete</a></td>';
                visitreason_view += '</tr>';
            }
            visitreason_view += '</tbody>';

            $("#visitreason").html(visitreason_view)
        }
    });
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
            $("#ProblemDescription").val($(row.children().get(0)).text());

        }

        function edit_visitreason_data(id) {
            var ProblemDescription = $("#ProblemDescription").val();
            console.log(ProblemDescription);

            var visitreason_data = {
                "id": id,
                "description": ProblemDescription,
                "user": 11,
                "patient": 1
            }
            console.log(visitreason_data)
            update_visitreason(visitreason_data, function(data, status) {
                if (status == "success") {
                    $("#ProblemDescription").val("");
                    $("#visitreason tbody").append("<tr>" + "<td>" + ProblemDescription + "<td><a href='' class='visitreasonedit'>Edit</a> <a href='' class='visitreasondelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_visitreason_data() {
            var ProblemDescription = $("#ProblemDescription").val();

            console.log(ProblemDescription);

            var visitreason_data = {
                "description": ProblemDescription,
                "user": 11,
                "patient": 1
            }

            save_visitreason(visitreason_data, function(data, status) {
                if (status == "success") {
                    $("#ProblemDescription").val("");

                    $("#visitreason tbody").append("<tr>" +  "<td>" + ProblemDescription + "</td>" + "<td><a href='' class='visitreasonedit'>Edit</a> <a href='' class='visitreasondelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };

 $(document).on('click', 'td a.visitreasondelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
     delete_visitreason( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id') ;
                });

});
      return false;
  });
 $(document).on('click', 'td a.visitreasonedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-visitreason").button().click(new_dialog);
});

/* procedure  */
$(function () {
    get_procedure_data(function(data, status) {
        console.log("********");

        var procedure_view = ""

        if (data.length > 0) {
            console.log(data)
            procedure_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                procedure_view += '<tr>';
                procedure_view += '<td>' + alr.procedurecodetype + '</td>';
                procedure_view += '<td>' + alr.procedurecode + '</td>';
                procedure_view += '<td>' + alr.procedure + '</td>';
                procedure_view += '<td>' + alr.status + '</td>';
                procedure_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="procedureedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="proceduredelete">Delete</a></td>';
                procedure_view += '</tr>';
            }
            procedure_view += '</tbody>';

            $("#procedure").html(procedure_view)
        }
    });
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
            $("#procedurecodetype").val($(row.children().get(0)).text());
            $("#procedurecode").val($(row.children().get(1)).text());
            $("#proceduredescription").val($(row.children().get(2)).text());
            $("#proceduredestatus").val($(row.children().get(2)).text());
        }

        function edit_procedure_data(id) {
            var procedurecodetype = $("#procedurecodetype").val();
            var procedurecode = $("#procedurecode").val();
            var proceduredescription = $("#proceduredescription").val();
            var proceduredestatus = $("#proceduredestatus").val();
            console.log(procedurecodetype, procedurecode, proceduredescription,proceduredestatus);

            var procedure_data = {
                "id": id,
                "procedurecodetype": procedurecodetype,
                "procedurecode": procedurecode,
                "procedure": proceduredescription,
                "status": proceduredestatus,
                "user": 11,
                "patient": 1
            }
            console.log(procedure_data)
            update_procedure(procedure_data, function(data, status) {
                if (status == "success") {
                    $("#procedurecodetype").val("");
                    $("#procedurecode").val("");
                    $("#proceduredescription").val("");
                    $("#proceduredestatus").val("");
                    $("#procedure tbody").append("<tr>" + "<td>" + procedurecodetype + "</td>" + "<td>" + procedurecode + "</td>" + "<td>" + proceduredescription + "<td>" + proceduredestatus + "</td>" + "<td><a href='' class='procedureedit'>Edit</a> <a href='' class='proceduredelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_procedure_data() {
            var procedurecodetype = $("#procedurecodetype").val();
            var procedurecode = $("#procedurecode").val();
            var proceduredescription = $("#proceduredescription").val();
            var proceduredestatus = $("#proceduredestatus").val();
            console.log(procedurecodetype, procedurecode, proceduredescription,proceduredestatus);

            var procedure_data = {
                "procedurecodetype": procedurecodetype,
                "procedurecode": procedurecode,
                "procedure": proceduredescription,
                "status": proceduredestatus,
                "user": 11,
                "patient": 1
            }

            save_procedure(procedure_data, function(data, status) {
                if (status == "success") {
                    $("#procedurecodetype").val("");
                    $("#procedurecode").val("");
                    $("#proceduredestatus").val("");
                    $("#procedure tbody").append("<tr>" + "<td>" + procedurecodetype + "</td>" + "<td>" + procedurecode + "</td>" + "<td>" + proceduredescription + "<td>" + proceduredestatus + "</td>" + "<td><a href='' class='procedureedit'>Edit</a> <a href='' class='proceduredelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
 $(document).on('click', 'td a.proceduredelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
    delete_procedure( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id') ;
                });
});
      return false;
  });
 $(document).on('click', 'td a.procedureedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-procedure").button().click(new_dialog);
});

/* diagnostic lab tets details */
$(function () {
     get_diagnostic_data(function(data, status) {
        console.log("********");

        var diagnostic_view = ""

        if (data.length > 0) {
            console.log(data)
            diagnostic_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                diagnostic_view += '<tr>';
                diagnostic_view += '<td>' + alr.testcode + '</td>';
                diagnostic_view += '<td>' + alr.resultumber + '</td>';
                diagnostic_view += '<td>' + alr.resultunit + '</td>';
                diagnostic_view += '<td>' + alr.notes + '</td>';
                diagnostic_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="diagnosticedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="diagnosticdelete">Delete</a></td>';
                diagnostic_view += '</tr>';
            }
            diagnostic_view += '</tbody>';

            $("#diagnosticlab").html(diagnostic_view)
        }
    });
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
            $("#testname").val($(row.children().get(0)).text());
            $("#testresult").val($(row.children().get(1)).text());
            $("#testunits").val($(row.children().get(2)).text());
            $("#testnote").val($(row.children().get(2)).text());
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
                "notes": testnote,
                "user": 11,
                "patient": 1
            }
            console.log(diagnostic_data)
            update_diagnostic(diagnostic_data, function(data, status) {
                if (status == "success") {
                    $("#testname").val("");
                    $("#testresult").val("");
                    $("#testunits").val("");
                    $("#testnote").val("");
                    $("#diagnosticlab tbody").append("<tr>" + "<td>" + testname + "</td>" + "<td>" + testresult + "</td>" + "<td>" + testunits + "</td>" + "</td>" + "<td>" + testnote + "</td>" +"<td><a href='' class='diagnosticedit'>Edit</a> <a href='' class='diagnosticdelete'>Delete</a></td>" + "</tr>");
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
                "user": 11,
                "patient": 1
            }

            save_diagnostic(diagnostic_data, function(data, status) {
                if (status == "success") {
                    $("#testname").val("");
                    $("#testresult").val("");
                    $("#testunits").val("");
                    $("#testnote").val("");
                    $("#diagnosticlab tbody").append("<tr>" + "<td>" + testname + "</td>" + "<td>" +testresult  + "</td>" + "<td>" + testunits + "</td>" + "</td>" + "<td>" + testnote + "</td>" +"<td><a href='' class='diagnosticedit'>Edit</a> <a href='' class='diagnosticdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };


 $(document).on('click', 'td a.diagnosticdelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
   delete_diagnostic( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id') ;
                });
});
      return false;
  });
 $(document).on('click', 'td a.diagnosticedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-diagnosticlab").button().click(new_dialog);
});

/* medications details */
$(function () {
    get_medications_data(function(data, status) {
        console.log("********");

        var medications_view = ""

        if (data.length > 0) {
            console.log(data)
            medications_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                medications_view += '<tr>';
                medications_view += '<td>' + alr.medicinname + '</td>';
                medications_view += '<td>' + alr.doesage + '</td>';
                medications_view += '<td>' + alr.quantity + '</td>';
                medications_view += '<td>' + alr.usagedirections + '</td>';
                medications_view += '<td>' + alr.refills + '</td>';
                medications_view += '<td>' + alr.startdate + '</td>';
                medications_view += '<td>' + alr.enddate + '</td>';
                medications_view += '<td>' + alr.labelofmedication + '</td>';
                medications_view += '<td>' + alr.notes + '</td>';
                medications_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="medicationedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="medicationdelete">Delete</a></td>';
                medications_view += '</tr>';
            }
            medications_view += '</tbody>';

            $("#medications").html(medications_view)
        }
    });
     var new_dialog = function (type, row,medications_id) {
      var dlg = $("#dialog-form-medications");

      type = type || 'Create';
      var config = {
         autoOpen: true,
         height: 400,
         width: 450,
         modal: true,
         buttons: {
           "Save": save_data,
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
            $("#medicationname").val($(row.children().get(0)).text());
            $("#dossage").val($(row.children().get(1)).text());
            $("#quantity").val($(row.children().get(2)).text());
            $("#medstartdate").val($(row.children().get(3)).text());
            $("#medenddate").val($(row.children().get(4)).text());
            $("#directionstoussage").val($(row.children().get(5)).text());
            $("#refills").val($(row.children().get(6)).text());
            $("#company").val($(row.children().get(7)).text());
            $("#mednote").val($(row.children().get(8)).text());
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
                "notes": mednote,
                "user": 11,
                "patient": 1
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
                    $("#medications tbody").append("<tr>" + "<td>" + medicationname + "</td>" + "<td>" + dossage + "</td>" + "<td>" + quantity + "</td>"+ "<td>" + medstartdate + "</td>" + "<td>" + medenddate + "</td>"+ "<td>" +directionstoussage  + "</td>" + "<td>" + refills + "</td>"+ "<td>" + company + "</td>" + "<td>" + mednote + "</td>" + "<td><a href='' class='medicationedit'>Edit</a> <a href='' class='medicationdelete'>Delete</a></td>" + "</tr>");
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
                "user": 11,
                "patient": 1
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
                    $("#medications tbody").append("<tr>" + "<td>" + medicationname + "</td>" + "<td>" + dossage + "</td>" + "<td>" + quantity + "</td>"+ "<td>" + medstartdate + "</td>" + "<td>" + medenddate + "</td>"+ "<td>" +directionstoussage  + "</td>" + "<td>" + refills + "</td>"+ "<td>" + company + "</td>" + "<td>" + mednote + "</td>" + "<td><a href='' class='medicationedit'>Edit</a> <a href='' class='medicationdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
     $(document).on('click', 'td a.medicationdelete', function () {
        $(this).closest('tr').find('td').fadeOut(1000,
     function () {
          delete_medications( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id') ;
                });
       $(this).parents('tr:first').remove();
    });
          return false;
      });
     $(document).on('click', 'td a.medicationedit', function () {
       new_dialog('Edit', $(this).parents('tr'));
      return false;
     });
     $("#create-medications").button().click(new_dialog);
});

/* vaccine details */
$(function () {
    get_vaccine_data(function(data, status) {
        console.log("********");

        var vaccine_view = ""

        if (data.length > 0) {
            console.log(data)
            vaccine_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                vaccine_view += '<tr>';
                vaccine_view += '<td>' + alr.vaccinecode + '</td>';
                vaccine_view += '<td>' + alr.v_status + '</td>';
                vaccine_view += '<td>' + alr.takendate + '</td>';
                vaccine_view += '<td>' + alr.notes + '</td>';
                vaccine_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="vaccineedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="vaccinedelete">Delete</a></td>';
                vaccine_view += '</tr>';
            }
            vaccine_view += '</tbody>';

            $("#vaccine").html(vaccine_view)
        }
    });
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
              $("#vaccinename").val($(row.children().get(0)).text());
              $("#vaccinestatus").val($(row.children().get(1)).text());
              $("#vaccinetakendate").val($(row.children().get(2)).text());
              $("#vaccinenote").val($(row.children().get(3)).text());

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
                "notes": vaccinenote,
                "user": 11,
                "patient": 1
            }
            console.log(vaccine_data)
            update_vaccine(vaccine_data, function(data, status) {
                if (status == "success") {
                    $("#vaccinename").val("");
                    $("#vaccinestatus").val("");
                    $("#vaccinetakendate").val("");
                    $("#vaccinenote").val("");
                    $("#vaccine tbody").append("<tr>" + "<td>" + vaccinename + "</td>" + "<td>" + vaccinestatus + "</td>" + "<td>" + vaccinetakendate + "</td>"+ "<td>" + vaccinenote + "</td>"  + "<td><a href='' class='vaccineedit'>Edit</a> <a href='' class='vaccinedelete'>Delete</a></td>" + "</tr>");
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
                "user": 11,
                "patient": 1
            }

            save_vaccine(vaccine_data, function(data, status) {
                $("#vaccinename").val("");
                    $("#vaccinestatus").val("");
                    $("#vaccinetakendate").val("");
                    $("#vaccinenote").val("");
                    $("#vaccine tbody").append("<tr>" + "<td>" + vaccinename + "</td>" + "<td>" + vaccinestatus + "</td>" + "<td>" + vaccinetakendate + "</td>"+ "<td>" + vaccinenote + "</td>"  + "<td><a href='' class='vaccineedit'>Edit</a> <a href='' class='vaccinedelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }


    };
    $(document).on('click', 'td a.vaccinedelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
         function () {
           delete_vaccine( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id') ;
           });
        });
      return false;
  });
    $(document).on('click', 'td a.vaccineedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
    $("#create-vaccine").button().click(new_dialog);
});

/* status details */
$(function () {
    get_status_data(function(data, status) {
        console.log("********");
        var status_view = ""

        if (data.length > 0) {
            console.log(data)
            status_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                status_view += '<tr>';
                status_view += '<td>' + alr.statusselect + '</td>';
                status_view += '<td>' + alr.effectivedate + '</td>';
                status_view += '<td>' + alr.statusdiscription + '</td>';
                status_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="statusedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="statusdelete">Delete</a></td>';
                status_view += '</tr>';
            }
            status_view += '</tbody>';

            $("#Allergy").html(status_view)
        }
    });
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
            $("#statusselect").val($(row.children().get(0)).text());
            $("#effectivedate").val($(row.children().get(1)).text());
            $("#statusdiscription").val($(row.children().get(2)).text());
        }

        function edit_status_data(id) {
            var statusselect = $("#statusselect").val();
            var effectivedate = $("#effectivedate").val();
            var statusdiscription = $("#statusdiscription").val();
            console.log(statusselect, effectivedate, statusdiscription);

            var status_data = {
                "id": id,
                "statusselect": statusselect,
                "effectivedate": effectivedate,
                "statusdiscription": statusdiscription,
                "user": 11,
                "patient": 1
            }
            console.log(status_data)
            update_status(status_data, function(data, status) {
                if (status == "success") {
                    $("#statusselect").val("");
                    $("#effectivedate").val("");
                    $("#statusdiscription").val("");
                    $("#status tbody").append("<tr>" + "<td>" + statusselect + "</td>" + "<td>" + effectivedate + "</td>" + "<td>" + statusdiscription + "</td>" + "<td><a href='' class='statusedit'>Edit</a> <a href='' class='statusdelete'>Delete</a></td>" + "</tr>");
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
                "alergytype": statusselect,
                "allergien": effectivedate,
                "reaction": statusdiscription,
                "user": 11,
                "patient": 1
            }

            save_status(status_data, function(data, status) {
                if (status == "success") {
                    $("#statusselect").val("");
                    $("#effectivedate").val("");
                    $("#statusdiscription").val("");
                    $("#status tbody").append("<tr>" + "<td>" + statusselect + "</td>" + "<td>" + effectivedate + "</td>" + "<td>" + statusdiscription + "</td>" + "<td><a href='' class='statusedit'>Edit</a> <a href='' class='statusdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
 $(document).on('click', 'td a.statusdelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
        delete_status( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id');
                });
   $(this).parents('tr:first').remove();
});
      return false;
  });
 $(document).on('click', 'td a.statusedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-status").button().click(new_dialog);
});

/* completed  Amendments */
$(function () {
    get_amendments_data(function(data, status) {
        console.log("********");
        var amendments_view = ""

        if (data.length > 0) {
            console.log(data)
            amendments_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                amendments_view += '<tr>';
                amendments_view += '<td>' + alr.amendementssource + '</td>';
                amendments_view += '<td>' + alr.amendementssourcediscription + '</td>';
                amendments_view += '<td>' + alr.amendementsstatus + '</td>';
                amendments_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="amendmentsedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="amendmentsdelete">Delete</a></td>';
                amendments_view += '</tr>';
            }
            amendments_view += '</tbody>';

            $("#amendments").html(amendments_view)
        }
    });
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

            config.title = "Allergy";
            get_amendments_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_amendments_data(amendments_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_amendments_data_for_edit(row) {
            $("#amendementssource").val($(row.children().get(0)).text());
            $("#amendementssourcediscription").val($(row.children().get(1)).text());
            $("#amendementsstatus").val($(row.children().get(2)).text());
        }

        function edit_amendments_data(id) {
            var amendementssource = $("#amendementssource").val();
            var amendementssourcediscription = $("#amendementssourcediscription").val();
            var amendementsstatus = $("#amendementsstatus").val();
            console.log(amendementssource, amendementssourcediscription, amendementsstatus);

            var amendments_data = {
                "id": id,
                "alergytype": amendementssource,
                "allergien": amendementssourcediscription,
                "reaction": amendementsstatus,
                "user": 11,
                "patient": 1
            }
            console.log(amendments_data)
            update_amendments(amendments_data, function(data, status) {
                if (status == "success") {
                    $("#amendementssource").val("");
                    $("#amendementssourcediscription").val("");
                    $("#amendementsstatus").val("");
                    $("#amendments tbody").append("<tr>" + "<td>" + amendementssource + "</td>" + "<td>" + amendementssourcediscription + "</td>" + "<td>" + amendementsstatus + "</td>" + "<td><a href='' class='amendementsedit'>Edit</a> <a href='' class='amendementsdelete'>Delete</a></td>" + "</tr>");
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

            var amendments_data = {

                "alergytype": amendementssource,
                "allergien": amendementssourcediscription,
                "reaction": amendementsstatus,
                "user": 11,
                "patient": 1
            }

            save_amendments(amendments_data, function(data, status) {
                if (status == "success") {
                    $("#amendementssource").val("");
                    $("#amendementssourcediscription").val("");
                    $("#amendementsstatus").val("");
                    $("#amendments tbody").append("<tr>" + "<td>" + amendementssource + "</td>" + "<td>" + amendementssourcediscription + "</td>" + "<td>" + amendementsstatus + "</td>" + "<td><a href='' class='amendementsedit'>Edit</a> <a href='' class='amendementsdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };

 $(document).on('click', 'td a.amendmentsdelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
        delete_amendments( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id');
                });

});
      return false;
  });
 $(document).on('click', 'td a.amendmentsedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-amendments").button().click(new_dialog);
});

/* completed Advance directives */
$(function () {
    get_advancedirectives_data(function(data, status) {
        console.log("********");
        var advancedirectives_view = ""

        if (data.length > 0) {
            console.log(data)
            advancedirectives_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                advancedirectives_view += '<tr>';
                advancedirectives_view += '<td>' + alr.directive + '</td>';
                advancedirectives_view += '<td>' + alr.ADdiscription + '</td>';
                advancedirectives_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="advancedirectivesedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="advancedirectivesdelete">Delete</a></td>';
                advancedirectives_view += '</tr>';
            }
            advancedirectives_view += '</tbody>';

            $("#advancedirectives").html(advancedirectives_view)
        }
    });
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
            $("#directive").val($(row.children().get(0)).text());
            $("#ADdiscription").val($(row.children().get(1)).text());
        }

        function edit_advancedirectives_data(id) {
            var directive = $("#directive").val();
            var ADdiscription = $("#ADdiscription").val();
            console.log(directive, ADdiscription);

            var advancedirectives_data = {
                "id": id,
                "directive": directive,
                "ADdiscription": ADdiscription,
                "user": 11,
                "patient": 1
            }
            console.log(advancedirectives_data)
            update_advancedirectives(advancedirectives_data, function(data, status) {
                if (status == "success") {
                    $("#directive").val("");
                    $("#ADdiscription").val("");
                    $("#advancedirectives tbody").append("<tr>" + "<td>" + directive + "</td>" + "<td>" + ADdiscription + "</td>"  + "<td><a href='' class='ADedit'>Edit</a> <a href='' class='ADdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_advancedirectives_data() {
            var directive = $("#directive").val();
            var ADdiscription = $("#ADdiscription").val();

            console.log(AllergyType, Allergen, AllergyDescription);

            var advancedirective_data = {
                "directive": ADdiscription,
                "ADdiscription": ADdiscription,
                "user": 11,
                "patient": 1
            }

            save_advancedirective(advancedirective_data, function(data, status) {
                if (status == "success") {
                    $("#directive").val("");
                    $("#ADdiscription").val("");
                    $("#advancedirectives tbody").append("<tr>" + "<td>" + directive + "</td>" + "<td>" + ADdiscription + "</td>"  + "<td><a href='' class='ADedit'>Edit</a> <a href='' class='ADdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
 $(document).on('click', 'td a.ADdelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
     // alert($(this).text());
   $(this).parents('tr:first').remove();
});
      return false;
  });
 $(document).on('click', 'td a.ADedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-advancedirectives").button().click(new_dialog);
});

/* Allert */
$(function () {
    get_allert_data(function(data, status) {
        console.log("********");
        var allert_view = ""

        if (data.length > 0) {
            console.log(data)
            allert_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                allert_view += '<tr>';
                allert_view += '<td>' + alr.patientalert + '</td>';
                allert_view += '<td>' + alr.visiabilitytype + '</td>';
                allert_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="allertedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="allertdelete">Delete</a></td>';
                allert_view += '</tr>';
            }
            allert_view += '</tbody>';

            $("#Allergy").html(allert_view)
        }
    });

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

            config.title = "Allergy";
            get_allert_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_allert_data(allert_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_allert_data_for_edit(row) {
            $("#alertdiscription").val($(row.children().get(0)).text());
            $("#alertvisibility").val($(row.children().get(1)).text());
        }

        function edit_allert_data(id) {
            var alertdiscription = $("#alertdiscription").val();
            var alertvisibility = $("#alertvisibility").val();
            console.log(alertdiscription, alertvisibility);

            var allert_data = {
                "id": id,
                "patientalert": alertdiscription,
                "visiabilitytype": alertvisibility,
                "user": 11,
                "patient": 1
            }
            console.log(allert_data)
            update_allert(allert_data, function(data, status) {
                if (status == "success") {
                    $("#alertdiscription").val("");
                    $("#alertvisibility").val("");
                    $("#allert tbody").append("<tr>" + "<td>" + alertdiscription + "</td>" + "<td>" + alertvisibility + "</td>" + "<td><a href='' class='allertedit'>Edit</a> <a href='' class='allertdelete'>Delete</a></td>" + "</tr>");
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
                "user": 11,
                "patient": 1
            }

            save_allert(allert_data, function(data, status) {
               if (status == "success") {
                    $("#alertdiscription").val("");
                    $("#alertvisibility").val("");
                    $("#allert tbody").append("<tr>" + "<td>" + alertdiscription + "</td>" + "<td>" + alertvisibility + "</td>" + "<td><a href='' class='allertedit'>Edit</a> <a href='' class='allertdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
 $(document).on('click', 'td a.allertdelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
     delete_allert( function(data, status) {
          $(this).parents('tr:first').remove(), $(this).data('id') ;
     });
   $(this).parents('tr:first').remove();
});
      return false;
  });
 $(document).on('click', 'td a.allertedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-allert").button().click(new_dialog);
});

/* note */
$(function () {
    get_note_data(function(data, status) {
        console.log("********");
        var note_view = ""

        if (data.length > 0) {
            console.log(data)
            note_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                note_view += '<tr>';
                note_view += '<td>' + alr.notes + '</td>';
                note_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="noteedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="notedelete">Delete</a></td>';
                note_view += '</tr>';
            }
            note_view += '</tbody>';

            $("#note").html(note_view)
        }
    });
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
            $("#notesummary").val($(row.children().get(0)).text());
        }

        function edit_note_data(id) {
            var notesummary = $("#notesummary").val();

            console.log(notesummary);

            var note_data = {
                "id": id,
                "notes": notesummary,
                "user": 11,
                "patient": 1
            }
            console.log(note_data)
            update_note(note_data, function(data, status) {
                if (status == "success") {
                    $("#notesummary").val("");
                    $("#note tbody").append("<tr>" + "<td>" + notesummary + "</td>"  + "<td><a href='' class='noteedit'>Edit</a> <a href='' class='notedelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_note_data() {
            var notesummary = $("#notesummary").val();

            console.log(notesummary);

            var allergy_data = {
                "notes": notesummary,
                "user": 11,
                "patient": 1
            }

            save_allergy(allergy_data, function(data, status) {
                if (status == "success") {
                    $("#notesummary").val("");
                    $("#note tbody").append("<tr>" + "<td>" + notesummary + "</td>"  + "<td><a href='' class='noteedit'>Edit</a> <a href='' class='notedelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
 $(document).on('click', 'td a.notedelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
     // alert($(this).text());
   $(this).parents('tr:first').remove();
});
      return false;
  });
 $(document).on('click', 'td a.noteedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-note").button().click(new_dialog);
});
/* goal */
$(function () {
     get_goal_data(function(data, status) {
        console.log("********");
        var goal_view = ""

        if (data.length > 0) {
            console.log(data)
            goal_view += '<tbody style="border:5px">';
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                goal_view += '<tr>';
                goal_view += '<td>' + alr.description + '</td>';
                goal_view += '<td>' + alr.fromdated + '</td>';

                goal_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="goaledit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="goaldelete">Delete</a></td>';
                goal_view += '</tr>';
            }
            goal_view += '</tbody>';

            $("#goal").html(note_view)
        }
    });
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
            $("#goalsummary").val($(row.children().get(0)).text());
            $("#goalsdate").val($(row.children().get(1)).text());

        }

        function edit_goal_data(id) {
            var goalsummary = $("#goalsummary").val();
            var goalsdate = $("#goalsdate").val();
            console.log(goalsummary, goalsdate);

            var goal_data = {
                "id": id,
                "description": goalsummary,
                "fromdated": goalsdate,
                "user": 11,
                "patient": 1
            }
            console.log(goal_data)
            update_goal(goal_data, function(data, status) {
                if (status == "success") {
                    $("#goalsummary").val("");
                    $("#goalsdate").val("");

                    $("#goal tbody").append("<tr>" + "<td>" + goalsummary + "</td>" + "<td>" + goalsdate + "</td>"  + "<td><a href='' class='goaledit'>Edit</a> <a href='' class='goaldelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }



        function save_goal_data() {
            var goalsummary = $("#goalsummary").val();
            var Allergen = $("#Allergen").val();
            var goalsdate = $("#goalsdate").val();
            console.log(Allergen, goalsdate);

            var goal_data = {
                "description": goalsummary,
                "fromdated": goalsdate,
                "user": 11,
                "patient": 1
            }

            save_allergy(allergy_data, function(data, status) {
                if (status == "success") {
                    $("#goalsummary").val("");
                    $("#goalsdate").val("");
                    $("#goal tbody").append("<tr>" + "<td>" + goalsummary + "</td>" + "<td>" + goalsdate + "</td>"  + "<td><a href='' class='goaledit'>Edit</a> <a href='' class='goaldelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };

 $(document).on('click', 'td a.goaldelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
     delete_goal( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id');
     });
});
      return false;
  });
 $(document).on('click', 'td a.goaledit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-goal").button().click(new_dialog);
});
/* symptoms */
$(function () {
    get_symptoms_data(function(data, status) {
        console.log("********");
        var symptoms_view = ""

        if (data.length > 0) {
            console.log(data)
            symptoms_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                symptoms_view += '<tr>';
                symptoms_view += '<td>' + alr.symtomdescription + '</td>';
                symptoms_view += '<td>' + alr.fromdated + '</td>';
                symptoms_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="symptomsedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="symptomsdelete">Delete</a></td>';
                symptoms_view += '</tr>';
            }
            symptoms_view += '</tbody>';

            $("#symptoms").html(symptoms_view)
        }
    });
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
            $("#symdescription").val($(row.children().get(0)).text());
            $("#sympstartdate").val($(row.children().get(1)).text());
        }

        function edit_symptoms_data(id) {
            var symdescription = $("#symdescription").val();
            var sympstartdate = $("#sympstartdate").val();
            console.log(Allergen, sympstartdate);
            var symptoms_data = {
                "id": id,
                "symtomdescription": symdescription,
                "fromdated": sympstartdate,
                "user": 11,
                "patient": 1
            }
            console.log(symptoms_data)
            update_symptoms(symptoms_data, function(data, status) {
                if (status == "success") {
                    $("#symdescription").val("");
                    $("#sympstartdate").val("");
                    $("#symptoms tbody").append("<tr>" + "<td>" + symdescription + "</td>" + "<td>" + sympstartdate + "</td>"  + "<td><a href='' class='symptomedit'>Edit</a> <a href='' class='symptomdelete'>Delete</a></td>" + "</tr>");
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
                "user": 11,
                "patient": 1
            }

            save_symptoms(symptoms_data, function(data, status) {
                if (status == "success") {
                    $("#symdescription").val("");
                    $("#sympstartdate").val("");
                    $("#symptoms tbody").append("<tr>" + "<td>" + symdescription + "</td>" + "<td>" + sympstartdate + "</td>"  + "<td><a href='' class='symptomedit'>Edit</a> <a href='' class='symptomdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };

    $(document).on('click', 'td a.symptomdelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
     function () {
            delete_symptoms( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id');
                });

    });
      return false;
  });
    $(document).on('click', 'td a.symptomedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
    $("#create-symptoms").button().click(new_dialog);
});

/* inpatient */
$(function () {
    get_inpatient_data(function(data, status) {
        console.log("********");
        var inpatient_view = ""

        if (data.length > 0) {
            console.log(data)
            inpatient_view += '<tbody style="border:5px">';

            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                inpatient_view += '<tr>';
                inpatient_view += '<td>' + alr.admintdate + '</td>';
                inpatient_view += '<td>' + alr.dischargedate + '</td>';
                inpatient_view += '<td>' + alr.admissiontype + '</td>';
                inpatient_view += '<td>' + alr.dischargesummary + '</td>';
                inpatient_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="Allergyedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="Allergydelete">Delete</a></td>';
                inpatient_view += '</tr>';
            }
            inpatient_view += '</tbody>';

            $("#inpatient").html(inpatient_view)
        }
    });
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
            $("#adddate").val($(row.children().get(0)).text());
            $("#disdate").val($(row.children().get(1)).text());
            $("#distype").val($(row.children().get(2)).text());
            $("#dissum").val($(row.children().get(3)).text());
        }

        function edit_inpatient_data(id) {
            var adddate = $("#AllergyType").val();
            var disdate = $("#Allergen").val();
            var distype = $("#AllergyDescription").val();
            var dissum = $("#AllergyDescription").val();
            console.log(adddate, disdate, distype);

            var inpatient_data = {
                "id": id,
                "admintdate": adddate,
                "dischargedate": disdate,
                "admissiontype": distype,
                "dischargesummary": dissum,
                "user": 11,
                "patient": 1
            }
            console.log(inpatient_data)
            update_inpatient(inpatient_data, function(data, status) {
                if (status == "success") {
                    $("#adddate").val("");
                    $("#disdate").val("");
                    $("#distype").val("");
                    $("#dissum").val("");
                    $("#inpatient tbody").append("<tr>" + "<td>" + adddate + "</td>" + "<td>" + disdate + "</td>" + "<td>" + distype + "</td>" + "<td>" + dissum + "</td>" "<td><a href='' class='inpatientedit'>Edit</a> <a href='' class='inpatientdelete'>Delete</a></td>" + "</tr>");
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
                "user": 11,
                "patient": 1
            }

            save_inpatient(inpatient_data, function(data, status) {
               if (status == "success") {
                    $("#adddate").val("");
                    $("#disdate").val("");
                    $("#distype").val("");
                    $("#dissum").val("");
                    $("#inpatient tbody").append("<tr>" + "<td>" + adddate + "</td>" + "<td>" + disdate + "</td>" + "<td>" + distype + "</td>" + "<td>" + dissum + "</td>" "<td><a href='' class='inpatientedit'>Edit</a> <a href='' class='inpatientdelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };
 $(document).on('click', 'td a.inpatientdelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
        delete_allergy( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id');
                });

  });
         return false;
  });
 $(document).on('click', 'td a.inpatientedit', function () {
   new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
  return false;
 });
 $("#create-inpatient").button().click(new_dialog);
});

/* refferel */
$(function () {
       get_refferel_data(function(data, status) {
        console.log("********");
        var refferel_view = ""

        if (data.length > 0) {
            console.log(data)
            refferel_view += '<tbody style="border:5px">';
            //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                refferel_view += '<tr>';
                refferel_view += '<td>' + alr.doctorname + '</td>';
                refferel_view += '<td>' + alr.doctorcontact + '</td>';
                refferel_view += '<td>' + alr.doctoremail + '</td>';
                refferel_view += '<td>' + alr.doctornote + '</td>';
                refferel_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="doctoredit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="doctordelete">Delete</a></td>';
                refferel_view += '</tr>';
            }
            refferel_view += '</tbody>';

            $("#refferel").html(refferel_view)
        }
    });
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
            $("#doctorname").val($(row.children().get(0)).text());
            $("#doctorcontact").val($(row.children().get(1)).text());
            $("#doctoremail").val($(row.children().get(2)).text());
            $("#doctornote").val($(row.children().get(3)).text());
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
                "user": 11,
                "patient": 1
            }
            console.log(refferel_data)
            update_refferel(refferel_data, function(data, status) {
                if (status == "success") {
                    $("#doctorname").val("");
                    $("#doctorcontact").val("");
                    $("#doctoremail").val("");
                    $("#doctornote").val("");
                    $("#refferel tbody").append("<tr>" + "<td>" + doctorname + "</td>" + "<td>" + doctorcontact + "</td>" + "<td>" + doctoremail + "</td>"+ "<td>" + doctornote + "</td>" + "<td><a href='' class='doctoredit'>Edit</a> <a href='' class=doctordelete'>Delete</a></td>" + "</tr>");
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
                "user": 11,
                "patient": 1
            }

            save_refferel(refferel_data, function(data, status) {
                if (status == "success") {
                    $("#doctorname").val("");
                    $("#doctorcontact").val("");
                    $("#doctoremail").val("");
                    $("#doctornote").val("");
                    $("#refferel tbody").append("<tr>" + "<td>" + doctorname + "</td>" + "<td>" + doctorcontact + "</td>" + "<td>" + doctoremail + "</td>"+ "<td>" + doctornote + "</td>" + "<td><a href='' class='doctoredit'>Edit</a> <a href='' class=doctordelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };

 $(document).on('click', 'td a.doctordelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
     delete_refferel( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id');
                });

});
      return false;
  });
 $(document).on('click', 'td a.doctoredit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-refferel").button().click(new_dialog);
});

/* attachfile */
$(function () {
     get_attachfile_data(function(data, status) {
        console.log("********");
        var attachfile_view = ""
        if (data.length > 0) {
            console.log(data)
            attachfile_view += '<tbody style="border:5px">';
            for (var i = 0; i < data.length; i++) {
                var alr = data[i]
                attachfile_view += '<tr>';
                attachfile_view += '<td>' + alr.filetype + '</td>';
                //attachfile_view += '<td>' + alr.attachfile + '</td>';
                attachfile_view += '<td>' + alr.description + '</td>';

                attachfile_view += '<td>' + alr.source + '</td>';
                attachfile_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="Allergyedit">Edit</a>' +
                    '<a href="javascript:void(0)" data-id="' + alr.id + '" class="Allergydelete">Delete</a></td>';
                attachfile_view += '</tr>';
            }
            attachfile_view += '</tbody>';

            $("#attachfile").html(attachfile_view)
        }
    });
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
            $("#filetype").val($(row.children().get(0)).text());
            $("#attachfileinput").val($(row.children().get(1)).text());
            $("#filediscription").val($(row.children().get(2)).text());
            $("#attachfilesource").val($(row.children().get(3)).text());
        }

        function edit_attachfile_data(id) {
            var filetype = $("#attachfilesource").val();
            var attachfileinput = $("#attachfileinput").val();
            var filediscription = $("#filediscription").val();
            var attachfilesource = $("#attachfilesource").val();
            console.log(filetype, attachfileinput, filediscription,attachfilesource);

            var attachfile_data = {
                "id": id,
                "filetype": filetype,
                "fileinput": attachfileinput,
                "description": filediscription,
                "source": attachfilesource,
                "user": 11,
                "patient": 1
            }
            console.log(attachfile_data)
            update_attachfile(attachfile_data, function(data, status) {
                if (status == "success") {
                    $("#filetype").val("");
                    $("#attachfileinput").val("");
                    $("#filediscription").val("");
                    $("#attachfilesource").val("");
                    $("#attachfile tbody").append("<tr>" + "<td>" + filetype + "</td>" + "<td>" + attachfileinput + "</td>" + "<td>" + filediscription + "</td>"+ "<td>" + attachfilesource + "</td>" + "<td><a href='' class='attachfileedit'>Edit</a> <a href='' class='attachfiledelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }



        function save_attachfile_data() {
            var filetype = $("#attachfilesource").val();
            var attachfileinput = $("#attachfileinput").val();
            var filediscription = $("#filediscription").val();
            var attachfilesource = $("#attachfilesource").val();
            console.log(filetype, attachfileinput, filediscription,attachfilesource);

            var attachfile_data = {
                "filetype": filetype,
                "fileinput": attachfileinput,
                "description": filediscription,
                "source": attachfilesource,
                "user": 11,
                "patient": 1
            }

            save_attachfile(attachfile_data, function(data, status) {
                if (status == "success") {
                    $("#filetype").val("");
                    $("#attachfileinput").val("");
                    $("#filediscription").val("");
                    $("#attachfilesource").val("");
                    $("#attachfile tbody").append("<tr>" + "<td>" + filetype + "</td>" + "<td>" + attachfileinput + "</td>" + "<td>" + filediscription + "</td>"+ "<td>" + attachfilesource + "</td>" + "<td><a href='' class='attachfileedit'>Edit</a> <a href='' class='attachfiledelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
    };


 $(document).on('click', 'td a.filedelete', function () {
    $(this).closest('tr').find('td').fadeOut(1000,
 function () {
        delete_attachfile( function(data, status) {
                     $(this).parents('tr:first').remove(), $(this).data('id');
        });

});
      return false;
  });
 $(document).on('click', 'td a.fileedit', function () {
   new_dialog('Edit', $(this).parents('tr'));
  return false;
 });
 $("#create-attachfile").button().click(new_dialog);
});