$(document).ready(function() {
    loadVehicle();
});

var recordIndex;

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
                    <tr style="cursor: pointer">
                        <td class="vehicle-license-value">${vehicle.licensePlateNumber}</td>
                        <td class="vehicle-category-value">${vehicle.vehicleCategory}</td>
                        <td class="vehicle-fuel-value">${vehicle.fuelType}</td>
                        <td class="vehicle-status-value">${vehicle.status}</td>
                        <td class="vehicle-remarks-value">${vehicle.remarks}</td>
                        <td class="vehicle-staff-value">${vehicle.assigned_staff.first_name}</td>
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

$("#vehicle-table").on('click','tr',function (){
    let index = $(this).index();
    recordIndex = index;

    let license_plate_number = $(this).find(".vehicle-license-value").text();
    let category = $(this).find(".vehicle-category-value").text();
    let fuel_type = $(this).find(".vehicle-fuel-value").text();
    let status = $(this).find(".vehicle-status-value").text();
    let remarks = $(this).find(".vehicle-remarks-value").text();
    let staff = $(this).find(".vehicle-staff-value").text();

    $("#license_plate").val(license_plate_number);
    $("#category").val(category);
    $("#fuel_type").val(fuel_type);
    $("#status").val(status);
    $("#vehicle_staff_details").val(staff);
    $("#remarks").val(remarks);
    
});

function updateVehicle(){
    var licenseNumber = $("#license_plate").val();
    var vehicle_category = $("#category").val();
    var fuel_type = $("#fuel_type").val();
    var status = $("#status").val();
    var assigned_staff = $("#vehicle_staff_details").val();
    var remarks = $("#remarks").val();

    console.log(licenseNumber);
    console.log(vehicle_category);
    console.log(fuel_type);
    console.log(status);
    console.log(assigned_staff);
    console.log(remarks);
    

    const url = `http://localhost:5050/green-shadow/api/v1/vehicle/${licenseNumber}`;

    $.ajax({
        url: url,
        type: "PATCH",
        contentType: 'application/json',
        "data":JSON.stringify({
            "licensePlateNumber": licenseNumber,
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
            alert("Vehicle successfully updated");
            loadVehicle();
        },
        error: function (result){
            clearVehicleForm();
            alert("Vehicle update unsuccessfull");
            console.log(result);
            loadVehicle();
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