function wangjimima(wangjimimafrom){
	console.log("ddd");
    if(wangjimimafrom.username.value==""){//验证用户名是否为空
        alert("请输入用户名！");
        wangjimimafrom.username.focus();
        return false;
    }

    
    if(wangjimimafrom.tel.value==""){       //验证电话是否为空
        alert("请输入电话");
        wangjimimafrom.tel.focus();
        return false;
    }  
    if(wangjimimafrom.tel.value.length!=11){       //验证电话正确
        alert("请输入正确的电话");
        wangjimimafrom.tel.focus();
        return false;
    }  
    window.location.href = "gerenzhongxin.html";//跳转到主页
}