function fetchFieldNames(targetElementId){
    $.ajax({
        url: " http://localhost:5050/green-shadow/api/v1/field/getallfieldnames",
        type: "GET",
        contentType: "application/json",
        success: function (response){
            console.log('Field name: ', response);
            
            response.forEach(field => {
                console.log(field);
                $(`#${targetElementId}`).append(
                    $('<option>', {value: field, text: field})
                );
            });
        },
        error: function (xhr, status, error){
            console.error('Error fetching field names:', status, error);
            
        }
    });
}