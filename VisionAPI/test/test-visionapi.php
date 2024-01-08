<?php
// PHPスクリプトの開始を宣言

// 画像ファイルのパスを変数に代入
$imagePath = 'image.jpg';

// Pythonスクリプトを実行し、その結果を変数に代入
// "python"はPythonスクリプトを実行するコマンド
// "test-visionapi.py"はPythonスクリプトのパス
// escapeshellargは、コマンドライン引数として安全に使用できるように引数をエスケープする関数
$result = shell_exec("python test-visionapi.py " . escapeshellarg($imagePath));

// Pythonスクリプトの実行結果を出力
echo $result;
?>
