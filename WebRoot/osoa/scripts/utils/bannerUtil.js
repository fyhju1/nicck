/**
 * 项目公共方法-广告
 * @author HUANGRONALDO
 * @time 2014.3.17
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");
    bannerService = require("/osoa/scripts/service/banner/bannerService");
    result = require("/osoa/scripts/utils/resultVoUtil") ;
	/**
	 * @功能 广告图片切换功能
	 * @author HUANGRONALDO
	 * 参数：
	 * 		bObjId: 大图ulclass
	 * 		mObj: 小图ulclass
	 * 		time: 图片切换的时间 毫秒 5000->5秒
	 * */
	function imgAdvert(bObjId, mObjId, time){
		//定时任务 点击切换
		var fadeImage = function(){
			var obj = $("#"+mObjId).find(".selected").parent().next() ;
			if(obj=="" || obj.length <= 0){
				$("#"+mObjId).children().eq(0).click() ;
			}else{
				obj.click() ;
			}
		};
		
		var interval = setInterval(fadeImage, time); //图片切换定时任务
		var img_height = $("#"+bObjId).height() ; //图片高度
		$("#"+mObjId).find("li").each(function(){
			var index = $(this).index() ;
			$("#"+bObjId).children().eq(index).css("position","relative").css("top","-"+img_height*index+"px") ;
			$("#"+mObjId).css("z-index","9999") ;
		}) ;
	
		$("#"+mObjId).find("li").click(function(index){
			var index = $(this).index() ;
			var i = $("#"+mObjId).find(".selected").parent().index() ;
			if(i==index){ //当前不能再点击
				return ;
			}
			$("#"+bObjId).children().stop(true,true) ;
			$("#"+mObjId).find(".selected").removeClass("selected");
			$("#"+mObjId).children().eq(index).find("a").addClass("selected");
			
			$("#"+bObjId).find(".current").fadeTo(1000,0,function(){}) ;
			$("#"+bObjId).children().eq(index).fadeTo(1000,1,function(){});
			
			$("#"+bObjId).children().queue(function(){
				$("#"+bObjId).find(".current").css("z-index","0").removeClass("current")  ; 
				$("#"+bObjId).children().eq(index).css("z-index","1").addClass("current")  ; 
				$(this).dequeue(); //队列
			});
			
			clearTimeout(interval);  //关闭定时器  
			interval = setInterval(fadeImage, time); //图片切换定时任务
		});	
		
		$("#"+mObjId).children().each(function(){ //遍历，全部点击一遍 
			$(this).click() ;
		}) ;
		$("#"+mObjId).children(":first").click() ; //回到第一个
		return interval ;
	}

    /**
     * @功能 加载切换广告图片组
     * @author HUANGRONALDO
     * @param time
     * @returns {number}
     */
    function getBannerContent(objId, groupId){
        var funcCallBack = function(resultVo){
            var dataList = result.getResultList(resultVo);
            $("#"+objId).getTemplateHtml("banner/banner",dataList) ;
            imgAdvert("banner_ul", "sbanner_ul" , 5000) ; //广告图片切换
        };
        bannerService.getBannerList(funcCallBack, groupId);
    }

	function destoryAdvert(interval){
		clearTimeout(interval);  //关闭定时器  
	}
	
	var bannerUtil = {
		"imgAdvert" : imgAdvert,
        "getBannerContent" : getBannerContent,
		"destoryAdvert" : destoryAdvert
	};
	// 暴露对外的接口
	module.exports = bannerUtil;
});