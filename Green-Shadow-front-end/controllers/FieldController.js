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
            clear();
            console.log(result);
            alert("Field Save Successfull");
        },
        error: function (result){
            clear();
            console.log(result);
            alert("Field Save Unsuccessfull");
        }
    });
}

function clear(){
    $("#field_name").clear();
    $("#field_location_x").clear();
    $("#field_location_y").clear();
    $("#field_size").clear();
    $("#field_image1").clear();
    $("#field_image2").clear();
}