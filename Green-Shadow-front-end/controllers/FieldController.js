$(document).ready(function() {
    loadFields();
});

function loadFields(){
    $.ajax({
        url: 'http://localhost:5050/green-shadow/api/v1/field',
        type: 'GET',           
        contentType: 'application/json', 
        success: function(fields) {
            console.log("Fields loaded:", fields);
            $("#fields-table").empty();
            
            fields.forEach(function(field) {
                var record = `
                    <tr>
                        <td class="field-name-value">${field.field_name}</td>
                        <td class="extent-size-value">${field.extent_size}</td>
                        <td class="field-location-value">${field.location}</td>
                        <td class="field-image1-value">
                            <img src="data:image/png;base64,${field.field_image1}" alt="Field Image 1" style="width: 100px; height: 100px; object-fit: cover;">
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
                $("#fields-table").append(record);
            });
        },
        error: function(xhr, status, error) {
            console.error("Failed to load fields:", error);
            alert("An error occurred while loading the field data.");
        }
    });
}

function saveField(){
    const formData = new FormData(); 
    
    formData.append("field_name", $("#field_name").val());
    
    const location_x = parseInt($("#field_location_x").val());
    formData.append("x", location_x);

    const location_y = parseInt($("#field_location_y").val());
    formData.append("y", location_y);

    formData.append("extent_size", $("#field_size").val());

    formData.append("field_image1", $("#field_image1")[0].files[0]);
    formData.append("field_image2", $("#field_image2")[0].files[0]);

    $.ajax({
        url:"http://localhost:5050/green-shadow/api/v1/field",
        method: "POST",
        contentType: false,
        processData: false,
        data: formData,
        success: function (result){
            clearFields();
            console.log(result);
            alert("Field Save Successfull");
        },
        error: function (result){
            clearFields();
            console.log(result);
            alert("Field Save Unsuccessfull");
        }
    });
}

function clearFields(){
    $("#field_name").val('');
    $("#field_location_x").val('');
    $("#field_location_y").val('');
    $("#field_size").val('');
    $("#field_image1").val('');
    $("#field_image2").val('');
}