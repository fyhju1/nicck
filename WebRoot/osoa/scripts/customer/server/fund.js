/**
 * 关于华商 ---公司简介
 */
define("osoa/scripts/customer/server/fund", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var articleService = require("articleService");
    var constants = require("constants");
    var pageId = "#customer_server_fund ";

    //初始化
    function init(parm) {

        $("#include_header .nav_wrap #hs_server").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

    }


    //绑定事件
    function bindPageEvent() {

    }


    //销毁页面，单页面时候要用
    function destroy() {

    }

    var customer_server_fund = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = customer_server_fund;
});