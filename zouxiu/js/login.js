$(function(){
	var data = localStorage.getItem("user");
	if(data&&data != ""){
		$("#loginName").val(JSON.parse(data).userID);
		$("#loginPass").val(JSON.parse(data).password);
	}
})
function register(){
	var url = "register.html";
	window.location.href= url;

}
function login(){
	var url = "login.html";
	window.location.href= url;
}
function _login(){
	var username = $("#loginName").val();
	var psd = $("#loginPass").val();
	if(username == ""){
		alert("请输入用户名")
	}else{
		if(psd == ""){
			alert("请输入密码")
		}else{
			var user = getUser(username,psd);
			loginData(user)	
		}
	}	
}
function getUser(userID,psd){
	var user = {
		userID:userID,
		password:psd
	}
	return user;
}
function loginData(user){
	var check = $("#checked").attr("checked");
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		async:true,
		data:{status:"login",userID:user.userID,password:user.password},
		success:function(data){
			console.log(data);
			if(data.charAt(0) == "{"){
				alert("登陆成功了");
				if(check){
					var str='{"userID":"'+user.userID+'","password":"'+user.password+'"}';
					localStorage.setItem("user",str);
					localStorage.setItem("islogin",true)
				}				
			}else if(data == 0){
				alert("用户名不存在")
			}else{
				alert("用户名与密码不符")
			}
		}
	})
}


