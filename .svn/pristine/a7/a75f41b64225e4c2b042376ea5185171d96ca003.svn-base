/**
 * 项目公共方法- 绑定事件通用方法
 * @author HUANGRONALDO
 * @time 2014.3.15s
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");

	
	/**
	 * 功能：根据objId 绑定点击事件（bind）
	 * 参数：	objId: 对象id
	 *      func:事件函数
	 *      event:事件 默认为点击事件
	 */
	function bindEvent(objId, func, event) {
		if($.string.isEmpty(event)){
			event = "click" ;
		}
		
		$(objId).bind(event,function(){
			func() ;
		});
	}
	/**
	 * 功能：根据objId 绑定点击事件（live）
	 * 参数：	objId: 对象id
	 *      func:事件函数
	 *      event:事件 默认为点击事件
	 */
	function liveEvent(objId, func, event) {
		if($.string.isEmpty(event)){
			event = "click" ;
		}
		
		$(objId).live(event,function(){
			func() ;
		});
	}
	
	/**
	 * 功能：根据objId 绑定点击事件（live）
	 * 参数：	className: 对象class
	 *      func:事件函数
	 *      event:事件 默认为点击事件
	 */
	function liveEvent(className, func, event) {
		if($.string.isEmpty(event)){
			event = "click" ;
		}
		
		$("." + className).live(event,function(){
			func() ;
		});
	}
	/**
	 * 功能：根据objId 绑定点击事件（bind）
	 * 参数：	className: 对象class
	 *      func:事件函数
	 *      event:事件 默认为点击事件
	 */
	function bindEvent(className, func, event) {
		if($.string.isEmpty(event)){
			event = "click" ;
		}
		
		$("." + className).bind(event,function(){
			func() ;
		});
	}
	var event = {
		"bindEvent" : bindEvent
	};
	// 暴露对外的接口
	module.exports = event;
});