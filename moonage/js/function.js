var flag = 1;

function setting(){
    getMoonage();
    centeringOrbit();
    $(function(){
        $("#screen").unbind().click(function(){
            if (flag==1){
                $(".layer1").fadeOut("fast",function(){
                    centeringOrbit();
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
    var data;
    request.onload = function () {
      data = this.response;
      console.log(data);
      const parser = new DOMParser();
      var doc = parser.parseFromString(data, "text/xml");
      testbox = document.getElementById("moonage");
      testbox1 = document.getElementById("moon_h");
      testbox2 = document.getElementById("moon_l");
      var con = doc.getElementsByTagName('age');
      var con2 = con[0].textContent;
      var con3 = con2.slice(0,-2);
      var con_h = doc.getElementsByTagName('altitude');
      var con_h2 = con_h[0].textContent;
      var con_l = doc.getElementsByTagName('azimuth');
      var con_l2 = con_l[0].textContent;
      testbox.innerHTML = con3;
      testbox1.innerHTML = con_h2;
      testbox2.innerHTML = con_l2;
    }
    request.send();
}


function centeringOrbit() {
    //画面(ウィンドウ)の幅、高さを取得
    var w = $( window ).width() ;
    var h = $( window ).height() ;
    var wh = Math.min(350,Math.min(w,h)*0.45);
    var moonh = document.getElementById("moon_h").innerHTML;
    var moonl = document.getElementById("moon_l").innerHTML;
    //センタリングを実行する
    $( ".wrapper" ).css( {"left": ((w/2)-4000) + "px","top": (h/2) + "px"} ) ;
    $( ".field" ).css( {"width": w + "px","height": h + "px"} ) ;
    $( "#modal-overlay" ).css( {"width": w + "px","height": h + "px"} ) ;
    $( "#moonb2" ).css( {"width": wh + "px","height": wh + "px"} ) ;
    if (moonh>=0){
        var top = (h/2) - moonh*wh/(2*(moonh**2+(moonl-180)**2)**(1/2))-8;
        var left = (w/2) + (moonl-180)*wh/(2*(moonh**2+(moonl-180)**2)**(1/2))-8;
        $( "#mcircle" ).css( {"left": left + "px","top": top + "px"} ) ;
    }else if (moonl>=0&&moonl<=180){
        var top = (h/2) - moonh*wh/(2*(((moonh)**2+moonl**2)**(1/2)))-8;
        var left = (w/2) - moonl*wh/(2*(((moonh)**2+moonl**2)**(1/2)))-8;
        $( "#mcircle" ).css( {"left": left + "px","top": top + "px"} ) ;
    }else if (moonl>180&&moonl<360){
        var top = (h/2) - moonh*wh/(2*((moonh)**2+(360-moonl)**2)**(1/2))-8;
        var left = (w/2) + (360-moonl)*wh/(2*((moonh)**2+((360-moonl)**2))**(1/2))-8;
        $( "#mcircle" ).css( {"left": left + "px","top": top + "px"} ) ;
    }
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