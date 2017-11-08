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
	 * clickFunc:跳转页 调用方法
	 * 
	 */
	$.fn.extend({
		loadPage:function(pageCode, dataList, pageCallBack,isTable,settings){
			settings = jQuery.extend({
				curpage:1,//当前页
				pagecount:20,//总页数
				numPerPage:30//一页显示的记录数，默认20条
			}, settings);
			var obj = this ;
			var html = "";
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
				var pageStr = "";
				
				if(pageNow!=1){//首页、上一页
					pageStr = pageStr + "<a href='javascript:;' id='pre_page'>上一页</a>" ;
				}
				if(pageCount<=7){
					for(var i=0; i<pageCount; i++){
						pageStr = pageStr + "<a href='javascript:;' class='page_num' data-pageNum='"+ (i+1) +"' >"+ (i+1) + "</a>" ;
					}
				}else{
					var pageHome = "<a href='javascript:;' class='page_num' data-pageNum='1'>1</a>" ;
					var pageEnd = "<a href='javascript:;' class='page_num' data-pageNum='"+pageCount+"'>"+pageCount+"</a>" ;
					
					if(pageNow==1 || pageNow==2){
						pageStr = pageStr + "<a href='javascript:;' class='page_num' data-pageNum='1'>1</a><a href='javascript:;' class='page_num' data-pageNum='2'>2</a><a href='javascript:;' class='page_num' data-pageNum='3'>3</a> . . . " + pageEnd ;
					}else if(pageNow == 3){
						pageStr =  pageStr + "<a href='javascript:;' class='page_num' data-pageNum='1'>1</a><a href='javascript:;' class='page_num' data-pageNum='2'>2</a><a href='javascript:;' class='page_num' data-pageNum='3'>3</a><a href='javascript:;' class='page_num' data-pageNum='4'>4</a> . . . " + pageEnd ;
					
					}else if(pageNow==(pageCount-2)){
						pageStr = pageStr + pageHome + " . . . <a href='javascript:;' class='page_num' data-pageNum='"+(pageCount-3)+"'>"+(pageCount-3)+"</a><a href='javascript:;' class='page_num' data-pageNum='"+(pageCount-2)+"'>"+(pageCount-2)+"</a><a href='javascript:;' class='page_num' data-pageNum='"+(pageCount-1)+"'>"+(pageCount-1)+"</a><a href='javascript:;' class='page_num' data-pageNum='"+pageCount+"'>"+pageCount+"</a>";
					}else if(pageNow>(pageCount-2)){
						pageStr = pageStr + pageHome + " . . . <a href='javascript:;' class='page_num' data-pageNum='"+(pageCount-2)+"'>"+(pageCount-2)+"</a><a href='javascript:;' class='page_num' data-pageNum='"+(pageCount-1)+"'>"+(pageCount-1)+"</a><a href='javascript:;' class='page_num' data-pageNum='"+pageCount+"'>"+pageCount+"</a>";
					}else{
						pageStr = pageStr + pageHome + " . . . <a href='javascript:;' class='page_num' data-pageNum='"+(pageNow-1)+"'>"+(pageNow-1)+"</a><a href='javascript:;' class='page_num' data-pageNum='"+pageNow+"'>"+pageNow+"</a><a href='javascript:;' class='page_num' data-pageNum='"+(pageNow+1)+"'>"+(pageNow+1)+"</a> . . . " + pageEnd ;
					}
				}
				
				if(pageNow!=pageCount){//末页、下一页
					pageStr = pageStr + "<a href='javascript:;' id='next_page'>下一页</a>" ;
				}
				
				pageStr = pageStr + "&nbsp;&nbsp; 共 <b><span id='pageCount'>"+ pageCount +"</b> 页  <b>"+rowCount+"</b>  条记录   <span class='page_skip'>&nbsp;&nbsp;跳到第<input id='page_jump_txt' value='' class='page_jump_txt' type='text'>页  <button id='pageJump' class='page_jump_btn'>确定</button>" ;
				if(isTable){
					$(obj).find(".page_footer").html(pageStr).slideDown("slow"); //页脚
				}else{
					$("<div class='cen_pagebox page_footer'>"+pageStr+"</div>").appendTo(obj);
				}

				$(obj).find(".page_num").each(function(){
					var pageNum = parseInt($(this).attr("data-pageNum")) ;
					if(pageNum==pageNow){//设置当前页码样式
						//$(this).css("background-color","#CC0001").css("color","#FFFFFF") ;
						$(this).addClass("current") ;
					}
				});
				//样式end
				
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
				
				$(obj).find("#pageJump").click(function(){ //输入数字 跳页
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
			
			$(obj).find("#pageJump").click(function(){ //输入数字 跳页
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