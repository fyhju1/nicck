/**
 * 页头
 */
define("osoa/scripts/include/header", function(require, exports, module) {
    var pageId = "#include_header ";
    var layerUtils = require("layerUtils");
    var articleService = require("articleService");

    //初始化
    function init(param) {

    }



    //绑定事件
    function bindPageEvent() {
        //百度搜索
        $(pageId + " .srh_btn").bindEvent(function() {
            var serrchText = $(pageId + " .search").find("input").val();
            searchAnswer(serrchText);
        });

        $(pageId + " .search").find("input").bindEvent(function(e) {
            var serrchText = $(this).val();
            if (e.keyCode == 13) {
                searchAnswer(serrchText);
            }
        }, 'keyup');

        $(pageId + " .nav_wrap #hs_index").bindEvent(function() {
            $.redirect("index", { r: +Math.random() });
        });

        $(pageId + " .nav_wrap #hs_article").bindEvent(function() {
            $.redirect("news/newsList", { r: +Math.random() });
        });

        $(pageId + " .nav_wrap #hs_fund").bindEvent(function() {
            $.redirect("fund/index", { r: +Math.random() });
        });


    }
    //JS实现搜索功能
    function searchAnswer(searchQuestion) {
        if (searchQuestion == null || searchQuestion == "") {
            layerUtils.iAlert("请输入搜索内容", -1);
            return;
        }
        $.redirect("/customer/server/search/allList", { "search": searchQuestion });
    }


    //销毁页面，单页面时候要用
    function destroy() {

    }
    /**
     * 	
     * 
     */
    var header = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = header;
});