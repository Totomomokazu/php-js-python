// グルーバル変数の宣言
const droparea = $("#droparea"); //ドロップエリアのオブジェクト情報を取得
const preview=$("#preview"); //プレビューエリアのオブジェクト情報を取得
let filedata=null; //ファイルデータを入れる関数
let count=localStorage.length ||0; //ドラッグアンドドロップした回数をカウントする用の変数
// console.log("変数の定義成功")


//アップロード画面のコード
$(document).ready(function(){
    // ドラッグイベントのデフォルト動作をキャンセル
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function(eventName) {
        droparea.on(eventName, function(e) {
            e.preventDefault();
        });
    });
    console.log("デフォルトのドラッグイベントのキャンセルに成功")
})

//ファイルがドロップされた時の処理
$("#droparea").on("drop",function(e){ //dropareaで"drop"イベントが発生した場合
    let files = e.originalEvent.dataTransfer.files; 
    //originalEventでdropイベントが起きたことを指定
    //dataTransferでドラッグアンドドロップされたデータ取得
    //filesで取得したデータがアイテムの場合、それぞれのファイルのリストを保持。ファイルAPIというやつらしい
    console.log("画像のドロップに成功")

    if(files.length>0){ //fileが1つ以上あるかチェック
        filehandle(files[0]); //filehandle関数を実行する。引数にfiles[0]を代入
    }

});

    //ドロップされたファイルの処理
    function filehandle(file){
        const reader = new FileReader();//ファイルAPIの呼び出し
        console.log("ファイルAPIの読み出し")
        reader.readAsDataURL(file) //FileReaderのメソッドを呼び出し、fileの内容を読み込む.これが実行されたらonloadが開始される
        console.log("ファイルの読み込み")
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
    
    //postボタンを押されたときの処理
    $("#post").on("click",function(){

        if(filedata && comment.val()){
            let obj ={} //画像とコメントを格納する用のobjectを作成
            count ++ //アップロードされた回数をカウント。これがlocalstorageに入れるキーになる
            console.log("postボタン押下後の変数定義に成功")

            obj={
                img:filedata,
                comment:comment.val()
            }
            console.log("objへの代入に成功")
       
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
                </div>
    `
    $("#post_field").append(html)


        }else{
            alert("画像とコメントを入力してください。")
        }
    })

    // リセットボタンを押下してlocalstorageをクリアする
    $("#reset").on("click",function(){
        localStorage.clear();
        // $("#list").empty();
      });


//投稿内容を確認するためのコード
console.log("投稿内容の表示")
for (let i=1;i<=count;i++){
    const json_obj=JSON.parse(localStorage.getItem(i.toString()))
    const html=`
          <div class="post_details">
            <img src="${json_obj.img}" alt="投稿画像"></img>
            <p>${json_obj.comment}</p>
            <div class="like_button">
                <button id="like_button${i}" class="${i}">♥ いいね</button>
                <span id="like_count${i}" class="like_count">0</span> 
            </div>
          </div>
    `
    //↑spanタグだと改行にならない。インライン要素なので。
    $("#post_field").append(html)
}

console.log("投稿内容を表示しました")

// いいねボタンの押下後の処理
$("#post_field").on("click",".like_button button",function(){ //#post_field 内の .like_button button セレクタに対してクリックイベントを設定

    //ボタン押下で使う変数の宣言    
    let id = $(this).attr("id"); //ここでの $(this) は、クリックされたボタンを指す。.attr("id") は、そのボタンの id 属性の値を取得。
    //thisはJavaScriptにおいて現在のコンテキスト・現在操作しているHTML要素を指す。attrはHTML要素の属性を取得または設定するために使われる。
    let num = id.replace("like_button","") //取得した id 値から "like_button" 文字列を除去し、残った部分（通常は数値）を num に代入
    console.log("いいねボタンの押下に成功")

    //いいね数のカウント
    let likeCount = $("#like_count" + num); // <span>タグで指定しているidを作成している。like_count に num（ボタンのIDから抽出された番号）を連結した要素を取得。
    let like_count = parseInt(likeCount.text()) || 0; //likeCount.text() で、spanタグの数値を取得。parseInt() は、そのテキストを整数に変換。
    likeCount.text(like_count + 1); //like_countで取得した値に1を加える。ユーザーが「いいね」ボタンをクリックすると、関連する「いいね」カウントが1増え、その新しい数値が画面上で更新される
    console.log("いいねボタン押下のカウント")

    // let number = parseInt(id)%2
    console.log(num)

    //レコメンド画面の表示
    
    
    //①押下したkeyの取得はlet num = id.replace("like_button","")で対応されている。
    // 押下したpostのキーが奇数か偶数かでレコメンドを分岐する
    if (num % 2 ===0){
        displayRecommend("even");//関数で処理
    } else{
        displayRecommend("odd");
    }

    function displayRecommend(type){
        $("#recommend_field").empty(); //既存のレコメンドエリアを空にする

        for ( i =1 ; i<= localStorage.length ; i++){
            if (type==="even" && i % 2 ===0 || type==="odd" && i % 2 !==0){
                //②取得したidを使い、localStorageからデータを取得
                //localStorageから抽出したデータをparseでobjに変換し、json_recommend_objに格納
                const json_recommend_obj=JSON.parse(localStorage.getItem(i.toString()))
                //③取得したデータを表示
                const html=`
                            <div class="recommend_details">
                                <img src="${json_recommend_obj.img}" alt="投稿画像"></img>
                                <p>${json_recommend_obj.comment}</p>
                                <div class="like_button">
                                    <button id="like_button${num}" class="${num}">♥ いいね</button>
                                    <span id="like_count${num}" class="like_count">0</span> 
                                </div>
                            </div>
                            `;
                $("#recommend_field").append(html)
            }
        }
    }
})