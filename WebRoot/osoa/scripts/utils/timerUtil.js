/**
 * 项目公共方法-时间倒计时
 * @author HUANGRONALDO
 * @time 2014.3.15
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");

	
	//验证码倒计时
	function timer(clickFunc,btnObjId,totalTime) {// btnObjId为按钮的对象id
		var time = $.getStorage("time") ;
		if($.string.isEmpty(time) || isNaN(time)){
			time = totalTime ;
		}
		if (time == 0) {
			$("#"+btnObjId).css("cursor","pointer");
			$("#"+btnObjId).bind("click",clickFunc);
			$("#"+btnObjId).text("点击发送验证码");// 
			$.removeStorage("time");
		} else {
			$("#"+btnObjId).unbind();// 倒计时过程中禁止点击按钮
			$("#"+btnObjId).css("cursor","wait");
			$("#"+btnObjId).text(time + "秒后重新获取");// 
			time--;
			$.setSessionStorage("time",time) ;
			setTimeout(function() {
				timer(btnObjId);
			}, 1000) ;// 循环调用
		}
	}
	
	var timerUtil = {
		"timer" : timer
	};
	// 暴露对外的接口
	module.exports = timerUtil;
});