
b();




function b(){


    var pn=document.getElementById("pn");
    var lists=pn.children;


    //遍历所有状态信息
    for(var i=0;i<lists.length;i++){
        //全部事件代理
        lists[i].onclick=function(e){
            //获取当前点击事件
            var e=e||window.event;
            /*,e对象存在时回返e,当window.event存在时返回event，这样就区分ff,ie了。 
这是一种规范，ie下支持e.srcElement，ff支持e.target，没啥原理。
e=e||window.event; 就是或运算，结果返回不为undefined的那个值，如果2个都为undefined，则结果为undefined。 */
            var el=e.srcElement;
            if(!el){
                el=e.target;//兼容火狐
            }
            //判断点击的类名
            switch(el.className){
               //上面的点赞
               case "dzan":
               praisebox(el.parentNode.parentNode.parentNode,el);
               break;

               case "dzan1":
               praisebox(el.parentNode.parentNode.parentNode,el);
               break;

               //回复评论
               case "hf-btn hf-btn-on":
               reply(el.parentNode.parentNode.parentNode);
               break;
                //每条评论中的删除
                case "comment-dele":
                operateReply(el);
                break;
            }
        }
        var textarea=lists[i].getElementsByClassName("hf-text")[0];
        //焦点事件
        textarea.onfocus=function(){
            this.parentNode.className='hf hf-on';
            this.value = this.value == '评论…' ? '' : this.value;
        }
        //失焦事件
        textarea.onblur=function(){
            
            if(this.value==''){
                this.parentNode.className='hf';
                this.value ='评论…';							
            }						
        }
        //键盘事件
        textarea.onkeyup=function(){
            var len=this.value.length;
            var textParentNode=this.parentNode;
            var textBtn=textParentNode.children[1];
            var textNub=textParentNode.children[2];
            if(len==0 /*|| len>100*/){
                textBtn.className="hf-btn";
            }else{
                textBtn.className="hf-btn hf-btn-on";
                /*this.style.color="#333";	*/						
            }
            textNub.innerHTML=len+"/100";
        }
    }
    //遍历结束
    


    //上面的点赞
    function praisebox(box,el){
        //获取赞数量容器
        var praise=box.getElementsByClassName("people")[0];
        //获取容器当前total值
        var total=parseInt(praise.getAttribute("total"));
       
        
        //创建一个新的total存储用
        var newtotal;
        //判断点击的点赞class
        if(el.className=="dzan"){
            //total值+1  因为我还没点击赞，所以要点击的时候就多了一个人 total+1
            newtotal=total+1;
            //判断赞数量 把相应文字放到赞容器里
            praise.innerHTML=newtotal==1 ? "我觉得很赞" : "我和" + total +"个人觉得很赞";
            el.className="dzan1";
        }else{
            //反之total值-1
            newtotal=total-1;
            praise.innerHTML=newtotal==0 ? "" : newtotal +"个人觉得很赞";
            el.className="dzan";
        }
        //更新total值
        praise.setAttribute("total",newtotal);
        //如果没有人点赞容器隐藏
        praise.style.display=(newtotal==0) ? "none" : "block";
    }





    //回复评论
    function reply(box){
        //获取评论框
        var textarea=box.getElementsByTagName("textarea")[0];
        //获取包含所有评论的容器
        var comment=box.getElementsByClassName("comment-list")[0];
        //创建新的评论div
        var div=document.createElement("div");
        //赋类名
        div.className="comment";
        //设置属性
        div.setAttribute("user","self");
        //获取每条评论的innerHTML结构，每次只替换textarea的输入内容和 当前发送时间
        var html='<div class="M_M comment-left-me"></div>'+
               '<div class="comment-right">'+
               '<div class="comment-text"><span>我：</span>'+textarea.value+'</div>'+
               '<div class="comment-date">'+
               getTime()+
               '<a class="comment-dele" href="javascript:;">删除</a>'+
               '</div>'+
               '</div>';
           //插入到新建的评论div
           div.innerHTML=html;
           //把新评论插入到评论列表
           comment.appendChild(div);
           //评论后初始化textarea输入框
           textarea.value="评论…";
           textarea.parentNode.className="hf";
    }



    




   


    //操作回复
    function operateReply(el){
        //每条评论
        var comment=el.parentNode.parentNode.parentNode;
        //整个状态
        var box=comment.parentNode.parentNode.parentNode;
        //评论框
        var textarea=box.getElementsByTagName("textarea")[0];
        //名字
        var user=comment.getElementsByClassName("user")[0];
        //点击的innerHTML
        var txt=el.innerHTML;
        //判断当前点击的是否为回复
        if(txt=="回复"){
            //评论框触发焦点事件 也就是变高
            textarea.onfocus();
            //内容变为回复+当前人的名字
            textarea.value="回复 "+user.innerHTML;
            //调用键盘事件
            textarea.onkeyup();
        }else{
            //否则就是删除节点
            remove(comment);
        }
    }



   //删除当前节点
   function remove(node){
    node.parentNode.removeChild(node);
}

        

}


//获取当前时间回复评论时调用
function getTime(){
    var t=new Date();
    var y=t.getFullYear();
    var m=t.getMonth()+1;
    var d=t.getDate();
    var h=t.getHours();
    var mi=t.getMinutes();
    m=m<10?"0"+m:m;
    d=d<10?"0"+d:d;
    h=h<10?"0"+h:h;
    mi=mi<10?"0"+mi:mi;
    return y+"-"+m+"-"+d+" "+h+":"+mi;
}


//内容发布按钮
function ddd(){
    var text=document.getElementById('box2').value;//内容框
    if(text==""){
        alert("请输入内容喔！");
        return;
    }else{
        var len =text.length;
        if(len>50){
            alert("输入请小于50字节！");
            return;
        }


        var html=
        '<div class="head M_M"></div>'+
        '<div class="content">'+
          '<p class="text"><span class="name">YJH：</span>'+text+'</p>'+
          '<div class="good"><span class="date">'+getTime()+'</span><a class="dzan" href="javascript:;" title="点赞"></a></div>'+
          '<div class="people" total="0">0人觉得很赞</div>'+
          '<div class="comment-list"></div>'+
          '<div class="hf">'+
          '<textarea type="text" class="hf-text" autocomplete="off" maxlength="100">评论…</textarea>'+
          '<button class="hf-btn">回复</button>'+
          '<span class="hf-nub">0/100</span>'+
        '</div>'+
          '</div>';
        
        var foo = document.getElementById("pn");
        var LI = document.createElement('li');
        //获取所有的li
        var aLi= document.getElementById("pn").getElementsByTagName("li");
        //赋类名
        LI.className="list0";
        //插入到新建的动态li
        LI.innerHTML=html; 
        //本来就没有li节点，如果直接用insertBefore会出错，所以判断一下原来是存在li标签还是不存在，如果存在则调用insetBefore，不存在就用appendChild  
          if(aLi.length>0)  
          {  
                console.log(aLi[0])
                foo.insertBefore(LI,aLi[0]);//第一个参数是要插入的元素，第二个参数是在哪个元素之前插入  
           }else{  
                  
                foo.appendChild(LI);  
           }  
      
    }
    b();
}
//textarea字符字数计算
function keypress(){  
        var text= document.getElementById("box2").value;  
        var len; //记录剩余字符串的长度   
        if (text.length >= 50){//textarea控件不能用maxlength属性，就通过这样显示输入字符数了
            document.getElementById("box2").value = text.substr(0, 50);  
            len = 0;  
        } else {  
            len = 50 - text.length;  
        }  
        var show = "你还可以输入" + len + "个字";  
        document.getElementById("zishu").innerText = show;  
}  








