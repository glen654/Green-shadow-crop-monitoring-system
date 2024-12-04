$(document).ready(function () {
  loadStaff();
});

var recordIndex;

function loadStaff() {
  $.ajax({
    url: "http://localhost:5050/green-shadow/api/v1/staff",
    type: "GET",
    contentType: "application/json",
    success: function (staff) {
      console.log("Staff loaded:", staff);
      $("#staff-table").empty();

      staff.forEach(function (staff) {
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

      $("#staff-table").on("click", ".update-button", function () {
        const row = $(this).closest("tr");

        const fullName = row.find(".staff-name-value").text();
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");
        const staffDesignation = row.find(".staff-designation-value").text();
        const staffGender = row.find(".staff-gender-value").text();
        const staffJoinedDate = row.find(".staff-joinedDate-value").text();
        const staffDob = row.find(".staff-dob-value").text();
        const staffAddress = row.find(".staff-address-value").text();
        const staffContact = row.find(".staff-contact-value").text();
        const staffEmail = row.find(".staff-email-value").text();
        const staffRole = row.find(".staff-role-value").text();

        $("#first_name").val(firstName);
        $("#last_name").val(lastName);
        $("#designation").val(staffDesignation);
        $("#gender").val(staffGender);
        $("#joinedDate").val(staffJoinedDate);
        $("#dob").val(staffDob);
        $("#address").val(staffAddress);
        $("#contact").val(staffContact);
        $("#email").val(staffEmail);
        $("#role").val(staffRole);
      });

      $("#staff-table").on("click", ".delete-button", function () {
        const row = $(this).closest("tr");

        const fullName = row.find(".staff-name-value").text();
        const firstName = fullName.split(" ")[0];

        $.ajax({
          url: `http://localhost:5050/green-shadow/api/v1/staff/getstaffid/${firstName}`,
          method: "GET",
          success: function (id) {
            console.log("Fetched staff id:", id);

            $.ajax({
              url: `http://localhost:5050/green-shadow/api/v1/staff/${id}`,
              method: "DELETE",
              contentType: "application/json",
              success: function (results) {
                console.log(results);
                alert("Staff member Deleted");
                loadStaff();
              },
              error: function (error) {
                console.log("Status:", status);
                console.log("Error:", error);
                alert("staff member unsuccessful");
                loadStaff();
              },
            });
          },
          error: function (error) {
            alert("Error fetching staff id: " + error.responseText);
            console.error(error);
          },
        });
        
      });
    },
    error: function (xhr, status, error) {
      console.error("Failed to load staff:", error);
      alert("An error occurred while loading the staff data.");
    },
  });
}

function saveStaff() {
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
    contentType: "application/json",
    data: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      designation: designation,
      gender: gender,
      joined_date: joined_date,
      dob: dob,
      address: address,
      contact_no: contact,
      email: email,
      role: role,
      fields: fields,
    }),
    success: function (result) {
      clearStaffForm();
      console.log(result);
      alert("Staff member successfully saved");
      loadStaff();
    },
    error: function (result) {
      clearStaffForm();
      alert("Staff member save unsuccessfull");
      console.log(result);
      loadStaff();
    },
  });
}

function updateStaff() {
  var firstName = $("#first_name").val();
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
    url: `http://localhost:5050/green-shadow/api/v1/staff/getstaffid/${firstName}`,
    type: "GET",
    success: function (staffId) {
      console.log("Fetched staff id:", staffId);

      const updatedStaffData = {
        id: staffId,
        first_name: firstName,
        last_name: last_name,
        designation: designation,
        gender: gender,
        joined_date: joined_date,
        dob: dob,
        address: address,
        contact_no: contact,
        email: email,
        role: role,
        fields: fields,
      };

      $.ajax({
        url: `http://localhost:5050/green-shadow/api/v1/staff/${staffId}`,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(updatedStaffData),
        success: function () {
          clearStaffForm();
          alert("staff successfully updated");
          loadStaff();
        },
        error: function (error) {
          clearStaffForm();
          alert("staff update unsuccessful");
          console.error(error.responseText);
        },
      });
    },
    error: function (error) {
      alert("Error fetching staff id: " + error.responseText);
      console.error(error);
    },
  });
}

function clearStaffForm() {
  $("#first_name").val("");
  $("#last_name").val("");
  $("#designation").val("");
  $("#gender").val("");
  $("#joined_date").val("");
  $("#dob").val("");
  $("#address").val("");
  $("#contact").val("");
  $("#email").val("");
  $("#role").val("");
  $("#staff_field_details").val("");
  $("#vehicle_name").val("");
}
