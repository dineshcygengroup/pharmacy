/* patientinformation*/
$(function () {
    load_patientinformation = function(){
        get_patientinformation_data(function(data, status) {
            console.log("***pinformation*****");
            var patientinformation_view = ""
                console.log(data)
                patientinformation_view += '<tbody style="border:5px">';
                    patientinformation_view += '<tr>';
                    patientinformation_view += '<td><span style="color:#017b8b";>Patient Name </span>:<span>'+ data.first_name +'</span><span>'+ data.last_name + '</span></td>' ;
                    patientinformation_view += '<td><span style="color:#017b8b";>Email </span>:<span>'+ data.email + '</span></td>';
                    patientinformation_view += '<td><span style="color:#017b8b";>Phone </span>:<span>'+ data.phne+ '</span></td>';
                    patientinformation_view += '<td><span style="color:#017b8b";>Gender </span>:<span>'+ data.gender+ '</span></td>' ;
                    patientinformation_view += '<td><span style="color:#017b8b";>DOB: </span>:<span>'+ data. dob+ '</span></td>' ;
                    patientinformation_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="piedit">Edit</a></td>';
                    patientinformation_view += '</tr>';

                patientinformation_view += '</tbody>';

                $("#information").html(patientinformation_view)

        });
    }

});

/*personal*/
$(function () {
    load_patientpersonal = function(){
        get_patientpersonalprofile_data(function(data, status) {
            console.log("********");
            var patientpersonal_view = ""
                console.log(data)
                patientpersonal_view += '<tbody style="border:5px">';
                    patientpersonal_view += '<tr>';
                    patientpersonal_view += '<td><span style="color:#017b8b";>Occupation </span>:<span>'+ data. occupation+ '</span></td>' ;
                    patientpersonal_view += '<td><span style="color:#017b8b";>Blood group </span>:<span>'+ data.bloodgroup + '</span></td>';
                    patientpersonal_view += '<td><span style="color:#017b8b";>Maritial Status </span>:<span>'+ data.m_status + '</span></td>';
                    patientpersonal_view += '<td><span style="color:#017b8b";>Ethnicity </span>:<span>'+ data.ethinicity+ '</span></td>';
                    patientpersonal_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="ppedit">Edit</a></td>';
                    patientpersonal_view += '</tr>';

                patientpersonal_view += '</tbody>';

                $("#patientpersonaldetails").html(patientpersonal_view)

        });
    }

});

/*contact*/
$(function () {
    load_patientcontact = function(){
        get_patientcontact_data(function(data, status) {
            console.log("********");
            console.log(data)
            var patientcontact_view = ""
                console.log(data)
                patientcontact_view += '<tbody style="border:5px">';
                    patientcontact_view += '<tr>';
                    patientcontact_view += '<td><span style="color:#017b8b";>Address </span>:<span>'+ data.address+ '</span></td>' ;
                    patientcontact_view += '<td><span style="color:#017b8b";>City </span>:<span>'+ data.city + '</span></td>';
                    patientcontact_view += '<td><span style="color:#017b8b";>State </span>:<span>'+ data.state + '</span></td>';
                    patientcontact_view += '<td><span style="color:#017b8b";>Country </span>:<span>'+ data.country+ '</span></td>';
                    patientcontact_view += '<td><span style="color:#017b8b";>Zip Code </span>:<span>'+ data.zipcode + '</span></td>';
                    patientcontact_view += '<td><span style="color:#017b8b";>Contact </span>:<span>'+ data.emergencycontact + '</span></td>';
                    patientcontact_view += '<td><span style="color:#017b8b";>Notes</span>:<span>'+ data.notes+ '</span></td>';
                    patientcontact_view += '<td><a href="javascript:void(0)" data-id="' + data.id + '" class="pcedit">Edit</a></td>';
                    patientcontact_view += '</tr>';
                patientcontact_view += '</tbody>';

                $("#patientcontactdetails").html(patientcontact_view)

        });
    }

});

/*alternatecontact*/
$(function () {
    load_alternatecontact = function(){
        get_alternatecontact_data(function(data, status) {
            console.log("********");
            console.log(data)
            var alternatecontact_view = ""
            if (data.length >= 0) {
                console.log(data)
                alternatecontact_view += '<tbody style="border:5px">';
                //"id":1,"alergytype":"hhhh","allergien":"mecodican allergy","reaction":
                for (var i = 0; i < data.length; i++) {
                    var alr = data[i]
                    alternatecontact_view += '<tbody style="border:5px">';
                    alternatecontact_view += '<tr>';
                    alternatecontact_view += '<td><span style="color:#017b8b";>Name </span>:<span>'+ alr.fullname+ '</span></td>' ;
                    alternatecontact_view += '<td><span style="color:#017b8b";>Relation </span>:<span>'+ alr.relativedby + '</span></td>';
                    alternatecontact_view += '<td><span style="color:#017b8b";>Contact </span>:<span>'+ alr.contactdetails + '</span></td>';
                   // alternatecontact_view += '<td><a href="javascript:void(0)" data-id="' + alr.id + '" class="paedit">Edit</a></td>';
                                        alternatecontact_view += '<td><hr></td>';
                    alternatecontact_view += '</tr>';
                }
                    alternatecontact_view += '</tbody>';

                $("#alternatecontact").html(alternatecontact_view)
            }

        });
    }

});

