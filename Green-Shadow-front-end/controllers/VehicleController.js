$(document).ready(function() {
    loadVehicle();
});

function loadVehicle(){
    $.ajax({
        url: 'http://localhost:5050/green-shadow/api/v1/vehicle',
        type: 'GET',           
        contentType: 'application/json', 
        success: function(vehicle) {
            console.log("Vehicle loaded:", vehicle);
            $("#vehicle-table").empty();
            
            vehicle.forEach(function(vehicle) {
                var record = `
                    <tr>
                        <td class="vehicle-license-value">${vehicle.licensePlateNumber}</td>
                        <td class="vehicle-category-value">${vehicle.vehicleCategory}</td>
                        <td class="vehicle-fuel-value">${vehicle.fuelType}</td>
                        <td class="vehicle-status-value">${vehicle.status}</td>
                        <td class="vehicle-remarks-value">${vehicle.remarks}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#vehicle-table").append(record);
            });
        },
        error: function(xhr, status, error) {
            console.error("Failed to load vehicle:", error);
            alert("An error occurred while loading the vehicle data.");
        }
    });
}


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