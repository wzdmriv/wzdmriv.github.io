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
        showData();
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