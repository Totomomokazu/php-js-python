$(document).ready(function() {
    $('#upload-form').submit(function(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append('image', $('#image-input')[0].files[0]);
        

        $.ajax({
            url: 'app.php',
            type: 'POST',
            data: formData,
            contentType: false,  // jQueryがcontentTypeを設定しないようにする
            processData: false,  // jQueryがformDataを処理しないようにする
            dataType: 'json',    // レスポンスをJSONとして扱う
            
            success: function(data) {
                $('#result').html(data.tags);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});
