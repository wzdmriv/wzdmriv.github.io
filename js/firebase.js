// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();
var resList = db.ref("/reslist");
//DB内容が変更されたとき実行される
resList.on("value", function(snapshot) {
    originalData = snapshot;
    const fileName = "events.json";
    const data = JSON.stringify(originalData);
    const link = document.createElement("a");
    link.href = "data:text/plain," + encodeURIComponent(data);
    a.download = fileName;
    a.click();
});
 //入力内容を更新した時
function sendData(){
  var name = document.getElementById("dName").value;
  resList.set({name:name});
}