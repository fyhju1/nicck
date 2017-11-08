/**
 * 专户知识详情  --专户理财
 */
define("osoa/scripts/separate/laws/detail", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var pageId = "#separate_laws_detail ";
    var articleService = require("articleService");

    //初始化
    function init(parm) {
        $("#include_header .nav_wrap #hs_licai").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        var articleId = parm.article_id;
        initArticleDetail(articleId);
    }


    //绑定事件
    function bindPageEvent() {

        //热门主题
        $(pageId + " #hot_theme a").bindEvent(function() {

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
                $(pageId + " .center .core .dongtai .p_title").html(results[0].title);
                $(pageId + " .center .core .dongtai #p_content").html(results[0].content);
                $(pageId + " .center .core .dongtai .p_sub_title").html("<span>发布日期： " + results[0].publish_date + "</span>");
            } else {
                layerUtils.iAlert(error_info);
            }
        }, { articleId: articleId });
    }


    //销毁页面，单页面时候要用
    function destroy() {

    }

    var separate_laws_detail = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = separate_laws_detail;
});