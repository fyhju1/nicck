/**
 * 关于华商 ---公司简介
 */
define("osoa/scripts/customer/laws/list", function(require, exports, module) {
    var pageId = "#customer_laws_list ";
    var articleService = require("articleService");
    var constants = require("constants");
    var pagination = require("pagination");
    var layerUtils = require("layerUtils");
    var total_Pages = 0;
    var total_Rows = 0;
    var page = 1;
    var catalog_id = "";
    var title_name = "";

    //初始化
    function init(parm) {
        catalog_id = parm.catalog_id;
        if ($.string.isEmpty(catalog_id)) {
            $.redirect("customer/laws/index");
        }
        title_name = parm.title_name;

        $("#include_header .nav_wrap #hs_server").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        $(pageId + " .crumbs #title_name").html(title_name);
        initArticleList(constants.INDEX_PAGE.PAGE, constants.INDEX_PAGE.PAGESIZE);
    }



    //绑定事件
    function bindPageEvent() {
        //分页底部容器点击
        $(pageId + " .core").bindChildEvent(" .pgn a", function() {
            if ($(this).hasClass("pgn_nav")) {
                page = $(this).attr("page") - 0;
            } else
                page = $(this).html() - 0;
            if (page > 0) {
                initArticleList(page, constants.INDEX_PAGE.PAGESIZE);
            }
        });
    }

    function initArticleList(page, pageSize) {
        articleService.getNewsPage(function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                var str = "";
                var png_str = "";
                total_Pages = results[0].totalPages;
                total_Rows = results[0].totalRows;
                if (results && results[0].data.length > 0) {
                    var length = results[0].data.length;
                    for (var i = 0; i < results[0].data.length; i++) {
                        if (i % constants.INDEX_PAGE.LINEPAGE == 0) {
                            str += '<div class="core_list">';
                        }
                        if (results[0].data[i].type != "0") {
                            str += "<a href='" + results[0].data[i].link_url + "' target='_blank' >" + '<span>' + results[0].data[i].publish_date + '</span><strong>' + results[0].data[i].title + '</strong></a>';
                        } else {
                            str += '<a target="_blank" href="/osoa/views/customer/laws/detail.html?article_id=' + results[0].data[i].article_id + '&parent_id=' + catalog_id + '"><span>' + results[0].data[i].publish_date + '</span><strong>' + results[0].data[i].title + '</strong></a>';
                        }
                        if ((i % constants.INDEX_PAGE.LINEPAGE == constants.INDEX_PAGE.LINEPAGE - 1) || (i == length - 1)) {
                            str += "</div>";
                        }
                    }
                }
                png_str += pagination.loadPageChange(total_Pages, total_Rows, page);
                $(pageId + " .center #core_list").html(str);
                $(pageId + " .center #png").html(png_str);
            } else {
                layerUtils.iAlert(error_info);
            }
        }, { page: page, pageSize: pageSize, catalog_id: catalog_id })
    }




    //销毁页面，单页面时候要用
    function destroy() {

    }

    var customer_laws_list = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = customer_laws_list;
});