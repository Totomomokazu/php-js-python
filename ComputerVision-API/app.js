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
    if(filedata){
        let obj ={} //画像を格納する用のobjectを作成
        console.log("postボタン押下後に成功")

        obj={
            img:filedata,
        }
        console.log("objへの代入に成功")


        // ここでローカルストレージに画像を保存しているが、phpでDBに保存すればよいのではないか？
        localStorage.setItem(count.toString(),JSON.stringify(obj));
        console.log("localstrageへの保存に成功")

        const json_obj=JSON.parse(localStorage.getItem(count.toString()))
        const html=`
            <div class="post_details">
                <img src="${json_obj.img}" alt="投稿画像"></img>
                <p>${json_obj.comment}</p>
                <div class="like_button">
                    <button id="like_button${count}" class="${count}">♥ いいね</button>
                    <span class="like_count">0</span>
                </div>
            </div>`
            $("#post_field").append(html)
    }else{
        alert("画像を選択してください。")
    }
})