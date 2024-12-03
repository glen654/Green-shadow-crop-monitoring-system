$(document).ready(function () {
  fetchCropNames();
  loadLogs()
});

function fetchCropNames() {
  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/crop/getallcropnames",
    type: "GET",
    contentType: "application/json",
    success: function (response) {
      console.log("Crop name: ", response);

      $("#log_crop_details")
        .empty()
        .append($("<option>", { value: "", text: "Select Crop" }));

      response.forEach((crop) => {
        console.log(crop);
        $("#log_crop_details").append(
          $("<option>", { value: crop, text: crop })
        );
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching crop names:", status, error);
    },
  });
}

function loadLogs(){
  $.ajax({
    url: "http://localhost:5050/green-shadow/api/v1/log",
    method: "GET",
    contentType: "application/json",
    success: function (log) {
      console.log("Logs loaded:", log);
      $("#log-table").empty();

      log.forEach(function (log) {
        var record = `
                    <tr style="cursor: pointer">
                        <td class="log-date-value">${log.log_date}</td>
                        <td class="log-details-value">${log.log_details}</td>
                        <td class="log-image-value">
                            <img src="data:image/png;base64,${log.observed_image}" alt="Field Image 1" style="width: 100px; height: 100px; object-fit: cover;">
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
        $("#log-table").append(record);
      });
    },
    error: function (xhr, status, error) {
      console.error("Failed to load logs:", error);
      alert("An error occurred while loading the log data.");
    },
  });
}

function saveLog() {
  const formData = new FormData();

  formData.append("logDate", $("#log_date").val());
  formData.append("logDetails", $("#log_desc").val());
  formData.append("observedImage", $("#log_image")[0].files[0]);
  formData.append("fields", $("#log_field_details").val());
  formData.append("crops", $("#log_crop_details").val());
  formData.append("staff", $("#log_staff_details").val());

  $.ajax({
    url: "http://localhost:5050/green-shadow/api/v1/log",
    method: "POST",
    contentType: false,
    processData: false,
    data: formData,
    success: function (result) {
      console.log(result);
      alert("Log Save Successfull");
      loadLogs();
    },
    error: function (result) {
      console.log(result);
      alert("Log Save Unsuccessfull");
    },
  });
}
