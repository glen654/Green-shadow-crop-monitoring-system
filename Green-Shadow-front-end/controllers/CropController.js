function saveCrop(){
    const formData = new FormData();

    formData.append("common_name", $("#crop_common_name").val());
    formData.append("scientific_name", $("#crop_scientific_name").val());
    formData.append("crop_image", $("#crop_image")[0].files[0]);
    formData.append("category", $("#crop_category").val());
    formData.append("season", $("#crop_season").val());
    formData.append("field_name", $("#field_details").val());

    $.ajax({
        url:" http://localhost:5050/green-shadow/api/v1/crop",
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

function clearFields(){
    $("#crop_common_name").val('');
    $("#crop_scientific_name").val('');
    $("#crop_image").val('');
    $("#crop_category").val('');
    $("#crop_season").val('');
}