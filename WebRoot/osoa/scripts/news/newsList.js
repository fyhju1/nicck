/**
 * 新闻列表
 */
define("osoa/scripts/news/newsList", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var articleService = require("articleService");
    var pageId = "#news_newsList ";
    var constants = require("constants");
    var pagination = require("pagination");
    var newsTitlePage = "";
    var total_Pages = 0;
    var total_Rows = 0;
    var catalog_id = "";

    //初始化
    function init(param) {
        catalog_id = param.catalog_id;
        var article_id = param.article_id;
        if ($.string.isEmpty(catalog_id)) {
            catalog_id = $(pageId + " .left .left_list a").eq(0).attr("catalog_id");
        }
        newsTitlePage = $(pageId + " .left .left_list a[catalog_id=" + catalog_id + "]").html();
       

        //加载右侧模版
        $("#right").loadPageContent(null, "include/right", null, function() {}, false, false, false);

        //添加current选中样式
        $(pageId + " .left .left_list a[catalog_id=" + catalog_id + "]").addClass("current").siblings().removeClass("current");

        $("#include_header .nav_wrap #hs_article").addClass("cur").siblings().removeClass("cur");

        //判断文章ID是否存在
        if ($.string.isEmpty(article_id)) {
            if (catalog_id == "announce") {
                initAnnounceList(constants.NEWS_PAGE.PAGE, constants.NEWS_PAGE.PAGESIZE);
            } else {
                initNewsList(catalog_id, constants.NEWS_PAGE.PAGE, constants.NEWS_PAGE.PAGESIZE);
            }
		
        } else {
            if (catalog_id == "announce") {
		initAnnounceDetail(article_id);
            } else {
              $(pageId + " .center .core h1 #catalog_title ").html('<a  class="path_item" href="/osoa/views/news/newsList.html?catalog_id=' + catalog_id + '">' + newsTitlePage + '</a>');
            }
        }
    }


    /**
     * 查询文章详情
     */
    function initArticle(articleId) {
        layerUtils.iLoading(true);
        articleService.getArticleDetail(function(resultVo) {
            layerUtils.iLoading(false);
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                if (window.location.href.indexOf("article_id") == -1) {
                    var href = window.location.href + "&article_id=" + articleId;
                    history.pushState({}, "华商基金", href);
                }
                var str = "<h1 class='article_h1'>" + results[0].title + "</h1>";
                str += "<div class='article'><p align='right'>";
                if (results[0].publish_date != "" && results[0].publish_date != null) {
                    str += "发布时间：" + results[0].publish_date;
                }
                str += "&nbsp;&nbsp;&nbsp;&nbsp;";
                if (results[0].source != "" && results[0].source != null) {
                    str += "来源：" + results[0].source;
                }
                str += "</p><p class='article_content'></p></div>";
                $(pageId + " .core").html(str);
                $(pageId + " .core .article .article_content").html(results[0].content);
            } else {
                layerUtils.iAlert(error_info, -1);
            }
        }, { articleId: articleId });
    }


    /**
     * 展示文章列表
     */
    function initNewsList(catalog_id, page, pageSize) {
        layerUtils.iLoading(true);
        articleService.getNewsPage(function(resultVo) {
            layerUtils.iLoading(false);
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var str = "<h1 class='article_h1'>" + newsTitlePage + "</h1>";
            if (error_no == 0) {
                var newsList = resultVo.getResults();
                if (newsList && newsList.length > 0) {
                    total_Pages = newsList[0].totalPages;
                    total_Rows = newsList[0].totalRows;
                    for (var i = 0; i < newsList[0].data.length; i++) {
                        if (i % 4 == 0) {
                            str += "<div class='core_list'>";
                        }
                        var newsDate = newsList[0].data[i].publish_date.substring(0, 10);

                        if (newsList[0].data[i].type != "0") {
                            str += "<a href='" + newsList[0].data[i].link_url + "' target='_blank' >";
                        } else {
                            str += "<a target='_blank' href='/osoa/views/article/" + newsList[0].data[i].article_id + ".html?catalog_id=" + catalog_id + "&article_id=" + newsList[0].data[i].article_id + "' >";
                        }
                        str += "<span>" + newsDate + "</span>" +
                            "<strong>" + newsList[0].data[i].title + "</strong></a>";
                        if (i % 4 == 3 || i == newsList[0].data.length - 1) {
                            str += "</div>";
                        }
                    }
                    str += pagination.loadPageChange(total_Pages, total_Rows, page);
                }
            } else {
                layerUtils.iAlert(error_info, -1);
            }
            $(pageId + " .core").html(str);
        }, { catalog_id: catalog_id, page: page, pageSize: pageSize, isFlag: 1 });
    }


    function setUrlParam(paramName, value, url) {

        if (url.indexOf("?") != -1) {
            url = url.substring(0, url.indexOf("?"));
            url = url + "?" + paramName + "=" + value;
        } else {
            url = url + "?" + paramName + "=" + value;
        }
        return url;
    }


    function initAnnounceList(page, pageSize) {
        articleService.getAnnounceList(function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var str = "<h1 class='article_h1'>" + newsTitlePage + "</h1>";
            if (error_no == 0) {
                var newsList = resultVo.getResults();
                if (newsList && newsList.length > 0) {
                    total_Pages = newsList[0].totalPages;
                    total_Rows = newsList[0].totalRows;
                    for (var i = 0; i < newsList[0].data.length; i++) {
                        if (i % 4 == 0) {
                            str += "<div class='core_list'>";
                        }
                        var newsDate = newsList[0].data[i].publish_date.substring(0, 10);

                        if (newsList[0].data[i].content_type != "0") {
                            str += "<a href='" + newsList[0].data[i].link_url + "' target='_blank' >";
                        } else {
                            str += "<a  target='_blank' href='/osoa/views/news/newsList.html?catalog_id=" + catalog_id + "&article_id=" + newsList[0].data[i].id + "' >";
                        }
                        str += "<span>" + newsDate + "</span>" +
                            "<strong>" + newsList[0].data[i].announcement_name + "</strong></a>";
                        if (i % 4 == 3 || i == newsList[0].data.length - 1) {
                            str += "</div>";
                        }
                    }
                    str += pagination.loadPageChange(total_Pages, total_Rows, page);
                }
            } else {
                layerUtils.iAlert(error_info, -1);
            }
            $(pageId + " .core").html(str);
        }, { page: page, pageRow: pageSize });
    }


    //信息纰漏文章详情
    function initAnnounceDetail(article_id) {
        articleService.getAnnounceDetail(function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                if (window.location.href.indexOf("article_id") == -1) {
                    var href = window.location.href + "&article_id=" + articleId;
                    history.pushState({}, "华商基金", href);
                }
                var str = '<h1 class="article_path">' +
                    '<a class="path_item" href="/osoa/views/index.html">首页</a> <span class="right_arrow">></span>' +
                    '<a class="path_item" href="/osoa/views/news/newsList.html">资讯中心</a> <span class="right_arrow">></span>' +
                    '<span id="catalog_title"><a  class="path_item" href="/osoa/views/news/newsList.html?catalog_id=' + catalog_id + '">' + newsTitlePage + '</a></span> <span class="right_arrow">></span>' +
                    '<span class="path_item path_cur">正文</span>' +
                    '</h1>'
                str += "<div class='dongtai'><p  class='p_title' > " + results[0].announcement_name + "</p>";
                str += "<p class='p_sub_title' >";
                if (results[0].publish_date != "" && results[0].publish_date != null) {
                    str += "发布时间：" + results[0].publish_date;
                }
                str += "&nbsp;&nbsp;&nbsp;&nbsp;";
                if (results[0].source != "" && results[0].source != null) {
                    str += "来源：" + results[0].source;
                }
                str += "</p><p class='article_content'></p></div>";
                $(pageId + " .core").html(str);
                $(pageId + " .core .dongtai .article_content").html(results[0].content);
            } else {
                layerUtils.iAlert(error_info, -1);
            }
        }, { article_id: article_id });
    }

    //绑定事件
    function bindPageEvent() {
        //左侧新闻点击
        $(pageId + "  .left .left_list a").bindEvent(function() {
            catalog_id = $(this).attr("catalog_id");
            $(pageId + " .center .core").html("");
            newsTitlePage = $(this).html();
            $(this).addClass("current").siblings("a").removeClass("current");
            if (catalog_id == "announce") {
                initAnnounceList(constants.NEWS_PAGE.PAGE, constants.NEWS_PAGE.PAGESIZE);
            } else {
                initNewsList(catalog_id, constants.NEWS_PAGE.PAGE, constants.NEWS_PAGE.PAGESIZE);
            }

            var href = setUrlParam("catalog_id", catalog_id, window.location.href);
            history.pushState({}, "华商基金", href);
        });

        //分页底部容器点击
        $(pageId + " .core").bindChildEvent(" .pgn a", function() {
            var page = "";
            if ($(this).hasClass("pgn_nav")) {
                page = $(this).attr("page") - 0;
            } else
                page = $(this).html() - 0;
            if (page > 0) {
                if (catalog_id == "announce") {
                    initAnnounceList(page, constants.NEWS_PAGE.PAGESIZE);
                } else {
                    initNewsList(catalog_id, page, constants.NEWS_PAGE.PAGESIZE);
                }
            }
        });

    }

    //销毁页面，单页面时候要用
    function destroy() {

    }

    var newsList = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = newsList;
});