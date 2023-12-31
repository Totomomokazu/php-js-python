<!-- phpの宣言 -->
<?php

//1.POSTデータの取得 
$name=$_POST["name"];
$url=$_POST["url"];
$comment=$_POST["comment"];


// 2.DBへ接続
require_once("funcs.php");
$pdo = db_conn();


// 3.データ登録SQL作成
// 3-1.SQL文を用意
$stmt = $pdo->prepare("
    INSERT INTO
        gs_bm_table(id, name, url, comments, date)
    VALUES (
        NULL, :name, :url, :comment, sysdate()
        )");

//3-2.バインド変数を用意
$stmt->bindValue(':name', $name, PDO::PARAM_STR);
$stmt->bindValue(':url', $url, PDO::PARAM_STR);
$stmt->bindValue(':comment', $comment, PDO::PARAM_STR);


// 3-3.実行
$status = $stmt->execute();


//４．データ登録処理後
if($status === false){
    //SQL実行時にエラーがある場合（エラーオブジェクト取得して表示）
    $error = $stmt->errorInfo();
    exit('ErrorMessage:'.$error[2]);
  }else{
    //５．index.phpへリダイレクト
    header('Location: index.php');
  }
?>