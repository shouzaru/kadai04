// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "*****************",
    authDomain: "*****************",
    databaseURL: "*****************",
    projectId: "*****************",
    storageBucket: "*****************",
    messagingSenderId: "*****************",
    appId: "*****************"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



//ファイルの選択
let file;
let date;
let metadata;

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


// let gsReference = firebase.storage().refFromURL('gs://gs23-12a42.appspot.com/images/参加者名簿.pdf');
// console.log(gsReference);


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
    function DOWNLOAD(){
        const listRef = firebase.storage().ref('images/');
        listRef.listAll().then(function(res){
            console.log(res,"res")
            items=res.items
            console.log(items,"items")
            hoge0=res.items[0].name
            hoge1=res.items[1].name
            console.log(hoge0,"name1")
            console.log(hoge1,"name2")
            hoge3=res.items[0].getMetadata() //カスタムで決めたメタデータ「date：〜〜」はどこにあるんだー？？
            console.log(hoge3,"metadata")
        });
    };



    
