/**
 * 投研团队 ---公司简介
 */
define("osoa/scripts/about/team", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var fxckhService = require("fxckhService");
    var pageId = "#about_team ";


    //初始化
    function init(parm) {
        $("#include_header .nav_wrap #hs_about").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        // initManagerList();

    }


    /**
     *  投研团队list展示
     */
    function initManagerList() {
        fxckhService.TeamManagerList(function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                var main_str = "";
                var slide_str = "";
                for (var i = 0; i < results.length; i++) {
                    slide_str +=
                        '<div class="swiper-slide">' +
                        '<div class="swiItem">' +
                        '<img src="' + results[i].photo_url + '">' +
                        '<div class="name">' + results[i].member_name + '</div>' +
                        //'<div class="degree">' + results[i].education + '，' + results[i].experience_time + '年从业资格</div>' +
                        '<div class="info">' + results[i].introduction + '</div></div></div>';

                    main_str += '<div class="man">' +
                        '<img src=' + results[i].photo_url + '>' +
                        '<div class="man-text">' + results[i].member_name + '</div>' +
                        '</div>';
                }
                $(pageId + " .core .swiper-container-dashijian .swiper-wrapper").html(slide_str);
                $(pageId + " .man_list").html(main_str);
            } else {
                layerUtils.iAlert(error_info);
            }
        }, { member_type: '1' });
    }

    //绑定事件
    function bindPageEvent() {

    }



    //销毁页面，单页面时候要用
    function destroy() {

    }

    var about_team = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = about_team;
});