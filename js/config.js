var firebaseConfig = {
    apiKey: "AIzaSyBkd4VZq7pTR0VB7F_T5Trk7K4qdfrdQ8I",
    authDomain: "res-demo-26a88.firebaseapp.com",
    databaseURL: "https://res-demo-26a88.firebaseio.com",
    projectId: "res-demo-26a88",
    storageBucket: "res-demo-26a88.appspot.com",
    messagingSenderId: "108879459276",
    appId: "1:108879459276:web:71bc9ef5fa80fc7a386369"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();
var chatAll = db.ref("/chat/all");
//DB内容が変更されたとき実行される
chatAll.on("value", function(snapshot) {
    document.getElementById("textMessage").innerText = snapshot.val().message;
});
 //入力内容を更新した時
var changeData = function(){
  var message = document.getElementById("message").value;
  chatAll.set({message:message});
}
//htmlロードが完了したらボタンにイベントを設定
window.onload = function() {
 document.getElementById("btnChangeData").onclick = changeData;
};