/**
 * safety 安全密码控件 Web端
 * @author libing
 * @time 2014.8.8
 */
define("/osoa/scripts/utils/safetyUtil",function(require, exports, module) {
	// 加载依赖模块
    require("jquery");
    var layerWeb=require("osoa/scripts/utils/layer/layerWeb");
 
    $.fn.extend({
    	safePassword:function(){//检查并提示是否安装安全控件（不安装无法出现密码输入框）	
 		   var objId = $(this).attr("id") ;
    		if(checkPlugIn(objId)){
    		   checkBrowserForInput(objId);
    		}

    	},
    	getPwdObj:function(){    //获取安全控件对象
        	var obj=null;
        	var objId = $(this).attr("id") ;
        	if(navigator.userAgent.indexOf("MSIE")!=-1||navigator.userAgent.indexOf("Trident")!=-1){
        		try{
        			var cpuv = window.navigator.cpuClass;
        			if(cpuv.indexOf("x64")!=-1){
        				obj =  document.getElementById(objId+"_InputX2");
        				obj.MaxLength = 10;
        				obj.PublicKey="3f2f1fc46c9da7be0ebec3645dc0915fb6f5fce72a7f320be9958ef1fecb9b0bf95f8cab864fbe994590a60a2ba7e921708da9cd1229e9613c956b4e1c0c190ae17eac5967b9d57379af5da39594689f3384b17563526d1c583df61b5d330223f8549634b4f7d751a49e81b9203b6aa1c7215f0efdb081ec8b97480cf9334d63";
        			}
        			else{
        				obj =  document.getElementById(objId+"_InputX1");
        				obj.MaxLength = 10;
        				obj.PublicKey="3f2f1fc46c9da7be0ebec3645dc0915fb6f5fce72a7f320be9958ef1fecb9b0bf95f8cab864fbe994590a60a2ba7e921708da9cd1229e9613c956b4e1c0c190ae17eac5967b9d57379af5da39594689f3384b17563526d1c583df61b5d330223f8549634b4f7d751a49e81b9203b6aa1c7215f0efdb081ec8b97480cf9334d63";
        			}
        		}
        		catch(e){
        		}
        	}
        	else{
        		obj = document.getElementById(objId+"_embed1");
        	}
        	return obj;
    	}
    	
    });
    var InputX1 = InputX1||"";
    var InputX2 = InputX2||"";
    var embed1 = embed1||""; 
  //检查是否安装安全控件
    function checkPlugIn(objId){
    	if(!InputX1 && !InputX2 && !embed1){
    		InputX1 =document.getElementById(objId + "_InputX1");
    		InputX2 = document.getElementById(objId + "_InputX2");
    		embed1 =document.getElementById(objId + "_embed1");
    	}
    	if(navigator.userAgent.indexOf("MSIE")!=-1||navigator.userAgent.indexOf("Trident")!=-1){
    		try{
    			var cpuv = window.navigator.cpuClass;
    			if(cpuv.indexOf("x64")!=-1){
    				var version = InputX2.GetVer();
    			}else{
    				var version = InputX1.GetVer();
    			}
    		}catch(e){
    			var cpuv = window.navigator.cpuClass;
    			if(cpuv.indexOf("x64")!=-1){
    				showAlertDiv(objId,"为了您的密码安全,请下载华融商城安全控件，成功安装安全控件之后，请以管理员身份重启浏览器！","/mall/safe/华融商城安全控件(x64).exe");
    			}else{
    				showAlertDiv(objId,"为了您的密码安全,请下载华融商城安全控件，成功安装安全控件之后，请以管理员身份重启浏览器！");
    			}
    			return false;
    		}
    	}else{
    		var embed1=document.getElementById("#"+ objId+"_embed1");
    		var mimetype = navigator.mimeTypes["application/mozilla-gdzqninputx-scriptable-plugin"];//chorm支持的mime类型全部为小写
    	    if(!mimetype){
    	    	showAlertDiv(objId,"为了您的密码安全,请下载华融商城安全控件，成功安装安全控件之后，请以管理员身份重启浏览器！");
    	    	return false;
    	    }
    	}
    	return true;
    }
  //检查浏览器类型
    function checkBrowserForInput(objId)
    {
    	if(navigator.userAgent.indexOf("MSIE")!=-1||navigator.userAgent.indexOf("Trident")!=-1){
    		try{
    			var cpuv = window.navigator.cpuClass;
    			if(cpuv.indexOf("x64")!=-1){
    				var InputX2 = document.getElementById("#" + objId + "_InputX2");
    				InputX2.MaxLength = 10;
    				InputX2.PublicKey="3f2f1fc46c9da7be0ebec3645dc0915fb6f5fce72a7f320be9958ef1fecb9b0bf95f8cab864fbe994590a60a2ba7e921708da9cd1229e9613c956b4e1c0c190ae17eac5967b9d57379af5da39594689f3384b17563526d1c583df61b5d330223f8549634b4f7d751a49e81b9203b6aa1c7215f0efdb081ec8b97480cf9334d63";
    				InputX2.style.display="block";
    			}
    			else{
    				var InputX1 = document.getElementById("#" + objId + "_InputX1");
    				InputX1.MaxLength = 10;
    				InputX1.PublicKey="3f2f1fc46c9da7be0ebec3645dc0915fb6f5fce72a7f320be9958ef1fecb9b0bf95f8cab864fbe994590a60a2ba7e921708da9cd1229e9613c956b4e1c0c190ae17eac5967b9d57379af5da39594689f3384b17563526d1c583df61b5d330223f8549634b4f7d751a49e81b9203b6aa1c7215f0efdb081ec8b97480cf9334d63";
    				InputX1.style.display="block";
    			}
    		}
    		catch(e){
    			var cpuv = window.navigator.cpuClass;
    			if(cpuv.indexOf("x64")!=-1){
    				document.getElementById(objId+"_InputX2").style.display="block";
    				return false;
    			}
    			else{
    				document.getElementById(objId+"_InputX1").style.display="block";
    				return false;
    			}
    		}
    	}
    	else{
    		//document.getElementById(objId+"_embed1").SetPublicKey("3f2f1fc46c9da7be0ebec3645dc0915fb6f5fce72a7f320be9958ef1fecb9b0bf95f8cab864fbe994590a60a2ba7e921708da9cd1229e9613c956b4e1c0c190ae17eac5967b9d57379af5da39594689f3384b17563526d1c583df61b5d330223f8549634b4f7d751a49e81b9203b6aa1c7215f0efdb081ec8b97480cf9334d63");
    		document.getElementById(objId+"_embed1").style.display="block";
    		document.getElementById(objId+"_embed1").MaxLength=10;
    	
    	}
    }
    
    function openDownload(url){
    	$("yes_btn").innerHTML="刷新";
    	$("content").innerHTML="亲，安装成功后要记得重新启动浏览器！";
    	$("yes_btn").onclick=myrefresh;
    	window.open(url);
    }

    //显示下载弹框
    function showAlertDiv(objId,content,url){
    	url = url || "/mall/safe/华融商城安全控件.exe";
    	
    	layerWeb.alert(content+"点击确认进行下载！","温馨提示","",function(){
    		window.open(url);
    		closeDiv(objId);
    	},"min");
    	if(navigator.userAgent.indexOf("MSIE")!=-1||navigator.userAgent.indexOf("Trident")!=-1){
    		try{
    			var cpuv = window.navigator.cpuClass;
    			if(cpuv.indexOf("x64")!=-1){
    				document.getElementById(objId+"_InputX2").style.display="none";
    			}
    			else{
    				document.getElementById(objId+"_InputX1").style.display="none";
    			}
    		}
    		catch(e){
    		}
    	}
    	else{
    		document.getElementById(objId+"_embed1").style.display="none";
    	}
    }

    //关闭弹框
    function closeDiv(objId){
    	layerWeb.alert("亲，安装成功后要记得重新启动浏览器！","温馨提示","",function(){
    		layerWeb.closeAll();
    	});
    }

    safety={
    		
    };
    module.exports=safety;
});