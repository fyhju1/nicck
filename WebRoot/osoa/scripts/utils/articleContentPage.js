/**
 * web3.0 内容分页工具类
 * @author lihui
 * @time 2015.05.24
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
	 * clickFunc:跳转页 调用方法
	 * 
	 */
	$.fn.extend({
		loadPage:function(pageCode, dataList, pageCallBack,isTable,breakpage){  
			var obj = this ;
			var html = "";
			var initBreakPage=5;
			if($.string.isNotEmpty(dataList) && parseInt(dataList.total_rows)>0){
				var pageSize = parseInt(dataList.page_count) ; //每页显示条数
				var pageCount = parseInt(dataList.total_pages) ; //总页数
				var pageNow = parseInt(dataList.curr_page) ;//当前 页码数
				var rowCount = parseInt(dataList.total_rows) ;//总记录数
				var data = dataList.data ; //数据集
				//$(obj).find("tbody").hide() ;
				if(isTable){
					$(obj).find("tbody").getTemplateHtml(pageCode,data);
				}else{
					$(obj).getTemplateHtml(pageCode,data);
				}
				//$(obj).find("tbody").slideDown("slow") ;
				
				var pageStr = '<a href="javascript:void(0);" id=\'home_page\' class="page_btn01">首页</a>';
					pageStr = pageStr + "<a href='javascript:void(0);' id='pre_page' class=\"page_btn02\"></a>" ;
					var createNumber = function(num)
					{	
						if(pageNow == num){
							return " <a href='javascript:void(0);' class='page_btn04 cur' id='nextPage' value='"+num+"#"+pageCount+"' >" + num + "</a>";
						}else{
							return " <a href='javascript:void(0);' class='page_btn04'  id='nextPage' value='"+num+"#"+pageCount+"' >" + num + "</a> ";
						}
					};
					if(pageCount <= initBreakPage)
					{
						for(var i=1;i<=pageCount;i++)
						{
							pageStr += createNumber(i);	
						}
					}
					else
					{
						if(pageNow <= 3)
						{
							for(var i=1;i<pageNow + 3;i++)
							{
								pageStr += createNumber(i);		
							}
							pageStr += "…";
							pageStr += createNumber(pageCount);		
							
						}
						else if(pageNow > 3 && pageNow <= pageCount - 3)
						{
							pageStr += createNumber(1);	
							pageStr += "…";
							for(var i=pageNow - 1;i<pageNow+2;i++)
							{
								pageStr += createNumber(i);		
							}
							//pagestr += "<span>…</span>";
							pageStr += "…";
							pageStr += createNumber(pageCount);	
						}
						else
						{
							pageStr += createNumber(1);	
							//pagestr += "<span>…</span>";
							pageStr += "…";
							for(var i=pageNow-2;i<=pageCount;i++)
							{
								pageStr += createNumber(i);	
							}
						}
					}
					pageStr = pageStr + "<a href='javascript:void(0);' id='end_page' class=\"page_btn01\">尾页</a>" ;
				if(isTable){
					$(obj).find(".page_footer").html(pageStr).slideDown("slow"); //页脚
				}else{
					$(' <p class="p_btn clearfix">'+pageStr+'</p>').appendTo(obj);
				}


				$(obj).find(" .page_box #nextPage").click(function(){
					var pageNum=$(this).attr("value");
					var arr = new Array();
					  arr = pageNum.split("#");
					  pageCallBack(arr[0],pageSize);
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

		}
	});
	var pageUtil = {
	};
	// 暴露对外的接口
	module.exports = pageUtil;
});