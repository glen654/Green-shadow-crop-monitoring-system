$(document).ready(function () {
  loadEquipment();
});

var recordIndex;

function loadEquipment() {
  $.ajax({
    url: "http://localhost:5050/green-shadow/api/v1/equipment",
    type: "GET",
    contentType: "application/json",
    success: function (equipment) {
      console.log("Equipment loaded:", equipment);
      $("#equipment-table").empty();

      equipment.forEach(function (equipment) {
        var record = `
                    <tr>
                        <td class="equip-name-value">${equipment.name}</td>
                        <td class="equip-type-value">${equipment.type}</td>
                        <td class="equip-status-value">${equipment.status}</td>
                        <td class="equip-staff-value">${equipment.assigned_staff.first_name}</td>
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
      $("#equipment-table").on("click", ".update-button", function () {
        const row = $(this).closest("tr");

        const equip_name = row.find(".equip-name-value").text();
        const equip_type = row.find(".equip-type-value").text();
        const equip_status = row.find(".equip-status-value").text();
        const equip_assigned_staff = row.find(".equip-staff-value").text();

        $("#equipment_name").val(equip_name);
        $("#equipment_type").val(equip_type);
        $("#equipment_status").val(equip_status);
        $("#equip_staff_details").val(equip_assigned_staff);
      });
    },
    error: function (xhr, status, error) {
      console.error("Failed to load equipment:", error);
      alert("An error occurred while loading the equipment data.");
    },
  });
}

function saveEquipment() {
  var equipment_name = $("#equipment_name").val();
  var equipment_type = $("#equipment_type").val();
  var equipment_status = $("#equipment_status").val();
  var assigned_staff = $("#equip_staff_details").val();
  var assigned_field = $("#equip_field_details").val();

  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/equipment",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      name: equipment_name,
      type: equipment_type,
      status: equipment_status,
      remarks: remarks,
      assigned_staff: {
        first_name: assigned_staff,
      },
      assigned_field: {
        field_name: assigned_field,
      },
    }),
    success: function (result) {
      clearEquipForm();
      console.log(result);
      alert("Equipment successfully saved");
    },
    error: function (result) {
      clearEquipForm();
      alert("Equipment save unsuccessfull");
      console.log(result);
    },
  });
}

function updateEquipment() {
  var equipmentName = $("#equipment_name").val();
  var equipment_type = $("#equipment_type").val();
  var equipment_status = $("#equipment_status").val();
  var assigned_staff = $("#equip_staff_details").val();
  var assigned_field = $("#equip_field_details").val();

  $.ajax({
    url: `http://localhost:5050/green-shadow/api/v1/equipment/getequipId/${equipmentName}`,
    type: "GET",
    success: function (equipmentId) {
      console.log("Fetched equip id:", equipmentId);

      const updatedEquipData = {
        equipment_id: equipmentId,
        name: equipment_name,
        type: equipment_type,
        status: equipment_status,
        assigned_staff: {
          first_name: assigned_staff,
        },
        assigned_field: {
          field_name: assigned_field,
        },
      };

      $.ajax({
        url: `http://localhost:5050/green-shadow/api/v1/equipment/${equipmentId}`,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(updatedEquipData),
        success: function () {
          clearEquipForm();
          alert("Equipment successfully updated");
          loadEquipment();
        },
        error: function (error) {
          clearEquipForm();
          alert("Equipment update unsuccessful");
          console.error(error.responseText);
        },
      });
    },
    error: function (error) {
      alert("Error fetching equipment id: " + error.responseText);
      console.error(error);
    },
  });
}

function clearEquipForm() {
  $("#equipment_name").val("");
  $("#equipment_type").val("");
  $("#equipment_status").val("");
  $("#equip_staff_details").val("");
  $("#equip_field_details").val("");
}
