/**
 * 功能:JUICER 工具类
 * @author HUANGRONALDO
 * @time 2014.4.7
 */
define(function(require, exports, module) {

    // 加载依赖模块
    require("jquery");
    require("ext");
    require("gconfig");
    var juicer = require("juicer");
    require('/osoa/scripts/utils/commonUtil');

    $.fn.extend({
        /**
         *
         * @描述: 同步获取 模板内容
         * @作者:SIMON
         * @时间:2014-4-7 上午11:09:22
         * @param:@param pageUri
         * @param:@returns
         */
        getTemplateHtml : function(pageCode, dataList,funcArr) {
            for(var k in funcArr){
                juicer.register(k, funcArr[k]);
            }
            var obj = $(this);
            var data = {
                data : dataList
            };
           
            var successFunc = function(template) {
                // 判断是否成功
                if (template) {
                	initRegister();//初始化自定义函数
                    var html = juicer(template, data);
                    $(obj).html($.trim(html));
                }
            };

            $.getHtmlContentSync(pageCode, successFunc);
        }
    });
    
    $.extend({
        /**
         * @功能: 返回模板内容
         * @author: 黄圣宙(HUANGRONALDO)
         * @time: Apr 17, 2014 8:28:02 PM
         * @param pageCode
         * @param dataList
         * @return: void
         */
        getTemplateHtml : function(pageCode, dataList) {
           // var obj = $(this);
            var data = {
                data : dataList
            };
           
            var successFunc = function(template) {
                // 判断是否成功
                if (template) {
                	initRegister();//初始化自定义函数
                    var html = juicer(template, data);
                    return $.trim(html) ;
                }
            };

            $.getHtmlContentSync(pageCode, successFunc);
        }
    });
    
    var set_default = function(data,defaultStr) {
    	if($.string.isEmpty(data)){
    		data = defaultStr ;
    	}
    	return data ;
    };

    function initRegister(){//初始化自定义函数
    	juicer.register('set_default', set_default); //注册自定义函数
    }
   
}); 