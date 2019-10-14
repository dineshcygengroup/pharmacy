/*patientlist*/
$(function () {
    var load_patient = function(){
        get_patient_data(function(data, status) {
            console.log("********");
            var patient_view = ""
            console.log(data);

            console.log(data.length);

            if (data.length >= 0) {
                console.log("this is patient"+data)
                patient_view += '<tbody style="border:5px">';
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]

                    patient_view += '<tr >';
                    patient_view += '<td><span>'+ alr.first_name + alr.last_name+'</span></td>' ;
                    patient_view += '<td><span>'+ alr.email +"&"+ alr.phne + '</span></td>';
                    patient_view += '<td><span>'+ alr.gender + '</span></td>';
                    patient_view += '<td><span>'+ alr.dob + '</span></td>' ;
//                    patient_view += '<td><a  href="patientpart/'+String(alr.id)+'">EHR </a></td>';
                    //http://127.0.0.1:8000/patientpart/
                    patient_view += '<td><a  href="/patientpart/'+String(alr.id)+'">Profile</a></td>';

//                    patient_view += '<td><span>'+ alr.gender + '</span></td>';
//                    patient_view += '<td><span>'+ alr.dob + '</span></td>';
//                    patient_view += '<td><span>'+ alr.orgnastion + '</span></td>' ;

//                    patient_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="patientedit">Edit</a>' +
//                        '<a href="javascript:void(0)" data-id="' + alr.id + '" class="patientdelete">Delete</a></td>';
                    patient_view += '</tr>';
                }
                patient_view += '</tbody>';

                $("#myTable").html(patient_view)
            }
         });
    }
    var new_dialog = function (type, row,patient_id) {
      var dlg = $("#patient-form");
      type = type || 'Create';
      var config = {
          autoOpen: true,
          height: 300,
          width: 350,
          modal: true,
          buttons: {
               "Add Patient": save_patient_data,
               "Cancel": function () {
                    dlg.dialog("close");
                }
          },
          close: function () {
             dlg.dialog("close");
           }
      };
      if (type === 'Edit') {
           config.title = "Edit Patient";
           get_patient_data_for_edit(row);
           delete (config.buttons['Add Patient']);
           config.buttons['Edit'] = function () {
                edit_patient_data(patient_id)
                row.remove();
           };
      }
        dlg.dialog(config);
        function get_patient_data_for_edit(row) {
            $("#fname").val($(row.children().find('span').get(0)).text());
            $("#lname").val($(row.children().find('span').get(1)).text());
            $("#email").val($(row.children().find('span').get(2)).text());
             $("#contact").val($(row.children().find('span').get(3)).text());
            $("#Gender").val($(row.children().find('span').get(4)).text());
            $("#Birth").val($(row.children().find('span').get(5)).text());
            $("#organisation").val($(row.children().find('span').get(6)).text());
        }
         function edit_patient_data(id) {
            var fname = $("#fname").val();
            var lname = $("#lname").val();
            var email = $("#email").val();
             var contact = $("#contact").val();
            var Gender = $("#Gender").val();
            var Birth = $("#Birth").val();
             var organisation = $("#organisation").val();

            console.log(AllergyType, Allergen, AllergyDescription);

            var patient_data = {
                "id": id,
                "first_name": fname,
                "last_name": lname,
                "email": email,
                "phne": contact,
                "gender": Gender,
                "dob": Birth,
                "orgnastion": organisation


            }
            console.log(patient_data)
            update_patient(patient_data, function(data, status) {
                if (status == "success") {
                    $("#fname").val("");
                    $("#lname").val("");
                    $("#email").val("");
                    $("#contact").val("");
                    $("#Gender").val("");
                    $("#Birth").val("");
                    $("#organisation").val("");

                     load_patient();

                    //$("#Allergy tbody").append("<tr>" + "<td>" + AllergyType + "</td>" + "<td>" + Allergen + "</td>" + "<td>" + AllergyDescription + "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }

        function save_patient_data() {
            var fname = $("#fname").val();
            var lname = $("#lname").val();
            var email = $("#email").val();
             var contact = $("#contact").val();
            var Gender = $("#Gender").val();
            var Birth = $("#Birth").val();
             var organisation = $("#organisation").val();

            var patient_data = {
                "first_name": fname,
                "last_name": lname,
                "email": email,
                "phne": contact,
                "gender": Gender,
                "dob": Birth,
                "orgnastion": organisation,
                "user": user_id,
                "patient": patient_id
            }

            save_patient(patient_data, function(data, status) {

                if (status == "success") {
                    $("#fname").val("");
                    $("#lname").val("");
                    $("#email").val("");
                    $("#contact").val("");
                    $("#Gender").val("");
                    $("#Birth").val("");
                    $("#organisation").val("");
                   // $("#Allergy tbody").append("<tr>" + "<td>" + AllergyType + "</td>" + "<td>" + Allergen + "</td>" + "<td>" + AllergyDescription + "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" + "</tr>");
                    load_patient();

                    dlg.dialog("close");
                }
            });
        }
    };


 $(document).on('click', 'span.delete3', function () {
    id = $(this).data('id');
        alert("delete ::"+id);
        delete_patient( id, function(data, status) {
             load_allergies();

           //$(this).parents('tr:first').remove()
        });
      return false;
  });
 $(document).on('click', 'td a.edit3', function () {
   new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
  return false;
 });
 $(".manage-adduser").button().click(new_dialog);

 load_patient();

});



