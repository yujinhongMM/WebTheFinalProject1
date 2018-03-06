shop();
lunbotu();
function shop(){
    var TD1=document.getElementsByClassName("TTTT");
    var TD2=document.getElementsByClassName("TTTT1");
    for(var i=0;i<TD1.length;i++){
        TD1[i].index=i;//存储i
        TD2[i].index=i;//存储i
        TD1[i].onmouseover=function(){
            console.log(this.index)
            TD2[this.index].style.display="block";
            TD1[this.index].style.background="rgb(117, 157, 123)";
        }
        TD1[i].onmouseout=function(){
            console.log(this.index)
            TD2[this.index].style.display="none";
            TD1[this.index].style.background="#dddee0";
        }
        TD2[i].onmouseover=function(){
            console.log(this.index)
            TD2[this.index].style.display="block";
            TD1[this.index].style.background="rgb(117, 157, 123)";
        }
        TD2[i].onmouseout=function(){
            console.log(this.index)
            TD2[this.index].style.display="none";
            TD1[this.index].style.background="#dddee0";
        }
    }
}

//轮播图

function lunbotu(){
    var tt = null;
    var kkk;
    var n = 0;
    var timer = 0;
    



    var li = document.getElementById("lunbotu-Btn").getElementsByTagName("li");
    kkk = document.getElementById("lunbotu-Img").getElementsByTagName("a");
    for (var i = 0; i < kkk.length; i++) {
        if (i != 0) {
            kkk[i].style.opacity = 0;
        }
    }
    for (var j = 0; j < li.length; j++) {
        li[j].onmouseover = function () {
           
            var that = this;
       
            tt = setTimeout(function () {
                var index = that.innerHTML - 1;
                n = index;
                if (index < kkk.length) {
                    for (var o = 0; o < li.length; o++) {
                        li[o].className = "";
                        kkk[o].style.opacity = 0;
                        kkk[o].style.zIndex = 9998;
                    }
                    that.className = "lunbotu-on";
                    kkk[index].style.opacity = 1;
                    kkk[index].style.zIndex = 9999;
                    kkk[index].style.transition = "opacity 0.8s";

                }
            }, 100);

        };
        li[j].onmouseout = function () {
            console.log("停止")
            clearTimeout(tt)
        }
    }



    var left = document.getElementById("lunbotu-left");
    var right = document.getElementById("lunbotu-right");
    var jiao = document.getElementById("lunbotu-LR");
    var body = document.getElementById("lunbotu");

    timer = setInterval(function autoplay() {
        n = n >= (kkk.length - 1) ? 0 : ++n;
        var li = document.getElementById("lunbotu-Btn").getElementsByTagName("li");
        li[n].onmouseover()
    }
    , 2000);
    body.onmouseover = function () {
        jiao.style.display = "block";
        clearInterval(timer);
    };
    body.onmouseout = function () {
        jiao.style.display = "none";
        timer = setInterval(function autoplay() {
            n = n >= (kkk.length - 1) ? 0 : ++n;
            var li = document.getElementById("lunbotu-Btn").getElementsByTagName("li");
            li[n].onmouseover()
        }, 2000);
    };
    left.onclick = function () {
        if (n > 0) {
            n--
        } else if (n == 0) {
            n = kkk.length - 1;
        }
        var li = document.getElementById("lunbotu-Btn").getElementsByTagName("li");
        li[n].onmouseover()
    };
    right.onclick = function () {
        n = n >= (kkk.length - 1) ? 0 : ++n;
        var li = document.getElementById("lunbotu-Btn").getElementsByTagName("li");
        li[n].onmouseover()
    }
    
};

