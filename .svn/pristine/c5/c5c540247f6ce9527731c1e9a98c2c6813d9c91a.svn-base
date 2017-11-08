/**
 * 描述:手写纯javascript底部分页容器，仅适用于华商基金项目
 * 作者:位才源
 */
define("osoa/scripts/common/pagination", function(require, exports, module) {

    /** 
     *  分页容器
     *  totalRows    总行数
     *  totalPages	 总页数
     *  page		 当前页
     */
    function loadPageChange(totalPages, totalRows, page) {
        var str = "";
        if (totalPages > 1) {
            str += "<div class='pgn'>" +
                " 共<span>" + totalRows +
                "</span>条动态，第<span>" + page +
                "</span>/" + totalPages + "页";
            if (page == 1) {
                str += "<a class='pgn_nav' href='javascript:void(0)' page='0'>上一页</a>";
            } else {
                str += "<a class='pgn_nav' href='javascript:void(0)' page='" + (page - 1) + "'>上一页</a>";
            }
            if (totalPages <= 4) {
                for (var i = 1; i <= totalPages; i++) {
                    if (i == page) { str += " <strong>" + page + "</strong>"; } else {
                        str += " <a href='javascript:void(0)'>" + i + "</a>";
                    }
                }
            }
            if (totalPages > 4) {
                if (page == 1) {
                    str += " <strong>" + page + "</strong>";
                } else { str += " <a href='javascript:void(0)'>1</a>"; }
                if (page - 1 - 1 >= 1) {
                    if (page != 3) {
                        str += "<small>...</small>";
                    }
                    if (page + 1 + 1 < totalPages) {
                        str += " <a href='javascript:void(0)'>" + (page - 1) + "</a>";
                        str += " <strong>" + page + "</strong>";
                        str += " <a href='javascript:void(0)'>" + (page + 1) + "</a>";
                    }
                } else {
                    var pages = page;
                    if (page + 1 + 1 - 3 <= 1) {
                        pages = 4;
                    }
                    for (var i = 2; i <= pages; i++) {
                        if (i == page) {
                            str += " <strong>" + page + "</strong>";
                        } else {
                            str += " <a href='javascript:void(0)'>" + i + "</a>";
                        }
                    }
                }
                if (page + 1 + 1 < totalPages) {
                    if (totalPages != 5) {
                        str += " <small>...</small>";
                    }
                } else {
                    var pages = page;
                    if (totalPages - 1 >= page) {
                        pages = page - 1;
                    } else if (page == totalPages) {
                        pages = page - 2;
                    }
                    for (var i = pages; i < totalPages; i++) {
                        if (i == page) { str += " <strong>" + page + "</strong>"; } else {
                            str += " <a href='javascript:void(0)'>" + i + "</a>";
                        }
                    }

                }
                if (page == totalPages) {
                    str += " <strong>" + totalPages + "</strong>";
                } else { str += " <a href='javascript:void(0)'>" + totalPages + "</a>"; }

            }
            if (page == totalPages) {
                str += "<a class='pgn_nav' href='javascript:void(0)' page='0' >下一页</a>";
            } else {
                str += "<a class='pgn_nav' href='javascript:void(0)' page='" + (page + 1) + "' >下一页</a>";
            }
        }
        return str;
    }


    var pagination = {
        "loadPageChange": loadPageChange
    };
    module.exports = pagination;
});