// グルーバル変数の宣言
const droparea = $("#droparea"); //ドロップエリアのオブジェクト情報を取得
const preview=$("#preview"); //プレビューエリアのオブジェクト情報を取得
let filedata=null; //ファイルデータを入れる関数


//アップロード画面のコード
$(document).ready(function(){
    // ドラッグイベントのデフォルト動作をキャンセル
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function(eventName) {
        droparea.on(eventName, function(e) {
            e.preventDefault();
        });
    });
})

//ドロップされたファイルの処理を関数化
function filehandle(file){ //fileを引数としている
    const reader = new FileReader();//ファイルAPIの呼び出し
    reader.readAsDataURL(file) //FileReaderのメソッドを呼び出し、引数fileの内容を読み込む.これが実行されたらonloadが開始される
    reader.onload = function(e){ //ファイルの読み込みが完了した時に実行されるイベント
        preview.attr("src",e.target.result).show()
        console.log("プレビュー表示")
        //attrでsrc 属性の値にe.target.resultを代入
        //target.resultにより読み込んだファイルの取得
        //show()でpreview領域がdisplay:noneであっても表示できる
        filedata=e.target.result //読み込んだファイルデータをfileDataという変数で保存
        console.log("ファイルの一時保存")
        console.log(filedata)
    };
}


//ファイルがドロップされた時の処理
$("#droparea").on("drop",function(e){ //dropareaで"drop"イベントが発生した場合
    let files = e.originalEvent.dataTransfer.files; 
    //originalEventでdropイベントが起きたことを指定
    //dataTransferでドラッグアンドドロップされたデータ取得
    //filesで取得したデータがアイテムの場合、それぞれのファイルのリストを保持。ファイルAPIというやつらしい
    console.log("画像のドロップに成功")
    console.log(files)
    if(files.length>0){ //fileが1つ以上あるかチェック
        filehandle(files[0]); //filehandle関数を実行する。引数にfiles[0]を代入

    }

});


//postボタンを押されたときの処理
$("#post_btn").on("click",function(){
    // ここにphpファイルにデータを送信する方法を書く
    // データを変数で定義
    let data ={
        img :filedata
    }
    console.log(data)
})