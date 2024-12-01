$(document).ready(function() {
    loadStaff();
});

var recordIndex;

function loadStaff(){
    $.ajax({
        url: 'http://localhost:5050/green-shadow/api/v1/staff',
        type: 'GET',           
        contentType: 'application/json', 
        success: function(staff) {
            console.log("Staff loaded:", staff);
            $("#staff-table").empty();
            
            staff.forEach(function(staff) {
                const fullName = staff.first_name + " " + staff.last_name;
                var record = `
                    <tr style="cursor: pointer">
                        <td class="staff-name-value">${fullName}</td>
                        <td class="staff-designation-value">${staff.designation}</td>
                        <td class="staff-gender-value">${staff.gender}</td>
                        <td class="staff-joinedDate-value">${staff.joined_date}</td>
                        <td class="staff-dob-value">${staff.dob}</td>
                        <td class="staff-address-value">${staff.address}</td>
                        <td class="staff-contact-value">${staff.contact_no}</td>
                        <td class="staff-email-value">${staff.email}</td>
                        <td class="staff-role-value">${staff.role}</td>
                        <td class="staff-field-value">${staff.fields.field_name}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#staff-table").append(record);
            });
        },
        error: function(xhr, status, error) {
            console.error("Failed to load staff:", error);
            alert("An error occurred while loading the staff data.");
        }
    });
}

function saveStaff(){
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var designation = $("#designation").val();
    var gender = $("#gender").val();
    var joined_date = $("#joined_date").val();
    var dob = $("#dob").val();
    var address = $("#address").val();
    var contact = $("#contact").val();
    var email = $("#email").val();
    var role = $("#role").val();
    var field_name = $("#staff_field_details").val();
    
    const fields = field_name ? [{ field_name: field_name }] : [];

    $.ajax({
        url: " http://localhost:5050/green-shadow/api/v1/staff",
        type: "POST",
        contentType: 'application/json',
        "data":JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "designation": designation,
            "gender": gender,
            "joined_date": joined_date,
            "dob": dob,
            "address": address,
            "contact_no": contact,
            "email": email,
            "role": role,
            "fields": fields
        }),
        success: function (result){
            clearStaffForm();
            console.log(result);
            alert("Staff member successfully saved");
            loadStaff();
        },
        error: function (result){
            clearStaffForm();
            alert("Staff member save unsuccessfull");
            console.log(result);
            loadStaff();
        }
    });
}

$("#staff-table").on('click','tr',function (){
    let index = $(this).index();
    recordIndex = index;

    let fullName = $(this).find(".staff-name-value").text();
    let [firstName, lastName] = fullName.split(' ');
    let designation = $(this).find(".staff-designation-value").text();
    let gender = $(this).find(".staff-gender-value").text();
    let joined_date = $(this).find(".staff-joinedDate-value").text();
    let dob = $(this).find(".staff-dob-value").text();
    let address = $(this).find(".staff-address-value").text();
    let contact = $(this).find(".staff-contact-value").text();
    let email = $(this).find(".staff-email-value").text();
    let role = $(this).find(".staff-role-value").text();
    let field = $(this).find(".staff-field-value").text();

    $("#first_name").val(firstName);
    $("#last_name").val(lastName);
    $("#designation").val(designation);
    $("#gender").val(gender);
    $("#joined_date").val(joined_date);
    $("#dob").val(dob);
    $("#address").val(address);
    $("#contact").val(contact);
    $("#email").val(email);
    $("#role").val(role);
    $("#staff_field_details").val(field);
});

function updateStaff(){
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var designation = $("#designation").val();
    var gender = $("#gender").val();
    var joined_date = $("#joined_date").val();
    var dob = $("#dob").val();
    var address = $("#address").val();
    var contact = $("#contact").val();
    var email = $("#email").val();
    var role = $("#role").val();
    var field_name = $("#staff_field_details").val();

    const fields = field_name ? [{ field_name: field_name }] : [];

    const url = `http://localhost:5050/green-shadow/api/v1/staff/${first_name}`;

    $.ajax({
        url: url,
        type: "PATCH",
        contentType: 'application/json',
        "data":JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "designation": designation,
            "gender": gender,
            "joined_date": joined_date,
            "dob": dob,
            "address": address,
            "contact_no": contact,
            "email": email,
            "role": role,
            "fields": fields
        }),
        success: function (result){
            clearStaffForm();
            console.log(result);
            alert("Staff member successfully updated");
            loadStaff();
        },
        error: function (result){
            clearStaffForm();
            alert("Staff member update unsuccessfull");
            console.log(result);
            loadStaff();
        }
    });
}

function clearStaffForm() {
    $("#first_name").val('');
    $("#last_name").val('');
    $("#designation").val('');
    $("#gender").val('');
    $("#joined_date").val('');
    $("#dob").val('');
    $("#address").val('');
    $("#contact").val('');
    $("#email").val('');
    $("#role").val('');
    $("#staff_field_details").val('');
    $("#vehicle_name").val('');
}