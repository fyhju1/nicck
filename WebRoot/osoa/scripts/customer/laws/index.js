/**
 * 关于华商 ---公司简介
 */
define("osoa/scripts/customer/laws/index", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var articleService = require("articleService");
    var constants = require("constants");
    var pageId = "#customer_laws_index ";
    var array;

    //初始化
    function init(parm) {

        array = null;

        $("#include_header .nav_wrap #hs_server").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        initArticleChild();
    }


    //绑定事件
    function bindPageEvent() {

    }


    function initArticleChild() {
        articleService.getChildList(function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            var str = "";
            if (error_no == 0) {
                array = new Array(results.length);
                for (var i = 0; i < results.length; i++) {
                    str += initArticleList(results[i].catalog_id, results[i].name, constants.LAWS_PAGE.PAGE, constants.LAWS_PAGE.PAGESIZE, i, results.length);
                }
            } else {
                layerUtils.iAlert(error_info);
            }
        }, { catalog_id: '10100' });
    }

    function initArticleList(catalog_id, title_name, page, pageSize, index, length) {
        articleService.getNewsPage(function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var str = "";
            if (error_no == 0) {
                var newsList = resultVo.getResults();
                str += '<div type="' + index + '" class="notice_item list_' + index + '"><div class="notice_title">' + title_name + '<a target="_blank"  href="/osoa/views/customer/laws/list.html?catalog_id=' + catalog_id + '&title_name=' + title_name + '" class="notice_more"></a></div>';
                if (newsList && newsList.length > 0) {
                    total_Pages = newsList[0].totalPages;
                    total_Rows = newsList[0].totalRows;
                    str += '<ul class="notice_list">';
                    for (var i = 0; i < newsList[0].data.length; i++) {
                        str += '<li class="notice_list_item">';
                        if (newsList[0].data[i].type != "0") {
                            str += "<a href='" + newsList[0].data[i].link_url + "' target='_blank' >" + newsList[0].data[i].title + '</a>';
                        } else {
                            str += '<a target="_blank"  href="/osoa/views/customer/laws/detail.html?article_id=' + newsList[0].data[i].article_id + '">' + newsList[0].data[i].title + '</a>';
                        }
                        str += '<span>' + newsList[0].data[i].publish_date + '</span>' +
                            '</li>';
                    }
                }
                str += "</div>";
            } else {
                layerUtils.iAlert(error_info, -1);
            }
            array[index] = str;
            if (length == array.length) {
                var str_s = "";
                for (var i = 0; i < array.length; i++) {
                    str_s += array[i];
                }
                $(pageId + " .center .tab_content .fund_notice").html(str_s);
            }
        }, { catalog_id: catalog_id, page: 1, pageSize: 5 });
    }




    //销毁页面，单页面时候要用
    function destroy() {
        array = null;
    }

    var customer_laws_index = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = customer_laws_index;
});