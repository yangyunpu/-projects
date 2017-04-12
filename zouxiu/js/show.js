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
	console.log(goodsID)
	loadSwiper();
	getDetailData(goodsID);
})
function loadSwiper(){
	var swiper = new Swiper(".swiper-container",{
				autoplay:2000,
				loop:true
			})
}
function getDetailData(id){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		async:true,
		dataType:"jsonp",
		data:{goodsID:id},
		success:function(data){
			var data=data[0].goodsBenUrl;
			console.log(data);
			console.log(data)
			var thisdata=eval(data);
			var $swiperWrapper=$(".swiper-wrapper");
			console.log(thisdata)
			$.each(thisdata,function(index){
				var $sliderbox=$("<div class='swiper-slide'></div>");
				var $imgbox=$("<img src='"+thisdata[index]+"'width='100%' height='100%' />");
				$sliderbox.append($imgbox);
				$swiperWrapper.append($sliderbox);
			});
			loadSwiper();
			$(".bottom .forone").on("touchstart",function(){
				console.log(111);
					window.location.href = "show.html?goodsID=" + encodeURI(goodsID);
				})
		}
	})
}
