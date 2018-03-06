function zhuce(zhucefrom){
	console.log("ddd");
    if(zhucefrom.username.value==""){//验证用户名是否为空
        alert("请输入用户名！");
        zhucefrom.username.focus();
        return false;
    }
    if(zhucefrom.pwd.value==""){       //验证密码是否为空
        alert("请输入密码！");
        zhucefrom.pwd.focus();
        return false;
    }  
    if(zhucefrom.pwd1.value==""){       //验证密码1是否为空
        alert("请再输入密码！");
        zhucefrom.pwd1.focus();
        return false;
    }  
    if(zhucefrom.pwd1.value!=zhucefrom.pwd.value){       //验证密码和密码2是不是一样
        alert("两次密码不一样");
        zhucefrom.pwd1.focus();
        return false;
    }  
    
    if(zhucefrom.tel.value==""){       //验证电话是否为空
        alert("请输入电话");
        zhucefrom.tel.focus();
        return false;
    }  
    if(zhucefrom.tel.value.length!=11){       //验证电话正确
        alert("请输入正确的电话");
        zhucefrom.tel.focus();
        return false;
    }  
    window.location.href = "gerenzhongxin.html";//跳转到主页
}