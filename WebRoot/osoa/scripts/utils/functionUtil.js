/**
 * 公共方法
 */
define("osoa/scripts/utils/functionUtil", function (require, exports, module) {
    var	common = require("common");
    var	popup = require("popup");
    var layerWeb = require("/osoa/scripts/utils/layer/layerWeb");
    /**
     * 加入收藏
     * @param sURL
     * @param sTitle
     * @constructor
     */
    function addFavorite(url, title) {
    	
    	    try {
    	        window.external.addFavorite(url, title);
    	    }
    	    catch (e) {
    	        try {
    	            window.sidebar.addPanel(title, url, "");
    	        }
    	        catch (e) {
    	            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
    	        }
    	
    	    }
    	/*var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("360se") > -1) {
        	layerWeb.msg("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！",2,0);
        }
        else if (ua.indexOf("msie 8") > -1) {
            window.external.AddToFavoritesBar(url, title); //IE8
        }
        else if (document.all) {
	      try{
	       window.external.addFavorite(url, title);
	      }catch(e){
	    	  layerWeb.msg('您的浏览器不支持,请按 Ctrl+D 手动收藏!',2,0);
	      }
        }
        else if (window.sidebar) {
            window.sidebar.addPanel(title, url, "");
        }
        else {
        	layerWeb.msg('您的浏览器不支持,请按 Ctrl+D 手动收藏!',2,0);
        }*/
    }


    var functionUtil = {
        "addFavorite": addFavorite
    };
    module.exports = functionUtil;
});