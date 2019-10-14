

/*****************************procedure***************************************/
$(document).ready(function(){
var hos_procedure = function(){
         get_procedure_data(function(data, status) {

            var procedure_view = ""

            if (data.length >= 0) {
                procedure_view += '<tbody style="border:5px">';
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    procedure_view += '<tr>';
                    procedure_view += '<td><span>'+ alr.procedure_code + '</span></td>' ;
                    procedure_view += '<td><span>'+ alr.procedure_description + '</span></td>';
                    procedure_view += '<td><span>'+ alr.amount + '</span></td>';
                    procedure_view += '<td> <a href="javascript:void(0)" data-id="' + alr.id + '" class="proceduredit edit">Edit</a>' +
                        '<a href="javascript:void(0)" data-id="' + alr.id + '" class="proceduredelete dele">Delete</a></td>';
                    procedure_view += '</tr>';
                }
                procedure_view += '</tbody>';

                $("#Proceduretable").html(procedure_view)
            }
         });
    }
    var new_dialog = function (type, row, procedure_id) {
      var dlg = $("#Procedure-form");
  type = type || 'Create';
  var config = {
     autoOpen: true,
    height: 300,
   width: 350,
   modal: true,
   buttons: {
       "Create": save_procedure_data,
                "Cancel": function() {
                    dlg.dialog("close");
           }
      },
     close: function () {
       dlg.dialog("close");
   }
   };
  if (type === 'Edit') {
     config.title = "Procedure code";
     get_procedure_data_edit(row);
     delete (config.buttons['Create']);
   config.buttons['Edit'] = function () {
   edit_procedure_data(procedure_id);
       row.remove();

  };
    }
   dlg.dialog(config);


              function get_procedure_data_edit(row) {
               $("#Procedure-code").val($(row.children().find('span').get(0)).text());
               $("#procedurename").val($(row.children().find('span').get(1)).text());
               $("#procedureamount").val($(row.children().find('span').get(2)).text());

                          }

         function edit_procedure_data(id) {
    var Procedurecode=$("#Procedure-code").val();
    var Procedurename=$("#procedurename").val();
    var Amount=$("#procedureamount").val();
    console.log(Procedurecode, Procedurename, Amount)

var procedure_data={
"id": id,
"procedure_code": Procedurecode,
"procedure_description": Procedurename,
"amount": Amount
}
console.log(procedure_data)
update_procedure(procedure_data,function(data, status){
if(status == "success"){
$("#Procedure-code").val("");
                    $("#procedurename").val("");
                    $("#procedureamount").val("");

                    hos_procedure();

                    dlg.dialog("close");
}
});
  }
                function save_procedure_data() {

            var Procedurecode=$("#Procedure-code").val();
    var Procedurename=$("#procedurename").val();
    var Amount=$("#procedureamount").val();

            var procedure_data = {
                "procedure_code": Procedurecode,
                "procedure_description": Procedurename,
                "amount": Amount,
                "orgnastion": orgnastion_id,

            }

            save_procedure(procedure_data, function(data, status) {
                if (status == "success") {
                    $("#Procedure-code").val("");
                    $("#procedurename").val("");
                    $("#procedureamount").val("");
                    hos_procedure();
                     dlg.dialog("close");
                }
            });
        }
    };

    $(document).on('click', 'td a.proceduredelete', function()  {
        id = $(this).data('id');
        alert("delete ::"+id);
        delete_procedure( id, function(data, status) {
             hos_procedure();

           //$(this).parents('tr:first').remove()
        });
        return false;
    });
    $(document).on('click', 'td a.proceduredit', function() {
       new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
        return false;
    });
    $("#Procedureitampopup").button().click(new_dialog);


    hos_procedure();


 })
/*********************end-procedure*************************/
/*****************************drug***************************************/
$(document).ready(function(){
var hos_drug = function(){
         get_drug_data(function(data, status) {

            var drug_view = ""

            if (data.length >= 0) {
                drug_view += '<tbody style="border:5px">';
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    drug_view += '<tr>';
                    drug_view += '<td><span>'+ alr.drug_code + '</span></td>' ;
                    drug_view += '<td><span>'+ alr.medicationname + '</span></td>';
                    drug_view += '<td><span>'+ alr.drugstrength + '</span></td>';
                  drug_view += '<td><span>'+ alr.drugcompany + '</span></td>';
                       drug_view += '<td><span>'+ alr.amount + '</span></td>';
         drug_view += '<td> <a href="javascript:void(0)" data-id="' + alr.id + '" class="drugedit edit">Edit</a>' +
                        '<a href="javascript:void(0)" data-id="' + alr.id + '" class="drugdelete dele">Delete</a></td>';
                    drug_view += '</tr>';
                }
                drug_view += '</tbody>';

                $("#Drugtable").html(drug_view)
            }
         });
    }
    var new_dialog = function (type, row, drug_id) {
      var dlg = $("#Drug-form");
  type = type || 'Create';
  var config = {
     autoOpen: true,
    height: 300,
   width: 350,
   modal: true,
   buttons: {
       "Create": save_drug_data,
                "Cancel": function() {
                    dlg.dialog("close");
           }
      },
     close: function () {
       dlg.dialog("close");
   }
   };
  if (type === 'Edit') {
     config.title = "Drug code";
     get_drug_data_edit(row);
     delete (config.buttons['Create']);
   config.buttons['Edit'] = function () {
   edit_drug_data(drug_id);
       row.remove();

  };
    }
   dlg.dialog(config);


              function get_drug_data_edit(row) {
               $("#Drug-Code").val($(row.children().find('span').get(0)).text());
               $("#Drug-Medication").val($(row.children().find('span').get(1)).text());
               $("#Strength").val($(row.children().find('span').get(2)).text());
               $("#Company").val($(row.children().find('span').get(3)).text());
               $("#Drug-Amount").val($(row.children().find('span').get(4)).text());

                          }

         function edit_drug_data(id) {
    var DrugCode=$("#Drug-Code").val();
    var DrugMedication=$("#Drug-Medication").val();
    var Strength=$("#Strength").val();
    var Company=$("#Company").val();
    var DrugAmount=$("#Drug-Amount").val();
    console.log(DrugCode, DrugMedication, Strength, Company, DrugAmount)

var drug_data={
"id": id,
"drug_code": DrugCode,
"medicationname": DrugMedication,
"drugstrength": Strength,
"drugcompany": Company,
"amount": DrugAmount
}
console.log(drug_data)
update_drug(drug_data,function(data, status){
if(status == "success"){
$("#Drug-Code").val("");
                    $("#Drug-Medication").val("");
                    $("#Strength").val("");
$("#Company").val("");
$("#Drug-Amount").val("");
                    hos_drug();

                    dlg.dialog("close");
}
});
  }
                function save_drug_data() {

            var DrugCode=$("#Drug-Code").val();
    var DrugMedication=$("#Drug-Medication").val();
    var Strength=$("#Strength").val();
    var Company=$("#Company").val();
    var DrugAmount=$("#Drug-Amount").val();

            var drug_data = {
                "drug_code": DrugCode,
"medicationname": DrugMedication,
"drugstrength": Strength,
"drugcompany": Company,
"amount": DrugAmount,
                "orgnastion": orgnastion_id,

            }

            save_drug(drug_data, function(data, status) {
                if (status == "success") {
                   $("#Drug-Code").val("");
                    $("#Drug-Medication").val("");
                    $("#Strength").val("");
$("#Company").val("");
$("#Drug-Amount").val("");
                    hos_drug();
                     dlg.dialog("close");
                }
            });
        }



    };

    $(document).on('click', 'td a.drugdelete', function()  {
        id = $(this).data('id');
        alert("delete ::"+id);
        delete_drug( id, function(data, status) {
             hos_drug();

           //$(this).parents('tr:first').remove()
        });
        return false;
    });
    $(document).on('click', 'td a.drugedit', function() {
       new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
        return false;
    });
    $("#Drugcodepopup").button().click(new_dialog);


    hos_drug();


 })
/*********************end-drug*************************/

/*****************************test***************************************/
$(document).ready(function(){
var hos_test = function(){
         get_test_data(function(data, status) {

            var test_view = ""

            if (data.length >= 0) {
                test_view += '<tbody style="border:5px">';
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    test_view += '<tr>';
                    test_view += '<td><span>'+ alr.test_code + '</span></td>' ;
                    test_view += '<td><span>'+ alr.testname + '</span></td>';
                    test_view += '<td><span>'+ alr.resultrange + '</span></td>';
                  test_view += '<td><span>'+ alr.units + '</span></td>';
                       test_view += '<td><span>'+ alr.amount + '</span></td>';
         test_view += '<td> <a href="javascript:void(0)" data-id="' + alr.id + '" class="testedit edit">Edit</a>' +
                        '<a href="javascript:void(0)" data-id="' + alr.id + '" class="testdelete dele">Delete</a></td>';
                    test_view += '</tr>';
                }
                test_view += '</tbody>';

                $("#testtable").html(test_view)
            }
         });
    }
    var new_dialog = function (type, row, test_id) {
      var dlg = $("#test-form");
  type = type || 'Create';
  var config = {
     autoOpen: true,
    height: 300,
   width: 350,
   modal: true,
   buttons: {
       "Create": save_test_data,
                "Cancel": function() {
                    dlg.dialog("close");
           }
      },
     close: function () {
       dlg.dialog("close");
   }
   };
  if (type === 'Edit') {
     config.title = "Test code";
     get_test_data_edit(row);
     delete (config.buttons['Create']);
   config.buttons['Edit'] = function () {
   edit_test_data(test_id);
       row.remove();

  };
    }
   dlg.dialog(config);


              function get_test_data_edit(row) {
               $("#Test-Code").val($(row.children().find('span').get(0)).text());
               $("#Test-Name").val($(row.children().find('span').get(1)).text());
               $("#Curated-Range").val($(row.children().find('span').get(2)).text());
               $("#Unit").val($(row.children().find('span').get(3)).text());
               $("#test-Amount").val($(row.children().find('span').get(4)).text());

                          }

         function edit_test_data(id) {
    var TestCode=$("#Test-Code").val();
    var TestName=$("#Test-Name").val();
    var Curated=$("#Curated-Range").val();
    var Unit=$("#Unit").val();
    var testAmount=$("#test-Amount").val();
    console.log(TestCode, TestName, Curated, Unit, testAmount)

var test_data={
"id": id,
"test_code": TestCode,
"testname": TestName,
"resultrange": Curated,
"units": Unit,
"amount": testAmount
}
console.log(test_data)
update_test(test_data,function(data, status){
                if(status == "success"){
                    $("#Test-Code").val("");
                    $("#Test-Name").val("");
                    $("#Curated-Range").val("");
                    $("#Unit").val("");
                    $("#test-Amount").val("");
                    hos_test();

                    dlg.dialog("close");
}
});
  }
                function save_test_data() {
var TestCode=$("#Test-Code").val();
    var TestName=$("#Test-Name").val();
    var Curated=$("#Curated-Range").val();
    var Unit=$("#Unit").val();
    var testAmount=$("#test-Amount").val();

            var test_data = {
               "test_code": TestCode,
"testname": TestName,
"resultrange": Curated,
"units": Unit,
"amount": testAmount,
                "orgnastion": orgnastion_id,

            }

            save_test(test_data, function(data, status) {
                if (status == "success") {
                   $("#Test-Code").val("");
                    $("#Test-Name").val("");
                    $("#Curated-Range").val("");
$("#Unit").val("");
$("#test-Amount").val("");
                    hos_test();
                     dlg.dialog("close");
                }
            });
        }



    };

    $(document).on('click', 'td a.testdelete', function()  {
        id = $(this).data('id');
        alert("delete ::"+id);
        delete_test( id, function(data, status) {
             hos_test();

           //$(this).parents('tr:first').remove()
        });
        return false;
    });
    $(document).on('click', 'td a.testedit', function() {
       new_dialog('Edit', $(this).parents('tr'), $(this).data('id'));
        return false;
    });
    $("#testcodepopup").button().click(new_dialog);


    hos_test();


 })
/*********************end-test*************************/
/*******************hospitallogo***********/
$(function () {
    var load_hospitallogofile = function(){
        get_hospitallogofile_data(function(data, status) {
        console.log("********");
        var hospitallogofile_view = ""
        if (data.length >= 0) {
            hospitallogofile_view += '<tbody style="border:5px">';
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    hospitallogofile_view += '<tr>';
                    hospitallogofile_view += '<td><span><a style="color:green !important; font-weight:bold;"  target="_blank" href=" '+ alr.hospitallogoimage +' ">View file</a></span></td>';
                    hospitallogofile_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="hospitallogofileedit">Edit</a>' +
                        '<a href="javascript:void(0)" data-id="' + alr.id + '" class="hospitallogofiledelete">Delete</a></td>';
                    hospitallogofile_view += '</tr>';
                }
                hospitallogofile_view += '</tbody>';

                $("#hospitallogouploadfile").html(hospitallogofile_view)
            }
        });
    }
    var new_dialog = function(type, row, hospitallogofile_id) {
        var dlg = $("#dialog-form-hospitallogofile");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_hospitallogofile_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {
            config.title = "Upload Hospital Logo";
            get_hospitallogofile_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_hospitallogofile_data(hospitallogofile_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_hospitallogofile_data_for_edit(row) {
            $("#hospitallogosource").val($(row.children().find('span').get('')).text());
        }

        function edit_hospitallogofile_data(id) {
            var hospitallogosource = $("#hospitallogosource").val();
            var form = $('#ehr_hospitallogo_report')[0];


            var data = new FormData(form);

            data.append("orgnastion",orgnastion_id)




            update_hospitallogofile(data, function(data, status) {
                if (status == "success") {
                    $("#hospitallogosource").val("");
                    load_hospitallogofile();
                    //$("#hospitallogofile tbody").append("<tr>" + "<td>" + filetype + "</td>" + "<td>" + hospitallogofileinput + "</td>" + "<td>" + filediscription + "</td>"+ "<td>" + hospitallogofilesource + "</td>" + "<td><a href='' class='hospitallogofileedit'>Edit</a> <a href='' class='hospitallogofiledelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
        function save_hospitallogofile_data() {
            var hospitallogosource = $("#hospitallogosource").val();
//
//            var hospitallogofile_data = {
//                "filetype": fieldtype,
//               // "upload":hospitallogofileinput,
//                "description": fielddescription,
//                "source": fieldsource,
//                "user" :user_id,
//                "patient": patient_id
//            }
            var form = $('#ehr_hospitallogo_report')[0];


            var data = new FormData(form);
            data.append("patient",patient_id);
            data.append("orgnastion",orgnastion_id)


//
            save_hospitallogofile(data, function(data, status) {
                if (status == "success") {
                    $("#hospitallogosource").val("");
                    load_hospitallogofile();
                    dlg.dialog("close");
                }
            });
        }
    };


     $(document).on('click', 'td a.hospitallogofiledelete', function () {
        id = $(this).data('id');
        console.log("delete ::"+id);
        delete_hospitallogofile( id, function(data, status) {
            load_hospitallogofile();
        });
        return false;
     });
     $(document).on('click', 'td a.hospitallogofileedit', function () {
        new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
        return false;
     });
     $("#create-hospitallogofile").button().click(new_dialog);

      load_hospitallogofile();
});

/*******************doctorsign***********/
$(function () {
    var load_doctorsignfile = function(){
        get_doctorsignfile_data(function(data, status) {
        console.log("********");
        var doctorsignfile_view = ""
        if (data.length >= 0) {
            doctorsignfile_view += '<tbody style="border:5px">';
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    doctorsignfile_view += '<tr>';
                    doctorsignfile_view += '<td><span><a style="color:green !important; font-weight:bold;"  target="_blank" href=" '+ alr.doctorsign +' ">View file</a></span></td>';
                    doctorsignfile_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="doctorsignfileedit">Edit</a>' +
                        '<a href="javascript:void(0)" data-id="' + alr.id + '" class="doctorsignfiledelete">Delete</a></td>';
                    doctorsignfile_view += '</tr>';
                }
                doctorsignfile_view += '</tbody>';

                $("#doctorsignuploadfile").html(doctorsignfile_view)
            }
        });
    }
    var new_dialog = function(type, row, doctorsignfile_id) {
        var dlg = $("#dialog-form-doctorsignfile");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": save_doctorsignfile_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };
        if (type === 'Edit') {
            config.title = "Upload doctor signature";
            get_doctorsignfile_data_for_edit(row);

            delete(config.buttons['Save']);
            config.buttons['Edit'] = function() {
                edit_doctorsignfile_data(doctorsignfile_id);
                row.remove();

            };
        }
        dlg.dialog(config);

        function get_doctorsignfile_data_for_edit(row) {
            $("#doctorsignsource").val($(row.children().find('span').get('')).text());
        }

        function edit_doctorsignfile_data(id) {
            var doctorsignsource = $("#doctorsignsource").val();

            var form = $('#ehr_doctorsign_report')[0];

            var data = new FormData(form);
            data.append("id",id);
            data.append("orgnastion",orgnastion_id)
            console.log(doctorsignfile_data)
            update_doctorsignfile(data, function(data, status) {
                if (status == "success") {
                    $("#doctorsignsource").val("");
                    load_doctorsignfile();
                    //$("#doctorsignfile tbody").append("<tr>" + "<td>" + filetype + "</td>" + "<td>" + doctorsignfileinput + "</td>" + "<td>" + filediscription + "</td>"+ "<td>" + doctorsignfilesource + "</td>" + "<td><a href='' class='doctorsignfileedit'>Edit</a> <a href='' class='doctorsignfiledelete'>Delete</a></td>" + "</tr>");
                    dlg.dialog("close");
                }
            });
        }
        function save_doctorsignfile_data() {
            var doctorsignsource = $("#doctorsignsource").val();
//
//            var doctorsignfile_data = {
//                "filetype": fieldtype,
//               // "upload":doctorsignfileinput,
//                "description": fielddescription,
//                "source": fieldsource,
//                "user" :user_id,
//                "patient": patient_id
//            }
            var form = $('#ehr_doctorsign_report')[0];
            var data = new FormData(form);




//
            save_doctorsignfile(data, function(data, status) {
                if (status == "success") {
                    $("#doctorsignsource").val("");
                    load_doctorsignfile();
                    dlg.dialog("close");
                }
            });
        }
    };


     $(document).on('click', 'td a.doctorsignfiledelete', function () {
        id = $(this).data('id');
        console.log("delete ::"+id);
        delete_doctorsignfile( id, function(data, status) {
            load_doctorsignfile();
        });
        return false;
     });
     $(document).on('click', 'td a.doctorsignfileedit', function () {
        new_dialog('Edit', $(this).parents('tr'),$(this).data('id'));
        return false;
     });
     $("#create-doctorsignfile").button().click(new_dialog);

      load_doctorsignfile();
});


/*******************changepassword***********/
$(function () {
    var new_dialog = function(type, row, changepassword_id) {
        var dlg = $("#dialog-form-changepassword");
        type = type || 'Create';
        var config = {
            autoOpen: true,
            height: 400,
            width: 450,
            modal: true,
            buttons: {
                "Save": edit_changepassword_data,
                "Cancel": function() {
                    dlg.dialog("close");
                }
            },
            close: function() {
                dlg.dialog("close");
            }
        };

        dlg.dialog(config);
        function edit_changepassword_data(id) {
            var currentpassword = $("#currentpassword").val();
            var newpassword = $("#newpassword").val();
            console.log(currentpassword,newpassword)
            var changepassword_data = {
//                "id": id,
                "currentpassword": currentpassword,
                "newpassword": newpassword,
            }
            console.log(changepassword_data)
            update_changepassword(changepassword_data, function(data, status) {
                dlg.dialog("close");
                if (status == "success") {
                    $("#currentpassword").val("");
                    $("#newpassword").val("");

                    dlg.dialog("close");
                }
            });
            //    $("#Allergy tbody").append("<tr>"+"<td>"+"Allergy type:"+AllergyType.val()+"</td>"+"<td>"+Allergen.val() +"</td>" +"<td>"+  AllergyDescription.val()+  "</td>" + "<td><a href='' class='Allergyedit'>Edit</a> <a href='' class='Allergydelete'>Delete</a></td>" +  "</tr>");
            //    dlg.dialog("close");
        }

    };

     $("#create-changepassword").button().click(new_dialog);

});