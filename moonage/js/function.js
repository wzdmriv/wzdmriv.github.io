var flag = 1;


function setting(){
    getMoonage();
    centeringOrbit();
    $(function(){
        $("#screen").unbind().click(function(){
            if (flag==1){
                $(".layer1").fadeOut("fast",function(){
                    $(".layer2").fadeIn("fast");
                });
                flag = 2
            }else if (flag==2){
                $(".layer2").fadeOut("fast", function(){
                    $(".layer1").fadeIn("fast");
                });
                flag = 1;
            }
        });
    })
}


function getMoonage(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://mgpn2.sakura.ne.jp/api/moon/position.cgi?lat=35.0000&lon=140.0000', true);
 
    request.onload = function () {
      var data = this.response;
      console.log(data);
      const parser = new DOMParser();
      var doc = parser.parseFromString(data, "text/xml");
      testbox = document.getElementById("moonage");
      var con = doc.getElementsByTagName('age');
      var con2 = con[0].textContent;
      var con3 = con2.slice(0,-2);
      testbox.innerHTML = con3;
    }
    request.send();
}


function centeringOrbit() {
    //画面(ウィンドウ)の幅、高さを取得
    var w = $( window ).width() ;
    var h = $( window ).height() ;
    var wh = Math.min(350,Math.min(w,h)*0.45);
    //センタリングを実行する
    $( ".wrapper" ).css( {"left": ((w/2)-4000) + "px","top": (h/2) + "px"} ) ;
    $( ".field" ).css( {"width": w + "px","height": h + "px"} ) ;
    $( "#modal-overlay" ).css( {"width": w + "px","height": h + "px"} ) ;
    $( "#moonb2" ).css( {"width": wh + "px","height": wh + "px"} ) ;
    $( window ).resize( centeringOrbit ) ;
}


/*function changeBGColor(r, g, b) {
    var img = new Image();
    img.src = 'images/twinkling.png';
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        img.style.display = 'none';
    };
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < (imageData.width*imageData.height); i++) {
        imageData.data[i*4] = r;
        imageData.data[i*4+1] = g;
        imageData.data[i*4+2] = b;
    }
    ctx.putImageData(imageData, 0, 0);
    var png = canvas.toDataURL();
    var p = document.getElementById('twinkling');
    p.style.background = png;
    return;
}*/