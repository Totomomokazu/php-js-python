<?php

?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>物体検知</title>
</head>
<body>
    <form action="insert.php" method="POST" enctype="multipart/form-data">
    <fieldset>
        <legend>物体検知アプリ</legend>    
            <div>
                <label for="image">画像：</label>
                <input type="file" id="image" name="image">
            </div>
            
            <div>
                <label for="content">コメント：</label>
                <textarea name="content" id="content" cols="40" rows="1"></textarea>
            </div>
        
            <div>
                <input type="submit" value="送信">
            </div>
    </fieldset>
    </form>
    
</body>
</html>