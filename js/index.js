function login(loginfrom){//传入表单参数
	console.log("ddd");
    if(loginfrom.username.value==""){//验证用户名是否为空
        alert("请输入用户名！");
        loginform.username.focus();
        return false;
    }
    if(loginform.password.value==""){       //验证密码是否为空
        alert("请输入密码！");
        loginform.password.focus();
        return false;
    }  
    window.location.href = "html/gerenzhongxin.html";//跳转到主页
    // var param="Login?action=login"+"&username="+loginform.username.value+"&password="+loginform.password.value;  //将登录信息连接成字符串，作为发送请求的参数
    // $.ajax({
    //     url:param,
    //     type:"POST",
    //     dataType:"json",
    //     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',//防止乱码
    //     success:function(data){
    //         if(data == false){
    //             alert("您输入的用户名或密码有错！");loginform.username.focus();return false;
    //         }else{
    //             window.location.href = "../Test/html/gerenzhongxin.html";//跳转到主页
    //         }
    //     }
    // });
}