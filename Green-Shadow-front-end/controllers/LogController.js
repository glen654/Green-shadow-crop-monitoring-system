$(document).ready(function () {
    fetchCropNames();
    fetchStaffNames();
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

function fetchStaffNames(){
    $.ajax({
        url: " http://localhost:5050/green-shadow/api/v1/staff/getallstaffnames",
        type: "GET",
        contentType: "application/json",
        success: function (response){
            console.log('Staff name: ', response);

            $("#log_staff_details").empty().append(
                $('<option>', { value: "", text: "Select Staff Member" })
            );
            
            response.forEach(staff => {
                console.log(staff);
                $("#log_staff_details").append(
                    $('<option>', {value: staff, text: staff})
                );
            });
        },
        error: function (xhr, status, error){
            console.error('Error fetching staff member names:', status, error);
            
        }
    });
}


function saveLog(){
    
}