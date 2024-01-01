<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>データ登録</title>
</head>
<body>
    <script src="test.js"></script>
    <button><a href="index-tramp.html">trampで遊ぶ</a></button>
    <button><a href="/tramp/index-tramp.html">trampで遊ぶ</a></button>
    <button><a href="/gs_code/02_homework/php-js-python/tramp/index-tramp.html">trampで遊ぶ</a></button>
    <!-- ↑ファイル構造を変える場合、相対パスで指定する必要があるため、htdocs以下のパスを指定する必要がある-->
    <button><a href="select.php">データベースを確認する</a></button>
    <form method="post" action="insert.php">
        <fieldset>
            <legend>本アンケート</legend>
            <label>本の名前：<input type="text" name="name"></label><br>
            <label>紹介用リンク：<input type="text" name="url"></label><br>
            <label><textarea name="comment" id="" cols="30" rows="10"></textarea></label><br>
            <input type="submit" value="送信">
        </fieldset>
    </form>    
</body>
</html>