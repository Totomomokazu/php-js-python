<!-- このdetailファイルで各データを操作する -->

<!-- ここから下はphpの処理 -->
<?php
// １．パラメータの取得。今回はIDだけで良い
$id=$_GET["id"];


// ２．DBに接続
require_once("funcs.php");
$pdo = db_conn();


// ３．データを取得する
$stmt = $pdo->prepare("select * from gs_bm_table where id = :id;");
$stmt->bindValue(":id",$id,PDO::PARAM_INT);
$status = $stmt->execute();


// ４．データを表示。なんでこの処理しているんだっけ？
$view = '';
if ($status === false) {
    $error = $stmt->errorInfo();
    exit('SQLError:' . print_r($error, true));
} else {
    $result = $stmt->fetch(); 
}
?>




<!-- ここから下はhtml -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>データ更新</title>
</head>
<body>
    <button><a href="select.php">データベースを確認する</a></button>
    <form method="post" action="update.php">
        <fieldset>
            <legend>本アンケート</legend>
            <label>本の名前：<input type="text" name="name" value="<?= $result["name"] ?>"></label><br>
            <label>紹介用リンク：<input type="text" name="url" value="<?= $result["url"] ?>"></label><br>
            <label><textarea name="comment" id="" cols="30" rows="10"><?= $result["comments"] ?></textarea></label><br>
            <input type="hidden" name="id" value="<?= $result["id"]?>">
            <input type="submit" value="更新">
        </fieldset>
    </form>    
</body>
</html>