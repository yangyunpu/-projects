var myScroll;
var total = 0;
$(function(){
	loadCar();
	var swiper = new Swiper(".swiper-container",{
		autoplay:2000,
		loop:true,
		pagination:".swiper-pagination"
	});
	
	localScroll();
	getListData(1);

	
	
	var i = 1;
	document.addEventListener("touchend",function(){
		
		if(myScroll.y < myScroll.maxScrollY-50){
			i++;
			console.log(i)
			getListData(i);
		}
	});
	



//$("#search").on("propertychange input", "#search", function () { alert("i m change"); });
$('#search').change(function() { //搜索的内容
 //进行相关操作 
 var val = $("#search").val();
 console.log(val);
 search(val);
});

})



function localScroll(){
	myScroll = new IScroll("#wrapper",{
		mouseWheel:true,
		scrollbars:true
	})
}
function getListData(classID){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		data:{classID:classID},
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		async:true,
		success:function(data){
			var n = 0;
			console.log(data);
			var $box = $(".box");
			$.each(data, function(index) {
				var $one = $("<div class='one'></div>");
				var h2 = $("<h2></h2>");
				var dl = $("<dl></dl>");
				var dt = $("<dt>图片加载中</dt>");
				dl.append(dt);
				var thisimg = $("<img src='"+data[index].goodsListImg+"' width='100%' height='100%' >");
				thisimg.on("load",function(){
					myScroll.refresh();
					dt.empty();
					dt.append(thisimg);					
				});				
				thisimg.on("touchstart",function(){
					window.location.href = "html/product.html?goodsID=" + encodeURI(data[index].goodsID);
				});
				
				var dd = $("<dd></dd>");
				var p = $("<p>"+data[index].goodsName+"</p>");
				var span1 = $("<span class='span1'>￥"+data[index].price+"</span>");
				var span2 = $("<span class='span2'>￥"+data[index].price+"</span>");
				var br = $("<br/>")
				var span3 = $("<span class='span3'>"+data[index].discount+"折</span>");
				var a = $("<a href='java:void(0)' onclick='addCar()'></a>");
				a.on("touchstart",function(){
					loadCar(data[index].goodsID);
					n++;
					$.ajax({
						type:"post",
						url:"http://datainfo.duapp.com/shopdata/updatecar.php",
						async:true,
						data:{goodsID:data[index].goodsID,userID:"yangchengzhen",number:n},
						success:function(data){
							console.log(data);
						    
						}
					});
					
				})
				
				
				dd.append(p);
				dd.append(span1);
				dd.append(span2);
				dd.append(br);
				dd.append(span3);
				dd.append(a);
				dl.append(dd);
				h2.append(dl);
				
				$one.append(h2);
				$box.append($one);
				
			});
		}
	});
}


//获取数据
function loadCar(goodsID){
	var total = 0;
	$.ajax({
		type:"get",
		dataType:"jsonp",
		data:{userID:"yangchengzhen"},
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		async:true,
		success:function(data){
			
			$.each(data, function(index) {
				
				if(goodsID){
					n = parseInt(data[index].number)
				}
				
				total = total + parseInt(data[index].number);
			});
			//$("#catNum").html(total)
			
		}
	});
}

//在点击搜索时候执行的 数据传输  
function search(val){
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",
		async:true,
		data:{selectText:encodeURI(val)},
		success:function(data){
			console.log(data)
			$.each(data,function(index){
				console.log(data[index].goodsName);
			})
		}
	});
	
	
}








	