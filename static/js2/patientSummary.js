/* #opdPatientName, #opdPatientMail, #opdPatientAge, #opdPatientGender, #opdPatientAddress, #vitals */
$(function () {

get_vital_data(function (data, status) {
console.log("********");

var vital_view = ""

if (data.length >= 0) {
console.log(data)
vital_view += '<div style="border:5px">';
for (var i = 0; i < data.length; i++) {
var alr = data[i]

vital_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
vital_view += '<ul>';
vital_view += '<li style="font-size:13px"><span style="color:#222222;">Height:</span><span >' + alr.height + '' + '</span>\'<span>' + alr.height_inch + '</span>\"</li>';
vital_view += '<li style="font-size:13px"><span style="color:#222222; ">Weight:</span><span>' + alr.weight+'/Kg' + '</span></li>';
vital_view += '<li style="font-size:13px"><span style="color:#222222;">Temp:</span><span>' + alr.temprature+'°C' + '</span></li>';

vital_view += '</ul>';
vital_view += '</div>';
vital_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
vital_view += '<ul>';
vital_view += '<li style="font-size:13px" ><span style="color:#222222; ">BP :</span><span>' + alr.systolicbp+'/'+ alr.diastolicbp +' mm-Hg'+ '</span></li>';
// vital_view += '<li style="font-size:13px" ><span style="color:#222222; ">Diastolic BP(mm-Hg):</span><span>' + alr.diastolicbp + '</span></li>';
vital_view += '<li style="font-size:13px"><span style="color:#222222; ">HR :</span><span>' + alr.heartrate+'/min' + '</span></li>';
vital_view += '<li style="font-size:13px" ><span style="color:#222222; ">SPO<sub>2</sub>:</span><span>' + alr.oxisaturation+ '%' + '</span></li>';

vital_view += '</ul>';
vital_view += '</div>';
vital_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
vital_view += '<ul>';

vital_view += '<li style="font-size:13px"><span style="color:#222222; ">Glucose:</span><span>' + alr.glucose+' mg/dl' + '</span></li>';
vital_view += '<li style="font-size:13px"><span style="color:#222222; ">RR :</span><span>' + alr.resporitoryrate+'/min' + '</span></li>';
vital_view += '<li style="font-size:13px"><span style="color:#222222; ">Created On :</span><span>' + alr.created_date + '</span></li>';

vital_view += '</ul>';

vital_view += '</div>';

}
vital_view += '</div>';

$("#patientVitals").html(vital_view)
}
});


});

/* #problems*/
$(function () {
// var load_problems=function(){
get_problems_data(function (data, status) {
console.log("********");
var problems_view = ""

if (data.length >= 0) {
console.log(data)
problems_view += '<div style="border:5px">';

for (var i = 0; i < data.length; i++) {
var alr = data[i]
problems_view += '<div style="float: left; width: 33%;padding: 10px;height: 80px;">';
problems_view += '<ul>';
problems_view += '<li style="font-size:13px"><span style="color:#222222; ">Diagnosis:</span><span >' + alr.problems + '</span></li>';

problems_view += '</ul>';
problems_view += '</div>';
problems_view += '<div style="float: left; width: 33%;padding: 10px;height: 80px;">';
problems_view += '<ul>';
problems_view += '<li style="font-size:13px"><span style="color:#222222; ">Description:</span><span >' + alr.description + '</span></li>';
problems_view += '</ul>';
problems_view += '</div>';
problems_view += '<div style="float: left; width: 33%;padding: 10px;height: 80px;">';
problems_view += '<ul>';
problems_view += '<li style="font-size:13px"><span style="color:#222222; ">From date:</span><span >' + alr.fromdate + '</span></li>';
problems_view += '</ul>';
problems_view += '</div>';
}
problems_view += '</div>';

$("#patientProblems").html(problems_view)
}
});
});

/ #procedure /
$(function () {
get_procedure_data(function (data, status) {
console.log("********");
var procedure_view = ""
if (data.length >= 0) {
console.log(data)
procedure_view += '<div style="border:5px">';
for (var i = 0; i < data.length; i++) {
var alr = data[i]
procedure_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
procedure_view += '<ul>';
procedure_view += '<li style="font-size:13px"><span style="color:#222222; ">Procedure Code Type:</span><span>' + alr.procedurecodetype + '</span></li>';
//procedure_view += '<li style="font-size:13px"><span style="color:#222222;";></span><span>' + alr.created_date + '</span></li>';
procedure_view += '</ul>';
procedure_view += '</div>';
procedure_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
procedure_view += '<ul>';
procedure_view += '<li style="font-size:13px"><span style="color:#222222; "; >Procedure Code:</span><span>' + alr.procedurecode + '</span></li>';
procedure_view += '</ul>';
procedure_view += '</div>';
procedure_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
procedure_view += '<ul>';
procedure_view += '<li style="font-size:13px"><span style="color:#222222; ";>Procedure:</span><span>' + alr.procedure + '</span></li>';
procedure_view += '</ul>';
procedure_view += '</div>';
}
procedure_view += '</div>';

$("#patientProcedure").html(procedure_view)
}
});
});

/ #diagnosticlab /
$(function () {
// load_labtests = function(){
get_diagnostic_data(function (data, status) {
console.log("********");

var diagnostic_view = ""

if (data.length >= 0) {
console.log(data)
diagnostic_view += '<div style="border:5px">';
for (var i = 0; i < data.length; i++) {
var alr = data[i]
diagnostic_view += '<div style="float: left; width: 33%;padding: 10px;height: 80px;">';
diagnostic_view += '<ul>';
diagnostic_view += '<li style="font-size:13px"><span style="color:#222222; ">Test Name:</span><span>' + alr.testcode + '</span></li>';
//diagnostic_view += '<li style="font-size:13px"><span style="color:#222222;";>Date:</span><span>' + alr.created_date + '</span></li>';

diagnostic_view += '</ul>';
diagnostic_view += '</div>';

diagnostic_view += '<div style="float: left; width: 33%;padding: 10px;height: 80px;">';
diagnostic_view += '<ul>';
diagnostic_view += '<li style="font-size:13px"><span style="color:#222222; ">Note:</span><span>' + alr.notes + '</span></li>';
diagnostic_view += '</ul>';
diagnostic_view += '</div>';
diagnostic_view += '<div style="float: left; width: 33%;padding: 10px;height: 80px;">';
//diagnostic_view += '<ul>';
//diagnostic_view += '<li style="font-size:13px"><span style="color:#222222; ">Result:</span><span>' + alr.resultumber + '</span>-<span>' + alr.resultunit + '</span></li>';
//diagnostic_view += '</ul>';
diagnostic_view += '</div>';

}
diagnostic_view += '</div>';

$("#patientDiagnosticlab").html(diagnostic_view)
}
});

});

/ #medications /
$(function () {
// var load_medications = function(){
get_medications_data(function (data, status) {
console.log("********");
var medications_view = ""
if (data.length >= 0) {
console.log(data)
medications_view += '<div style="border:5px">';

for (var i = 0; i < data.length; i++) {
var alr = data[i]
var medname = alr.medicinname;
var res = medname.split(':');
medications_view += '<div style="float: left; width: 100%;padding-bottom: 5px;">';
medications_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
medications_view += '<ul>';
medications_view += '<li style="font-size:13px"><span style="color:#222222;">Medicine name:</span><span>' + alr.medicinname + '</span></li>';
medications_view += '<li style="font-size:13px"><span style="color:#222222;">Dosage:</span><span>' + alr.doesage + '</span></li>';
medications_view += '<li style="font-size:13px"><span style="color:#222222;">Quantity:</span><span>' + alr.quantity + '</span></li>';
medications_view += '</ul>';
medications_view += '</div>';
medications_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
medications_view += '<ul>';
medications_view += '<li style="font-size:13px"><span style="color:#222222;">Start date:</span><span>' + alr.startdate + '</span></li>';
medications_view += '<li style="font-size:13px"><span style="color:#222222;">End date:</span><span>' + alr.enddate + '</span></li>';
medications_view += '<li style="font-size:13px"><span style="color:#222222;">Usage Directions:</span><span>' + alr.usagedirections + '</span></li>';
medications_view += '</ul>';
medications_view += '</div>';
medications_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
medications_view += '<ul>';
medications_view += '<li style="font-size:13px"><span style="color:#222222;">Refills:</span><span>' + alr.refills + '</span></li>';
medications_view += '<li style="font-size:13px"><span style="color:#222222;">Label of Medicine:</span><span>' + alr.labelofmedication + '</span></li>';
medications_view += '<li style="font-size:13px"><span style="color:#222222;">Note:</span><span>' + alr.notes + '</span></li>';
medications_view += '</ul>';
medications_view += '</div>';
medications_view += '</div>';
}
medications_view += '</div>';

$("#patientMedications").html(medications_view)
}
});

});
$(function () {
get_vaccine_data(function (data, status) {
console.log("********");
var vaccine_view = ""
if (data.length >= 0) {
console.log(data)
vaccine_view += '<div style="border:5px">';
for (var i = 0; i < data.length; i++) {
var alr = data[i]
vaccine_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
vaccine_view += '<ul>';
vaccine_view += '<li style="font-size:13px"><span style="color:#222222; ">Vaccine Code:</span><span>' + alr.vaccinecode + '</span></li>';
//vaccine_view += '<li style="font-size:13px"><span style="color:#222222;";></span><span>' + alr.created_date + '</span></li>';

vaccine_view += '</ul>';
vaccine_view += '</div>';
vaccine_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
vaccine_view += '<ul>';
vaccine_view += '<li style="font-size:13px"><span style="color:#222222; ">Taken date:</span><span>' + alr.takendate + '</span></li>';
vaccine_view += '</ul>';
vaccine_view += '</div>';
vaccine_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
vaccine_view += '<ul>';
vaccine_view += '<li style="font-size:13px"><span style="color:#222222; ">Note:</span><span>' + alr.notes + '</span></li>';
vaccine_view += '</ul>';
vaccine_view += '</div>';
}
vaccine_view += '</div>';

$("#patientVaccine").html(vaccine_view)
}
});
});

/ #note /
$(function () {
get_note_data(function (data, status) {
console.log("********");
var note_view = ""

if (data.length >= 0) {
console.log(data)
note_view += '<div style="border:5px">';
for (var i = 0; i < data.length; i++) {
var alr = data[i]
note_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
note_view += '<ul>';
note_view += '<li style="font-size:13px"><span style="color:#222222;";></span><span>' + alr.notes + '</span></li>';
//note_view += '<li style="font-size:13px"><span style="color:#222222;";></span><span>' + alr.created_date + '</span></li>';

note_view += '</ul>';
note_view += '</div>';
}
note_view += '</div>';

$("#patientNote").html(note_view)
}
});
// }
// load_note();
});

/ #visitreason /
$(function () {
// load_visitreason = function(){
get_visitreason_data(function (data, status) {
console.log("********");
var visitreason_view = ""
if (data.length >= 0) {
console.log(data)
visitreason_view += '<div style="border:5px">';
for (var i = 0; i < data.length; i++) {
var alr = data[i]

visitreason_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
visitreason_view += '<ul>';

visitreason_view += '<li style="font-size:13px" ><span style="color:#222222;";>Description:</span><span>' + alr.description + '</span></li>';
//visitreason_view += '<li style="font-size:13px"><span style="color:#222222;";></span><span>' + alr.created_date + '</span></li>';
visitreason_view += '</ul>';
visitreason_view += '</div>';
}
visitreason_view += '</div>';

$("#patientVisitreason").html(visitreason_view)
}
});
// }
// load_visitreason();
});

/ #refferal /

$(function () {
// load_refferel= function(){
get_refferel_data(function (data, status) {
console.log("********");
var refferel_view = ""

if (data.length >= 0) {
console.log(data)
refferel_view += '<div style="border:5px">';

for (var i = 0; i < data.length; i++) {
var alr = data[i]
refferel_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
refferel_view += '<ul>';
refferel_view += '<li style="font-size:13px"><span style="color:#222222; ";>Doctor Name:</span><span>' + alr.doctorname + '</span></td>';
refferel_view += '<li style="font-size:13px"><span style="color:#222222;";>Doctor Summary:</span><span>' + alr.doctornote + '</span></td>';

refferel_view += '</ul>';
refferel_view += '</div>';
refferel_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
refferel_view += '</ul>';

refferel_view += '<li style="font-size:13px"><span style="color:#222222; ";>Doctor Contact:</span><span>' + alr.doctorcontact + '</span></td>';
refferel_view += '</ul>';
refferel_view += '</div>';
refferel_view += '<div style="float: left; width: 33%;padding: 10px;height: auto;">';
refferel_view += '<ul>';
refferel_view += '<li style="font-size:13px"><span style="color:#222222; "; >Doctor Email:</span><span>' + alr.doctoremail + '</span></td>';
refferel_view += '</div>';
refferel_view += '<ul>';
}
refferel_view += '</div>';

$("#patientRefferel").html(refferel_view)
}
});
// }
// load_refferel();
});



//patient information
$(function () {
get_patientpersonal_data(function (data, status) {
var opdPatientName = "";


 
           
            opdPatientName += '<tbody style="border:5px">';
            opdPatientName += '<tr>';
            opdPatientName += '<td style="font-size:13px"><span style="color:#222222; font-size: 15px";>Name:</span><span>' + data.pat.first_name+ ' ' + data.pat.middle_name + ' ' + data.pat.last_name + '</span></td>';
            opdPatientName += '</tr>';
            opdPatientName += '</tbody>';
            console.log("Himavanth PAtient details");
      

$("#opdPatientName").html(opdPatientName)



var opdPatientAge = "";


            opdPatientAge += '<tbody style="border:5px">';
            opdPatientAge += '<tr>';
            opdPatientAge += '<td style="font-size:13px"><span style="color:#222222; font-size: 15px";>Age:</span><span>' + data.age + '</span></td>';
            opdPatientAge += '</tr>';
            console.log("Himavanth PAtient details");
            opdPatientAge += '</tbody>';
            
$("#opdPatientAge").html(opdPatientAge)


var opdPatientMail = "";

if (data) {
opdPatientMail += '<tbody style="border:5px">';

opdPatientMail += '<tr>';
opdPatientMail += '<td style="font-size:13px"><span style="color:#222222; font-size: 15px";>Email:</span><span>' + data.pat.email + '</span></td>';
opdPatientMail += '</tr>';
console.log("Himavanth PAtient details");
opdPatientMail += '</tbody>';

$("#opdPatientMail").html(opdPatientMail)
}

var opdPatientGender = "";

if (data) {
opdPatientGender += '<tbody style="border:5px">';

opdPatientGender += '<tr>';
opdPatientGender += '<td style="font-size:13px"><span style="color:#222222; font-size: 15px";>Gender:</span><span>' + data.pat.gender + '</span></td>';
opdPatientGender += '</tr>';
console.log("Himavanth PAtient details");
opdPatientGender += '</tbody>';

$("#opdPatientGender").html(opdPatientGender)
}

var opdPatientAddress = "";

if (data) {
opdPatientAddress += '<tbody style="border:5px">';
opdPatientAddress += '<tr>';
opdPatientAddress += '<td style="font-size:13px"><span style="color:#222222; font-size: 15px";>Address:</span><span>' + data.address+' '+data.address2 + ', ' + data.city + ', ' + data.state + '</span></td>';
opdPatientAddress += '</tr>';
// }
opdPatientAddress += '</tbody>';

$("#opdPatientAddress").html(opdPatientAddress)
}

});


//patient information ends here
});