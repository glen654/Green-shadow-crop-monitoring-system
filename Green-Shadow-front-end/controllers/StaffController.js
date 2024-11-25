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
    var field_name = $("#field_name").val();
    var vehicle_name = $("#vehicle_name").val();

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
            "fields": field_name,
            "vehicles": vehicle_name
        }),
        success: function (result){
            console.log(result);
            alert("Staff member successfully saved");
        },
        error: function (result){
            alert("Staff member save unsuccessfull");
            console.log(result);
        }
    });
}