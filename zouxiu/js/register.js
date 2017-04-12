$(function(){
	
})
function register(){
	var url = "register.html";
	window.location.href= url;

}
function login(){
	var url = "login.html";
	window.location.href= url;
}

function _register(){
	var username = $("#username").val();
	var psd = $("#poss").val();
	var apsd = $("#aposs").val();
	if(username == ""){
		alert("请输入用户名")
	}else{
		if(psd == ""){
			alert("请输入密码")
		}else{
			if(psd == apsd){
				var user = getUser(username,psd);
				registerData(user)
			}else{
				alert("输入密码不一致")
			}
		}
		
	}	
}
function getUser(userID,psd){
	var user = {
		userID:userID,
		password:psd
	}
	return user
}
function registerData(user){
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		async:true,
		data:{status:"register",userID:user.userID,password:user.password},
		success:function(data){
			console.log(data);
			if(data == 0){
				alert("用户名已注册")
			}else if(data == 1){
				alert("注册成功")
			}else{
				alert("浏览器错误    状态码500")
			}
			
		}
	});
	
	
}
