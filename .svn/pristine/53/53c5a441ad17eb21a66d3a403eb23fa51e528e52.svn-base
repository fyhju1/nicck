/**
 * 项目公共方法-模块化加载列表类 div/li/tr
 * @author HUANGRONALDO
 * @time 2014.3.15
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");
	require("/osoa/scripts/utils/commonUtil");
	var layerUtils = require("layerUtils");
	constantUtil = require("/osoa/scripts/utils/constantUtil");
	css = require("/osoa/scripts/utils/css");
	

	
	/** (该方法已废弃，请使用JuicerUtil--HUANGRONALDO)
	 * 
	 * 功能：加载一个模板页面的html内容，里面有变量要用数据替换的时候，用${xxxx}表示，一般适用于小块区域页面，例如产品展示列表 拓展（还可以替换class，根据type返回内容如：风险等级为1，返回保守型）
	 * 参数：	pageCode:模板页面的路径编码
	 *      callBackFunc:回调函数
	 *      dataList:填充页面的数据[{name:"liubao",age:18},...]
	 *      fileds:填充数据的字段(默认加载全部字段)["product_name", "product_code"]
	 *      num:填充数据的条数(默认加载全部)
	 *      isLoading : 是否显示加载效果，默认不显示
	 *      objId : 在id下输出html
	 */
	function loadTemplate(pageCode, objId, dataList, fileds, num , callBackFunc, isLoading, isAppend) {
		//var lObj = "" ;
		if(isLoading){
			//layerUtils.iLoading(true, "加载中...", true);
			//lObj = layerWeb.loader($("#"+objId)) ;
		}
		var loadCallBack = function(template){
			var temp = template;
			var html = "";
			var dataRow ;
			if(typeof(num)=="undefined" || $.string.isEmpty(num)){
				num = dataList.length ;
			}
			
			for(var i=0 ; i<num ; i++){
				if($.string.isNotEmpty(dataList) && typeof(dataList)!="undefined" && typeof(dataList[i])!="undefined"){
					dataRow = dataList[i] ;
					template = temp;
					template = $.string.replaceAll(template, "${data.length}",dataList.length); //设置长度
					
					if(fileds && fileds.length > 0){
						for(var j = 0; j < fileds.length; j ++){
							var filed = fileds[j];
							if(template.indexOf("@{" + filed + "}") >=0){ //根据字段查找对应配置中的值，再进行设置
								var _value = constantUtil.getConstantValByPageCode(filed,dataRow[filed],pageCode) ;
								template = $.string.replaceAll(template, "@{" + filed + "}",_value);
							}
							if(template.indexOf("#{" + filed + "}") >=0){ //根据字段查找对应配置中的值，再进行设置class
								var _value = constantUtil.getCssConstantValByPageCode(filed,dataRow[filed],pageCode) ;
								template = $.string.replaceAll(template, "#{" + filed + "}",_value);
							}
							template = $.string.replaceAll(template, "${" + filed + "}",dataRow[filed]); //根据字段设置页面的值
						}
					}else{
						for ( var key in dataRow) {
							if(template.indexOf("@{" + key + "}") >=0){ //根据字段查找对应配置中的值，再进行设置
								var _value = constantUtil.getConstantValByPageCode(key,dataRow[key],pageCode) ;
								template = $.string.replaceAll(template, "@{" + key + "}",_value);
							}
							if(template.indexOf("#{" + key + "}") >=0){ //根据字段查找对应配置中的值，再进行设置class
								var _value = constantUtil.getCssConstantValByPageCode(key,dataRow[key],pageCode) ;
								template = $.string.replaceAll(template, "#{" + key + "}",_value);
							}
							template = $.string.replaceAll(template, "${" + key + "}", dataRow[key]);
						}
					}
					html = html + template;
				}
			}
			if(isAppend){
				$("#" + objId).append(html);
			}else{
				$("#" + objId).html(html);
			}
			
			css.classSubstring() ;
			//layerUtils.iLoading(false);
			if(isLoading){
				//$(lObj).remove() ;
			}
			if(callBackFunc){
				callBackFunc(objId);
			}
		};
		
		$.getHtmlContent(pageCode,loadCallBack) ;
		
	}
	
	/**
	 * 功能：加载一个html内容
	 * 参数：	pageCode:模板页面的路径编码
	 *      objId : 在id下输出html
	 *      callBackFunc:回调函数
	 *      isLoading : 是否显示加载效果，默认不显示
	 *      isModle : 是否加载模块js
	 *      param:参数
	 */
	function loadHtmlTemplate(pageCode, objId, callBackFunc,isLoading, isModel, isAppend,param) {
		if(isLoading){
			//layerUtils.iLoading(true, "加载中...", true);
		}
		var loadCallBack = function(html){
			if(isAppend){
				$("#" + objId).append(html);
			}else{
				$("#" + objId).html(html);
			}
			
			layerUtils.iLoading(false);
			if(isModel){
				if(!param){
					param = {};
				}
				$.loadPageJsModle(pageCode ,param,callBackFunc) ;
			}else{
				if(callBackFunc){
					callBackFunc(objId);
				}
			}
			
		};
		$.getHtmlContent(pageCode,loadCallBack) ;
		
	}
	

	var load = {
		"loadTemplate" : loadTemplate,
		"loadHtmlTemplate" : loadHtmlTemplate 
	};
	// 暴露对外的接口
	module.exports = load;
});