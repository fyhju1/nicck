/**
 * 项目公共方法-
 * @author SIMON
 * @time 2014.3.17
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");
	require("/osoa/scripts/utils/session");
	serviceConstant = require("/osoa/scripts/constants/serviceConstants") ;
	require("/osoa/scripts/utils/fileupload/ajaxupload");
	

    /**
     * 下拉模拟 
     */
	function selectBox(objId){
		var liId = objId+"_lst";
		$("#"+objId).hover(function(){
			$("#"+liId).show();
		},function(){
			$("#"+liId).hide();
		});
	}
	
	function selectChange(objId,target)
	{
		$("#" + objId).find("ul").find("li").live("click",function(){
			var data = $(this).attr("data-value");
			$("#"+target).attr("data-value",data);
			$("#"+target).html($(this).html()).css("color", "#1689ec")
			setTimeout(function () {
                $("#" + target).css("color", "");
            }, 500);
		});
	}

	//单选模拟
	function radioBox(objId){
		$("#"+objId).find("dd").live("click",function(){
			if($("#"+objId).prev().is("i")){
				//更换单位
				$("#"+objId).find("dd").removeClass("on");
				$(this).addClass("on");
				if($(this).attr("data-value")==0){
					$("#"+objId).prev().html("%");
				}else{
					$("#"+objId).prev().html("元");
				}
			}else{
				$("#"+objId).find("dd").removeClass("on");
				$(this).addClass("on");
			}
		})
	}


	function getType(objId){
		var type;
		$("#"+objId).find("dd").each(function(){
			if($(this).hasClass("on")){
				type = $(this).attr("data-value");
			}
		})
		return type;
	}

	customerUtil = {
			"selectBox":selectBox,
			"selectChange":selectChange,
			"radioBox":radioBox,
			"getType":getType
	} ;
	
	// 暴露对外的接口
	module.exports = customerUtil;
});
