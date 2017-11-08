/**
 * 社会责任 ---华商历程
 */
define("osoa/scripts/about/big/experience", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var pageId = "#about_big_experience ";
    var articleService = require("articleService");
    var constants = require("constants");

    //初始化
    function init(parm) {
        $("#include_header .nav_wrap #hs_about").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        // var articleId = parm.article_id;
        initArticleDetail();
    }


    //绑定事件
    function bindPageEvent() {

    }

    /**
     *  产品list展示
     */
    function initArticleDetail() {
        articleService.getArticleDetail(function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                // var str = ""
                $(pageId + " .center .core .article #p_content").html(results[0].content);
            } else {
                layerUtils.iAlert(error_info);
            }
        }, { articleId: constants.ARTICLEID.EXPERIENCE });
    }



    //销毁页面，单页面时候要用
    function destroy() {

    }

    var about_big_experience = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = about_big_experience;
});