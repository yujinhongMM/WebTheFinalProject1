
$(document).ready(function(){
    //Settings
    
    var shunxuplay=1;//顺序播放 2：随机 3：单曲
    var time;//当前的播放时间
    var length;//存储歌长
    var Sound=0.5;//记录音量 
    var ssound=1;//判断是不是静音

    var playlist=[
        {
            title:'Bye Bye Bye',
            artist:'Lovestoned',
            album:'未知',
            cover:'../img/2.gif',
            mp3:'../music/Lovestoned - Bye Bye Bye.mp3',
        },
        {
            title:'Axero',
            artist:'Trip',
            album:'未知',
            cover:'../img/ef6d41.gif',
            mp3:'../music/Axero - Trip.mp3',
        },
        {
            title:'さくらのうた',
            artist:'高橋優 ',
            album:'未知',
            cover:'../img/555.png',
            mp3:'../music/高橋優 - さくらのうた.mp3',
        },
        {
            title:'ヤキモチ',
            artist:'高橋優',
            album:'未知',
            cover:'../img/touxiang0.jpg',
            mp3:'../music/高橋優 - ヤキモチ.mp3',
        },
        {
            title:'浓情淡如你',
            artist:'周深',
            album:'未知',
            cover:'../img/timg.jpg',
            mp3:'../music/周深 - 浓情淡如你.mp3',
        },
        {
            title:'DJ Okawari',
            artist:'Flower Dance',
            album:'未知',
            cover:'../img/mc.gif',
            mp3:'../music/DJ Okawari - Flower Dance.mp3',
        },
        {
            title:'恋色旋律-有你的幸福',
            artist:'MEIKO,KAITO,初音ミク',
            album:'未知',
            cover:'../img/110.gif',
            mp3:'../music/MEIKO,KAITO,初音ミク - 恋色旋律-有你的幸福 - V家10人中日双语.mp3',
        },
        {
            title:'賭神',
            artist:'卢冠廷',
            album:'未知',
            cover:'../img/9.gif',
            mp3:'../music/卢冠廷 - 賭神.mp3',
        },
        
        
    ];
    //添加歌单元素
    for(var i=0;i<playlist.length;i++){
        var item=playlist[i];
        $('#m-playlist').append('<li>'+item.artist+'-'+item.title+'</li>');
        
    }

    


   



     


    //初始化
    var mscid=0;
    $("#audio")[0].src=playlist[mscid].mp3;
    $("#m-player .m-cover").css({"background-image":"url("+playlist[mscid].cover+")"});
    $("#Middle .m-tag strong").html(playlist[mscid].title);
    $("#Middle .m-tag .m-artist").html(playlist[mscid].artist);
    $("#Middle .m-tag .m-album").html(playlist[mscid].album);
    $("#m-playlist").find("li:eq(0)").addClass("m-playing");
    $("#audio")[0].volume=0.5;


    //点击列表
    for(var i=0;i<playlist.length;i++){
        $("#m-playlist").find("li:eq("+i+")")[0].index=i;
        //console.log($("#m-playlist").find("li:eq("+i+")")[0].index)
        $("#m-playlist").find("li:eq("+i+")").click(function(){
            mscid=$(this)[0].index;
            GaiBian();
            run();
        })
    }

     //上下点击歌曲的变化函数
     function GaiBian(){
        $("#audio")[0].src=playlist[mscid].mp3;
        $("#m-player .m-cover").css({"background-image":"url("+playlist[mscid].cover+")"});
        $("#Middle .m-tag strong").html(playlist[mscid].title);
        $("#Middle .m-tag .m-artist").html(playlist[mscid].artist);
        $("#Middle .m-tag .m-album").html(playlist[mscid].album);
        for(var j=0;j<playlist.length;j++){
            $("#m-playlist").find("li:eq("+j+")").removeClass("m-playing");
        }
        $("#m-playlist").find("li:eq("+mscid+")").addClass("m-playing");
    }
    //上一首
    $("#mlast").click(function(){
          if(mscid==0){
            mscid=playlist.length-1;
          }else{
              mscid--;
          }
        GaiBian();
       run();
     });
     //下一首
     $("#mnext").click(function(){
        if(mscid==playlist.length-1){
            mscid=0;
        }else{
            mscid++;
        }
        GaiBian();
         run();
   });
    //暂停
    $("#mrun").click(function(){
        run();
   });
     //歌曲开始放
     function run(){
        var audio=$("#audio")[0];
        //console.log(audio.src);
        
		if(audio.paused){
            $("#m-player .m-ctrl .m-control .m-playback").css({"background-image":"url(../img/music/pause.png)"});
            audio.play();
        }else{
            $("#m-player .m-ctrl .m-control .m-playback").css({"background-image":"url(../img/music/play.png)"});
            audio.pause();
        }
        ShiChang();
      }
    //获取当前歌曲的歌长
    function GeChang(){
        setTimeout(function(){
            length=$("#audio")[0].duration;
            if(isNaN(length)){
                GeChang();
            }else{
                 console.info("该歌曲的总时间为："+$("#audio")[0].duration+"秒")  
            }
        },10);
        length=$("#audio")[0].duration;
    }
    //获取当前的播放时间
    function ShiChang(){
        GeChang();
        time=setInterval(function(){
        var cur=$("#audio")[0].currentTime;//获取当前的播放时间
        $("#time0").text(format(parseInt(cur/60))+ ':' + format(parseInt(((cur-60*parseInt(cur/60))))));
        $("#m-loaded").css({"width":cur/length*100+"%"});
        ShunXu();//顺序
        },10)
    }

    //顺序
    function ShunXu(){
        if($("#audio")[0].ended){
            clearInterval(time);
            switch(shunxuplay){
                case 1://顺序播放
                if(mscid==playlist.length-1){
                    mscid=0;
                }else{
                    mscid++;
                };break;
                case 2://随机播放
                mscid=parseInt(Math.random() * playlist.length);break;
                case 3:;break;//单曲循环
            }
            GaiBian();
            run();
        }
    }

    //点击选择顺序或随机
    $("#suijiShunxuDanqu").click(function(){
        if(shunxuplay==3){
            shunxuplay=1;
        }else{
            shunxuplay++;
        }
        switch(shunxuplay){
            case 1://顺序播放
            $(this).css({"background-image":"url(../img/repeat.png)"});
            ;break;
            case 2://随机播放
            $(this).css({"background-image":"url(../img/shuffle.png)"});
            ;break;
            case 3:
            $(this).css({"background-image":"url(../img/danqu.png)"});;break;//单曲循环
        }
    })

    //进度条的控制
    $("#m-slider0").click(function(){
        if($("#audio")[0].currentTime){//如果不判断的话会在开始没有播放音乐的时候，点击的话会报异常
            var x=event.offsetX;//距左边的X轴
            var Width=$("#m-slider0").width();//整个div的长度
            $("#audio")[0].currentTime=(x/Width)*length;
        }
    })
    //控制声音的大小
    $("#m-slider1").click(function(){
            var x=event.offsetX;//距左边的X轴
            var Width=$("#m-slider1").width();//整个div的长度
            Sound=$("#audio")[0].volume=x/Width;
            $("#m-loaded0").css({"width":(Sound*100)+"%"});
    })
    //控制有无声音
    $("#m-slider2").click(function(){
        console.log(ssound)
        if(ssound==0){
            $(this).css({"background-image":"url(../img/volume.png)"});
            ssound=1;
            $("#audio")[0].volume=Sound;
            $("#m-loaded0").css({"width":(Sound*100)+"%"});
        }else{
            $(this).css({"background-image":"url(../img/mute.png)"});
            ssound=0;
            $("#audio")[0].volume=0;
            $("#m-loaded0").css({"width":0+"%"});
        }
        
    })


    //格式秒数
    function format(a)
    {
        return a.toString().replace(/^(\d)$/, "0$1")	
    }
});