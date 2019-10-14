$(function () {
    
    var load_patient = function () {
        get_patient_data(function (data, status) {
            var patient_view = ""
            if (data.length >= 0) {
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    patient_view += '<tr >';
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

                    patient_view += '<td ><a style="color: #64c1b1; " href="/patient_profile_details/' + String(alr.pat.id) + '/"class="fa fa-user-circle fa-lg" ></a></td>';
                    patient_view += '<td ><a style="color: #64c1b1; " href="/lab_test_details/' + String(alr.UHID) + '/"class="lab_test fa fa-flask fa-lg" ></a></td>';

                    // patient_view += '<td ><a style="color: #64c1b1; " href="/summary/' + String(alr.pat.id) + '/"class="fa fa-file-text fa-lg" ></a></td>';
                    // patient_view += '<td ><a style="color: #64c1b1; " href="javascript:void(0)" data-id= "' + alr.UHID + '" class="patientLink fa fa-user-md fa-lg" data-toggle="modal" data-target="#myModal"></a></td>';
                    // patient_view += '<td ><a style="color: #64c1b1; " href="javascript:void(0)" data-id= "' + alr.UHID + '" class="patientLink fa fa-id-badge fa-lg" data-toggle="modal" data-target="#assignedDoctorView"></a></td>';

                    // patient_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.pat.id + '" class="patientedit fa fa-pencil-square-o fa-lg "></a> </td>';
                   
                }
                $("#patientDetailsInLaboratory").html(patient_view);
            }
            
        });
    }
    load_patient();
        
});
// laboratory test details
$(function () {
    
    var load_cbc = function () {
        get_cbc_labtest_data(function (data, status) {
            var cbc_view = ""
            var cbc_no_view =""
            if(data.length>= 0)  {
                $("#cbc_data").show();
                $(".cbc_nodata").hide();
                var sNo = 1
                for (var i = 0; i < data.length; i++) {
                    // console.log("cbc test::", data[i])
                    var alr = data[i]
                    cbc_view += '<tr >';
                    cbc_view += '<td><span style="color: #64C1B1;font-weight: bolder;">' + sNo++ + '</span></td>';
                    cbc_view += '<td><span style="color: #64C1B1;font-weight: bolder;">' + alr.attribute + '</span></td>';
                    cbc_view += '<td><span style="color: #64C1B1;font-weight: bolder;">' + alr.referenceminvalue + '</span>' +' - '+'<span style="color: #64C1B1;font-weight: bolder;">'+alr.referencemaxvalue +'</span>'+'</td>';
                    // cbc_view += '<td><span style="color: #64C1B1;font-weight: bolder;">' + alr.referencemaxvalue + '</span></td>';
                    cbc_view += '<td><span style="color: #64C1B1;font-weight: bolder;">' + alr.units + '</span></td>';
                    cbc_view += '<td><span style="color: #64C1B1;font-weight: bolder;">' + alr.created_date + '</span></td>';
                    
                    cbc_view += '<td><a style="color: #64c1b1; " href="javascript:void(0)" data-id="' + alr.id + '" class="cbctestdetailsedit fa fa-pencil-square-o fa-lg "></a> </td>';
                    cbc_view += '<td><a style="color: #64c1b1; ;"  href="javascript:void(0)" data-id="' + alr.id + '" class="cbctestdelete fa fa-trash-o"></a></td>';

                }
                $("#cbc_data").html(cbc_view);
            }
            if(data.length == ''){
                $(".cbc_nodata").show();
                cbc_no_view += '<div><marquee behavior="alternate"> Please add Complete Blood Count test details. </marquee></div>';
                
                $(".cbc_nodata").html(cbc_no_view);
                $("#cbc_data").hide();
            }
            var new_dialog = function (row,id,type) {
                
               var cbc_id= id;
            //    console.log('ssssss'+id);
                // console.log("in side new_dialog edit lab test :: ",pat_id);
                var dlg = $("#test-details-form");
                // $("#test-details-form").hide();
                type = type || 'Create';
                var config = {
                    autoOpen: true,
                    height: 300,
                    width: 350,
                    modal: true,
                    buttons: {
                        "Create": save_test_details_data,
                        "Cancel": function () {
                            dlg.dialog("close");
                            
                            $("#attribute").val(null);
                            $("#referenceMinValue").val("");
                            $("#referenceMaxValue").val("");
                            $("#units").val(null)
                            load_cbc();
                        }
                    },
                    close: function () {
                        dlg.dialog("close");
                        load_cbc();
                    },
                };
                dlg.dialog(config);
                
                function save_test_details_data() {

                    var attribute = $("#attribute").val()
                    var referenceMinValue = parseInt($("#referenceMinValue").val());
                    // console.log(typeof(referenceMinValue));
                    var referenceMaxValue = parseInt($("#referenceMaxValue").val());
                    var units = $("#units").val()
                    
                    if (attribute == null) {
                        $("#dialogbox1").show();
                        $("#errorMsgattribute").html('Attribute name is mandatory');
                        $("#dialogbox1").delay(4000).fadeOut();
                    }

                    else if (referenceMinValue == '') {
                        $("#dialogbox2").show();
                        $("#errorMsgreferenceMinValue").html('Reference min value is mandatory');
                        $("#dialogbox2").delay(4000).fadeOut();
                    }
                    else if (referenceMaxValue == '') {
                        $("#dialogbox3").show();
                        $("#errorMsgreferenceMaxValue").html('Reference max value is mandatory');
                        $("#dialogbox3").delay(4000).fadeOut();
                    }
                    else if (referenceMinValue >= referenceMaxValue ){
                        $("#dialogbox5").show();
                        $("#errorMsgMinMaxValidation").html('Reference min value should be lower than max value');
                        $("#dialogbox5").delay(4000).fadeOut();
                    }
                    // else if (){
                    //     $("#dialogbox6").show();
                    //     $("#errorMsgMinMaxValidation2").html('Reference min value can not be equal to max value');
                    //     $("#dialogbox6").delay(4000).fadeOut();
                    // }
                    else if (units == null) {
                        $("#dialogbox4").show();
                        $("#errorMsgunits").html('Units is mandatory');
                        $("#dialogbox4").delay(4000).fadeOut();
                    }
                   
                    else {
                        // console.log("id in test details" + pat_id)
                        var test_details_data =
                        {
                            "patient": pat_id,
                            "attribute": attribute,
                            "referenceminvalue": referenceMinValue,
                            "referencemaxvalue": referenceMaxValue,
                            "units": units,

                        }

                        lab_test_details(test_details_data, function (data, status) {
                            if (status == "success") {
                                $("#attribute").val(null);
                                $("#referenceMinValue").val("");
                                $("#referenceMaxValue").val("");
                                $("#units").val(null)
                                load_cbc();

                                dlg.dialog("close");
                            }
                            // console.log(data)
                        });
                    }
                }
                if (type === 'Edit') {
                    get_cbc_labtest_data_for_edit(row);
                    delete (config.buttons['Create']);
                    config.buttons['Save'] = function () {
                        edit_cbc_labtest_data(cbc_id)
                        row.remove();
                    };
                    config.buttons['Cancel'] = function () {
                        dlg.dialog("close");
                        $("#attribute").val(null);
                        $("#referenceMinValue").val("");
                        $("#referenceMaxValue").val("");
                        $("#units").val(null)
                        load_cbc();
                    };
                }
                dlg.dialog(config);
                function get_cbc_labtest_data_for_edit(row) {
                    // alert("test");
                    $("#attribute").val($(row.children().find('span').get(1)).text());
                    // console.log("attribute value ::"+$(row.children().find('span').get(1)).text())
                    // var referenceTOtalValue = $(row.children().find('span').get(2)).text()
                    $("#referenceMinValue").val($(row.children().find('span').get(2)).text());
                    $("#referenceMaxValue").val($(row.children().find('span').get(3)).text());
                    $("#units").val($(row.children().find('span').get(4)).text())
                }
                function edit_cbc_labtest_data(cbc_id) {
                   
                    
                    var attribute = $("#attribute").val()
                
                    var referenceMinValue = $("#referenceMinValue").val()
                    var referenceMaxValue = $("#referenceMaxValue").val()
                    var units = $("#units").val()
        
                    var test_details_edit_data = {

                        "id":cbc_id,
                        "attribute": attribute,
                        "referenceminvalue": referenceMinValue,
                        "referencemaxvalue": referenceMaxValue,
                        "units": units,
                        
                    }
                    // console.log(test_details_edit_data,'ddddddddddddddddddd')
                    update_cbc_labtest_data(test_details_edit_data, function (data, status) {
                        if (status == "success") {
                            // alert("updated sucessfully")    
                            $("#attribute").val(null);
                            $("#referenceMinValue").val("");
                            $("#referenceMaxValue").val("");
                            $("#units").val(null)
                            load_cbc();
                          dlg.dialog("close");
                        }
                    });
                }
            }
            $("#test-details-form").hide();
            $(".test-details-add-form").button().click( function(){
                new_dialog(pat_id);
            });
            $(document).on('click', 'td a.cbctestdetailsedit', function () {
                new_dialog( $(this).parents('tr'), $(this).data('id'),'Edit');
                return false;
            });
            
        });
        
    }
    
    $(document).on('click', 'a.cbctestdelete', function () {
        var r = confirm("Click OK to confirm delete ");
        if (r == true) {
           
            id = $(this).data('id');
            delete_cbc_labtest_data(id, function (data, status) {
                load_cbc();
            });
            return false;
        }
        else {
            return true;
        }
        
    });
    load_cbc();
});