/**
 * 描述:根据华商项目分装Echar.js
 * 作者:位才源
 */
define("osoa/scripts/common/echar", function(require, exports, module) {
    require("osoa/js/echarts.common.min.js");

    var pagination = {
        "initEcharRedirect": initEcharRedirect, //折线图
        "initEcharPercent": initEcharPercent, //折现%
        "initEcharRund": initEcharRund //圆形图表
    };

    //折线图
    function initEcharRedirect(title1, title2, id, unitdata, sumdata, timedata, pageId) {
        // // 基于准备好的dom，初始化echarts实例

        var echart_fund = echarts.init(document.getElementById(id));

        // 指定图表的配置项和数据
        var optionFund = {
            color: ['#9b7ff6', '#f26c71'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x: 'right',
                data: [title1, title2]
            },
            grid: {
                left: '0%',
                right: '4.8%',
                bottom: '6%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: timedata
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: title1,
                type: 'line',
                stack: '总量',
                data: unitdata
            }, {
                name: title2,
                type: 'line',
                stack: '总量',
                data: sumdata
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        echart_fund.setOption(optionFund);

        var echartTab = {
            target: $(pageId + ' #echart_tab > *'),
            init: function() {
                this.bind()
            },
            bind: function() {
                var self = this

                self.target
                    .click(function(event) {
                        var oThis = $(this),
                            iIndex = oThis.index()

                        self.tab(oThis)
                        self.echart(iIndex)
                    });
            },
            tab: function(oThis) {
                oThis
                    .addClass('current')
                    .siblings('.current')
                    .removeClass('current')
            },
            echart: function(i) {
                echart_fund.setOption(optionFund);
            }
        }
        echartTab.init();
    }


    //折线图百分比
    function initEcharPercent(title1, title2, id, unitdata, sumdata, timedata, pageId) {
        // // 基于准备好的dom，初始化echarts实例

        var echart_fund = echarts.init(document.getElementById(id));

        // 指定图表的配置项和数据
        var optionFund = {
            color: ['#9b7ff6', '#f26c71'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x: 'right',
                data: [title1, title2]
            },
            grid: {
                left: '0%',
                right: '4.8%',
                bottom: '6%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: timedata
            },
            yAxis: {
                type: 'value',
                name: '%',
                axisLabel: {
                    formatter: '{value}%'
                }
            },
            series: [{
                name: title1,
                type: 'line',
                stack: '总量',
                data: unitdata
            }, {
                name: title2,
                type: 'line',
                stack: '总量',
                data: sumdata
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        echart_fund.setOption(optionFund);

        var echartTab = {
            target: $(pageId + ' #echart_tab > *'),
            init: function() {
                this.bind()
            },
            bind: function() {
                var self = this

                self.target
                    .click(function(event) {
                        var oThis = $(this),
                            iIndex = oThis.index()

                        self.tab(oThis)
                        self.echart(iIndex)
                    });
            },
            tab: function(oThis) {
                oThis
                    .addClass('current')
                    .siblings('.current')
                    .removeClass('current')
            },
            echart: function(i) {
                echart_fund.setOption(optionFund);
            }
        }
        echartTab.init();
    }

    /**
	 * 圆形图表
	 * originData[{
	 * 		{
                value:154,
                name:'搜索引擎',
                per: '60%',
                itemStyle: {
                    normal: {
                        color: '#f4ddc9'
                    }
                }
            }
	 * }]
	 * 
	 */
    function initEcharRund(id, originData) {
        var myChart = echarts.init(document.getElementById(id));
        // 指定图表的配置项和数据
        option = {
            tooltip: {
                trigger: 'item'
            },

            series: [{
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                center: ['52%', '40%'],
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            color: '#000000',
                            fontSize: '14'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '10',
                            color: '#000000',
                            fontWeight: 'bold',
                        },
                        formatter: function(a) {
                            return a.data.name + '\n\n' + a.data.per
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: originData,
                itemStyle: {
                    normal: {}
                }
            }]
        };
        myChart.setOption(option);
    }

    module.exports = pagination;
});