/**
 * 项目公共方法-
 * @author 分享
 * @time 2014.3.17
 */
define("mall/scripts/utils/shareUtil",function(require, exports, module) {
	// 加载依赖模块
	var $ = require("jquery");
	require("ext");
	require("gconfig");
	require("/osoa/scripts/utils/session");
	var serviceConstants = require("/osoa/scripts/constants/serviceConstants") ;
	
	/**
	 * @功能 
	 * @author HUANGRONALDO
	 * @time 2014.3.19
	 */
	$.extend({
		bindShareEvent:function(){
			$("#share_ul").find("li").click(function(){
				var id = $(this).find("a").attr("id") ;
				if("site-sina"==id){
					toShare(1);
				}else if("site-qzone"==id){
					toShare(2);
				}else if("site-renren"==id){
					toShare(3);
				}else if("site-qq"==id){
					toShare(4);
				}
			}) ;
		},
		bindWebCall:function(){
			$("#web_call").click(function(){
				var left = ($(window).width() - 590)/2;
				var top = ($(window).height() - 480)/2 + $(document).scrollTop();
				var w=window.open("",'webcall','height=500,width=598,top=' + top + ',left='+ left +',toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=yes'); 
				w.document.write("<div height=500,width=598 class='loading' style='background:none;text-align:center;padding-top:220px;font-size:12px;'><img src='/mall/images/loading.gif' style='vertical-align:middle;'/>正在载入，请稍后……</div>");
				//var customerId = $.cookie("cj_online_customerId");      //从cookie中查看值
				var customerId = $.session.getPresistObj(serviceConstants.session.USER).user_id ;
				var user_name = $.session.getPresistObj(serviceConstants.session.USER).user_name ;
			    if (customerId == null) 
			    {
				    customerId = new Date().getTime() + Math.round(1000, 9999);//生存随机ID
			    }
			    if($.string.isEmpty(user_name)){
			    	user_name = "游客" ;
			    }
			    var jsonVal='';
			    
			    jsonVal="{businessId:'19',token:'token',customerId:'"+customerId+"',customerName:'"+user_name+"',sex:'未知',loginType:'0',attributes:''}";
				jsonVal = encodeURIComponent(jsonVal);
				jsonVal = encodeURIComponent(jsonVal);
				//w.location= $.gconfig.global.webcall + '?rand='+ Math.round(1000, 9999)+'&json=' + jsonVal; 
				w.location = $.gconfig.global.webcall + '?rand=7927849192&json=%257BbusinessId%253A19%252Ctoken%253A%2522token%2522%252CcustomerId%253A'+ customerId +'%252CcustomerName%253A%2522%25E6%25B8%25B8%25E5%25AE%25A2%2522%252Csex%253A%2522%25E6%259C%25AA%25E7%259F%25A5%2522%252CloginType%253A%25220%2522%252Cattributes%253A%2522%2522%257D';
			});
		}
	});
	
	function toShare(type){
		var context=$("#contextid").val();
		var url = window.top.location.href;
		context =context + " @万联证券";
		context = encodeURI(context);
		if(type != 11 ){
			url=url.replace("&&","%26").replace("&","%26").replace("=","%3D").replace("=","%3D").replace("?","%3F");
		}
		var responsestr="";
		if(type == 1){
			responsestr="http://service.weibo.com/share/share.php?title="+context+"&url="+url+"" ;
		}else if(type == 2){
			responsestr="http://v.t.qq.com/share/share.php?title="+context+"&url="+url+"" ;
		}else if(type == 3){
			responsestr="http://widget.renren.com/dialog/share?resourceUrl="+url+"&title="+context+"";
		}else if(type == 4){
			responsestr="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+url+"&title="+context+"";
		}else if(type == 5){
			responsestr="http://t.163.com/article/user/checkLogin.do?info="+context+"";
		}else if(type == 6){
			responsestr="http://hi.baidu.com/pub/show/share?title="+context+"&url="+url+"";
		}else if(type == 7){
			responsestr="http://t.hexun.com/channel/shareweb.aspx?url="+url+"&title="+context+"";
		}else if(type == 8){
			responsestr="http://t.sohu.com/third/post.jsp?title="+context+"&url="+url+"";
		}else if(type == 9){
			responsestr="http://www.diandian.com/share?ti="+context+"&lo="+url+"&type=link";
		}else if(type == 10){
			responsestr="http://s.jiathis.com?webid=tifeng&title="+context+"&url="+url+"";
		}else if(type == 11){
			url=encodeURIComponent(url);
			responsestr="http://open.tianya.cn/widget/send_for.php?action=send-html&title="+context+"&url="+url+"";
		}else if(type == 12){
			
		}
		$.window.openWin(responsestr, "800px", "500px","分享") ;
		//window.open(responsestr,"_blank");
	}
	
	shareUtil = {
			"toShare":toShare
	} ;
	
	// 暴露对外的接口
	module.exports = shareUtil;
});
