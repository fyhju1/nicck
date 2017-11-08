/**
 * 功能:将JSON 对象持久化(cookie 域,防止 单字段持久产生过多 cookie对象)
 * @author SIMON
 * @time 2014.3.15
 */
define(function(require, exports, module) {
    $.extend({
        session : {}
    });
    $.extend($.session, {
        presistObj : function(cookiveName, json) {
            $.setSessionStorage(cookiveName, $.crypto.des.encrypt(serviceConstant.encrypt_key.DES, $.jsonToStr(json)));
            return;
        },

        getPresistObj : function(cookiveName) {
            var objStr = $.getStorage(cookiveName);
            if ($.string.isNotEmpty(objStr)) {
            	var objStr = $.crypto.des.decrypt(serviceConstant.encrypt_key.DES, objStr);
                return $.strToJson(objStr);
            } else {
                return "";
            }
        }
    });
}); 