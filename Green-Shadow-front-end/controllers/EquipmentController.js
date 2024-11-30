$(document).ready(function() {
    loadEquipment();
});

function loadEquipment(){
    $.ajax({
        url: 'http://localhost:5050/green-shadow/api/v1/equipment',
        type: 'GET',           
        contentType: 'application/json', 
        success: function(equipment) {
            console.log("Equipment loaded:", equipment);
            $("#equipment-table").empty();
            
            equipment.forEach(function(equipment) {
                var record = `
                    <tr>
                        <td class="equip-name-value">${equipment.name}</td>
                        <td class="equip-type-value">${equipment.type}</td>
                        <td class="equip-status-value">${equipment.status}</td>
                        <td class="equip-staff-value">${equipment.assigned_staff.first_name}</td>
                        <td class="equip-field-value">${equipment.assigned_field.field_name}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#equipment-table").append(record);
            });
        },
        error: function(xhr, status, error) {
            console.error("Failed to load equipment:", error);
            alert("An error occurred while loading the equipment data.");
        }
    });
}


function saveEquipment(){
    var equipment_name = $("#equipment_name").val();
    var equipment_type = $("#equipment_type").val();
    var equipment_status = $("#equipment_status").val();
    var assigned_staff = $("#equip_staff_details").val();
    var assigned_field = $("#equip_field_details").val();

    $.ajax({
        url: " http://localhost:5050/green-shadow/api/v1/equipment",
        type: "POST",
        contentType: 'application/json',
        "data":JSON.stringify({
            "name": equipment_name,
            "type": equipment_type,
            "status": equipment_status,
            "remarks": remarks,
            "assigned_staff": {
                "first_name": assigned_staff
            },
            "assigned_field": {
                "field_name": assigned_field
            }
        }),
        success: function (result){
            clearEquipForm();
            console.log(result);
            alert("Equipment successfully saved");
        },
        error: function (result){
            clearEquipForm();
            alert("Equipment save unsuccessfull");
            console.log(result);
        }
    });
}

function clearEquipForm(){
    $("#equipment_name").val('');
    $("#equipment_type").val('');
    $("#equipment_status").val('');
    $("#equip_staff_details").val('');
    $("#equip_field_details").val('');
}