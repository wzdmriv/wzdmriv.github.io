function centeringOrbit() {
    //画面(ウィンドウ)の幅、高さを取得
    var w = $( window ).width() ;
    var h = $( window ).height() ;
    //センタリングを実行する
    $( ".wrapper" ).css( {"left": ((w/2)-2000) + "px","top": (h/2) + "px"} ) ;
    $( window ).resize( centeringOrbit ) ;
}