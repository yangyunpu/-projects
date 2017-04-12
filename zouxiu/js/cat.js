var iscroll;
$(function() {		
	loadCar();
	Is();	
})
function Is(){
	iscroll = new IScroll("#wrapper",{
		mouseWheel:true,
		scrollbars:true
	})
}
function loadCar() {
	$.ajax({
		type: "get",
		dataType: "jsonp",
		data: {userID: "yangchengzhen"},
		url: "http://datainfo.duapp.com/shopdata/getCar.php",
		async: true,
		success: function(data) {
			var total = 0;
			var zj = 0;
			console.log(data);
			var $scroll = $(".scroll-content");
			$.each(data, function(index) {
				console.log(data[index].number);
				var $dl = $("<dl></dl>");
				var $dt = $("<dt><img src='" + data[index].goodsListImg + "'></dt>");
				$dl.append($dt);
				var $dd = $("<dd></dd>");
				var $p1 = $("<p>" + data[index].goodsName + "</p>")
				var $i = $("<i></i>");
				$p1.append($i);
				var $p2 = $("<p>" + data[index].className + "</p>")
				var $p3 = $("<p>单价：<span>￥" + data[index].price + "</span></p>");
				var $p4 = $("<p>数量：&nbsp;</p>");
				var $a1 = $("<a href='java:void(0)' id='jian'>-</a>");
				var $input = $("<input type='text' id='count' value='" + parseInt(data[index].number) + "'/>");
				var $a2 = $("<a href='java:void(0)' id='add'>+</a>");
				$p4.append($a1);
				$p4.append($input);
				$p4.append($a2);
				$dd.append($p1);
				$dd.append($p2);
				$dd.append($p3);
				$dd.append($p4);
				$dl.append($dd);
				$scroll.append($dl);
				total = total + parseInt(data[index].number);
				zj = zj + parseInt(data[index].number) * parseInt(data[index].price);
				//减少商品
				$a1.on("touchstart",function(){
					var n = $input.val();
					if(n > 1 ){
						n--;
						total--;
						zj=zj-parseInt(data[index].price);
					}else{
						n = 1;
					}
					console.log(n);
					$input.val(n);
					$("#cartNum").text(total);
					$("#zPrice").text(zj);
					addCar(data[index].goodsID,n);
				})
				//增加商品
				$a2.on("touchstart",function(){
					var n = $input.val();
					n++;
					total++;
					zj=zj+parseInt(data[index].price);
					$input.val(n);
					$("#cartNum").text(total);
					$("#zPrice").text(zj);
					addCar(data[index].goodsID,n);
				})
				//删除商品
				$i.on("touchstart",function(){
					var m = $input.val();
					total = total - m;
					$("#cartNum").text(total);
					addCar(data[index].goodsID,0);
					$(this).parent().parent().parent().remove();
				})
			})
			Is();
			console.log(total);
			console.log(zj);
			$("#cartNum").text(total);
			$("#zPrice").text(zj);
		}
	})
}
function addCar(goodsID,n) {
	$.ajax({
		type: "post",
		url: "http://datainfo.duapp.com/shopdata/updatecar.php",
		async: true,
		data: {goodsID: goodsID,userID: "yangchengzhen",number: n},
		success: function(data) {
			console.log(data)
		}
	});
}

