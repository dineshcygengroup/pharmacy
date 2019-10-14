/*user profile */

/* patient Image */
///*uploadprofile*/
//$('#uploadblah').hide();
//$('#uploadremove').hide();
//function readURLupload(input)
//    {
//       if (input.files && input.files[0])
//       {
//           var reader = new FileReader();
//           reader.onload = function (e)
//           {
//               $('#uploadblah').attr('src', e.target.result);
//           }
//           reader.readAsDataURL(input.files[0]);
//       }
//   }
//
//$("#uploadimgInp").change(function()
//    {
//       if( $('#uploadimgInp').val()!="")
//       {
//           //$('#uploadremove').show();
//           $('#uploadblah').show('slow');
//       }
//       else{
//                $('#uploadremove').hide();$('#uploadblah').hide('slow');
//           }
//       readURLupload(this);
//    });
//
//// $('#uploadremove').click(function()
////    {
////         $('#uploadimgInp').val('');
////         $(this).hide();
////         $('#uploadblah').hide('slow');
////    });
///*uploadprofile*/
//$(function () {
//    load_userimage = function(){
//        get_userimage_data(function(data, status) {
//            console.log("***pinformation*****");
//            var userimage_view = ""
//                console.log(data)
//                userimage_view += '<tbody style="border:5px">';
//                    userimage_view += '<tr>';
//                    userimage_view += '<td><span>'+ data.manageuserphoto + '</span></td>' ;
//
//                    userimage_view += '</tr>';
//
//                userimage_view += '</tbody>';
//
//                $("#userimage").html(userimage_view)
//
//        });
//    }
//    var new_dialog = function (type, row,userimage_view) {
//        var dlg = $("#dialog-form-userimage");
//        type = type || 'Create';
//        var config = {
//             autoOpen: true,
//             height: 300,
//             width: 350,
//             modal: true,
//             buttons: {
//                "Save": save_userimage_data,
//                "Cancel": function () {
//                   dlg.dialog("close");
//                }
//             },
//             close: function () {
//                dlg.dialog("close");
//             }
//        };
//        if (type === 'Edit') {
//            config.title = "Edit Profile";
//            get_userimage_data_for_edit(row);
//            delete (config.buttons['Save']);
//            config.buttons['Edit'] = function () {
//                edit_userimage_data(userimage_id);
//                row.remove();
//            };
//        }
//        dlg.dialog(config);
//
//        function get_userimage_data_for_edit(row)  {
//             $("#uploadblah").val($(row.children().find('span').get(0)).text());
//
//        }
//
//        function edit_userimage_data(id) {
//            var uploadblah = $("#uploadblah").val();
//            var  userimage_data = {
//                "id": id,
//                "patientphoto" : uploadblah,
//
//            }
//            console.log(userimage_data)
//            update_userimage(userimage_data, function(data, status) {
//                if (status == "success") {
//                    $("#uploadblah").val("");
//
//
//                    load_userimage();
//
//                    dlg.dialog("close");
//                }
//            });
//
//        }
//        function save_userimage_data() {
//             var uploadblah = $("#uploadblah").val();
//
//            var userimage_data = {
//
//                "patientphoto" : uploadblah,
//
//               "user": user_id,
//                "patient": patient_id
//
//            }
//
//            save_userimage(userimage_data, function(data, status) {
//                if (status == "success") {
//                    $("#uploadblah").val("");
//
//                    load_userimage();
//
//                    dlg.dialog("close");
//                }
//            });
//
//        }
//    };
//
//    $("#create-userimage").button().click(new_dialog);
//
//    load_userimage();
//});

/* user information*/
$(function () {
    load_userinformation = function(){
        get_userinformation_data(function(data, status) {
            console.log("***pinformation*****");
            var userinformation_view = ""
                console.log(data)
                userinformation_view += '<tbody style="border:5px">';
                    userinformation_view += '<tr>';
                    userinformation_view += '<td><span style="color:#017b8b";>First Name </span>:<span>'+ data.first_name + '</span><span>'+ data.last_name + '</span></td>' ;
                    userinformation_view += '<td><span style="color:#017b8b";>Last Name </span>:<span>'+ data.last_name+ '</span></td>' ;
                    userinformation_view += '<td><span style="color:#017b8b";>Email </span>:<span>'+ data.email + '</span></td>';
                    userinformation_view += '<td><span style="color:#017b8b";>Phone </span>:<span>'+ data.phone + '</span></td>';
                    userinformation_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="piedit">Edit</a></td>';
                    userinformation_view += '</tr>';

                userinformation_view += '</tbody>';

                $("#users").html(userinformation_view)

        });
    }
    var new_dialog = function (type, row,userinformation_id) {
        var dlg = $("#dialog-form");
        type = type || 'Create';
        var config = {
             autoOpen: true,
             height: 300,
             width: 350,
             modal: true,
             buttons: {
                "Save": save_userinformation_data,
                "Cancel": function () {
                   dlg.dialog("close");
                }
             },
             close: function () {
                dlg.dialog("close");
             }
        };
        if (type === 'Edit') {
            config.title = "Edit Profile";
            get_userinformation_data_for_edit(row);
            delete (config.buttons['Save']);
            config.buttons['Edit'] = function () {
                edit_userinformation_data(userinformation_id);
                row.remove();
            };
        }
        dlg.dialog(config);

        function get_userinformation_data_for_edit(row)  {
             $("#userfname").val($(row.children().find('span').get(1)).text());
             $("#userlname").val($(row.children().find('span').get(2)).text());
             $("#useremail").val($(row.children().find('span').get(4)).text());
             $("#usercontact").val($(row.children().find('span').get(6)).text());
             $("#usergender").val($(row.children().find('span').get(8)).text());
             $("#userbdate").val($(row.children().find('span').get(10)).text());
        }

        function edit_userinformation_data(id) {
            var userfname = $("#userfname").val();
            var userlname = $("#userlname").val();
            var useremail = $("#useremail").val();
            var usercontact = $("#usercontact").val();
             var usergender = $("#usergender").val();
            var userbdate = $("#userbdate").val();



            var userinformation_data = {
                "id": id,
                "first_name" : userfname,
                "last_name" : userlname,
                "email" : useremail,
                "phne" : usercontact,
                "gender" : usergender,
                "dob" : userbdate,



            }
            console.log(userinformation_data)
            update_userinformation(userinformation_data, function(data, status) {
                if (status == "success") {
                    $("#userfname").val("");
                    $("#userlname").val("");
                    $("#useremail").val("");
                    $("#usercontact").val("");
                    $("#usergender").val("");
                    $("#userbdate").val("");

                    load_userinformation();

                    dlg.dialog("close");
                }
            });

        }
        function save_userinformation_data() {
             var userfname = $("#userfname").val();
            var userlname = $("#userlname").val();
            var useremail = $("#useremail").val();
            var usercontact = $("#usercontact").val();
             var usergender = $("#usergender").val();
            var userbdate = $("#userbdate").val();

            var userinformation_data = {

                "first_name" : userfname,
                "last_name" : userlname,
                "email" : useremail,
                "phne" : usercontact,
                "gender" : usergender,
                "dob" : userbdate,
                 "user": user_id,
                "patient": patient_id

            }

            save_userinformation(userinformation_data, function(data, status) {
                if (status == "success") {
                    $("#userfname").val("");
                    $("#userlname").val("");
                    $("#useremail").val("");
                    $("#usercontact").val("");
                    $("#usergender").val("");
                    $("#userbdate").val("");
                    load_userinformation();

                    dlg.dialog("close");
                }
            });

        }
    };
//    $(document).on('click', 'a.pidelete', function () {
//        id = $(this).data('id');
//        alert("delete ::"+id);
//        delete_userinformation( id, function(data, status) {
//             load_userinformation();
//
//           //$(this).parents('tr:first').remove()
//        });
//
//         return false;
//    });
    $(document).on('click', 'td a.piedit', function () {
        new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
        return false;
    });
    $("#create-user").button().click(new_dialog);

    load_userinformation();
});

/*user personal*/
$(function () {
    load_userpersonal = function(){
        get_userpersonal_data(function(data, status) {
            console.log("********");
            var userpersonal_view = ""
                console.log(data)
                userpersonal_view += '<tbody style="border:5px">';
                    userpersonal_view += '<tr>';
                    userpersonal_view += '<td><span style="color:#017b8b";>Gender </span>:<span>'+ data.gender+ '</span></td>' ;
                    userpersonal_view += '<td><span style="color:#017b8b";>Education</span>:<span>'+ data.education + '</span></td>';
                    userpersonal_view += '<td><span style="color:#017b8b";>License No </span>:<span>'+ data.licenseno + '</span></td>';
                    userpersonal_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="upedit">Edit</a></td>';
                    userpersonal_view += '</tr>';

                userpersonal_view += '</tbody>';

                $("#users1").html(userpersonal_view)

        });
    }
    var new_dialog = function (type, row,userpersonal_id) {
        var dlg = $("#dialog-form1");
        type = type || 'Create';
        var config = {
             autoOpen: true,
             height: 300,
             width: 350,
             modal: true,
             buttons: {
                "Save": save_userpersonal_data,
                "Cancel": function () {
                   dlg.dialog("close");
                }
             },
             close: function () {
                dlg.dialog("close");
             }
        };
        if (type === 'Edit') {
            config.title = "Edit Profile";
            get_userpersonal_data_for_edit(row);
            delete (config.buttons['Save']);
            config.buttons['Edit'] = function () {
                edit_userpersonal_data(userpersonal_id);
                row.remove();
            };
        }
        dlg.dialog(config);

        function get_userpersonal_data_for_edit(row)  {
             $("#usergender").val($(row.children().find('span').get(1)).text());
             $("#usereducation").val($(row.children().find('span').get(3)).text());
             $("#userlicence").val($(row.children().find('span').get(5)).text());

        }

        function edit_userpersonal_data(id) {
            var usergender = $("#usergender").val();
            var usereducation = $("#usereducation").val();
            var userlicence = $("#userlicence").val();


            var userpersonal_data = {
                "id": id,
                "gender" : usergender,
                "education" : usereducation,
                "licenseno" : userlicence,




            }
            console.log(userpersonal_data)
            update_userpersonal(userpersonal_data, function(data, status) {
                if (status == "success") {
                    $("#usergender").val("");
                    $("#usereducation").val("");
                    $("#userlicence").val("");


                    load_userpersonal();

                    dlg.dialog("close");
                }
            });

        }
        function save_userpersonal_data() {
            var usergender = $("#usergender").val();
            var usereducation = $("#usereducation").val();
            var userlicence = $("#userlicence").val();


            var userpersonal_data = {

                "gender" : usergender,
                "education" : usereducation,
                "licenseno" :userlicence,
                "user": user_id,
                "patient": patient_id

            }

            save_userpersonal(userpersonal_data, function(data, status) {
                if (status == "success") {
                    $("#usergender").val("");
                    $("#usereducation").val("");
                    $("#userlicence").val("");


                    load_userpersonal();

                    dlg.dialog("close");
                }
            });

        }
    };

    $(document).on('click', 'td a.upedit', function () {
        new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
        return false;
    });
    $("#create-user1").button().click(new_dialog);

    load_userpersonal();
});

/*user contact*/
$(function () {
    load_usercontact = function(){
        get_usercontact_data(function(data, status) {
            console.log("********");
            console.log(data)
            var usercontact_view = ""
                console.log(data)
                usercontact_view += '<tbody style="border:5px">';
                    usercontact_view += '<tr>';
                    usercontact_view += '<td><span style="color:#017b8b";>Address </span>:<span>'+ data.adress+ '</span></td>' ;
                    usercontact_view += '<td><span style="color:#017b8b";>City </span>:<span>'+ data.city + '</span></td>';
                    usercontact_view += '<td><span style="color:#017b8b";>State </span>:<span>'+ data.state + '</span></td>';
                    usercontact_view += '<td><span style="color:#017b8b";>Country </span>:<span>'+ data.country+ '</span></td>';
                    usercontact_view += '<td><span style="color:#017b8b";>Zip Code </span>:<span>'+ data.zipcode + '</span></td>';
                    usercontact_view += '<td><span style="color:#017b8b";>Contact </span>:<span>'+ data.phonenumber + '</span></td>';

                    usercontact_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="ucedit">Edit</a></td>';
                    usercontact_view += '</tr>';
                usercontact_view += '</tbody>';

                $("#users2").html(usercontact_view)

        });
    }
    var new_dialog = function (type, row,usercontact_id) {
        var dlg = $("#dialog-form2");
        type = type || 'Create';
        var config = {
             autoOpen: true,
             height: 300,
             width: 350,
             modal: true,
             buttons: {
                "Save": save_usercontact_data,
                "Cancel": function () {
                   dlg.dialog("close");
                }
             },
             close: function () {
                dlg.dialog("close");
             }
        };
        if (type === 'Edit') {
            config.title = "Edit Profile";
            get_usercontact_data_for_edit(row);
            delete (config.buttons['Save']);
            config.buttons['Edit'] = function () {
                edit_usercontact_data(usercontact_id);
                row.remove();
            };
        }
        dlg.dialog(config);

        function get_usercontact_data_for_edit(row)  {
             $("#userAddress").val($(row.children().find('span').get(1)).text());
             $("#userCity").val($(row.children().find('span').get(3)).text());
             $("#userState").val($(row.children().find('span').get(5)).text());
             $("#userCountry").val($(row.children().find('span').get(7)).text());
             $("#userPostal").val($(row.children().find('span').get(9)).text());
             $("#userPhone1").val($(row.children().find('span').get(11)).text());

        }

        function edit_usercontact_data(id) {
            var userAddress = $("#userAddress").val();
            var userCity = $("#userCity").val();
            var userState = $("#userState").val();
            var userCountry = $("#userCountry").val();
            var userPostal = $("#userPostal").val();
            var userPhone1 = $("#userPhone1").val();

            var usercontact_data = {
                "id": id,
                "adress" : userAddress,
                "city" : userCity,
                "state" : userState,
                "country" : userCountry,
                "zipcode" : userPostal,
                "phonenumber" : userPhone1,




            }
            console.log(usercontact_data)
            update_usercontact(usercontact_data, function(data, status) {
                if (status == "success") {
                    $("#userAddress").val("");
                    $("#userCity").val("");
                    $("#userState").val("");
                    $("#userCountry").val("");
                    $("#userPostal").val("");
                    $("#userPhone1").val("");


                    load_usercontact();

                    dlg.dialog("close");
                }
            });

        }
        function save_usercontact_data() {
            var userAddress = $("#userAddress").val();
            var userCity = $("#userCity").val();
            var userState = $("#userState").val();
            var userCountry = $("#userCountry").val();
            var userPostal = $("#userPostal").val();
            var userPhone1 = $("#userPhone1").val();


            var usercontact_data = {

                "adress" : userAddress,
                "city" : userCity,
                "state" : userState,
                "country" : userCountry,
                "zipcode" : userPostal,
                "phonenumber" : userPhone1,
                "user": user_id,



            }

            save_usercontact(usercontact_data, function(data, status) {
                if (status == "success") {
                    $("#userAddress").val("");
                    $("#userCity").val("");
                    $("#userState").val("");
                    $("#userCountry").val("");
                    $("#userPostal").val("");
                    $("#userPhone1").val("");

                    load_usercontact();

                    dlg.dialog("close");
                }
            });

        }
    };

    $(document).on('click', 'td a.ucedit', function () {
        new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
        return false;
    });
    $("#create-user2").button().click(new_dialog);

    load_usercontact();
});

/*user speciality*/
$(function () {
    load_useralternatecontact = function(){
        get_useralternatecontact_data(function(data, status) {
            console.log("********");
            console.log(data)
            var useralternatecontact_view = ""
            if (data.length >= 0) {
                console.log(data)
                useralternatecontact_view += '<tbody style="border:5px">';
                    for (var i = 0; i < data.length; i++) {
                        var alr = data[i]
                        useralternatecontact_view += '<tr>';
                        useralternatecontact_view += '<td><span style="color:#017b8b";>Speciality </span>:<span>'+ alr.speciality+ '</span></td>' ;
                    }
                    useralternatecontact_view += '</tr>';
                useralternatecontact_view += '</tbody>';

                $("#users3").html(useralternatecontact_view)
            }
        });
    }
    var new_dialog = function (type, row,useralternatecontact_id) {
        var dlg = $("#dialog-form3");
        type = type || 'Create';
        var config = {
             autoOpen: true,
             height: 300,
             width: 350,
             modal: true,
             buttons: {
                "Save": save_useralternatecontact_data,
                "Cancel": function () {
                   dlg.dialog("close");
                }
             },
             close: function () {
                dlg.dialog("close");
             }
        };
        if (type === 'Edit') {
            config.title = "Edit Profile";
            get_useralternatecontact_data_for_edit(row);
            delete (config.buttons['Save']);
            config.buttons['Edit'] = function () {
                edit_useralternatecontact_data(useralternatecontact_id);
                row.remove();
            };
        }
        dlg.dialog(config);

        function get_useralternatecontact_data_for_edit(row)  {
             $("#userspeciality").val($(row.children().find('span').get(1)).text());
        }

        function edit_useralternatecontact_data(id) {
            var userspeciality = $("#userspeciality").val();


            var useralternatecontact_data = {
                "id": id,
                 "userspeciality" : speciality,


            }
            console.log(useralternatecontact_data)
            update_useralternatecontact(useralternatecontact_data, function(data, status) {
                if (status == "success") {
                    $("#userspeciality").val("");



                    load_useralternatecontact();

                    dlg.dialog("close");
                }
            });

        }
        function save_useralternatecontact_data() {
            var userspeciality = $("#userspeciality").val();


            var useralternatecontact_data = {

                "speciality" : userspeciality,
                 "user": user_id,



            }

            save_useralternatecontact(useralternatecontact_data, function(data, status) {
                if (status == "success") {
                     $("#userspeciality").val("");



                    load_useralternatecontact();

                    dlg.dialog("close");
                }
            });

        }
    };
    $(document).on('click', 'a.uspdelete', function () {
        id = $(this).data('id');
        alert("delete ::"+id);
        delete_useralternatecontact( id, function(data, status) {
             load_useralternatecontact();

           //$(this).parents('tr:first').remove()
        });

         return false;
    });
    $(document).on('click', 'td a.uspedit', function () {
        new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
        return false;
    });
    $("#create-user3").button().click(new_dialog);

    load_useralternatecontact();
});


