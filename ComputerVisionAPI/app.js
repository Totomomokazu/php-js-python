document.getElementById('upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append('image', document.getElementById('image-input').files[0]);

    fetch('app.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // 結果を表示する処理
        document.getElementById('result').innerHTML = data.tags;
    })
    .catch(error => console.error('Error:', error));
});