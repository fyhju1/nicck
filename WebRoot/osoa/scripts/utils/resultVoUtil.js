/**
 * 处理返回数据集工具类
 * @author HUANGRONALDO
 * @time 2014.3.15
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");
	layerWeb = require("/osoa/scripts/utils/layer/layerWeb");
	
	/**
	 * 功能： 根据resultVo返回数据集list，查询出错直接弹出款
	 * 参数：	resultVo:后台返回数据集
	 *      dataList:处理返回结果数据[{name:"liubao",age:18},...]
	 */
	function getResultList(resultVo, e, isNotShow) { // isNotShow:是否显示错误提示,默认显示false -- true为不显示
		if(resultVo && resultVo!=null){
			var dataList = "" ;
			if(resultVo.getErrorNo() == 0){
				try {
					dataList = resultVo.obj.results.results;
				} catch (e) {
					dataList = resultVo.getResults("results");
				} 
				
				if($.string.isNotEmpty(dataList) && !$.isEmptyObject(dataList) && dataList.length>1){
					return dataList ;
				}else{
					dataList = resultVo.getResults("results");
					return dataList ;
				}
			}else{
				if(!isNotShow && resultVo.getErrorNo()!=-997 && resultVo.getErrorNo()!=-999){
					layerWeb.msg(resultVo.getErrorInfo(),2,3) ;
				}
				return dataList ;
			}
		}else{
			if(!isNotShow){
				layerWeb.msg("网络错误，请重新尝试！",2,3) ;
			}
		}
	}
	
	
	function getResultPage(resultVo) {
		if(resultVo && resultVo!=null){
			var result = {};
			if(resultVo.getErrorNo() == 0){
				var dataList = resultVo.getResults("results");
				//var pageInfo = resultVo.getResults("DataSet1");
				if($.string.isNotEmpty(dataList)){
					result["data"] = dataList[0].data;
					result["total_pages"] = dataList[0].totalPages;
					result["total_rows"] = dataList[0].totalRows;
					result["page_count"]= dataList[0].numPerPage;
					result["curr_page"] = dataList[0].currentPage;
					return result ;
				}else{
					return [];
				}
			}else{
				if(resultVo.getErrorNo()!=-997 && resultVo.getErrorNo()!=-999){
					layerWeb.msg(resultVo.getErrorInfo(),2,3) ;
				}
				return [] ;
			}
		}else{
			layerWeb.msg("网络错误，请重新尝试！",2,3) ;
		}
	}
	

	function getResultFlag(resultVo, isNotShow) {
		if(resultVo && resultVo!=null){
			if(resultVo.getErrorNo() == 0){
				return true ;
			}else{
				if(!isNotShow && resultVo.getErrorNo()!=-997 && resultVo.getErrorNo()!=-999){
					layerWeb.msg(resultVo.getErrorInfo(),2,3) ;
				}
				return false ;
			}
		}else{
			if(!isNotShow){
				layerWeb.msg("网络错误，请重新尝试！",2,3) ;
			}
			return false ;
		}
	}
	var resultVoUtil = {
		"getResultList" : getResultList,
		"getResultPage":getResultPage,
		"getResultFlag":getResultFlag
	};
	// 暴露对外的接口
	module.exports = resultVoUtil;
});