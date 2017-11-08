/**
 * 理财课堂文章详情
 */
define("osoa/scripts/index/classroom/detail", function(require, exports, module) {
    var pageId = "#index_classroom_detail ";
    var fxckhService = require("fxckhService");
    var layerUtils = require("layerUtils");

    //初始化 
    function init(param) {

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);
    }

    //绑定事件
    function bindPageEvent() {


        $(pageId + " .core #calculator_reset").bindEvent(function() {
            nav = $(pageId + " .core #net_value").val("");
            red_rate = $(pageId + " .core #red_rate").val("");
            red_quotient = $(pageId + " .core #red_quotient").val("");
            nv_date = $(pageId + " .core #choose_date").val("");
            $(pageId + " .core .cal_res .res").html("");
        });
    }




    //销毁页面，单页面时候要用
    function destroy() {

    }

    var index_classroom_detail = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };

    // 暴露对外的接口
    module.exports = index_classroom_detail;
});