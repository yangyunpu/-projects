function getQueryString(name){
	var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	var r=window.location.search.substr(1).match(reg);
	console.log(r)
	if(r != null){
		return decodeURI(r[2])
	}
	return null;
}
var goodsID=getQueryString("goodsID");
$(function(){
//	rsc();
//	lunbo();
	console.log(goodsID)
	getDetailData(goodsID);
	tab();
})
function getDetailData(id){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		async:true,
		dataType:"jsonp",
		data:{goodsID:id},
		success:function(data){
			console.log(data[0].goodsListImg);
			//第一页
			var $product = $("#one");
			var $onep1 = $("<p class='in_tops'>距离结束时间：<span>04天2小时3分4秒</span></p>");
			var oneimgbox = $("<div class='in_content'><img src='" + data[0].goodsListImg + "' width='70%' height='70%' /></div>");
			var $onein_bottom = $("<div class='in_bottom'></div>");
			var $onep2 = $("<p class='in_title'><span>" + data[0].price + "</span>距离结束时间</p>")
			var $onein_detail = $("<div class='in_detail'></p>")
			var $onep3 = $("<p class='money'><span>市场价：</span><span class='sj'>￥" + data[0].price + "</span><span class='zk'>" + data[0].discount + "折</span></p>");
			var $onep4 = $("<p class='num'><span class='gm'>" + data[0].buynumber + "人购买</span></p>")
			$onein_detail.append($onep3);
			$onein_detail.append($onep4);
			$onein_bottom.append($onep2);
			$onein_bottom.append($onein_detail);
			$product.append($onep1);
			$product.append(oneimgbox);
			$product.append($onein_bottom);
			
			
			
			//第三页
			var data=data[0].goodsBenUrl;
			var thisdata=eval(data);
			var $swiperWrapper=$(".swiper-wrapper");
			console.log(thisdata)
			$.each(thisdata,function(index){
				var $sliderbox=$("<div class='swiper-slide'></div>");
				var $imgbox=$("<img src='"+thisdata[index]+"'width='100%' height='100%' />");
				$sliderbox.append($imgbox);
				$swiperWrapper.append($sliderbox);
			});
			lunbo();
			tab()
		}
	})
}

function tab(){
	$(".bottom li a").click(function(){
		$(this).siblings().addClass("zoom").parent().siblings().find("div").removeClass("zoom");
		var index = $(this).parent().index();
		$("#wrapper .box").eq(index).removeClass("block").siblings().addClass("block")
		
		rsc();
		lunbo();
	})
	
}
function rsc(){
	var iscroll = new IScroll("#wrapper",{
		mouseWheel:true,
		scrollbars:true
	})
}

function lunbo(){
	
	var swiper = new Swiper(".swiper-container",{
		autoplay:2000,
		loop:true
	})
}
