// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();
var reslist = db.ref("/reslist");

 //入力内容を更新した時
function sendData(){
  var name = document.forms.resform.dName.value;
  var originalselectday  = document.forms.resform.mytarget.value;
  var selectday = "";
  selectday = originalselectday.replace( /\//g , "-" ) ;
  var splitday =    selectday.split("-");
  var num1 = document.forms.resform.sTime.selectedIndex;
  var num2 = document.forms.resform.eTime.selectedIndex;
  var starttime = document.forms.resform.sTime.options[num1].value;
  var endtime = document.forms.resform.eTime.options[num2].value;
  var num3 = document.forms.resform.purpose.selectedIndex;
  var purpose = document.forms.resform.purpose.options[num3].value;
  var color;
  switch(purpose){
      case "ind":
          color = "#008000";
          break;
      case "band":
          color = "#dc143c";
          break;
      case "sess":
          color = "#9400d3";
          break;
      case "other":
          color = "#ff8c00";
          break;
  }
  var password = document.forms.resform.password.value;
  var address = splitday[0]+"/"+splitday[1]+"/"+splitday[2]+starttime;
  if (name=="" || selectday=="" || starttime=="" || endtime=="" || color=="" || password==""){
    target = document.getElementById("errorbox");
    target.innerHTML = "未入力項目があります";
  }else if (Number(endtime) - Number(starttime) <= 0){
    target = document.getElementById("errorbox");
    target.innerHTML = "有効な練習時間を入力してください";
  }else{
    var newPostKey = reslist.push().key;
    reslist.child(splitday[0]).child(splitday[1]).child(splitday[2]+starttime).child(newPostKey).set({"id":newPostKey,"name":name,"startdate":selectday,"enddate":"","starttime":starttime,"endtime":endtime,"color":color,"password":password,"url":""});
    reslist.child("keylist").child(newPostKey).set({address:address});
    target = document.getElementById("errorbox");
    target.innerHTML = "送信完了";
    window.location.reload();
  }
}