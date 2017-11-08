/**
 * 项目公共方法-
 * @author SIMON
 * @time 2014.3.17
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");
	require("/osoa/scripts/utils/session");
	serviceConstant = require("/osoa/scripts/constants/serviceConstants") ;
	require("/osoa/scripts/utils/fileupload/ajaxupload");

	/**
	 * @功能
	 * @author HUANGRONALDO
	 * @time 2014.3.19
	 */
	$.fn.extend({
		isContainObj:function(targetObj){  //判断 obj是否已存在该 target节点
			var flag = $(this).find(targetObj).length>0?true:false;
			return flag;
		},
		numberLimit:function(){ //输入框限制，只能输入数字
			// 先把非数字的都替换掉，除了数字和.
			$(this).val($(this).val().replace(/[^\d.]/g, ""));
			// 保证只有出现一个.而没有多个.
			$(this).val($(this).val().replace(/\.{1,}/g, ""));
		},
		floatLimit:function(){//输入框限制，只能输入float数值
			// 先把非数字的都替换掉，除了数字和.
			$(this).val($(this).val().replace(/[^\d.]/g, ""));
			// 必须保证第一个为数字而不是.
			$(this).val($(this).val().replace(/^\./g, ""));
			// 保证只有出现一个.而没有多个.
			$(this).val($(this).val().replace(/\.{2,}/g, "."));
			// 保证.只出现一次，而不能出现两次以上
			$(this).val($(this).val().replace(".", "$#$").replace(/\./g, "").replace("$#$","."));
			//只能输入两个小数
			$(this).val($(this).val().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'));
		},
		moneyLimit:function(){//输入框限制，只能输入金额
			// 先把非数字的都替换掉，除了数字和.
			$(this).val($(this).val().replace(/[^\d.]/g, ""));
			// 必须保证第一个为数字而不是.
			$(this).val($(this).val().replace(/^\./g, ""));
			// 保证只有出现一个.而没有多个.
			$(this).val($(this).val().replace(/\.{2,}/g, "."));
			// 保证.只出现一次，而不能出现两次以上
			$(this).val($(this).val().replace(".", "$#$").replace(/\./g, "").replace("$#$","."));
			//只能输入两个小数
			$(this).val($(this).val().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'));
		},
		changeMenu:function(currentClass){
			$(this).children().each(function(){
				$(this).bind("click",function(){
					$(this).find("a").addClass(currentClass);
					$(this).siblings().find("a").removeClass(currentClass);
				});
			});
		},
		switchTab:function(index){ //切换tab -会员专区
			var obj = $(this);
			$(this).find("a").click(function(){
				var id = this.id;
				obj.find("a").removeClass("current") ;
				$(this).addClass("current") ;
				$("#" + id + "_content").slideDown("slow") ;
				$("#" + id + "_content").siblings().slideUp("slow") ;
			}) ;
			if($.string.isNotEmpty(index)){ //默认选中
				$(this).find("a").eq(index).click() ;
			}
		},
		showTips:function(msg){ // 错误提示
			msg = "<span class='err_tip lg_errtip'><span class='bg_tips'></span><span class='tt_tips'>"+msg+"</span></span>" ;
			$(this).parent().find(".err_tip").closeTips();
			$(this).after(msg) ;
		},
		closeTips:function(){
			$(this).parent().find(".err_tip").remove();
		},
		tabs:function(){
			$(this).find("ul").find("li").each(function(){

				$(this).bind("click",function(){
					$(this).find("a").addClass("current");
					var id = $(this).find("a").eq(0).attr("id");
					$(this).siblings().find("a").removeClass("current");
						$("#" + id + "_content").show();
						$("#" + id + "_content").siblings("div").hide();

				});
			});
		},

		showInputErr:function(flag){ // 错误提示 默认为this，flag为true 父类input显示错误
			var objValue = $(this).val() ;
			if($.string.isEmpty(objValue)){
				var title = $(this).attr("title") ;
				if(flag=="p"){ //父节点
                    $(this).parent().shake("red",3) ;
					$(this).parent().showTips("请输入"+title+" !") ;
				}else{
                    $(this).shake("red",3) ;
					$(this).showTips("请输入"+title+" !") ;
				}
			}else{
				if(flag=="p"){ //父节点
					$(this).parent().css("border","1px solid #c7c7c7").closeTips() ;
				}else{
					$(this).css("border","1px solid #c7c7c7").closeTips() ;
				}
			}
			$(this).bind("click",function(){
				if(flag=="p"){ //父节点
					$(this).parent().css("border","1px solid #c7c7c7").closeTips() ;
				}else{
					$(this).css("border","1px solid #c7c7c7").closeTips() ;
				}
			}) ;
		},

		showErr:function(msg,eventStr,isNotBorder){ // msg：提示信息,eventStr：事件,isNotBorder：border-color是否改变
			if(isNotBorder){
				$(this).showTips(msg) ;
			}else{
                $(this).shake("red",3) ;
				$(this).css("border","1px solid #FF0000").showTips(msg) ;
			}
			if($.string.isEmpty(eventStr)){
				eventStr = "keyup" ;
			}
			$(this).bind(eventStr,function(){
				if(isNotBorder){
					$(this).closeTips() ;
				}else{
					$(this).css("border","").closeTips() ;
				}
			}) ;
		},
		objVal2Array:function(){ // 根据对象获取值，封装成数组
			var array = new  Array() ;
			$(this).each(function(){
				array.push($(this).val()) ;
			}) ;
			return array ;
		},
		showAdvert:function(){ //显示广告图片切换
			//load.loadHtmlTemplate("banner/banner", $(this)[0].id, "", true, true)  ;
		},
		getVfCode:function(){//重新获取验证码
			var url = $.gconfig.global.vfImg ;
			$(this).attr("src",url + "?r="+new Date());
		},
        shake: function (className, times) { //颜色闪动
            var i = 0, t = false, o = $(this).attr("class") + " ", c = "", times = times || 2, className = className||"red";
            if (t) return;
            t = setInterval(function () {
                i++;
                c = i % 2 ? o + className : o;
                $(this).attr("class", c);
                if (i == 2 * times) {
                    clearInterval(t);
                    $(this).removeClass(className);
                }
            }, 200);
        },
	    bindTips : function(msg, dataList, pageCode, isShow, isRight) {
            var popId = $(this).attr("id") + "_pop_tip";
			var html = "<div id='" + popId + "' class='ui-poptip ui-poptip-yellow' style='font-size: 13px;z-index: 99; visibility: visible; position: absolute;display: none;'><div class='ui-poptip-container'><div class='ui-poptip-content' data-role='content' style='width: auto; height: auto;'>"+ msg + "</div></div></div>";
            $(this).append(html);
            if($.string.isEmpty(msg)){
                $("#"+popId).find(".ui-poptip-content").getTemplateHtml(pageCode,dataList) ;
            }
			$(this).hover(function(e) {
				var x = 0;
				if($.string.isEmpty(e.pageX) || e.pageX+$("#" + popId).width()>$(window).width()){
					x = $(window).width() - $("#" + popId).width() ;
				}else{
					x = e.pageX + 10;
				}
				var y = e.pageY + 10;
				$("#" + popId).css("left", x).css("top", y);
				$("#" + popId).fadeIn(100);

			}, function(e) {
				$("#" + popId).fadeOut(100);
			});
            if($.string.isNotEmpty(isShow)){//鼠标移过是否显示
                $(this).trigger('mouseenter') ;
            }
		}
	});

	 $.extend({
		 formatDateStr:function(dateStr,length){ //格式化时间，长字符串 2014032214239-》2014-03-22 14:25:37
			var dateS = "" ;
			if(!length){
				length = 12 ;
			}
			if($.string.isNotEmpty(dateStr)){
				if(dateStr.length>=4 && length>=4){//只获取 2014
					dateS = dateStr.substring(0,4) ;
				}
				if(dateStr.length>=10 && length>=10){// 获取2014-03-22
					dateS = dateS + "-" + dateStr.substring(4,6) + "-" + dateStr.substring(6,8) ;
				}
				if(dateStr.length>=12 && length>=12){// 获取 2014-03-22 14:25
					dateS = dateS + " " + dateStr.substring(8,10) + ":" + dateStr.substring(10,12) ;
				}
				if(dateStr.length>=14 && length>=14){ //获取 2014-03-22 14:25:22
					dateS = dateS + ":" + dateStr.substring(12,14) ;
				}
			}
			return dateS ;
		},
		enterKeyup:function(funcCallBack){ // 错误提示 默认为this，flag为true 父类input显示错误
			document.onkeydown = function(e){
			    var ev = document.all ? window.event : e;
			    if(ev.keyCode==13) {
			    	funcCallBack() ;
			     }
			};
		},
		strToAarry:function(str){
			if($.string.isNotEmpty(str)){
				str = $.string.replaceAll(str,"=",":'");
				str = $.string.replaceAll(str,"}, ","'},");
				str = $.string.replaceAll(str,"}]","'}]");
				str = $.string.replaceAll(str,", ","',");
				str = $.string.replaceAll(str,"%","");
				var data = "";
				eval("data="+str);
				return data ;
			}
		},
		home:function(){
			var pageCode = $.gconfig.global.home ;
			var jsonParam = {};
			$.redirect(pageCode,jsonParam);
		},
		order:function(jsonParam){
			var pageCode = "userCenter/order/index" ;
			$.desRedirect(pageCode,jsonParam);
		},
		moneyFormat:function(mStr){//
			// 1先把非数字的都替换掉，除了数字和.2保证只有出现一个.而没有多个.3保证.只出现一次，而不能出现两次以上 4只能输入两个小数
			mStr = (mStr+".00").replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$",".").replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3') ;
			if(mStr=="0.00"){
				mStr = "0" ;
			}
			return mStr ;
		},
		getHtmlContentSync:function(pageCode,successFunc){ //根据pageCode同步获取网页
			var pageUrl = $.gconfig.viewsPath + pageCode + ".html";
			$.ajax({
				url : pageUrl,
				dataType : 'html',
				async : false,
				cache : false,
				success : function(template, textStatus, XMLHttpRequest) {
					successFunc(template) ;
				}
			});
		},
		/**
		 * @author HUANGRONALDO
		 * @功能：页面跳转-----进行参数值加密
		 * @参数： pageCode:页面地址code jsonParam:页面参数--
		 */
		desRedirect : function(pageCode, jsonParam) {
			$.checkLogin(pageCode, jsonParam);
			var paramStr = "";
			if (jsonParam) {
				var result = [];
				if (jsonParam != null) {
					for ( var key in jsonParam) {
						result.push(key + "=" + $.crypto.des.encrypt(serviceConstant.encrypt_key.DES, jsonParam[key]));
					}
				}
				paramStr = result.join("&");
			}
			if (paramStr.length > 0) {
				paramStr = "?" + paramStr;
			}
			var pageUrl = $.gconfig.viewsPath + pageCode + ".html" + paramStr;
			window.location.href = pageUrl;
			return;
		},
        /**
        * @author HUANGRONALDO
        * @功能：进行参数值DES加密(新开页面)
        * @参数：jsonParam:页面参数--
        */
        desJsonParam : function(jsonParam) {
            var paramStr = "";
            if (jsonParam) {
                var result = [];
                if (jsonParam != null) {
                    for ( var key in jsonParam) {
                        result.push(key + "=" + $.replaceSpecialUrl($.crypto.des.encrypt(serviceConstant.encrypt_key.DES, jsonParam[key])));
                     }
                }
                paramStr = result.join("&");
            }
            return paramStr ;
        },
        replaceSpecialUrl : function(paramStr){ //替换参数中的特殊字符
            var paramStr = $.string.replaceAll(paramStr, "+","%2B");  //替换+
            paramStr = $.string.replaceAll(paramStr, "%","%25");  //替换%
            paramStr = $.string.replaceAll(paramStr, "/","%2F");  //替换/
            paramStr = $.string.replaceAll(paramStr, "?","%3F");  //替换?
            paramStr = $.string.replaceAll(paramStr, "#","%23");  //替换#
            paramStr = $.string.replaceAll(paramStr, "&","%26");  //替换&
            paramStr = $.string.replaceAll(paramStr, "=","%3D");  //替换=
            return paramStr ;
        },
		isBindAccount:function(){ //是否绑定了资金账号，返回true 已经绑定 和 false
			var user = $.session.getPresistObj(serviceConstant.session.USER);
			if(user && user.fund_account){
				return true ;
			}
			return false ;
		},
		getBirthdayByCID:function(id){ //根据 18位身份证号返回生日
		   if($.string.isCardID(id)){
              return id.charAt(6)+id.charAt(7)+id.charAt(8)+id.charAt(9)+'-'+id.charAt(10)+id.charAt(11)+'-'+id.charAt(12)+id.charAt(13);
           }
           return "" ;
		},
		getGenderByCID:function(id){ //根据 18位身份证号返回性别
            if($.string.isCardID(id)){
              return parseInt(id.charAt(16) / 2) * 2 != id.charAt(16)?'男':'女';
           }
           return "" ;
        }
	 });

	 $.extend($.net,{
			/**
			 * @author HUANGRONALDO
			 * @功能: 得到URL的参数值(解密)
			 * @参数: paramName:参数名
			 * @返回: 参数值
			 */
			getDesUrlParamValue : function(paramName) {
				var param = $.net.getUrlParameter();
				if (param == null) {
					return "";
				} else {
					return $.crypto.des.decrypt(serviceConstant.encrypt_key.DES, param[paramName]);
				}
			}
		});

//==================================== ADD BY SIMON START===========================================================
    /**
     * 添加下拉 SIMON 2014-03-24
     */
    function addOption(obj) {

    }

    /**
     * 下拉模拟 SIMON 2014-03-24
     */
    function selectBox(objId) {
        var liId = objId + "_lst";

        $("#" + objId).hover(
            function () {
                $("#" + liId).show();
            },
            function () {
                $("#" + liId).hide();
            }
        );
    }


    /**
     * 下拉选取.target 表示模拟select 的隐藏域, objId select 对象， func 是改变之后要添加的逻辑。
     */
    function selectChange(objId, target, func) {
        var data;
        $("#" + objId).find("ul").find("li").find("a").live("click", function () {
            data = $(this).attr("data-value");
            $("#" + target).val(data);
            $("#" + objId).find("span").eq(0).html($(this).html()).css("color", "#FF5105");
            setTimeout(function () {
                $("#" + objId).find("span").eq(0).css("color", "");
            }, 500);

            if (func) {
                func();
            }
        });

    }

    /**
     * SIMON ,针对 <div> <ul>....</ul> <div>...</div>...</div> 型 tab 切换 公共js
     */
    $.fn.extend({
        commonTab: function(index) {
            var id = $(this).attr("id");
            $(this).find("li").find("a").bind("click", function () {
                $(this).addClass("current");
                $(this).parent().siblings().find("a").removeClass("current");
                var content_id = $(this).attr("data-name");
                $("[id^=" + id + "_]").hide().filter("[id=" + id + "_" + content_id + "]").show();
            });
            if($.string.isNotEmpty(index)) {
                $(this).find("li").find("a").eq(index).click();
            }
        }
    });

    $.fn.extend({
        "getFilePath": function () {
            var obj = $(this);

            if (obj) {
                //ie
                if (window.navigator.userAgent.indexOf("MSIE") > -1) {
                    return window.URL.createObjectURL(obj.files.item(0));
                } else {
                    //firefox
                    if (obj.files) {
                        return window.URL.createObjectURL(obj.files.item(0));
                    }
                    return obj.value;
                }
                return obj.value;
            }
            return obj.value;
        }
    });

//=========================================ADD BY SIMON END ===========================================================//
	commonUtil = {
			"selectBox":selectBox,
			"selectChange":selectChange,
			"addOpt":addOption
	} ;

	// 暴露对外的接口
	module.exports = commonUtil;
});
