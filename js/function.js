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
			centeringModalSyncer();
			$("#passwordconf").fadeIn("fast");
			//閉じる
			$("#login").unbind().click(function(){
				//[#modal-overlay]と[#modal-close]をフェードアウトする
				$("#passwordconf,#modal-overlay_p").fadeOut("fast",function(){
					$("#modal-overlay_p").remove();
				});
			});
			$("#clogin").unbind().click(function(){
				window.close();
			});
    });
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