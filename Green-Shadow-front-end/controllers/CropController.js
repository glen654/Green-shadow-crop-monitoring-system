$(document).ready(function () {
    fetchFieldNames();
})

function saveCrop(){
    const formData = new FormData();

    formData.append("commonName", $("#crop_common_name").val());
    formData.append("scientificName", $("#crop_scientific_name").val());
    formData.append("cropImage", $("#crop_image")[0].files[0]);
    formData.append("category", $("#category").val());
    formData.append("season", $("#crop_season").val());
    formData.append("fieldDTO", $("field_details").val());

    $.ajax({
        url:" http://localhost:8080/green-shadow/api/v1/crop",
        method: "POST",
        contentType: false,
        processData: false,
        data: formData,
        success: function (result){
            clearFields();
            console.log(result);
            alert("Crop Save Successfull");
        },
        error: function (result){
            clearFields();
            console.log(result);
            alert("Crop Save Unsuccessfull");
        }
    });
}

function fetchFieldNames(){
    $.ajax({
        url: " http://localhost:5050/green-shadow/api/v1/field/getallfieldnames",
        type: "GET",
        contentType: "application/json",
        success: function (response){
            console.log('Field name: ', response);
            
            response.forEach(field => {
                console.log(field);
                $("#field-details").append(
                    $('<option>', {value: field, text: field})
                );
            });
        },
        error: function (xhr, status, error){
            console.error('Error fetching field names:', status, error);
            
        }
    });
}

function clearFields(){
    $("#crop_common_name").val('');
    $("#crop_scientific_name").val('');
    $("#crop_image").val('');
    $("#category").val('');
    $("#crop_season").val('');
    $("#field_details").val('');
}