/**
 * 获取公共配置文件中的内容或ClassName 类
 * @author HUANGRONALDO
 * @time 2014.3.15
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	
	//cssConstant = require("/mall/scripts/constants/cssConstant");
	var cssConstant ;
	
	//根据数据中的key、value获取对应的内容（如risk_level：1 得到 风险等级为高）
	function getConstantVal(key,value){
		if($.string.isNotEmpty(constant[key])){
			if($.string.isNotEmpty(constant[key][value])){
				return constant[key][value] ;
			}
		}
		return value ;
	}
	//根据数据中的key、value获取配置文件中对应的css ClassName（如risk_level：1 得到 pro_span01 ...）
	function getCssConstantVal(key,value){
		if($.string.isNotEmpty(cssConstant[key])){
			if($.string.isNotEmpty(cssConstant[key][value])){
				return cssConstant[key][value] ;
			}
		}
		return value ;
	}
	//根据数据中的key、value获取对应的内容（如risk_level：1 得到 风险等级为高）
	function getConstantValByPageCode(key,value,pageCode){
		var pageCodeStr = $.string.replaceAll(pageCode, "/", "_") ;
		if($.string.isNotEmpty(constant[pageCodeStr + "$" + key])){
			if($.string.isNotEmpty(constant[pageCodeStr + "$" + key][value])){
				return constant[pageCodeStr + "$" + key][value] ;
			}
		}else{
			value = getConstantVal(key,value) ;
		}
		return value ;
	}
	//根据数据中的key、value获取配置文件中对应的css ClassName（如risk_level：1 得到 pro_span01 ...）
	function getCssConstantValByPageCode(key,value,pageCode){
		var pageCodeStr = $.string.replaceAll(pageCode, "/", "_") ;
		if($.string.isNotEmpty(cssConstant[pageCodeStr + "$" + key])){
			if($.string.isNotEmpty(cssConstant[pageCodeStr + "$" + key][value])){
				return cssConstant[pageCodeStr + "$" + key][value] ;
			}
		}else{
			value = getCssConstantVal(key,value) ;
		}
		return value ;
	}
	var constantUtil = {
		"getCssConstantVal" : getCssConstantVal ,
		"getConstantVal" : getConstantVal,
		"getCssConstantValByPageCode" : getCssConstantValByPageCode ,
		"getConstantValByPageCode" : getConstantValByPageCode
	};
	// 暴露对外的接口
	module.exports = constantUtil;
});