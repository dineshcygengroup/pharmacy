/*userlist*/
$(function () {
    var load_manageuser = function(){
        get_manageuser_data(function(data, status) {
            console.log("********");
            var manageuser_view = ""
            console.log(data);

            console.log(data.length);

            if (data.length >= 0) {
                console.log("this is manageuser"+data)
                manageuser_view += '<tbody style="border:5px">';
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    manageuser_view += '<tr>';
                    manageuser_view += '<td><span>'+ alr.first_name + alr.last_name +'</span></td>' ;
                    manageuser_view += '<td><span>'+ alr.email + '</span></td>';
                    manageuser_view += '<td><span>'+ alr.phone + '</span></td>';
                    manageuser_view += '<td><span>'+ alr.user_type + '</span></td>' ;

                    manageuser_view += '<td><a  href="/userprofile/'+String(alr.id)+'">Profile</a></td>';

                    manageuser_view += '</tr>';
                }
                manageuser_view += '</tbody>';

                $("#manageuserTable").html(manageuser_view)
            }
        });
    }
    var new_dialog = function (type, row,manageuser_id) {
      var dlg = $("#manageuser-form");
      type = type || 'Create';
      var config = {
          autoOpen: true,
          height: 300,
          width: 350,
          modal: true,
          buttons: {
               "Add User": save_manageuser_data,
               "Cancel": function () {
                    dlg.dialog("close");
                }
          },
          close: function () {
             dlg.dialog("close");
           }
      };
      if (type === 'Edit') {
           config.title = "Edit User";
           get_manageuser_data_for_edit(row);
           delete (config.buttons['Add User']);
           config.buttons['Edit'] = function () {
                edit_manageuser_data(manageuser_id)
                row.remove();
           };
      }
       dlg.dialog(config);
       function get_manageuser_data_for_edit(row) {
            $("#userfname").val($(row.children().find('span').get(0)).text());
            $("#userlname").val($(row.children().find('span').get(1)).text());
            $("#useremail").val($(row.children().find('span').get(2)).text());
            $("#userpwd").val($(row.children().find('span').get(3)).text());
            $("#usercontact").val($(row.children().find('span').get(4)).text());
            $("#usertype").val($(row.children().find('span').get(5)).text());


       }
        function edit_manageuser_data(id) {
            var userfname = $("#userfname").val();
            var userlname = $("#userlname").val();
            var useremail = $("#useremail").val();
            var userpwd = $("#userpwd").val();
             var usercontact = $("#usercontact").val();
            var usertype = $("#usertype").val();


            var manageuser_data = {
                "id": id,
                "first_name": userfname,
                "last_name": userlname,
                "email": useremail,
                "password":userpwd ,
                "phone": usercontact,
                "user_type": usertype,



            }
            console.log(manageuser_data)
            update_manageuser(manageuser_data, function(data, status) {
                if (status == "success") {
                    $("#userfname").val("");
                    $("#userlname").val("");
                    $("#useremail").val("");
                    $("#userpwd").val("");
                    $("#usercontact").val("");
                    $("#usertype").val("");


                     load_manageuser();

                    //$("#Allergy tbody").append("<tr>" + "<td>" + AllergyType + "</td>" + "<td>" + Allergen + "</td>" + "<td>" + AllergyDescription + "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }

        function save_manageuser_data() {
           var userfname = $("#userfname").val();
            var userlname = $("#userlname").val();
            var useremail = $("#useremail").val();
            var userpwd = $("#useremail").val();
             var usercontact = $("#usercontact").val();
            var usertype = $("#usertype").val();

            var manageuser_data = {
                "first_name": userfname,
                "last_name": userlname,
                "email": useremail,
                "password": useremail,
                "phone": usercontact,
                "user_type": usertype,
               //"user": user_id,
                //"patient": patient_id,
                "orgnastion": orgnastion_id
            }

            save_manageuser(manageuser_data, function(data, status) {

                if (status == "success") {
                    $("#userfname").val("");
                    $("#userlname").val("");
                    $("#useremail").val("");
                    $("#userpwd").val("");
                    $("#usercontact").val("");
                    $("#usertype").val("");
                   // $("#Allergy tbody").append("<tr>" + "<td>" + AllergyType + "</td>" + "<td>" + Allergen + "</td>" + "<td>" + AllergyDescription + "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" + "</tr>");
                    load_manageuser();
                    dlg.dialog("close");
                }
            });
        }
    };


 $(".manage-adduser").button().click(new_dialog);

 load_manageuser();

});
