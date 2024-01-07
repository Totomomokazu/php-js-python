<?php
// 関数の呼び出し
require_once("funcs.php");


// 1.POSTデータの取得
$content=$_POST["content"];


// 画像アップロード
if(isset($_FILES["image"])){//$_FILESはスーパーグローバル変数でissetと組み合わせてimageという名前のファイルがアップロードされているか分岐させる
    $upload_file=$_FILES["image"]["tmp_name"];
    // アップロードされたファイルの一時的な保存場所（サーバー上のパス）を変数
    
    $extension = pathinfo($_FILES["image"]["name"],PATHINFO_EXTENSION);
    // アップロードされたファイルの名前から、ファイルの拡張子を取得しています。

    $new_name = uniqid() . '.' . $extension;
    // 画像の名前をユニークな名前にリネームする。uniqid()関数はユニークなIDを生成する関数
    
    $image_path = "img/" . $new_name; 
    // pathを指定する（ユニークな名前でpathを指定）
   
    if (move_uploaded_file($upload_file, $image_path)){
        $image=$image_path;
    }
    // 一時保存サーバー内のフォルダのimgフォルダに移動させる（保存する）
    // ifの第一引数は画像ファイルの情報。第二引数はファイルのパスを指定
}

//2. DB接続
$pdo = db_conn();


// ３．データ登録SQL作成
$stmt = $pdo->prepare('INSERT INTO
                       image_vision(image, content,date)
                       VALUES(:image, :content, sysdate())');
$stmt->bindValue(':image', $image, PDO::PARAM_STR);
$stmt->bindValue(':content', $content, PDO::PARAM_STR);
$status = $stmt->execute(); //実行


//４．データ登録処理後
if ($status == false) {
    sql_error($stmt);
} else {
    redirect('index.php');
}
