/**
 * web3.0 分页工具类
 * @author HUANGRONALDO
 * @time 2014.3.15
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");
	require("/osoa/scripts/utils/commonUtil");
	var layerWeb = require("/osoa/scripts/utils/layer/layerWeb");
	require("/osoa/scripts/utils/juicer/juicerUtil");
	/**
	 * @功能 判断 obj下分页
	 * pageCode: 分页模板页面 
	 * dataList：数据(包含data和分页信息)
	 * pageCallBack:跳转页 调用方法
	 * isTable : 是否表格
	 * breakpage : 是否显示页面编号
	 * afterLoadCallBack ： 加载数据后回调方法
	 */
	$.fn.extend({
		loadPage:function(pageCode, dataList, pageCallBack,isTable,breakpage,afterLoadCallBack){  
			var obj = this ;
			var html = "";
			var initBreakPage=5;
			if($.string.isNotEmpty(dataList) && parseInt(dataList.total_rows)>0){
				var pageSize = parseInt(dataList.page_count) ; //每页显示条数
				var pageCount = parseInt(dataList.total_pages) ; //总页数
				
				var pageNow = parseInt(dataList.curr_page) ;//当前 页码数
				var rowCount = parseInt(dataList.total_rows) ;//总记录数
				var data = dataList.data ; //数据集
				if(isTable){
					$(obj).find("tbody").getTemplateHtml(pageCode,data);
				}else{
					$(obj).getTemplateHtml(pageCode,data);			
					if (afterLoadCallBack) {						
						afterLoadCallBack();
					}					
				}
				var pageStr = '<a href="javascript:void(0);" id=\'home_page\' >首页</a>';
					pageStr = pageStr + "<a href='javascript:void(0);' id='pre_page' >上一页</a>" ;
					pageStr = pageStr + "<span>第" + pageNow + "/" + pageCount + "页</span>" ;
					pageStr = pageStr + "<a href='javascript:void(0);' id='next_page' >下一页</a>" ;
					pageStr = pageStr + "<a href='javascript:void(0);' id='end_page' >末页</a>" ;
					pageStr=pageStr+'<input type="text" value="'+pageNow+'" id="page_jump_txt" class=""/>页</span><a href="javascript:void(0);" id="pageJump" class="go">GO</a> ';
				if(isTable){
					$(obj).find(".page_footer").html(pageStr).slideDown("slow"); //页脚
				}else{
					if(pageCount!=1){//只有一页就不显示分页
					$(' <div class="page" style="text-align:center">'+pageStr+'</div>').appendTo(obj);
					}
				}

				$(obj).find("#page_jump_txt").live("keyup",function(){ //禁止输入非数字
					$(this).numberLimit() ;
				});
				
				$(obj).find("#home_page").click(function(){ //首页
					pageCallBack(1,pageSize);
				});
				$(obj).find("#end_page").click(function(){ //末页
					pageCallBack(pageCount,pageSize);
				});
				$(obj).find("#pre_page").click(function(){ //上一页
					if(pageNow>1){
						pageCallBack(pageNow-1,pageSize);
					}
				});
				$(obj).find("#next_page").click(function(){ //下一页
					if(pageNow<pageCount){
						pageCallBack(pageNow+1,pageSize);
					}
				});
				$(obj).find("#pageJump").click(function(){ //输入数字 跳页
					var pageNumVal = $(obj).find("#page_jump_txt").val() ;
					if($.string.isNotEmpty(pageNumVal)){
						var pageNum=parseInt(pageNumVal);
						if(pageNum>=1 && pageNum<=pageCount){
							pageCallBack(pageNum,pageSize);
						}else{
							layerWeb.showObjError("输入的页码超出范围！",this,2) ;
						}
					}else{
						layerWeb.showObjError("请输入页码！",this,2) ;
					}
				});
			}else{
				if(isTable){
					$(obj).find("tbody").html("");
					$(obj).find(".page_footer").html("暂无相关数据...").slideDown("slow") ;
				}else{
					$(obj).html("<div style='padding:10px'>暂无数据...</div>");
					
				}
			}
			
		},
		bindPageEvent:function(pageCallBack){
			var obj = this ;
			var pageSize = $(obj).find("#pageSize") ;
			var pageCount = parseInt($(obj).find("#pageCount")) ;
			$(obj).find("#page_jump_txt").live("keyup",function(){ //禁止输入非数字
				$(this).numberLimit() ;
			});
			$(obj).find(".page_num").click(function(){ //点击数字跳转
				var pageNum = parseInt($(this).attr("data-pageNum")) ;
				if($.string.isNotEmpty(pageNum)){
					pageCallBack(pageNum,pageSize);
				}
			});
			
			$(obj).find("#home_page").click(function(){ //首页
				pageCallBack(1,pageSize);
			});
			$(obj).find("#end_page").click(function(){ //末页
				pageCallBack(pageCount,pageSize);
			});
			$(obj).find("#pre_page").click(function(){ //上一页
				if(pageNow>1){
					pageCallBack(pageNow-1,pageSize);
				}
			});
			$(obj).find("#next_page").click(function(){ //下一页
				if(pageNow<pageCount){
					pageCallBack(pageNow+1,pageSize);
				}
			});
			$(obj).find(" #pageJump").click(function(){ //输入数字 跳页
				var pageNum = parseInt($(obj).find("#page_jump_txt").val()) ;
				
				if($.string.isNotEmpty(pageNum)){
					if(pageNum>=1 && pageNum<=pageCount){
						pageCallBack(pageNum,pageSize);
					}else{
						layerWeb.showObjError("输入的页码超出范围！",this,2) ;
					}
				}else{
					layerWeb.showObjError("请输入页码！",this,2) ;
				}
			});
		}
	});
	var pageUtil = {
	};
	// 暴露对外的接口
	module.exports = pageUtil;
});