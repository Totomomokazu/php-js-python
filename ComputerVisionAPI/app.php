<?php
// PHPコードの開始を宣言

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    // もしリクエストメソッドがPOSTであり、かつ$_FILESスーパーグローバル配列に'image'という名前のファイルが存在する場合

    $filename = $_FILES['image']['tmp_name'];
    // アップロードされたファイルの一時的な名前（サーバー上のパス）を$filename変数に格納

    $result = shell_exec("python3 app.py " . escapeshellarg($filename));
    // 'app.py' Pythonスクリプトを実行し、そのスクリプトに$filename（画像のパス）を引数として渡す。
    // escapeshellarg()関数は、シェルコマンドを安全に実行するために、引数を適切にエスケープする。

    echo json_encode(['tags' => $result]);
    // Pythonスクリプトから得られた結果をJSON形式でクライアントに返す。
    // ここでの$resultはPythonスクリプトの出力（ここではタグのリスト）です。

} else {
    echo json_encode(['error' => 'ファイルがアップロードされていません。']);
    // POSTメソッドでない、または'image'という名前のファイルが$_FILESに存在しない場合、
    // エラーメッセージを含むJSONをクライアントに返す。
}
?>
