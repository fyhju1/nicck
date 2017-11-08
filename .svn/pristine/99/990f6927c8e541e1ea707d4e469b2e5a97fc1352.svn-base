/**
 * 关于华商 ---公司简介
 */
define("osoa/scripts/about/big", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var pageId = "#about_big ";

    //初始化
    function init(parm) {

        $("#include_header .nav_wrap #hs_about").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

    }


    //绑定事件
    function bindPageEvent() {

        // //热门主题
        // $(pageId + " #hot_theme a").bindEvent(function() {
        //     var theme_code = $(this).attr("theme_code");
        //     var fund_type = $(pageId + " #hot_type a.filter_all").attr("fund_type");
        //     $(this).addClass("filter_all").siblings().removeClass("filter_all");
        //     showProductList(fund_type, theme_code);
        // });

    }

    //销毁页面，单页面时候要用
    function destroy() {

    }

    var about_big = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = about_big;
});