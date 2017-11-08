/**
 * 关于华商 ---公司简介
 */
define("osoa/scripts/customer/index", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var fxckhService = require("fxckhService");
    var constants = require("constants");
    var pageId = "#customer_index ";

    //初始化
    function init(parm) {

        $("#include_header .nav_wrap #hs_server").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);


        initGroup("hs_club");
    }


    //绑定事件
    function bindPageEvent() {
        $(pageId + " .cs_banner #search_question").bindEvent(function() {
            var search_value = $.trim($(pageId + " .cs_banner #search_value").val());
            if ($.string.isEmpty(search_value)) {
                layerUtils.iAlert("请输入搜索内容");
                return;
            }
            $.redirect("customer/server/search/list", { search: search_value });
        });
    }

    function initGroup(group_no) {
        fxckhService.getGroup(function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                var str = "";
                for (var i = 0; i < results.length; i++) {
                    if (i % 4 == 0) {
                        str += '<div class="swiper-slide"> <div class="csSwiItem">';
                    }
                    str += '<img style="width:332px;height:215px;" src="' + results[i].picture + '">';
                    if (((i + 1) % 4 == 0 || i == results.length - 1) && i != 0) {
                        str += "</div></div>";
                    }
                }
                $(pageId + " .cs_swiper #cs_swiper_core .swiper-wrapper").html(str);

                var swiper = new Swiper('#cs_swiper_core', {
                    loop: true,
                    autoplay: 4000,
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                });

            } else {
                layerUtils.iAlert(error_info);
            }
        }, { group_no: group_no });
    }

    //销毁页面，单页面时候要用
    function destroy() {

    }

    var customer_index = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = customer_index;
});