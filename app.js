// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "****************",
    authDomain: "****************",
    databaseURL: "****************",
    projectId: "****************",
    storageBucket: "****************",
    messagingSenderId: "****************",
    appId: "****************"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



//ファイルの選択
let file;
let date;
let metadata;
let shiainohi;

document.getElementById("date").onclick = function() {
    let fbtn = document.getElementById("file")
    fbtn.disabled = false;   //「ファイルを選択」ボタンを有効にする
  };


document.getElementById('file').addEventListener('change',(event) => { //addEventListener('change', function(){});と同じ。引数'change'は「変化があった時」の意味。
    file = event.target.files[0];  //evemt.targetはクリックした要素のこと。ここでは<input type="file" id="file">。filesの配列の0番目を取得。
    let FUbtn = document.getElementById("fileUpload")
    FUbtn.disabled = false;   //「クリックしてアップロード開始」ボタンを有効にする

});



function UPLOAD(){  
    const storageRef = firebase.storage().ref('images/' + file.name); //保存場所のパスを指定。
    let date = document.getElementById("date").value;
    let metadata = {customMetadata:{'date': date }};

    //指定した場所にfileをputする。メタデータをつける。そのときにon()関数動く。プログレスバーの表示。
    storageRef.put(file, metadata).on('state_changed', (snapshot) => {    
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const progressBar = document.getElementById('progress_bar');
        progressBar.value = progress;
        console.log(progress);
        if(progress === 100)document.getElementById('status').append("アップロード完了");    
    });
};




    //指定したファイルのurlのダウンロード
    // function DOWNLOAD(){
    //     const storageRef = firebase.storage().ref('images/参加者名簿.pdf'); 
    //     storageRef.getDownloadURL().then(function(url){ 
    //         console.log(url);
    //     });
    // };


    // 指定したファイルのメタデータのダウンロード
    // function DOWNLOAD(){
    //     const storageRef = firebase.storage().ref('images/参加者名簿.pdf'); 
    //     storageRef.getMetadata().then(function(metadata){
    //     console.log(metadata);
    //     });
    // };

    //指定したディレクトリに存在するファイルのリストのダウンロード
    // function DOWNLOAD(){
    //     const listRef = firebase.storage().ref('images/');
    //     listRef.listAll().then(function(res){
    //         console.log(res,"res")
    //         items=res.items
    //         console.log(items,"items")
    //         hoge0=res.items[3].name
    //         hoge1=res.items[4].name
    //         console.log(hoge0,"name1")
    //         console.log(hoge1,"name2")
    //         hoge3=res.items[3].getMetadata() //カスタムで決めたメタデータ「date：〜〜」はどこにあるんだー？？
    //         console.log(hoge3,"metadata")
    //     });
    // };


    //メタデータを取得する
    // function DOWNLOAD(){
    //     firebase.storage().ref('images/第107回湘南チャレンジ杯U-8.pdf').getMetadata().then(function(meta_task){
    //         console.log(meta_task,"meta_task")
    //         let meta = meta_task
    //         console.log(meta)
    //         console.log(meta.customMetadata.date,"カスタムで決めたメタデータdate")
    //     });
    // };


    //特定のファイルのメタデータを取得する
    // function DOWNLOAD(){
    //     firebase.storage().ref('images/').listAll().then(function(res){
    //         res.items[3].getMetadata().then(function(meta_task){
    //             console.log(meta_task.customMetadata.date,"カスタムで決めたメタデータdate");
    //         });
    //     });
    // };

    //






    document.getElementById("shiainohi").onclick = function() {
        let dlbtn = document.getElementById("fileDownload")
        dlbtn.disabled = false;   //「ファイルを選択」ボタンを有効にする
      };


    shiainohi = document.getElementById("shiainohi").value;  //試合の日付ボタンから取得

    
    function DOWNLOAD(){  //ダウンロードのボタンを押した時に動く関数
        shiainohi = document.getElementById("shiainohi").value;  //ダウンロードしたい日付を一時保管

        firebase.storage().ref('images/').listAll().then(function(res){  //firebese_Storageの「images」というディレクトリからリスト取得
            let itemslength = res.items.length;

            for(i=0; i<itemslength; i++){  //itemsの数だけ繰り返す
                let namae = res.items[i].name  //名前取得
                let res_items_url =res.items[i].getDownloadURL()  //URL取得


                res.items[i].getMetadata().then(function(meta_task){  //metadataを取得（非同期）

                    let customMetadata = meta_task.customMetadata  //カスタムメタデータ
                        if(customMetadata != undefined){  //カスタムメタデータがある時

                            let customMetadataDate = meta_task.customMetadata.date  //カスタムで作ったdateというメタデータ

                            if( customMetadataDate === shiainohi ){  //dateがダウンロードしたい日付と一致した時に

                                    let url = res_items_url.then((url) => {  //url取得
                                        let a = document.createElement('a'); //aタグを新規作成
                                        a.href = url;  //aタグのリンク先にurlをセット
                                        ElementSetTextContent(a,namae); //宣言した関数ElementSetTextContent()はテキストをハイパーリンク化するための関数
                                        document.getElementById("k").appendChild(a);  //index.htmlのid=kのdivタグにaタグをセット
                                });
                            };
                            
                        };

                        
    
                    });


                };
 
            });
    };


        // テキストをハイパーリンク化するための関数（こちら参照：https://hakuhin.jp/js/anchor.html#ANCHOR_ATTACH_ELEMENT）
        function ElementSetTextContent(element,str){
            if(element.textContent !== undefined)
            {
                element.textContent = str;
            }
            if(element.innerText !== undefined)
            {
                element.innerText = str;
            }
        }

    






    
