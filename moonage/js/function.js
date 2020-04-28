function centeringOrbit() {
    //画面(ウィンドウ)の幅、高さを取得
    var w = $( window ).width() ;
    var h = $( window ).height() ;
    //センタリングを実行する
    $( ".wrapper" ).css( {"left": ((w/2)-2000) + "px","top": (h/2) + "px"} ) ;
    $( ".field" ).css( {"width": w + "px","height": h + "px"} ) ;

    $( window ).resize( centeringOrbit ) ;
}

function getMoonage(){
    $.ajax({
        type: "GET",
        url: 'https://mgpn2.sakura.ne.jp/api/moon/position.cgi?json&lat=35.0000&lon=140.0000',
        dataType:"json"
    })
    .done(function(data) {
        $('p').text( JSON.stringify(data) );
        // 中身が空でなければ、その値を［住所］欄に反映
        if (data.results) {
            testbox = document.getElementById("testbox");
            testbox.innerHTML = "成功";
            //var result = data.results[0];
          //testbox = document.getElementById("testbox");
          //testbox.innerHTML = result;
        // 中身が空の場合は、エラーメッセージを反映
        } else {
            testbox = document.getElementById("testbox");
            testbox.innerHTML = "エラー";
        }
    })
    .error(function(XMLHttpRequest, textStatus, errorThrown) {
    alert('error!!!');
　　console.log("XMLHttpRequest : " + XMLHttpRequest.status);
　　console.log("textStatus     : " + textStatus);
　　console.log("errorThrown    : " + errorThrown.message);
});
}