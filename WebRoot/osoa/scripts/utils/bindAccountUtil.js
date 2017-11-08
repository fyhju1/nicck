/**
 * 绑定资金账号-弹出处理方式
 * 
 * @author HUANGRONALDO
 * @time 2014.3.25
 */
define("/osoa/scripts/utils/bindAccountUtil", function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");
	var layerWeb = require("/osoa/scripts/utils/layer/layerWeb");
	var userService = require("/osoa/scripts/service/index/userService");
	//var SK = require("sk");
	//var sk_trade_pwd = new SK(6);
	/**
	 * @功能
	 * @author HUANGRONALDO
	 * @time 2014.3.25
	 */

	$.extend({
		bindAccountShow : function(funcCallBack) { //弹出绑定资金账号 框
			layerWeb.showPageCode("bindAccount/bindAccount", "绑定资金账号", "265px", "400px") ;
			$("#bind_account_div").find("#bind_new").live("click",function(){//TODO 新开资金账号 
				$.window.openMaxWin("http://59.42.158.20:6080/offsite/selfopen/selfOpenPersonNew/leadin.do", "万联证券开户系统") ;
			}) ;
			$("#bind_account_div").find("#bind_now").live("click",function(){ //绑定资金账号  
				/*
				$("#bind_account_div").find("#trade_pwd").bindEvent(function(event){ 
					sk_trade_pwd.showKB($(this).get(0),'NUMONLY',true,event);
					$(".sk_div").css("z-index","2147483647") ;
				},"focus");
				*/
				$("#vf_img").getVfCode() ;
				$("#bind_account_div").find("#bind_account_first").slideUp("slow") ;
				$("#bind_account_div").find("#bind_account_second").slideDown("slow") ;
				
				$("#bind_account_div").find("#bind_account_no").blur(function(){//资金账号 输入框 失去焦点 
					$(this).showInputErr() ;
				}) ;
				$("#bind_account_div").find("#bind_trade_pwd").blur(function(){//资金密码 输入框 失去焦点 
					$(this).showInputErr() ;
				}) ;
				$("#bind_account_div").find("#vf_code").blur(function(){//yanzm输入框 失去焦点 
					$(this).showInputErr() ;
				}) ;
				
				$("#bind_account_div").find("#vf_img").bind("click",function(){//刷新验证 
					$(this).getVfCode() ;
				}) ;
				
			}) ;

			$("#bind_account_div").find("#bindAccountBtn").live("click", function(){ 
				bindSubmit(this,funcCallBack) ; //提交
			}) ;
		}
	});

	function bindSubmit(obj,funcCallBack){
		$("#bind_account_div").closeTips() ;
		var flag = true;
		flag && checkUtil.checkInput("bind_account_no") ? flag = true : flag = false;
		flag && checkUtil.checkInput("bind_trade_pwd") ? flag = true : flag = false;
		flag && checkUtil.checkInput("vf_code") ? flag = true : flag = false;

		//var trade_pwd = sk_trade_pwd.getInput() ; //资金密码
		var trade_pwd = $("#bind_trade_pwd").val() ;
		var user = $.session.getPresistObj(serviceConstants.session.USER);
		var user_id = user.user_id ;
		if($.string.isEmpty(user_id)){
			layerWeb.msg("获取用户id失败，重新登录再操作！",2,3) ;
			return ;
		}
		if(flag){
			var fund_account = $("#bind_account_div").find("#bind_account_no").val() ;
			var vf_code = $("#bind_account_div").find("#vf_code").val() ; //验证码
			$(obj).text("提交中...") ;
			$(obj).css("cursor","wait").unbind("click") ;
			var pwdCallBack = function(pwdRSAStr){ //返回加密串
				var bindCallBack = function(resultVo){
					if(result.getResultFlag(resultVo)){
						layerWeb.closeAll() ;
						layerWeb.msg("绑定资金账号成功！",2,1) ;
						var dataList = result.getResultList(resultVo) ;
						//user.fund_account = fund_account ;
						$.session.presistObj(serviceConstants.session.USER, dataList[0]) ;
						if(funcCallBack){
							funcCallBack() ;
						}
					}else{
						$("#vf_img").getVfCode();
						$(obj).text("确认绑定") ;
						$(obj).css("cursor","wait").unbind("click") ;
						$(obj).css("cursor","pointer").bind("click",function(){
							if(funcCallBack){
								bindSubmit(this,funcCallBack) ;
							}else{
								bindSubmit(this) ;
							}
						}) ;
					}
				};
				userService.bindAccount(bindCallBack, fund_account, user_id, pwdRSAStr, vf_code);
				
			} ;
			
			password.rsaEncrypt(trade_pwd,pwdCallBack) ; //加密
		}
	};
	
	
	bindAccountU = {
		"bindSubmit":bindSubmit //ie下没有内容会报错，故此增加一个
	};

	// 暴露对外的接口
	module.exports = bindAccountU;
});
