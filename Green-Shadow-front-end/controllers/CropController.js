$(document).ready(function() {
    loadCrops();
});

function loadCrops(){
    $.ajax({
        url: 'http://localhost:5050/green-shadow/api/v1/crop',
        type: 'GET',           
        contentType: 'application/json', 
        success: function(crops) {
            console.log("Crops loaded:", crops);
            $("#crop-table").empty();
            
            crops.forEach(function(crop) {
                var record = `
                    <tr>
                        <td class="crop-image-value">
                            <img src="data:image/png;base64,${crop.crop_image}" alt="Field Image 1" style="width: 100px; height: 100px; object-fit: cover;">
                        </td>
                        <td class="crop-name-value">${crop.common_name}</td>
                        <td class="crop-scientific-value">${crop.scientific_name}</td>
                        <td class="crop-category-value">${crop.category}</td>
                        <td class="crop-season-value">${crop.season}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#crop-table").append(record);
            });
        },
        error: function(xhr, status, error) {
            console.error("Failed to load crops:", error);
            alert("An error occurred while loading the crop data.");
        }
    });
}

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