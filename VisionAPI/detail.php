<?php
require_once('funcs.php');


$id = $_GET['id']; //?id~**を受け取る
$pdo = db_conn();

//２．データ登録SQL作成
$stmt = $pdo->prepare('SELECT * FROM image_vision WHERE id=:id;');
$stmt->bindValue(':id', $id, PDO::PARAM_INT);
$status = $stmt->execute();

//３．データ表示
if ($status == false) {
    sql_error($stmt);
} else {
    $row = $stmt->fetch();
}
?>


<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>データ更新</title>
</head>

<body>

    <!-- Head[Start] -->
    <header>
    </header>
    <!-- Head[End] -->
    <form method="POST" action="update.php" enctype="multipart/form-data">
            <fieldset>
                <legend>[編集]</legend>
                <div>
                    <label for="content">内容：</label>
                    <textarea id="content" name="content" rows="1" cols="40"><?= h($row['content']) ?></textarea>
                </div>

                <!-- 画像データの表示 -->
                <?php
                    if (!empty($row['image'])){
                        echo '<img src="' . $row["image"] . '">';
                    }
                ?>
      
                <div>
                    <input type="submit" value="画像解析">
                    <input type="hidden" name="id" value="<?= $id ?>">
            </fieldset>
        </div>
    </form>
</body>
</html>
