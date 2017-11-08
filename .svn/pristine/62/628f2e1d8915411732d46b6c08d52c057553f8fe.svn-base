/**
 * 关于华商 ---公司简介
 */
define("osoa/scripts/customer/server/search/detail", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var articleService = require("articleService");
    var pageId = "#customer_server_search_detail ";

    //初始化
    function init(parm) {

        $("#include_header .nav_wrap #hs_server").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        var article_id = parm.article_id;
        initArticleDetail(article_id);
    }

    //绑定事件
    function bindPageEvent() {
        $(pageId + " .core #search_question").bindEvent(function() {
            var search_value = $.trim($(pageId + " .core #search_value").val());
            if ($.string.isEmpty(search_value)) {
                layerUtils.iAlert("请输入搜索内容");
                return;
            }
            $.redirect("customer/server/search/list", { search: search_value });
        });
    }

    /**
     *  产品list展示
     */
    function initArticleDetail(articleId) {
        articleService.getArticleDetail(function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                // var str = ""
                $(pageId + " .center .core .article .real_h1").html(results[0].title);
                $(pageId + " .center .core .article #core_content").html(results[0].content);
                $(pageId + " .center .core .article .sub_title").html("<span>发布日期： " + results[0].publish_date + "</span>");
            } else {
                layerUtils.iAlert(error_info);
            }
        }, { articleId: articleId });
    }


    //销毁页面，单页面时候要用
    function destroy() {

    }

    var customer_server_search_detail = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = customer_server_search_detail;
});