function saveVehicle(){
    var license_plate_number = $("#license_plate").val();
    var vehicle_category = $("#category").val();
    var fuel_type = $("#fuel_type").val();
    var status = $("#status").val();
    var assigned_staff = $("#vehicle_staff_details").val();
    var remarks = $("#remarks").val();

    $.ajax({
        url: " http://localhost:5050/green-shadow/api/v1/vehicle",
        type: "POST",
        contentType: 'application/json',
        "data":JSON.stringify({
            "licensePlateNumber": license_plate_number,
            "vehicleCategory": vehicle_category,
            "fuelType": fuel_type,
            "status": status,
            "remarks": remarks,
            "assigned_staff": {
                "first_name": assigned_staff
            }
        }),
        success: function (result){
            clearVehicleForm();
            console.log(result);
            alert("Vehiclesuccessfully saved");
        },
        error: function (result){
            clearVehicleForm();
            alert("Vehicle save unsuccessfull");
            console.log(result);
        }
    });
}

function clearVehicleForm(){
    $("#license_plate").val('');
    $("#category").val('');
    $("#fuel_type").val('');
    $("#status").val('');
    $("#vehicle_staff_details").val('');
    $("#remarks").val('');
}