/**
 * 旗下基金
 */
define("osoa/scripts/fund/announce/list", function(require, exports, module) {
    var pageId = "#fund_announce_list ";
    var constants = require("constants");
    var articleService = require("articleService");
    var pagination = require("pagination");
    var layerUtils = require("layerUtils");
    var total_Pages = 0;
    var total_Rows = 0;
    var page = 1;
    var announce_type = "";
    var fund_code = "";


    //初始化
    function init(param) {
        announce_type = param.announce_type;
        fund_code = param.fund_code;
        var title = param.title;
        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        $("#include_header .nav_wrap #hs_fund").addClass("cur").siblings().removeClass("cur");
        
        var announce_name='';
        if(announce_type=='0'){
        	announce_name='临时公告';
        }else if(announce_type=='1'){
        	announce_name='定期公告';
        }else if(announce_type=='2'){
        	announce_name='法律文件';
        }
        $(pageId + " .crumbs #fund_announce_name").html(announce_name+"("+title+")");
        searchArticle(constants.INDEX_PAGE.PAGE, constants.INDEX_PAGE.PAGESIZE, "", announce_type, fund_code);

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
                searchArticle(page, constants.INDEX_PAGE.PAGESIZE, "", announce_type, fund_code);
            }
        });
    }

    /**
     * 基金公告FUNCTION
     */
    function searchArticle(page, pageSize, contents, announce_type, fund_code) {
        var param = {
            fund_code: fund_code,
            page: page,
            pageRow: pageSize,
            title: $.trim(contents),
            type: announce_type
        };
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                var str = "";
                var png_str = "";
                total_Pages = results[0].totalPages;
                total_Rows = results[0].totalRows;
                if (results && results[0].data.length > 0) {
                    for (var i = 0; i < results[0].data.length; i++) {
                        if (i % constants.INDEX_PAGE.LINEPAGE == 0) {
                            str += '<div class="core_list">';
                        }
                        if (results[0].data[i].content_type != "0") {
                            str += "<a href='" + results[0].data[i].link_url + "' target='_blank' >" + '<span>' + results[0].data[i].publish_date + '</span><strong>' + results[0].data[i].announcement_name + '</strong></a>';
                        } else {
                            str += '<a target="_blank" href="/osoa/views/news/newsList.html?catalog_id=announce&article_id=' + results[0].data[i].id + '" ><span>' + results[0].data[i].publish_date + '</span><strong>' + results[0].data[i].announcement_name + '</strong> </a>';
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
                layerUtils.iAlert(error_info, -1);
            }
        };
        articleService.getAnnouncePage(callBack, param);
    }



    //销毁页面，单页面时候要用
    function destroy() {

    }

    var fund_announce_list = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = fund_announce_list;
});