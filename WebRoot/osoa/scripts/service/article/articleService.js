/**
 * 文章Service
 */
define("osoa/scripts/service/article/articleService", function(require, exports, module) {

    function ArticleService() {
        this.service = new $.domain.Service();
    }


    /**
     * 查询栏目下的文章
     * @param callBackFunc
     * @param param
     */
    ArticleService.prototype.getNewsPage = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905003";
        paraMap["catalogId"] = param.catalog_id;
        paraMap["page"] = param.page;
        paraMap["pageRow"] = param.pageSize;
        paraMap["search"] = param.search;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };

    /**
     * 查询的那个钱栏目下的子栏目
     * @param callBackFunc
     * @param param
     */
    ArticleService.prototype.getChildList = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905009";
        paraMap["catalog_id"] = param.catalog_id;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };


    /**
     * 查询文章详情
     * @param callBackFunc
     * @param param
     */
    ArticleService.prototype.getArticleDetail = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905004";
        paraMap["articleId"] = param.articleId;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };

    /**
     * 查询信息纰漏
     * @param callBackFunc
     * @param param
     */
    ArticleService.prototype.getAnnounceList = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905022";
        paraMap["page"] = param.page;
        paraMap["pageRow"] = param.pageRow;
        paraMap["fund_code"] = param.fund_code;
        paraMap["announcement_type"] = param.announcement_type;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };

    /**
     * 信息纰漏子类型查询关联产品
     * @param callBackFunc
     * @param param
     */
    ArticleService.prototype.getAnnouncePage = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905023";
        paraMap["page"] = param.page;
        paraMap["pageRow"] = param.pageRow;
        paraMap["fund_code"] = param.fund_code;
        paraMap["type"] = param.type;
        paraMap["title"] = param.title;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };


    /**
     * 信息纰漏子类型查询关联产品
     * @param callBackFunc
     * @param param
     */
    ArticleService.prototype.getAnnounceDetail = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905024";
        paraMap["article_id"] = param.article_id;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };


    /**
     * 文章搜索
     * @param callBackFunc
     * @param param
     */
    ArticleService.prototype.getSearchArticle = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905031";
        // paraMap["catalogId"] = param.catalog_id;
        paraMap["page"] = param.page;
        paraMap["pageRow"] = param.pageSize;
        paraMap["search"] = param.search;
        paraMap["type"] = param.type;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };


    /**
     * 查询栏目下的文章
     * @param callBackFunc
     * @param param
     */
    ArticleService.prototype.getFundArticleListPage = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905033";
        paraMap["catalogId"] = param.catalog_id;
        paraMap["page"] = param.page;
        paraMap["pageRow"] = param.pageSize;
        paraMap["fund_code"] = param.fund_code;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };

    /**
     * 查询栏目下的文章
     * @param callBackFunc
     * @param param
     */
    ArticleService.prototype.getOneArticle = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905032";
        paraMap["catalog_id"] = param.catalog_id;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };

    /**
     * 释放操作 
     */
    ArticleService.prototype.destroy = function() {
        for (var key in this.serviceMap) {
            var service = this.serviceMap[key];
            service.destroy();
            delete this.serviceMap[key];
        }
        this.serviceMap = {};
    };

    // 暴露对外的接口
    module.exports = new ArticleService();
});