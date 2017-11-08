/**
 * 关于华商 ---公司简介
 */
define("osoa/scripts/customer/server/rate", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var articleService = require("articleService");
    var fundService = require("fundService");
    var constants = require("constants");
    var pageId = "#customer_server_rate ";

    //初始化
    function init(parm) {

        $("#include_header .nav_wrap #hs_server").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        var fund_code = $(pageId + " .core #fundSleect")[0].value;
        fundRateInfo(fund_code);
    }


    //绑定事件
    function bindPageEvent() {
        $(pageId + "  .core #fundSleect").change(function() {
            var fund_code = $(pageId + " .core #fundSleect")[0].value;
            fundRateInfo(fund_code);
        });
    }

    /**
     * 基金费率function
     */
    function fundRateInfo(fund_code) {
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var result = resultVo.obj;
            if (error_no == 0) {
                if (result.results.list0.length == 0) {
                    result.length0 = 0;
                } else
                    result.length0 = 12 / result.results.list0.length;

                if (result.results.list1.length == 0) {
                    result.length1 = 0;
                } else
                    result.length1 = 12 / result.results.list1.length;
                $(pageId + " .tabs_content ").loadJuicerTemplateHtmlContent("customer/server/rate/detail", null, result, false, true, true);
            } else {
                layerUtils.iAlert(error_info, -1);
            }
            $(pageId + " .tab_box #fund_rate").addClass("current").siblings().removeClass("current");
        };
        fundService.getFundRate(callBack, { fund_code: fund_code, feerate_type: "1|2" });
    }

    //销毁页面，单页面时候要用
    function destroy() {

    }

    var customer_server_rate = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = customer_server_rate;
});