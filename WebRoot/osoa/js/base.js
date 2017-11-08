$(function(){
	/*-- 头部二维码显示--*/
	$(".top_nav .btn a.a01").hover(
	function(){
	  $(".ewm_img").show();
	},
	function(){
	  $(".ewm_img").hide();
	});
	/*-- 头部搜索显示--*/
	$(".top_nav .btn a.a03").click(function(){
		if ($(this).hasClass("hover")) {
			$(".search_box").hide();
			$(this).removeClass("hover");
		} else {
			$(".search_box").show();
			$(this).addClass("hover");
		}
	});
	$(".search_box a").click(function(){
		var key = $(this).prev().val();
		window.location = "/main/index/cxjgy/index.html?key=" + key;
	});
});
