/**
 * 理财课堂文章详情
 */
define("osoa/scripts/customer/laws/detail", function(require, exports, module) {
    var pageId = "#customer_laws_detail ";
    var articleService = require("articleService");
    var layerUtils = require("layerUtils");

    //初始化 
    function init(param) {
        var articleId = param.article_id;
        // var title_name = param.title_name;
        var parent_id = param.parent_id;
        $("#include_header .nav_wrap #hs_server").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        // $(pageId + " .crumbs #title_name").html("<a href='/osoa/views/customer/laws/list.html?catalog_id=" + parent_id + "</a>");
        initArticleDetail(articleId);
    }

    //绑定事件
    function bindPageEvent() {}

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

    var customer_laws_detail = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };

    // 暴露对外的接口
    module.exports = customer_laws_detail;
});