function saveField(){
    var field_name = $("#field_name").val();
    var field_location_x = $("#field_location_x").val();
    var field_location_y = $("#field_location_y").val();
    var field_size = $("#field_save").val();
    var field_image1 = $("#field_image1").val();
    var field_image2 = $("#field_image2").val();

    $.ajax({
        url: " http://localhost:5050/green-shadow/api/v1/field",
        method:"POST",
        contentType:"multipart/form-data",
        "data":JSON.stringify({
            "field_name":field_name,
            "x":field_location_x,
            "y":field_location_y,
            "extent_size":field_size,
            "field_image1":field_image1,
            "field_image2":field_image2
        }),
        success:function(result){
            console.log(result);
            alert("Customer saved successfully");

        },
        error:function(result){
            alert("Customer save unsuccessful");
            console.log(result);
        }
    })
}