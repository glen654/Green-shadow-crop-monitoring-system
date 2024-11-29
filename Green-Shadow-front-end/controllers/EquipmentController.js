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