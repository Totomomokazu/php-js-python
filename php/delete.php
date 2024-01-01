<?php
    // １．GETデータの取得
    $id=$_GET["id"];
    

    // ２．DBに接続
    require_once("funcs.php");
    $pdo = db_conn();


    // ３．データ削除用のSQL作成
    $stmt = $pdo->prepare('DELETE
                        FROM gs_bm_table
                        where id =:id;');

    // ４．バインド変数の用意
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    
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