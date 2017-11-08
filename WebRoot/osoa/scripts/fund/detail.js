/**
 * 产品详情 
 */
define("osoa/scripts/fund/detail", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var fundService = require("fundService");
    var articleService = require("articleService");
    var pageId = "#fund_detail ";
    var pagination = require("pagination");
    var constants = require("constants");
    var echarJs = require("echarJs");
    var common = require("common");
    var chartsUtils = require('chartsUtils');
    var fund_type = "";
    var nv_type = "0"; //净值查询类型
    var nv_start_time = ""; //净值查询开始时间
    var nv_end_time = ""; //净值查询结束时间
    var pre_nv_type = ""; //Search时上一个净值查询类型
    var params = { fund_code: "", unit_nv: "", daily_change: "" };

    require("osoa/js/datepicker.js");


    //初始化
    function init(param) {
        $("#include_header .nav_wrap #hs_fund").addClass("cur").siblings().removeClass("cur");

        var as = new Array();
        params.fund_code = param.fund_code;
        params.daily_change = param.daily_change;
        params.unit_nv = param.unit_nv;

        if ($.string.isEmpty(params.fund_code)) {
            layerUtils.iConfirm("该产品数据不存在", function() {
                $.redirect("index");
            }, function() {
                $.redirect("index");
            });
        } else {
            var fundArrays = $.getStorage("fund");
            var fundArray;
            if (fundArrays) {
                fundArray = fundArrays.split(",");
            } else {
                fundArray = new Array();
            }
            var isExist = common.arrayConstants(fundArray, param.fund_code);
            if (!isExist) {
                fundArray.push(param.fund_code);
                $.setLocalStorage("fund", fundArray);
            }
        }

        var template = param.template;

        fund_type = $(pageId + " .tab_box .tab_content ").attr("fund_type");
        if (!$.string.isEmpty(template)) {
            if (template == "fund_mana") { fundManagerInfo(); }; //基金经理
            if (template == "fund_article") { searchArticle(""); }; //基金公告
            if (template == "fund_rate") { fundRateInfo(); }; //基金费率
            if (template == "fund_organiza") { fundOrganiza(); }; //基金机构
            if (template == "fund_nv") { fundNvInfo(fund_type, 0, 1, 4); }; //基金净值
            if (template == "fund_group") { fundInvestPortfolio(); }; //基金投资组合
        }

        var str = $(pageId + ".fund_banner .fund_banner_right").html();
        $(pageId + ".fund_banner .fund_banner_right").html(str);

        var title = $(pageId + " #fund_index_name").html();

        initZuijin();

        compareChart(4, title);
    }

    function initZuijin() {
        var save = $.getStorage("look");
        var arrays = null;
        if (save != "" && save != null) {
            arrays = $.strToJson(save);
        }
        var fund_code = params.fund_code;
        if (arrays != null) {
            var array = arrays.fund;
            for (var i = 0; i < array.length; i++) {
                if (array[i].fund_code == fund_code) {
                    array.remove(i);
                    i--;
                }
            }
        }
        var array = null;
        if (arrays != null) {
            array = arrays.fund;
        } else {
            array = new Array();
        }
        var fund_name = $(pageId + " #fund_index_name").html();
        var unit_nv = params.unit_nv;
        var daily_change = params.daily_change;
        unit_nv = $(pageId + " #base_unit_nv").text();
        daily_change = $(pageId + " #base_daily_change").text();

        var param = {
            fund_code: fund_code,
            fund_name: fund_name,
            unit_nv: unit_nv,
            daily_change: daily_change
        }
        array.push(param);

        var paramss = {
            "fund": array
        }
        $.setLocalStorage("look", $.jsonToStr(paramss));

        initLook();
    }


    Array.prototype.remove = function(dx) {
        if (isNaN(dx) || dx > this.length) { return false; }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this[i] != this[dx]) {
                this[n++] = this[i]
            }
        }
        this.length -= 1
    }

    function initLook() {

    }


    //绑定事件
    function bindPageEvent() {
        //基金基本信息
        $(pageId + " .tab_box #fund_base").click(function() {
            fundBaseInfo();
            setWindowUrl("fund_base", "基本信息");
        });

        //投资组合
        $(pageId + " .tab_box #fund_group").click(function() {
            fundInvestPortfolio();
            setWindowUrl("fund_group", "投资组合");
        });

        //基金净值
        $(pageId + " .tab_box #fund_nv").click(function() {
            fundNvInfo(fund_type, 0, 1, 4);
            setWindowUrl("fund_nv", "基金净值");
        });


        //基金经理
        $(pageId + " .tab_box #fund_mana").click(function() {
            fundManagerInfo();
            setWindowUrl("fund_mana", "基金经理");
        });

        //费率
        $(pageId + " .tab_box #fund_rate").click(function() {
            fundRateInfo();
            setWindowUrl("fund_rate", "费率");
        });

        //销售机构
        $(pageId + " .tab_box #fund_organiza").click(function() {
            fundOrganiza();
            setWindowUrl("fund_organiza", "销售机构");
        });

        //基金公告
        $(pageId + " .tab_box #fund_article").click(function() {
            searchArticle("");
            setWindowUrl("fund_article", "基金公告");
        });


        //公告搜索
        $(pageId + " .tab_content ").bindChildEvent(" .fund_notice #search", function() {
            var contents = $(pageId + " .fund_notice #content ").val();
            searchArticle(contents);
        });

        //净值类型选择--最近一个月
        $(pageId + " .tab_content ").bindChildEvent(" .fund_nv .chart-item .chart-check", function() {
            var type = $(this).attr("type");
            nv_type = type;
            nv_start_time = "";
            nv_end_time = "";
            fundNvInfo(fund_type, type, constants.ARTICLE_PAGE.PAGE, constants.ARTICLE_PAGE.PAGESIZE);
        });

        //净值查询--日期
        $(pageId + " .tab_content ").bindChildEvent(" .fund_nv .chart-item .chart-search", function() {
            var start_time = $(pageId + "  .tab_content #datepicker1").val();
            var end_time = $(pageId + "  .tab_content #datepicker2").val();
            if ($.string.isEmpty(start_time)) {
                layerUtils.iAlert("请输入开始时间", -1);
                return;
            }
            if ($.string.isEmpty(end_time)) {
                layerUtils.iAlert("请输入结束时间", -1);
                return;
            }
            if (!$.string.isDate(start_time) || !$.string.isDate(end_time)) {
                layerUtils.iAlert("请输入正确的日期格式，格式如：<br/>1900-01-01");
                return;
            }
            pre_nv_type = $(pageId + "  .tab_content .clearfix .cur").attr("type");
            nv_type = "5";
            nv_start_time = start_time;
            nv_end_time = end_time;
            fundNvInfo(fund_type, 5, constants.ARTICLE_PAGE.PAGE, constants.ARTICLE_PAGE.PAGESIZE, start_time, end_time);
        });

        //分页底部容器点击
        $(pageId + " .tab_content ").bindChildEvent(" .fund_nv .pgn a", function() {
            var page = "";
            if ($(this).hasClass("pgn_nav")) {
                page = $(this).attr("page") - 0;
            } else
                page = $(this).html() - 0;
            if (page > 0) {
                initNv(fund_type, nv_type, page, constants.ARTICLE_PAGE.PAGESIZE, nv_start_time, nv_end_time);
            }
        });



        //比较图时间选择--最近一个月
        $(pageId + " .performance_left #echart_tab a").bindEvent(function() {
            var type = $(this).attr("type");
            var title = $(pageId + " #fund_index_name").html();
            compareChart(type, title);
            // nv_type = type;
            // nv_start_time = "";
            // nv_end_time = "";
            // fundNvInfo(fund_type, type, constants.ARTICLE_PAGE.PAGE, constants.ARTICLE_PAGE.PAGESIZE);
        });

        $(pageId + " .tab_content ").bindChildEvent(" .fund_notice .notice_title a", function() {
            var type = $(this).attr("type");
            var title = $(pageId + " #fund_index_name").html();
            $.redirect("fund/announce/list", { fund_code: params.fund_code, announce_type: type, title: title });
        });
    }

    /**
     * 基金基本信息FUNCTON
     */
    function fundBaseInfo() {
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                $(pageId + " .tab_content ").loadJuicerTemplateHtmlContent("fund/template/info", function() {
                    if (results[0]) {
                        var benchmark = results[0].benchmark;
                        var invest_objective = results[0].invest_objective;
                        var invest_scope = results[0].invest_scope;
                        var invest_strategy = results[0].invest_strategy;
                        $(pageId + " .tab_content .fund_index #base_benchmark").html(benchmark);
                        $(pageId + " .tab_content .fund_index #base_invest_objective").html(invest_objective);
                        $(pageId + " .tab_content .fund_index #base_invest_scope").html(invest_scope);
                        $(pageId + " .tab_content .fund_index #base_invest_strategy").html(invest_strategy);
                    }
                }, results[0], false, true, true);
            } else {
                layerUtils.iAlert(error_info, -1);
            }
            $(pageId + " .tab_box #fund_base").addClass("current").siblings().removeClass("current");
        };
        fundService.getFundBaseInfo(callBack, params);
    }


    /**
     * 投资组合Function
     */
    function fundInvestPortfolio() {
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.obj.results;
            if (error_no == 0) {
                var industrylist = results.industrylist;
                var allocalist = results.allocalist;

                var publish_date_alloca = ""; //资产分布发布日期
                var value_money_alloca = 0; //资产分布资产净值
                var originData_alloca = new Array(); //资产分布数据

                var colorGroup = constants.COLORGROUP.REDCOLOR; //红色颜色数组
                for (var i = 0; i < allocalist.length; i++) {
                    if (i < 5) {
                        originData_alloca.push({
                            value: allocalist[i].market_val,
                            name: allocalist[i].asset_type_name,
                            per: allocalist[i].ratio_total_asset,
                            itemStyle: {
                                normal: {
                                    color: colorGroup[i % 10]
                                }
                            }
                        });
                    }
                    // value_money_alloca = value_money_alloca + (((allocalist[i].market_val - 0) / 100000000).toFixed(4) - 0);
                    if (i == 0) { publish_date_alloca = allocalist[i].publish_date; }
                    var nav_val = allocalist[i].nav_val;
                    if (!$.string.isEmpty(nav_val)) {
                        value_money_alloca = allocalist[i].nav_val;
                    }
                }
                if (value_money_alloca - 0 >= 0) {
                    value_money_alloca = value_money_alloca / 100000000 - 0;
                }
                value_money_alloca = value_money_alloca.toFixed(4);

                var publish_date_industry = ""; //行业分布发布日期
                var value_money_industry = 0; //行业分布资产净值
                var originData_industry = new Array(); //行业分布数据
                for (var i = 0; i < industrylist.length; i++) {
                    if (i < 5) {

                        originData_industry.push({
                            value: industrylist[i].market_val,
                            name: industrylist[i].industry_name,
                            per: industrylist[i].ratio_in_nv,
                            itemStyle: {
                                normal: {
                                    color: colorGroup[i % 10]
                                }
                            }
                        });

                    }
                    value_money_industry = value_money_industry + (((industrylist[i].market_val - 0) / 100000000).toFixed(4) - 0);
                    if (i == 0) { publish_date_industry = industrylist[i].publish_date; }
                }
                value_money_industry = value_money_industry.toFixed(4);
                $(pageId + " .tab_content ").loadJuicerTemplateHtmlContent("fund/template/group", function() {
                    echarJs.initEcharRund("pie-chart-1", originData_alloca);
                    echarJs.initEcharRund("pie-chart-2", originData_industry);
                    value_money_alloca = value_money_alloca - 0;
                    value_money_industry = value_money_industry - 0;
                    if (!$.string.isEmpty(publish_date_alloca)) {
                        $(pageId + " .tab_content .fund_group #fund_group_alloca h2").html("(资产净值：" + value_money_alloca + "亿元，" + publish_date_alloca + "发布)");
                    }
                    if (!$.string.isEmpty(publish_date_industry)) {
                        $(pageId + " .tab_content .fund_group #fund_group_industry h2").html("(资产净值：" + value_money_industry + "亿元，" + publish_date_industry + "发布)");
                    }

                }, results, false, true, true);
            } else {
                layerUtils.iAlert(error_info, -1);
            }
            $(pageId + " .tab_box #fund_group").addClass("current").siblings().removeClass("current");
        };
        fundService.getFundInvestPortfolio(callBack, params);
    }

    /**
     * 基金费率function
     */
    function fundRateInfo() {
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var result = resultVo.obj;
            if (error_no == 0) {
                if (result.results.list0.length == 0) {
                    result.length0 = 0;
                } else
                    result.length0 = 12 / result.results.list0.length;

                if (result.results.list1.length == 0) {
                    result.length1 = 0;
                } else
                    result.length1 = 12 / result.results.list1.length;

                $(pageId + " .tab_content ").loadJuicerTemplateHtmlContent("fund/template/rate", null, result, false, true, true);
            } else {
                layerUtils.iAlert(error_info, -1);
            }
            $(pageId + " .tab_box #fund_rate").addClass("current").siblings().removeClass("current");
        };
        fundService.getFundRate(callBack, { fund_code: params.fund_code, feerate_type: "1|2" });
    }

    /**
     * 基金经理FUNCTION
     */
    function fundManagerInfo() {
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                $(pageId + " .tab_content ").loadJuicerTemplateHtmlContent("fund/template/manager", function() {
                    // $(pageId + "  .tab_content .fund_manager .fenbu").html();
                    // var strategy_html = $(pageId + " #quarterly_strategy").html();
                    // $(pageId + "  .tab_content .fund_manager .fenbu").html("<h1>季报策略</h1><p>" + strategy_html + "</p>")
                }, results, false, true, true);
            } else {
                layerUtils.iAlert(error_info, -1);
            }
            $(pageId + " .tab_box #fund_mana").addClass("current").siblings().removeClass("current");
        };
        fundService.getManagerForFund(callBack, params);
    }

    /**
     * 基金公告FUNCTION
     */
    function searchArticle(contents) {
        var param = {
            fund_code: params.fund_code,
            page: 1,
            pageRow: 5,
            title: $.trim(contents),
            type: "0|1|2"
        };
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            resultVo.contents = contents;
            if (error_no == 0) {
                $(pageId + " .tab_content ").loadJuicerTemplateHtmlContent("fund/template/article", null, resultVo, false, true, true);
            } else {
                layerUtils.iAlert(error_info, -1);
            }
            $(pageId + " .tab_box #fund_article").addClass("current").siblings().removeClass("current");
        };
        articleService.getAnnouncePage(callBack, param);
    }

    /**
     * 销售机构Function
     */
    function fundOrganiza() {
        var param = {
            fund_code: params.fund_code,
            type: "",
            organization_type: "1|2"
        };
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var result = resultVo.obj.results;
            if (error_no == 0) {
                $(pageId + " .tab_content ").loadJuicerTemplateHtmlContent("fund/template/organiza", function() {
                    $(pageId + " .tab_content .fund_organiz .deal_brach span:last").html("");
                }, result, false, true, true);
            } else {
                layerUtils.iAlert(error_info, -1);
            }
            $(pageId + " .tab_box #fund_organiza").addClass("current").siblings().removeClass("current");
        };
        fundService.getBankSalesList(callBack, param);
    }

    /**
     * 基金净值Function
     */
    function fundNvInfo(fund_type, type, page, pageSize, start_time, end_time) {
        var param = {
            fund_code: params.fund_code,
            type: type,
            page: page,
            pageSize: pageSize,
            start_time: start_time,
            end_time: end_time,
            isPage: "0"
        };
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            if (error_no == 0) {
                var result = resultVo.obj.results;
                var valuelist = result.valuelist;
                var pagelist = result.pagelist;
                if (result.valuelist) {
                    var title1 = "单位净值";
                    var title2 = "累计净值";
                    var unitdata = new Array();
                    var sumdata = new Array();
                    var timedata = new Array();
                    if (fund_type == "4") {
                        title1 = "万份收益";
                        title2 = "七日年化收益";
                    }

                    for (var i = 0; i < valuelist.length; i++) {
                        if (fund_type == "4") {
                            unitdata.push(common.round(valuelist[i].profit_per_million, 4));
                            sumdata.push(common.round(valuelist[i].serven_days_annual_profit, 4));

                            // unitdata.push(valuelist[i].profit_per_million);
                            // sumdata.push(valuelist[i].serven_days_annual_profit);
                        } else {
                            unitdata.push(common.round(valuelist[i].unit_nv, 3));
                            sumdata.push(common.round(valuelist[i].sum_nv, 3));

                            // unitdata.push(valuelist[i].unit_nv); //单位净值
                            // sumdata.push(valuelist[i].sum_nv); //累计净值
                        }
                        timedata.push(valuelist[i].nv_date);
                    }
                    pagelist[0].fund_type = fund_type;
                    $(pageId + " .tab_content ").loadJuicerTemplateHtmlContent("fund/template/value", function() {
                        var data = [{ name: title1, data: unitdata }, { name: title2, data: sumdata }];
                        chartsUtils.drawTitleLine("#pie-chart-line", data, timedata, 1, fund_type);


                        // echarJs.initEcharRedirect(title1, title2, "pie-chart-line", unitdata, sumdata, timedata, pageId);
                        $(pageId + "  .tab_content #datepicker1").datepicker({ dateFormat: "yy-mm-dd", maxDate: '%y-%M-%d' });
                        $(pageId + "  .tab_content #datepicker2").datepicker({ dateFormat: "yy-mm-dd", maxDate: '%y-%M-%d' });

                        //以日期计算
                        if (type == "5") {
                            type = pre_nv_type;
                            $(pageId + "  .tab_content #datepicker1").val(start_time);
                            $(pageId + "  .tab_content #datepicker2").val(end_time);
                            $(pageId + "  .tab_content .clearfix .chart_date_type" + type).addClass("cur").siblings().removeClass("cur");
                        } else {
                            $(pageId + "  .tab_content .clearfix .chart_date_type" + type).addClass("cur").siblings().removeClass("cur");
                        }

                        var total_Pages = pagelist[0].totalPages;
                        var total_Rows = pagelist[0].totalRows;
                        var str = pagination.loadPageChange(total_Pages, total_Rows, 1);
                        $(pageId + '   .tab_content .fund_nv #png').html(str);
                    }, pagelist[0], false, true, true);
                }
            } else {
                layerUtils.iAlert(error_info, -1);
            }
            $(pageId + " .tab_box #fund_nv").addClass("current").siblings().removeClass("current");
        };
        fundService.getFunfValueList(callBack, param);
    }

    //基金净值分页Function
    function initNv(fund_type, type, page, pageSize, start_time, end_time) {
        var param = {
            fund_code: params.fund_code,
            type: type,
            page: page,
            pageSize: pageSize,
            start_time: start_time,
            end_time: end_time,
            isPage: "1"
        };
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            if (error_no == 0) {
                var pagelist = resultVo.getResults();
                pagelist[0].fund_type = fund_type;

                $(pageId + " .tab_content .fund_nv .table-normal").loadJuicerTemplateHtmlContent("fund/template/valuelist", null, pagelist[0], false, true, true);

                //加载底部容器
                var total_Pages = pagelist[0].totalPages;
                var total_Rows = pagelist[0].totalRows;
                var str = pagination.loadPageChange(total_Pages, total_Rows, page);
                $(pageId + '   .tab_content .fund_nv #png').html(str);
            } else {
                layerUtils.iAlert(error_info, -1);
            }
        };
        fundService.getFunfValueList(callBack, param);
    }


    function compareChart(query_type, title) {
        var param = {
            fund_code: params.fund_code,
            query_type: query_type
        }
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            if (error_no == 0) {
                var title1 = title;
                var title2 = "比较基准";
                var unitdata = new Array();
                var sumdata = new Array();
                var timedata = new Array();
                for (var i = 0; i < results.length; i++) {
                    unitdata.push(common.round(results[i].nav_adjusted * 100, 4));
                    sumdata.push(common.round(results[i].day_ratio * 100, 4));
                    timedata.push(results[i].compare_date);
                }
                var data = [{ name: title, data: unitdata }, { name: title2, data: sumdata }];
                chartsUtils.drawTitleLine("#echart_fund", data, timedata, 0);

                var text_date = title + " （" + params.fund_code + "）  来源：华商基金";
                if (timedata != null) {
                    if (timedata.length > 0) {
                        text_date += "  数据截至：" + timedata[0] + "至" + timedata[timedata.length - 1];
                    }
                }
                $(pageId + " .performance_left .fund_des").html(text_date);
            } else {
                layerUtils.iAlert(error_info, -1);
            }
        };
        fundService.compareFundChart(callBack, param);
    }



    //销毁页面，单页面时候要用
    function destroy() {
        fund_type = "";
        nv_type = "0"; //净值查询类型
        nv_start_time = ""; //净值查询开始时间
        nv_end_time = ""; //净值查询结束时间
        pre_nv_type = ""; //Search时上一个净值查询类型
        params = { fund_code: "" };
    }

    /**
     * 设置浏览器URL
     */
    function setWindowUrl(temlplate, title) {
        //var href = window.location.href;
        //if (href.indexOf("template") != -1) {
        //   href = href.substring(0, href.indexOf("template") - 1);
        //}
        //href += "&template=" + temlplate;
        //history.pushState({}, title, href);
    }

    var fund_detail = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = fund_detail;
});