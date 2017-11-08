/**
 * 首页 
 */
define("osoa/scripts/index", function(require, exports, module) {
    var layerUtils = require("layerUtils");
    var pageId = "#index ";
    var fundService = require("fundService");
    var common = require("common");

    //初始化
    function init(parm) {
        //		$(pageId + " .prod_small").eq(3).addClass("m_rihgt_0");

        $("#include_header .nav_wrap #hs_index").addClass("cur").siblings().removeClass("cur");

        $("#right").loadPageContent(null, "include/right", {}, function() {}, true, false, true);

        eachHtmlSave();
    }


    //绑定事件
    function bindPageEvent() {

        //热门主题
        $(pageId + " #hot_theme a").bindEvent(function() {
            var theme_code = $(this).attr("theme_code");
            var fund_type = ""; // $(pageId + " #hot_type a.filter_all").attr("fund_type");
            $(pageId + " #hot_type a").removeClass("filter_all");
            $(pageId + " #hot_type a").eq(0).addClass("filter_all");
            $(this).addClass("filter_all").siblings().removeClass("filter_all");
            $(pageId + " .all_fund .fund_list .sort_th .sort_ctrl").removeClass("up").removeClass("down").addClass("gray");
            showProductList(fund_type, theme_code);
        });

        //热门类型
        $(pageId + " #hot_type a").bindEvent(function() {
            var fund_type = $(this).attr("fund_type");
            var theme_code = ""; //$(pageId + " #hot_theme  a.filter_all").attr("theme_code");
            $(pageId + " #hot_theme  a").removeClass("filter_all");
            $(pageId + " #hot_theme  a").eq(0).addClass("filter_all");
            $(this).addClass("filter_all").siblings().removeClass("filter_all");
            $(pageId + " .all_fund .fund_list .sort_th .sort_ctrl").removeClass("up").removeClass("down").addClass("gray");
            showProductList(fund_type, theme_code);
        });

        //查看更多
        $(pageId + " .all_fund .fund_list .show_open .fund_close").bindEvent(function() {
            $(pageId + " .all_fund .fund_list .fund_hide").show();
            $(pageId + " .all_fund .fund_list .show_open .fund_close").hide();
            $(pageId + " .all_fund .fund_list .show_open .fund_open").show();
            var length = $(pageId + " .all_fund .fund_list .money_table tr").length;
            if (length > 1) {
                $(pageId + " .all_fund .fund_list .money_table").show();
            }
        });

        //收起部分基金
        $(pageId + " .all_fund .fund_list .show_open .fund_open").bindEvent(function() {
            $(pageId + " .all_fund .fund_list .fund_hide").hide();
            $(pageId + " .all_fund .fund_list .show_open .fund_open").hide();
            $(pageId + " .all_fund .fund_list .show_open .fund_close").show();
            $(pageId + " .all_fund .fund_list .money_table").hide();
        });

        //排序
        $(pageId + " .all_fund .fund_list .sort_th").bindEvent(function() {
            var type = $(this).find(".sort").attr("type");
            var fund_type = $(pageId + " #hot_type a.filter_all").attr("fund_type");
            var theme_code = $(pageId + " #hot_theme a.filter_all").attr("theme_code");
            var sort_type = 0; //0升序  1降序
            $(this).siblings().find(".sort_ctrl").removeClass("up").removeClass("down").addClass("gray");
            if ($(this).find(".sort_ctrl").hasClass("up")) {
                $(this).find(".sort_ctrl").removeClass("up").addClass("down");
                sort_type = 1;
            } else if ($(this).find(".sort_ctrl").hasClass("down")) {
                $(this).find(".sort_ctrl").removeClass("down").addClass("up");
                sort_type = 0;
            } else if ($(this).find(".sort_ctrl").hasClass("gray")) {
                $(this).find(".sort_ctrl").removeClass("gray").addClass("down");
                sort_type = 1;
            }
            showProductList(fund_type, theme_code, type, sort_type);
        });

        $(pageId + " .banner .swiper_item").bindEvent(function() {
            var url = $(this).attr("url");
            if (!$.string.isEmpty(url)) {
                window.open(url);
            }
        });


        $(pageId + " tbody ").bindChildEvent("tr .star_btn", function() {
            var save = $.getStorage("save");
            var arrays = null;
            if (save != "" && save != null) {
                arrays = $.strToJson(save);
            }
            var fund_code = $(this).parent().find("td").eq(2).text();
            if ($(this).hasClass("fav")) {
                $(this).removeClass("fav").addClass("unfav");
                if (arrays != null) {
                    var array = arrays.fund;
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].fund_code == fund_code) {
                            array.remove(i);
                            i--;
                        }
                    }
                }
            } else {
                $(this).removeClass("unfav").addClass("fav");
                var array = null;
                if (arrays != null) {
                    array = arrays.fund;
                } else {
                    array = new Array();
                }
                var fund_name = $(this).parent().find("td").eq(0).text();
                var unit_nv = $(this).parent().find("td").eq(3).text();
                var daily_change = $(this).parent().find("td").eq(5).text();
                var param = {
                    fund_code: fund_code,
                    fund_name: fund_name,
                    unit_nv: unit_nv,
                    daily_change: daily_change
                }
                array.push(param);
            }
            var params = {
                "fund": array
            }
            $.setLocalStorage("save", $.jsonToStr(params));

            initSave();
        });
    }


    function initSave() {
        var save = $.getStorage("save");
        var arrays = null;
        var str = '我的收藏 <div class="right_collapse">' +
            '<table style="border-collapse:collapse;border_apcing:0">' +
            '     <tbody><tr>' +
            '          <th>基金名称</th>' +
            '           <th>基金代码</th>' +
            '            <th>最新净值</th>' +
            '             <th>日涨跌幅</th>' +
            '          </tr>';

        if (save != "" && save != null) {
            arrays = $.strToJson(save);
            var array = arrays.fund;
            for (var i = 0; i < array.length; i++) {
                str += '<tr>';
                var fund_code = array[i].fund_code;
                var fund_name = array[i].fund_name;
                var unit_nv = array[i].unit_nv;
                if (unit_nv.length > 10) {
                    unit_nv = unit_nv.substring(0, unit_nv.length - 10);
                }
                var daily_change = array[i].daily_change;
                if (fund_name == "" || fund_name == null) {
                    str += initText("--");
                } else {
                    str += initText(fund_name);
                }
                str += initText(fund_code);
                if (unit_nv == "" || unit_nv == null || unit_nv == "underfined" || !unit_nv) {
                    str += initText("--");
                } else {
                    str += initText(unit_nv + "(元)");
                }

                var color_daily = "";
                var color = "";
                if (daily_change == "" || daily_change == "" || daily_change == "underfined" || !daily_change) {
                    daily_change == "--";
                } else {
                    color_daily = daily_change.replace(/\t/g, "");
                    color_daily = color_daily.replace(/\n/g, "");
                    color_daily = color_daily.replace(/&nbsp;/g, "");
                    color_daily = color_daily.replace(/ /g, "");
                    color_daily = color_daily.replace(/%/g, "");
                    if (color_daily - 0 > 0) {
                        color = "red";
                    }
                    if (color_daily - 0 < 0) {
                        color = "green";
                    }
                }
                str += initText(daily_change, color);
                str += '</tr>';
            }
        }
        str += '   </tbody></table>' +
            '</div>';
        $(' #include_right .right_0').html("");
        $(' #include_right .right_0').html(str);
    }

    function initText(code, color) {
        if (code == null) {
            code = "";
        }
        if (color == null || color == "") {
            return '<td>' + code + '</td>';
        } else {
            if (color == "red") {
                return "<td class='red'>" + code + "</td>";
            }
            if (color == 'green') {
                return "<td class='green'>" + code + "</td>";
            }
        }
    }

    function eachHtmlSave() {
        $(pageId + ' tbody tr ').each(function() {
            var save = $.getStorage("save");
            var arrays = null;
            var fund_code = $(this).find("td").eq(2).text();
            if (save != "" && save != null) {
                arrays = $.strToJson(save);
                var array = arrays.fund;
                for (var i = 0; i < array.length; i++) {
                    if ($.trim(fund_code) == $.trim(array[i].fund_code)) {
                        $(this).find("td").eq(1).removeClass("unfav").addClass("fav");
                    }
                }
            }
        })
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


    /**
     *  产品list展示
     */
    function showProductList(fund_type, theme_code, sort_column, sort_type) {
        fundService.getFundList(function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
            var results = resultVo.getResults();
            var len = 0; //记录货币型数量 
            var lens = 0; //记录其他数量
            var str = "";
            // //货币列表标题
            var strs = "<tr class='fund_th'>" +
                "<th class='txt_l fund_name'>基金名称</th>" +
                "<th>关注</th> <th>基金代码</th> <th class='sort_os'>万份收益（元）</th> <th  class='sort_os'>七日年化<br />收益率（%）</th>" +
                "<th  class='sort_os'>日涨跌幅（%）</th><th  class='sort_os'>成立日期</th><th>赎回状态</th>" +
                "<th>操作</th></tr>";
            if (error_no == 0) {
                if (results != null) {
                    for (var i = 0; i < results.length; i++) {

                        var profit_per_million = results[i].profit_per_million;
                        var nv_date = results[i].nv_date;
                        var unit_nv = results[i].unit_nv;
                        var yieldratestart = results[i].yieldratestart;
                        var daily_change = results[i].daily_change;
                        var establish_date = results[i].establish_date;
                        var serven_days_annual_profit = results[i].serven_days_annual_profit;
                        var sum_nv = results[i].sum_nv;
                        var preferential_rate = results[i].preferential_rate;
                        var buy_rate = results[i].buy_rate;
                        var nv_scale = results[i].nv_scale;

                        if (nv_scale == "" || nv_scale == null) { nv_scale = 3; } else { nv_scale = nv_scale - 0; }
                        if ($.string.isEmpty(profit_per_million)) { profit_per_million = "--"; } else { profit_per_million = common.rounds(profit_per_million, 4); }
                        if ($.string.isEmpty(nv_date)) { nv_date = "--"; }
                        if ($.string.isEmpty(yieldratestart) || yieldratestart == '0') { yieldratestart = "--"; } else { yieldratestart = common.rounds(yieldratestart, 2); }
                        if ($.string.isEmpty(daily_change) || daily_change == '0') { daily_change = "0.00"; } else { daily_change = common.rounds(daily_change, 2); }
                        if ($.string.isEmpty(establish_date)) { establish_date = "--"; }
                        if ($.string.isEmpty(serven_days_annual_profit)) { serven_days_annual_profit = "--"; } else { serven_days_annual_profit = common.rounds(serven_days_annual_profit, 4); }
                        if ($.string.isEmpty(unit_nv)) { unit_nv = "--"; } else { unit_nv = common.rounds(unit_nv, nv_scale); }
                        if ($.string.isEmpty(sum_nv)) { sum_nv = "--"; } else { sum_nv = common.rounds(sum_nv, nv_scale); }
                        if ($.string.isEmpty(preferential_rate)) { preferential_rate = "--"; }
                        if ($.string.isEmpty(buy_rate)) { buy_rate = "--"; }

                        if (results[i].fund_type != "4" && lens >= 10) {
                            var ops = "<tr class='fund_show fund_hide'><td class='txt_l fund_name txt-bold' fundCode='" + results[i].fund_code + "' >";
                        } else {
                            var ops = "<tr class='fund_show'><td class='txt_l fund_name txt-bold' fundCode='" + results[i].fund_code + "' >";
                        }
                        ops += "<a style='color:#3d3c44' href='/osoa/views/fund/detail/" + results[i].fund_code + ".html?fund_code=" + results[i].fund_code + "'>" + results[i].fund_short_name + "</a></td>";

                        // if (results[i].fund_type == "4") {
                        //     ops += "<a style='color:#3d3c44' href='/osoa/views/fund/detail/" + results[i].fund_code + ".html?fund_code=" + results[i].fund_code + "&daily_change=" + daily_change + "&unit_nv=" + profit_per_million + "'>" + results[i].fund_short_name + "</a></td>";
                        // } else {
                        //     ops += "<a style='color:#3d3c44' href='/osoa/views/fund/detail/" + results[i].fund_code + ".html?fund_code=" + results[i].fund_code + "&daily_change=" + daily_change + "&unit_nv=" + unit_nv + "'>" + results[i].fund_short_name + "</a></td>";
                        // }
                        ops += "<td class='unfav star_btn'></td><td class='txt-bold'>" + results[i].fund_code + "</td>";


                        if (results[i].fund_type == "4") {
                            ops += "<td class='txt-bold'>" + profit_per_million + "<br/> <span>" + nv_date + "</span></td><td>";
                            if (serven_days_annual_profit == "--") {
                                ops += "" + serven_days_annual_profit + "</td>";
                            } else {
                                ops += "" + serven_days_annual_profit + "%</td>";
                            }
                        } else {
                            ops += "<td class='txt-bold'>" + unit_nv + "<br/> <span>" + nv_date + "</span></td><td>" + sum_nv + "</td>";
                        }

                        if (daily_change != "--") {
                            if (daily_change - 0 > 0) {
                                ops += "<td class='num_red txt-bold'>" + daily_change + "%</td>";
                            } else if (daily_change - 0 == 0) {
                                ops += "<td class='num_red txt-bold'><div style='color:gray'>0.00%</div></td>";
                            } else {
                                ops += "<td class='num_green txt-bold'>" + daily_change + "%</td>";
                            }
                        } else {
                            ops += "<td class='txt-bold'>" + daily_change + "</td>";
                        }

                        if (results[i].fund_type == "4") {
                            ops += "<td>" + establish_date + "</td>";
                        } else {
                            if (yieldratestart == "--" || yieldratestart == '0') {
                                ops += "<td class='txt-bold'>" + yieldratestart + "</td>";
                            } else {
                                if (yieldratestart - 0 > 0) {
                                    ops += "<td class='num_red txt-bold'>" + yieldratestart + "%</td>";
                                } else {
                                    ops += "<td class='num_green txt-bold'>" + yieldratestart + "%</td>";
                                }
                            }
                        }

                        if (results[i].redeem_status == "0") {
                            ops += "<td>关闭</td>";
                        } else {
                            ops += "<td>开放</td>";
                        }
                        ops += "<td>";
                        if (!$.string.isEmpty(results[i].purchase_status)) {
                            if (results[i].purchase_status == "1") {
                                ops += "<a  target='_blank'  href='https://trade.hsfund.com/etrading/' class='fund_ctrl'>申购</a>&nbsp;";
                            } else {
                                ops += "<a style='background:#ccc'  href='javascript:void(0)' class='fund_ctrl'>申购</a>&nbsp;";
                            }
                        } else {
                            ops += "<a style='background:#ccc'  href='javascript:void(0)' class='fund_ctrl'>申购</a>&nbsp;";
                        }
                        if (!$.string.isEmpty(results[i].subscribe_status)) {
                            if (results[i].subscribe_status == "1") {
                                ops += "<a  target='_blank'  href='https://trade.hsfund.com/etrading/' class='fund_ctrl'>定投</a>&nbsp;";
                            } else {
                                ops += "<a style='background:#ccc'  href='javascript:void(0)' class='fund_ctrl'>定投</a>";
                            }
                        } else {
                            ops += "<a style='background:#ccc'  href='javascript:void(0)' class='fund_ctrl'>定投</a>";
                        }

                        if (preferential_rate != "--" && buy_rate != "--") {
                            ops += "<div class='ctrl_des'>优惠费率：<i class='num_red'>" + preferential_rate + "%</i>";
                            ops += "<s>" + buy_rate + "%</s></div></td></tr>";
                        }
                        if (results[i].fund_type == "4") {
                            strs += ops;
                            len++;
                        } else {
                            lens++;
                            str += ops;
                        }
                    }
                }

                var isshow = $(pageId + " .all_fund .fund_list .show_open .fund_open").is(":visible");

                $(pageId + " .all_fund .fund_list .show_open .fund_close").show();
                $(pageId + " .all_fund .fund_list .show_open .fund_open").hide();
                $(pageId + " .all_fund .fund_list .show_open").hide();


                $(pageId + " .all_fund .fund_list .fixed_tabble tbody.html_body").html(str);

                if ($.string.isEmpty(sort_column) && $.string.isEmpty(sort_type)) {
                    $(pageId + " .all_fund .fund_list .money_table tbody").html(strs);
                    $(pageId + " .all_fund .fund_list .money_table").show();
                    $(pageId + " .all_fund .fund_list .fixed_tabble").show();

                    if (lens == 0 && len == 0) {
                        $(pageId + " .all_fund .fund_list .money_table").hide();
                    } else {
                        if (lens == 0) {
                            $(pageId + " .all_fund .fund_list .fixed_tabble").hide();
                        }
                        if (len == 0 || lens >= 10) {
                            $(pageId + " .all_fund .fund_list .money_table").hide();
                        } else {
                            $(pageId + " .all_fund .fund_list .money_table").show();
                        }
                    }

                } else {
                    if (isshow) {
                        if (lens >= 10) {
                            $(pageId + " .all_fund .fund_list .fund_hide").show();
                        }
                        $(pageId + " .all_fund .fund_list .show_open .fund_open").show();
                        $(pageId + " .all_fund .fund_list .show_open .fund_close").hide();
                    } else {
                        if (lens >= 10) {
                            $(pageId + " .all_fund .fund_list .money_table").hide();
                        }
                    }
                }
                if (lens >= 10) {
                    $(pageId + " .all_fund .fund_list .show_open").show();
                }
            } else {
                layerUtils.iAlert(error_info);
            }
            eachHtmlSave();
        }, { fund_type: fund_type, theme_code: theme_code, sort_column: sort_column, sort_type: sort_type });
    }


    //销毁页面，单页面时候要用
    function destroy() {

    }



    var index = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = index;
});