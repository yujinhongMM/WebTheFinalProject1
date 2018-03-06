var zIndex = 1;//绝对定位的层数
window.onload = function ()
{

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


	  














	var oPhoto = document.getElementById("youxi-photo");
	var aThumb = oPhoto.getElementsByTagName("img");
	var oBox = document.getElementById("youxi-box");
	var aLi = oBox.getElementsByTagName("li");
	var oInput = document.getElementById("youxi").getElementsByTagName("input")[0];


	var i = 0;
	var imgPath = 0;
	var oDateStart = null;
	var aPos = [];
	var aData = [];
	// push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
	for (i = 0; i < 18; i++)aData.push(i+1);
	
	//缩略图
	for (i = 0; i < aThumb.length; i++)
	{
		aThumb[i].index = i;
		aThumb[i].onmouseover = function ()
		{
			this.className += " hover"
		};
		aThumb[i].onmouseout = function ()
		{
			// 当捕捉到hover这个class时，就用“ ”来替换掉它
			this.className = this.className.replace(/\shover/, "")
		};
		aThumb[i].onclick = function ()
		{
			for (i = 0; i < aThumb.length; i++)
			aThumb[i].className = "";	
			this.className = "selected";
			imgPath = this.index;
			oBox.innerHTML = "";
			oInput.value = "开始游戏";
			createMask();	//创建遮罩层
			aData.sort(function (a, b) {return a - b});//升序排序,如果想逆序排序改成return b-a;
			GAME(false)	//游戏处理函数
		}
	}
	
	//创建遮罩层
	function createMask()
	{
		var oMask = document.createElement("div");
		oMask.id = "mask";
		oMask.style.zIndex = zIndex;
		oBox.appendChild(oMask)//创建游戏盒
	}
	createMask();
	
	//游戏处理函数
	function GAME(ran)
	{
		//随机排列数组,&&中第一个表达式为假就不会去处理第二个表达式
		ran && aData.sort(function (a, b) {return Math.random() > 0.5 ? -1 : 1});
		//sort()可以调用一个函数做为参数，如果这个函数返回的值为-1表示数组中的a项排在b项前。如此一来，可以写一个随机函数，让Math.random()随机出来的数与0.5做为一个比较，如果大于.5就返回 -1(a排在b前面)，反之返回1(b排在a前面):
		//插入结构
		var oFragment = document.createDocumentFragment();//节约使用DOM
		//为解决这个问题，可以创建一个文档碎片，把所有的新节点附加其上，然后把文档碎片的内容一次 性添加到document中
		for (i = 0; i < aData.length; i++)
		{
			var oLi = document.createElement("li");
			var oImg = document.createElement("img");
			oImg.src = "../img/pingtu" + imgPath + "/" + aData[i] + ".jpg";
			oLi.appendChild(oImg);
			oFragment.appendChild(oLi)
		}
		oBox.appendChild(oFragment);
		oBox.style.background = "url(../img/pingtu"+imgPath+"/bg.jpg)  no-repeat";
		
		
		for (i = 0; i < aLi.length; i++)
		{
			aLi[i].index = i;
			aLi[i].style.top = aLi[i].offsetTop + "px";	
			//此属性返回表示当前元素上边缘距离offsetParent返回元素的距离的数值，单位是像素。
			aLi[i].style.left = aLi[i].offsetLeft + "px";
			aPos.push({"left":aLi[i].offsetLeft, "top":aLi[i].offsetTop})
		}	
		for (i = 0; i < aLi.length; i++)
		{
			aLi[i].style.position = "absolute";
			aLi[i].style.margin = "0";
			drag(aLi[i])//拖拽函数
		}
		
		//拖拽函数
		function drag(obj, handle)
		{
			var handle = handle || obj;
			//a&& b :如果执行a后返回true，则执行b并返回b的值；如果执行a后返回false，则整个表达式返回a的值，b不执行；
			//a || b :如果执行a后返回true，则整个表达式返回a的值，b不执行；如果执行a后返回false，则执行b并返回b的值；
			handle.style.cursor = "move";//光标	
			handle.onmousedown = function (event)
			{
				var event = event || window.event;
				var disX = event.clientX - this.offsetLeft;
				// clientX 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标。
				// 客户区指的是当前窗口。
				var disY = event.clientY - this.offsetTop;
				var oNear = null;
				obj.style.zIndex = zIndex++;
				document.onmousemove = function (event)
				{
					var event = event || window.event;			
					var iL = event.clientX - disX;
					var iT = event.clientY - disY;
					var maxL = obj.parentNode.clientWidth - obj.offsetWidth;//固定的,这里是420-70=350
					//console.log("1Q"+obj.parentNode.clientWidth)
					//console.log("2Q"+obj.offsetWidth)
					//clientWidth是对象可见的宽度，不包滚动条等边线，会随窗口的显示大小改变
					//offsetWidth 是对象的可见宽度,包滚动条等边线,会随窗口的显示大小改变 
					//offsetParent 
					// 指与位置有关的上级元素 
					//parentNode 
					//指与位置无关的上级元素 
					var maxT = obj.parentNode.clientHeight - obj.offsetHeight;			
		
					//移动位置关键
					iL < 0 && (iL = 0);
					iT < 0 && (iT = 0);
					iL > maxL && (iL = maxL);//防止跑到游戏盒外面去了
					iT > maxT && (iT = maxT);

					obj.style.left = iL + "px";
					obj.style.top = iT + "px";				
	
					for (i = 0; i < aLi.length; i++) aLi[i].className = "";
					
					oNear = findNearest(obj);//找出相遇点中最近的元素
					
					oNear && (oNear.className = "hig");
								
					return false
				};		
				// 事件会在鼠标按键被松开时发生
				document.onmouseup = function ()
				{
					document.onmousemove = null;
					document.onmouseup = null;
					if (oNear)
					{
						var tIndex = obj.index;		//交换index，这样图片数组不同下标发生了变化，但是里面li里存的数的顺序没有变			
						obj.index = oNear.index;
						oNear.index = tIndex;
						startMove(obj, aPos[obj.index]);//两个图片交换位置
						startMove(oNear, aPos[oNear.index],function ()
						{
							if (finish())//判断是否完成
							{
								var iHour = iMin = iSec = 0;
								var oDateNow = new Date();
								var iRemain = parseInt((oDateNow.getTime() - oDateStart.getTime()) / 1000);

								iHour = parseInt(iRemain / 3600);
								iRemain %= 3600;
								iMin = parseInt(iRemain / 60);
								iRemain %= 60;
								iSec = iRemain;
								
								alert("恭喜你，拼图完成，用时" + iHour  + "小时" + iMin + "分钟" + iSec + "秒");
								createMask();//创建遮罩层
							}
						});
						oNear.className = "";
					}
					else
					{
						startMove(obj, aPos[obj.index])
					}			
					handle.releaseCapture && handle.releaseCapture()
				};		
				this.setCapture && this.setCapture();		
				return false
			}
		}
		
		//找出相遇点中最近的元素
		function findNearest(obj)
		{
			var filterLi = [];
			var aDistance = [];
			
			for (i = 0; i < aLi.length; i++) aLi[i] != obj && (isButt(obj, aLi[i]) && (aDistance.push(getDistance(obj, aLi[i])), filterLi.push(aLi[i])));	
			//先判断是不是	
			var minNum = Number.MAX_VALUE;
			var minLi = null;
			
			for (i = 0; i < aDistance.length; i++) aDistance[i] < minNum && (minNum = aDistance[i], minLi = filterLi[i]);	
				
			return minLi
		}		
	}	
	GAME();
	
	//开始游戏
	oInput.onclick = function ()
	{
		oDateStart = new Date();
		oBox.innerHTML = "";		
		this.value = "重新开始";
		GAME(true)
	};
	
	//判断是否完成
	function finish()
	{
		var aTemp = [];
		var success = true;
		aTemp.length = 0;
		for (i = 0; i < aLi.length; i++)
		{
			for (var j = 0; j < aLi.length; j++)
			i == aLi[j]["index"] && aTemp.push(aLi[j].getElementsByTagName("img")[0].src.match(/(\d+)\./)[1])
			//match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
		}
		for (i = 1; i <= aTemp.length; i++)
		{
			if(i != aTemp[i-1])
			{
				success = false;
				break
			}
		}
		return success
	}
};
//求两点之间的距离
function getDistance(obj1, obj2)
{
//以每个li的中心的那个点为来进行判断
	var a = (obj1.offsetLeft + obj1.offsetWidth / 2) - (obj2.offsetLeft + obj2.offsetWidth / 2);
	var b = (obj1.offsetTop + obj1.offsetHeight / 2) - (obj2.offsetTop + obj2.offsetHeight / 2);
	return Math.sqrt(a * a + b * b)
}

//碰撞检测
function isButt(obj1, obj2)
{
	
	var l1 = obj1.offsetLeft;
	var t1 = obj1.offsetTop;
	var r1 = obj1.offsetLeft + obj1.offsetWidth;
	var b1 = obj1.offsetTop + obj1.offsetHeight;
	
	var l2 = obj2.offsetLeft;
	var t2 = obj2.offsetTop;
	var r2 = obj2.offsetLeft + obj2.offsetWidth;
	var b2 = obj2.offsetTop + obj2.offsetHeight;
	
	return !(r1 < l2 || b1 < t2 || r2 < l1 || b2 < t1)
}

//获取最终样式
function getStyle(obj, attr)
{
	return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr])
/*obj.currentStyle就强大多了，他能够获取关于这个节点所有位置的style，但是他也按照优先级，说穿了就是
显示的是什么他就是指向哪一个style，如下代码字体优先是显示blue的，那currentStyle.color就是blue，
当然此时style.color也会是blue。*/

}

//运动框架
function startMove(obj, pos, onEnd)
{
	clearInterval(obj.timer);
	obj.timer = setInterval(function ()
	{
		doMove(obj, pos, onEnd)
	}, 30)	
}


function doMove(obj, pos, onEnd)
{
	var iCurL = getStyle(obj, "left");//获取最终样式
	var iCurT = getStyle(obj, "top");//获取最终样式
	var iSpeedL = (pos.left - iCurL) / 5;
	var iSpeedT = (pos.top - iCurT) / 5;
	iSpeedL = iSpeedL > 0 ? Math.ceil(iSpeedL) : Math.floor(iSpeedL);
	iSpeedT = iSpeedT > 0 ? Math.ceil(iSpeedT) : Math.floor(iSpeedT);
	if (pos.left == iCurL && pos.top == iCurT)
	{
		clearInterval(obj.timer);
		onEnd && onEnd()
	}
	else
	{
		obj.style.left = iCurL + iSpeedL + "px";
		obj.style.top = iCurT + iSpeedT + "px";	
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

