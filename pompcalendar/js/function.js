function selectMode() {
	var element = document.getElementById( "cal" ) ;
	if ( element.checked ) {
		document.getElementById("resform").style.display ="none";
		document.getElementById("calendar").style.display ="inline-block";
	}else{
		document.getElementById("calendar").style.display ="none";
		document.getElementById("resform").style.display ="inline-block";
	}
}

function selectCont() {
	var element2 = document.getElementById( "aboutres" ) ;
	if ( element2.checked ) {
		document.getElementById("aboutrescont").style.display ="inline-block";
		document.getElementById("aboutroomcont").style.display ="none";
		centeringModalSyncer();
	}else{
		document.getElementById("aboutroomcont").style.display ="inline-block";
		document.getElementById("aboutrescont").style.display ="none";
		centeringModalSyncer();
	}
}

//データ送信
function sendData(){
	var name = document.forms.resform.dName.value;
	var pname = document.forms.resform.pName.value;
	var originalselectday  = document.forms.resform.mytarget.value;
	var selectday = "";
	selectday = originalselectday.replace( /\//g , "-" ) ;
	var splitday =    selectday.split("-");
	var num1 = document.forms.resform.sTime.selectedIndex;
	var num2 = document.forms.resform.eTime.selectedIndex;
	var starttime = document.forms.resform.sTime.options[num1].value;
	var endtime = document.forms.resform.eTime.options[num2].value;
	var num3 = document.forms.resform.purpose.selectedIndex;
	var senddate = new Date();
	var senddate2 = (senddate.getFullYear() + "年" + (senddate.getMonth() + 1)  + "月" + senddate.getDate() + "日" + senddate.getHours() + "時" + senddate.getMinutes() + "分" + senddate.getSeconds() + "秒");
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
	if (name=="" || pname=="" || selectday=="" || starttime=="" || endtime=="" || color=="" || password==""){
	  target = document.getElementById("errorbox");
	  target.innerHTML = "未入力項目があります";
	}else if (Number(endtime) - Number(starttime) <= 0){
	  target = document.getElementById("errorbox");
	  target.innerHTML = "有効な練習時間を入力してください";
	}else{
	  var newPostKey = reslist.push().key;
	  reslist.child(splitday[0]).child(splitday[1]).child(splitday[2]+starttime).child(newPostKey).set({"sendtime":senddate2,"id":newPostKey,"name":name,"pname":pname,"startdate":selectday,"enddate":"","starttime":starttime,"endtime":endtime,"color":color,"password":password,"url":""});
	  reslist.child("keylist").child(newPostKey).set({address:address});
	  target = document.getElementById("errorbox");
	  target.innerHTML = "送信完了";
	  window.location.reload();
	}
  }
//データ削除
function deleteData(){
    var password = document.getElementById("dpassword").value;
    if (password == resdata.password){
        reslist.child(resAddress.address).child(resKey).remove();
        reslist.child("leylist").child(resKey).remove();
        target = document.getElementById("errorbox2");
        target.innerHTML = "削除が完了しました";
		window.location.reload();
		
    }else{
        target = document.getElementById("errorbox2");
        target.innerHTML = "パスワードが違います";
    }
}

function showData(){
    target1 = document.getElementById("nametag");
    		target1.innerHTML = resdata.name;
    		target2 = document.getElementById("datetag");
    		target2.innerHTML = resdata.startdate;
    		var starttime = resdata.starttime + ":00";
    		var endtime1 = resdata.endtime;
    		var endtime = "";
  				if (endtime1 == "21"){
    				endtime = "21:30"
				}else{
    				endtime = endtime1 + ":00";
  				}
    		target3 = document.getElementById("timetag");
    		target3.innerHTML = starttime + " - " + endtime;
}
function howtouse(){
    $(function(){
            if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;
            $("body").append('<div id="modal-overlay"></div>');
			$("#modal-overlay").fadeIn("fast");
			centeringModalSyncer();
			$("#howtopop").fadeIn("fast");
			//閉じる
			$("#modal-overlay,#hclose").unbind().click(function(){
				//[#modal-overlay]と[#modal-close]をフェードアウトする
				$("#howtopop,#modal-overlay").fadeOut("fast",function(){
					$("#modal-overlay").remove();
				});
			});
    });
    $( window ).resize( centeringModalSyncer ) ;
}

function password(){
	$(function(){
		if ($.cookie('btnFlg') == 'on'){
			$("#modal-overlay_p").remove();
		}else{
    
			centeringModalSyncer();
			$("#passwordconf").fadeIn("fast");
			var username, password;
			db.ref("/pass/username").once('value').then(function(snapshot) {
				username = snapshot.val();
			});
			db.ref("/pass/password").once('value').then(function(snapshot) {
				password = snapshot.val();
			});
			//閉じる
			$("#login").unbind().click(function(){
				var iusername = document.getElementById("username").value;
				var ipassword = document.getElementById("cpassword").value;
				if (username == iusername && password == ipassword){
					$("#passwordconf,#modal-overlay_p").fadeOut("fast",function(){
						$("#modal-overlay_p").remove();
					});
					$.cookie('btnFlg', 'on', { expires: 1,path: '/' });
				}else{
					errorbox = document.getElementById("errorbox3");
    				errorbox.innerHTML = "無効なパスワードです";
				}
			});
			$("#clogin").unbind().click(function(){
				$("#passwordconf").fadeOut("fast",function(){});
			});
	}});
	
    $( window ).resize( centeringModalSyncer ) ;
}

function centeringModalSyncer() {

    //画面(ウィンドウ)の幅、高さを取得
    var w = $( window ).width() ;
    var h = $( window ).height() ;

    // コンテンツ(#modal-content)の幅、高さを取得
    // jQueryのバージョンによっては、引数[{margin:true}]を指定した時、不具合を起こします。
    //var cw = $( "#modal-content" ).outerWidth( {margin:true} );
    //var ch = $( "#modal-content" ).outerHeight( {margin:true} );
    var cw = $( "#modal-content" ).outerWidth();
	var ch = $( "#modal-content" ).outerHeight();
	var ccw = $( "#howtopop" ).outerWidth();
	var cch = $( "#howtopop" ).outerHeight();
	var cccw = $( "#passwordconf" ).outerWidth();
    var ccch = $( "#passwordconf" ).outerHeight();

    //センタリングを実行する
	$( "#modal-content" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
	$( "#howtopop" ).css( {"left": ((w - ccw)/2) + "px","top": ((h - cch)/2) + "px"} ) ;
	$( "#passwordconf" ).css( {"left": ((w - cccw)/2) + "px","top": ((h - ccch)/2) + "px"} ) ;
}