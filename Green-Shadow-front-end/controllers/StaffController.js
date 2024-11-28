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
    var vehicle_name = $("#vehicle_name").val();
    
    const fields = field_name ? [{ field_name: field_name }] : [];

    const vehicles = vehicle_name ? [{ vehicle_name: vehicle_name }] : [];

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
            "fields": fields,
            "vehicles": vehicles
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