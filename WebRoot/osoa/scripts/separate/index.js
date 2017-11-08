﻿/**
 * 专户理财--首页
 */
define("osoa/scripts/separate/index", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var pageId = "#separate_index ";
    var articleService = require("articleService");
    var fxckhService = require("fxckhService");
    var constants = require("constants");

    //初始化
    function init(parm) {

        $("#include_header .nav_wrap #hs_licai").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        showArticleList();

        initManagerList();
    }


    //绑定事件
    function bindPageEvent() {

        // //专户知识
        // $(pageId + " .knowledge .knowledge_wrap .wrap_left a").bindEvent(function() {

        // });
    }

    /**
     *  文章list展示
     */
    function showArticleList() {
        articleService.getNewsPage(function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                var str = "";
                if (results && results[0].data.length > 0) {
                    var length = results[0].data.length;
                    for (var i = 0; i < results[0].data.length; i++) {
                        str += '<div class="knowledge_item">' +
                            '<div class="knowledge_title"  style="overflow:hidden" >' + results[0].data[i].title + '</div>' +
                            '<div class="knowledge_txt">' + results[0].data[i].brief + '</div></div>';
                    }
                }
                $(pageId + " .knowledge .knowledge_wrap .wrap_right").html(str);
            } else {
                layerUtils.iAlert(error_info);
            }
        }, { catalog_id: '10169', page: constants.KNOWLEDGE_PAGE.PAGE, pageSize: constants.KNOWLEDGE_PAGE.PAGESIZE });
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
                var str = "";
                for (var i = 0; i < results.length; i++) {
                    if (i == results.length - 1) {
                        str += '<div class="team_item last_item">';
                    } else
                        str += '<div class="team_item">';
                    str += '<img src="' + results[i].photo_url + '" alt="">' +
                        '<div class="team_des">' +
                        ' <div class="name">' + results[i].member_name + '</div>' +
                        ' <div class="base">' + results[i].education + ' | ' + results[i].position + '</div>' +
                        '<div class="years">从业' + results[i].experience_time + '年</div>' +
                        '</div>' +
                        '<div class="label red_label">' + results[i].profession + '</div>' +
                        '</div>';
                    if (i == results.length - 1) {
                        str += '<div class="clr"></div>';
                    }
                }
                $(pageId + " .team .wrap .team_wrap").html(str);
            } else {
                layerUtils.iAlert(error_info);
            }
        }, { member_type: '2', rownum: constants.ARTICLE_PAGE.PAGESIZE, sort: "SORT" });
    }

    //销毁页面，单页面时候要用
    function destroy() {

    }

    var separate_index = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = separate_index;
});