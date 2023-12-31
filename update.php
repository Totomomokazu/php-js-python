<?php
// １．POSTデータの取得
$id=$_POST["id"];
$name=$_POST["name"];
$url=$_POST["url"];
$comment=$_POST["comment"];

// ２．DBに接続
require_once("funcs.php");
$pdo = db_conn();


// ３．データ更新用のSQL作成
$stmt = $pdo->prepare('UPDATE gs_bm_table
                       SET
                       name = :name, url= :url, comments = :comments, date= sysdate()
                       where id =:id;');

// ４．バインド変数の用意
$stmt->bindValue(':id', $id, PDO::PARAM_INT);
$stmt->bindValue(':name', $name, PDO::PARAM_STR);
$stmt->bindValue(':url', $url, PDO::PARAM_STR);
$stmt->bindValue(':comments', $comment, PDO::PARAM_STR);

// ５．実行
$status = $stmt->execute();

// ６．データ登録後の処理
if($status === false){
//SQL実行時にエラーがある場合（エラーオブジェクト取得して表示）
$error = $stmt->errorInfo();
exit('ErrorMessage:'.$error[2]);
}else{
//５．index.phpへリダイレクト
header('Location: select.php');
}

?>