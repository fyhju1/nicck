/**
 * 样板
 */
define("osoa/scripts/service/query/fxckhService", function(require, exports, module) {

    function FxckhService() {
        this.service = new $.domain.Service();
    }

    /**广告
     */
    FxckhService.prototype.getGroup = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905001";
        paraMap["group_no"] = param.group_no;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };


    /**
     * calculator-基金申购计算器
     * 
     * nav:份额净值
     * buy_rate：申购费率
     * buy_amount：申购金额
     */
    FxckhService.prototype.getCalculatorApplyrate = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "904120";
        paraMap["buy_rate"] = param.buy_rate;
        paraMap["buy_amount"] = param.buy_amount;
        paraMap["nav"] = param.nav;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };

    /**
     * calculator- 基金赎回计算器
     * 
     * red_quotient:赎回份额
     * red_rate：赎回费率
     * nav:份额净值
     */
    FxckhService.prototype.getCalculatorRedeemrate = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "904121";
        paraMap["red_quotient"] = param.red_quotient;
        paraMap["red_rate"] = param.red_rate;
        paraMap["nav"] = param.nav;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };

    /**
     * 投研观点列表
     * 
     * page:当前页
     * pageSize：行数
     */
    FxckhService.prototype.getViewPointList = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905005";
        paraMap["page"] = param.page;
        paraMap["pageRows"] = param.pageSize;
        paraMap["viewpoint_type"] = param.viewpoint_type;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };

    /**
     * 
     * 投研观点--文章详情
     * viewpointId : 文章ID
     */
    FxckhService.prototype.getViewPointDetail = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905006";
        paraMap["viewpointId"] = param.viewpointId;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };


    /**
     * 
     * 投研观点--文章详情
     * viewpointId : 文章ID
     */
    FxckhService.prototype.TeamManagerList = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905029";
        paraMap["member_type"] = param.member_type;
        paraMap["rownum"] = param.rownum;
        paraMap["sort"] = param.sort;
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };

    /**
     * 
     * 华商荣誉
     */
    FxckhService.prototype.HsHonor = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905007";
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    };

    /**
     * 
     * 华商历程
     */
    FxckhService.prototype.HsExperience = function(callBackFunc, param) {
        var paraMap = {};
        paraMap["funcNo"] = "905008";
        var reqParamVo = $.getReqParamVo();
        reqParamVo.setUrl($.gconfig.global.server);
        reqParamVo.setReqParam(paraMap);
        reqParamVo.setIsLastReq(true); //是否是最后一个请求
        reqParamVo.setIsShowWait(true); //是否加载请求状态
        reqParamVo.setTipsWords("正在加载，请稍后");
        this.service.invoke(reqParamVo, callBackFunc);
    }; 
	
	/**
     * 
     * 定投计算器
     */
    FxckhService.prototype.dtjsq = function(callBackFunc, param) {
        var paraMap = {}; 
        paraMap["funcNo"] = "904122";
		paraMap["fundcode"] = param.fundcode;
        paraMap["startdate"] = param.startdate;
        paraMap["enddate"] = param.enddate;
		paraMap["kkje"] = param.kkje;
		paraMap["dtfl"] = param.dtfl;
		paraMap["shfl"] = param.shfl;
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
    FxckhService.prototype.destroy = function() {
        for (var key in this.serviceMap) {
            var service = this.serviceMap[key];
            service.destroy();
            delete this.serviceMap[key];
        }
        this.serviceMap = {};
    };

    // 暴露对外的接口
    module.exports = new FxckhService();
});