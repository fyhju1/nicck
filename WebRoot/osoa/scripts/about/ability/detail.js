/**
 * 投研能力 ---公司简介
 */
define("osoa/scripts/about/ability/detail", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var pageId = "#about_ability_detail ";
    var articleService = require("articleService");

    //初始化
    function init(parm) {

        $("#include_header .nav_wrap #hs_about").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        var article_id = parm.article_id;
        initArticleDetail(article_id);
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

    var about_ability_detail = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = about_ability_detail;
});