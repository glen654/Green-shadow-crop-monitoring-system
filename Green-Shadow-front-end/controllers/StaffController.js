$(document).ready(function() {
    loadStaff();
});

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
                    <tr>
                        <td class="staff-name-value">${fullName}</td>
                        <td class="staff-designation-value">${staff.designation}</td>
                        <td class="staff-gender-value">${staff.gender}</td>
                        <td class="staff-joinedDate-value">${staff.joined_date}</td>
                        <td class="staff-dob-value">${staff.dob}</td>
                        <td class="staff-contact-value">${staff.contact_no}</td>
                        <td class="staff-email-value">${staff.email}</td>
                        <td class="staff-role-value">${staff.role}</td>
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
        },
        error: function (result){
            clearStaffForm();
            alert("Staff member save unsuccessfull");
            console.log(result);
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