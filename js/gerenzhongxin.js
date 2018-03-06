var n=1;


window.onscroll=function(){
    //滚轮事件
        var top=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;//上下滚轮滚动的距离
        var node=document.getElementById('top');//变化的模块
        if(top>500){//就是滚动条滚动到100px位置，显示菜单，并且可以修改它的样式。
            node.style.position="fixed";
            node.style.zIndex="99990";
        }else{//当鼠标滚动回初始位子样式变回。
            node.style.position="static";
            node.style.zIndex="0";
        }
}

window.onload=function(){

         /*时间*/
         setInterval(getTimes,1000);
         function getTimes(){
             var mydate=new Date();
             var weekday=["日","一","二","三","四","五","六"];
             var mynum=mydate.getDay();
             var show=mydate.getFullYear()+"年"+(mydate.getMonth()+1)+"月"
             +mydate.getDate()+"日"+" "+"星期"+weekday[mynum]+" "+
             format(mydate.getHours())+":"+format(mydate.getMinutes());
             document.getElementById("top_m_i_t").innerText=show;
             document.getElementById("Right1_1").innerText="星期"+weekday[mynum];
             var fff = document.createElement("p");
             fff.innerText=(mydate.getMonth()+1)+"."+mydate.getDate();
             document.getElementById("Right1_1").appendChild(fff);
             if(mydate.getHours()<12&&mydate.getHours()>=7){
                 var show2="早上好，YJH！";
             }else if(mydate.getHours()<19&&mydate.getHours()>=12){
                var show2="下午好，YJH！";
             }else{
                var show2="晚上好，YJH！";
             }
             document.getElementById("top_m_i_h").innerText=show2;
         }
         function format(a)
         {
             return a.toString().replace(/^(\d)$/, "0$1")	
         }


         





}

//签到
function qiandao(){
    console.log(document.getElementById("Right1_2").innerText)
    if(document.getElementById("Right1_2").innerText=="签到"){
        document.getElementById("Right1_2").innerText="已签到";
        document.getElementById("Right1_2").style.color="rgb(91, 124, 96)";
     }
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
/*点击头像间接点击input*/
function F_Open_dialog() 
{ 
     document.getElementById("btn_file").click(); 
}
/*显示修改后的头像*/
function showPicture(imgFile) {
 //alert(window.URL.createObjectURL(imgFile.files[0]));
/*获取上传文件的路径*/
var M=document.getElementsByClassName("M_M");
for(var i=0;i<M.length;i++){
    document.getElementsByClassName("M_M")[i].style.backgroundImage="url("+window.URL.createObjectURL(imgFile.files[0])+")" ;
}
}



			

