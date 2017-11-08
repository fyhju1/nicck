/**
 * 关于华商 ---公司简介
 */
define("osoa/scripts/customer/server/allSearch", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var articleService = require("articleService");
    var constants = require("constants");
    var pageId = "#customer_server_allSearch ";

    //初始化
    function init(parm) {

        $("#include_header .nav_wrap #hs_server").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

    }


    //绑定事件
    function bindPageEvent() {
        $(pageId + " .core #search_question").bindEvent(function() {
            var search_value = $.trim($(pageId + " .core #search_value").val());
            if ($.string.isEmpty(search_value)) {
                layerUtils.iAlert("请输入搜索内容");
                return;
            }
            $.redirect("customer/server/search/allList", { search: search_value });
        });
    }


    //销毁页面，单页面时候要用
    function destroy() {

    }

    var customer_server_allSearch = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = customer_server_allSearch;
});