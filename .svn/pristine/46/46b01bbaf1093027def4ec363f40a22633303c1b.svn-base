/**
 * layer 弹出框 Web端
 * http://sentsin.com/jquery/layer/
 * @author HUANGRONALDO
 * @time 2014.3.15
 * 欢迎进行修改完善
 */
define(function (require, exports, module) {
	//加载引用js
	var $ = jQuery = require('jquery');
	//var layerW = require('layer');
	var juicer = require("juicer");
	require('/osoa/scripts/utils/commonUtil');
	require('/osoa/scripts/utils/layer/layer');
	/**
	 * 信息弹出框
	 * msg:显示提示的内容
	 * type:图标显示类型，0-警告 1-正确 3-错误 4-疑问 7-安全 8-哭脸 9-笑脸
	 * title：显示标题
	 * yesFunc：按钮的回调函数。
	 */
	function alert(msg, type, title, yesFunc){
		if($.string.isEmpty(msg)){
			msg = "请等候..." ;
		}
		if($.string.isEmpty(type)){
			type = 1 ;
		}
		if($.string.isEmpty(title)){
			title = "提示" ;
		}
		layerW.alert("&nbsp;&nbsp;&nbsp;&nbsp;"+msg+"&nbsp;&nbsp;&nbsp;&nbsp;<br/>", type, title, yesFunc);
	}
	
	/**
	 * 信息提示弹出框
	 * msg:显示提示的内容
	 * time：显示时间,0 表示不自动关闭
	 * parme:如果parme是一个数字，则将作为msg的图标参数，如果parme是一个函数，则将作为层消失后的end的回调，如果parme是一个object，您可配置{type:图标类型,shade：false//是否遮罩，如果是，不用配置,rate:'top'//弹出的动画类型，具体值见layer.shift的参数说明}
	 */
	function msg(msg,time,parme){
		if($.string.isEmpty(msg)){
			msg = "请等候..." ;
		}
		if($.string.isEmpty(time)){
			time = 2 ;
		}
		layerW.msg("&nbsp;&nbsp;&nbsp;&nbsp;"+msg+"&nbsp;&nbsp;&nbsp;&nbsp;",time,parme);
	}
	
	/**
	 * 询问框
	 * msg:显示提示的内容
	 * type:图标显示类型，0-警告 1-正确 3-错误 4-疑问 7-安全 8-哭脸 9-笑脸
	 * title：显示标题
	 * yesFunc：按钮的回调函数。
	 */
	function confirm(msg,type,title,yesFunc,noFunc,yTip, nTip){
		if($.string.isEmpty(msg)){
			msg = "请确定是否继续！" ;
		}
		if($.string.isEmpty(type)){
			type = 4 ;
		}
		if($.string.isEmpty(title)){
			title = "提示" ;
		}
		if($.string.isEmpty(yTip)){
			yTip = "确定" ;
		}
		if($.string.isEmpty(nTip)){
			nTip = "取消" ;
		}
		$.layerW({
		    shade : [0], //不显示遮罩
		    title : title,
		    area : ['auto','auto'],
		    dialog : {
		        msg:msg,
		        btns : 2, 
		        type : type,
		        btn : [yTip,nTip],//['确定','取消']
                offset : ['100px',''],
		        yes : function(){
		        	if(yesFunc){
		        		yesFunc();
		        	}else{
		        		layerW.closeAll() ;
		        	}
		        },
		        no : function(){
		        	if(noFunc){
		        		noFunc();
		        	}else{
		        		layerW.closeAll() ;
		        	}
		        }
		    }
		});
	}
	/**
	 * 页面层
	 * msg:显示提示的内容
	 * type:图标显示类型，0-警告 1-正确 3-错误 4-疑问 7-安全 8-哭脸 9-笑脸
	 * title：显示标题
	 * yesFunc：按钮的回调函数。
	 */
	function showHtml(objId,titleStr,height,width){
		if($.string.isEmpty(height)){
			height = "600px" ;
		}
		if($.string.isEmpty(width)){
			width = "400px" ;
		}
		$.layerW({
			type : 1,
			area : [width,height],
			title : titleStr,
            offset : ['100px',''],
			page : {dom : '#'+objId},
			close : function(index){
				layerW.close(index);
			}
		});
		
	}
	/**
	 * 页面层
	 * msg:显示提示的内容
	 * type:图标显示类型，0-警告 1-正确 3-错误 4-疑问 7-安全 8-哭脸 9-笑脸
	 * title：显示标题
	 * yesFunc：按钮的回调函数。
	 */
	function showPageCode(pageCode,titleStr,height,width,dataList,flag){
		if($.string.isEmpty(height)){
			height = "600px" ;
		}
		if($.string.isEmpty(width)){
			width = "400px" ;
		}
		if($.string.isEmpty(dataList)){
			dataList = [] ;
		}
        var data = {
            data : dataList
        };
		var successFunc = function(result){
			// 判断是否成功
			if (result) {
				var htmlStr = juicer(result, data);
				var i = $.layerW({
					type : 1,
					area : [width,height],
					title : titleStr,
					move : ['.xubox_title' , false],
                    offset : ['50px',''],
					page : {html : htmlStr},
					close : function(index){
						layerW.close(index);
					}
				});
				if(flag){
					$("#xubox_layer"+i).find(".xubox_main").find(".xubox_close").remove() ;
				}
				return i ;
			}
		};
		
        $.getHtmlContentSync(pageCode, successFunc);
	}
	/**
	 * tips提示框
	 * msg:显示提示的内容
	 * guide：1-上面 2-右 3-下 4-左。
	 */
	function tips(msg, id, color, guideId, closeflag){
		var styleStr = ['background-color:#FF9905; color:#fff', '#FF9905'];
		var obj = this ;
		if($.string.isNotEmpty(id)){
			obj = $("#"+id) ;
		}
		if($.string.isNotEmpty(id)){
			if(color == "red"){
				styleStr = ['background-color:#FF4400; color:#fff', '#FF4400'];
			}
			if(color == "green"){
				styleStr = ['background-color:#78BA32; color:#fff', '#78BA32'];
			}
			if(color == "blue"){
				styleStr = ['background-color:#80D5FE; color:#fff', '80D5FE'];
			}
		}
		if($.string.isEmpty(guideId)){
			guideId = 2 ;
		}
		if(closeflag){
			var _style ={guide: guideId,style:styleStr, closeBtn:[0, true]} ;
		}else{
			var _style ={guide: guideId,style:styleStr};
		}
		
		layerW.tips(msg , obj, _style);
	}
	

	/**
	 * showError提示框
	 * msg:显示提示的内容
	 * guide：1-上面 2-右 3-下 4-左。
	 */
	function showError(msg, id){
		var styleStr = ['background-color:#FF9905; color:#fff', '#FF9905'];
		var obj = this ;
		if($.string.isNotEmpty(id)){
			obj = $("#"+id) ;
		}
		var index = layerW.tips(msg , obj, {guide:2,style:styleStr});
		return index ;
	}
	/**
	 * showError提示框
	 * msg:显示提示的内容
	 * guide：1-上面 2-右 3-下 4-左。
	 */
	function showObjError(msg, obj, time){
		var styleStr = ['background-color:#F26C4F; color:#fff', '#F26C4F'];
		//var time = 0 ;
		if($.string.isEmpty(time)){
			time = 0 ;
		}
		if($.string.isNotEmpty(obj)){
			var index = layerW.tips(msg , obj, {guide:1,style:styleStr,time:time});
			return index ;
		}
	}
	/**
	 * iframe层
	 * url:显示内容的url
	 * type:2
	 * title：显示标题
	 */
	function iframe(url, titleStr, height, width){
		
		if($.string.isEmpty(height)){
			height = "800px" ;
		}
		if($.string.isEmpty(width)){
			width = "500px" ;
		}
		
		$.layerW({
		    type : 2,
		    iframe : {
		        src : url
		    },
		    offset : ['100px',''],
		    title : titleStr,
		    area : [height,width],
		    success : function(){ //层加载成功后进行的回调
		    	layerW.shift('top',500);
		    },
		    end : function(){ //层彻底关闭后执行的回调
		        
		    }
		});
	}
	/**
	 * 关闭弹出框
	 */
	function close(index){
		layerW.close(index) ;
	}
	/**
	 * 关闭弹出框
	 */
	function closeAll(){
		layerW.closeAll();
	}
	/**
	 * 关闭弹出框
	 */
	function loader(obj){
		var i = layerW.load(0,2);
		$("#xubox_shade"+i).remove() ;
		$("#xubox_border"+i).remove() ;
		var html = $("#xubox_layer"+i).html() ;
		$("#xubox_layer"+i).remove() ;
		var width = 0 ;
		if($(obj).width()>40){
			width = $(obj).width()/2-20 ;
		}
		$(obj).html(html) ;
		$(obj).find(".xubox_main").css("left",width+"px").css("padding-top","10px").css("filter","alpha(opacity=0)").css("background-color","rgba(0, 0, 0, 0)");
		var boxObj = $(obj).find(".xubox_main") ;
		return boxObj ;
	}
	
	var layerWeb = {
			"alert": alert,
			"msg": msg,
			"confirm": confirm,
			"showHtml": showHtml,
			"showPageCode": showPageCode,
			"tips": tips,
			"iframe": iframe,
			"showError": showError,
			"showObjError": showObjError,
			"close": close,
			"closeAll": closeAll,
			"loader": loader
		};
		//暴露对外的接口
		module.exports = layerWeb;
});
