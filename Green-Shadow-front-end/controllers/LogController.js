$(document).ready(function () {
    fetchCropNames();
})

function fetchCropNames(){
    $.ajax({
        url: " http://localhost:5050/green-shadow/api/v1/crop/getallcropnames",
        type: "GET",
        contentType: "application/json",
        success: function (response){
            console.log('Crop name: ', response);

            $("#log_crop_details").empty().append(
                $('<option>', { value: "", text: "Select Crop" })
            );
            
            response.forEach(crop => {
                console.log(crop);
                $("#log_crop_details").append(
                    $('<option>', {value: crop, text: crop})
                );
            });
        },
        error: function (xhr, status, error){
            console.error('Error fetching crop names:', status, error);
            
        }
    });
}


function saveLog(){
    const formData = new FormData();

    formData.append("logDate", $("#log_date").val());
    formData.append("logDetails", $("#log_desc").val());
    formData.append("observedImage", $("#log_image")[0].files[0]);
    formData.append("fields", $("#log_field_details").val());
    formData.append("crops", $("#log_crop_details").val());
    formData.append("staff", $("#log_staff_details").val());
    
    $.ajax({
        url:"http://localhost:5050/green-shadow/api/v1/log",
        method: "POST",
        contentType: false,
        processData: false,
        data: formData,
        success: function (result){
            console.log(result);
            alert("Log Save Successfull");
        },
        error: function (result){
            console.log(result);
            alert("Log Save Unsuccessfull");
        }
    });
}