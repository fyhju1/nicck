/**
 * 右侧
 */
define("osoa/scripts/include/right", function(require, exports, module) {
    require("osoa/js/swiper.min.js");
    var swiper = null;
    var main = {
        init: function() {
            var self = this;
            self.bindEvent();
            self.swipeInit();
            self.rightArrow();
            // self.tab();
        },
        bindEvent: function() {
            var self = this;
            var $banner = $('.banner');

            if ($banner.length <= 0) {
                return false
            }

            $banner.on('click', '.swiper_des_item', function() {
                var index = $(this).index();
                if (swiper) {
                    swiper.slideTo(index + 1);
                }
            })
        },
        swipeInit: function() {
            var target = '.swiper-container'
            if ($(target).length <= 0) {
                return false
            }

            swiper = new Swiper('.swiper-container', {
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 30,
                autoplay: 6000,
                loop: true,
                autoplayDisableOnInteraction: false,
                onTransitionEnd: function(swiper) {
                    var index = swiper.activeIndex;
                    var domIndex = index - 1;
                    $('.swiper_des_item').removeClass('cur');
                    $('.swiper_des_item').eq(domIndex).addClass('cur');
                }
            });
        },
        rightArrow: function() {
            var right_last = $('#right_last'),
                right_qr = $('.right_qr')

            if (right_last.length <= 0) {
                return false
            }

            right_last
                .click(function(event) {
                    var oThis = $(this)
                    oThis.toggleClass('collapse');
                    right_qr.toggleClass('show');
                });
        },
        tab: function() {
            var tabBox = $('.tab_box'),
                tabsLi = tabBox.find('.tabs > *'),
                tabContent = tabBox.find('.tab_content')

            if (tabBox.length <= 0) {
                return false
            }

            tabsLi
                .click(function() {
                    var oThis = $(this),
                        iIndex = oThis.index()

                    oThis
                        .addClass('current')
                        .siblings('*.current')
                        .removeClass('current')

                    tabContent
                        .eq(iIndex)
                        .addClass('current')
                        .siblings('.tab_content.current')
                        .removeClass('current')
                })
        }

    };
    main.init();

    var pageId = '#include_right';
    //初始化
    function init(param) {
        initSave();
        initLook();
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
                }else{
                	str += initText(fund_name);
				}
                str += initText(fund_code);
                if (unit_nv == "" || unit_nv == null || unit_nv == "underfined" || !unit_nv) {
                    str += initText("--");
                } else {
                    str += initText(unit_nv + "(元)");
                }
                
                var color_daily="";
                var color="";
                if (daily_change == "" || daily_change == "" || daily_change == "underfined" || !daily_change) {
                    daily_change == "--";
                } else {
                	color_daily=daily_change.replace(/\t/g,"");
                	color_daily=color_daily.replace(/\n/g,"");
                	color_daily=color_daily.replace(/&nbsp;/g,"");
                	color_daily=color_daily.replace(/ /g,"");
                	color_daily=color_daily.replace(/%/g,"");
                	if(color_daily-0>0){
                		color="red";
                	}
                	if(color_daily-0<0){
                		color="green";
                	}
                }
                str += initText(daily_change,color);
                str += '</tr>';
            }
        }
        str += '   </tbody></table>' +
            '</div>';
        $(' #include_right .right_0').html("");
        $(' #include_right .right_0').html(str);
    }

    function initText(code,color) {
        if (code == null) {
            code = "";
        }
        if(color==null||color==""){
        	return '<td>' + code + '</td>';
        }else{
        	if(color=="red"){
        		return "<td class='red'>"+code+"</td>";
        	}
        	if(color=='green'){
        		return "<td class='green'>"+code+"</td>";
        	}
        }
    }

    function initLook() {
        var save = $.getStorage("look");
        var arrays = null;
        var str = '最近浏览 <div class="right_collapse">' +
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
                var daily_change = array[i].daily_change;
                
                if (fund_name == "" || fund_name == null) {
                    str += initText("--");
                }else{
                	str += initText(fund_name);
            	}
                str += initText(fund_code);
                if (unit_nv == "" || unit_nv == null || unit_nv == "--" || unit_nv == "underfined" || !unit_nv) {
                    str += initText("--");
                } else {
                    str += initText(unit_nv + "(元)");
                }
                var color_daily="";
                var color="";
                if (daily_change == "" || daily_change == "" || daily_change == "underfined" || !daily_change) {
                    daily_change == "--";
                } else {
                	color_daily=daily_change.replace(/\t/g,"");
                	color_daily=color_daily.replace(/\n/g,"");
                	color_daily=color_daily.replace(/&nbsp;/g,"");
                	color_daily=color_daily.replace(/ /g,"");
                	if(color_daily-0>0){
                		color="red";
                	}
                	if(color_daily-0<0){
                		color="green";
                	}
                    daily_change += "%";
                }
                str += initText(daily_change,color);
                str += '</tr>';
            }
        }
        str += '   </tbody></table>' +
            '</div>';
        $(' #include_right .right_1').html("");
        $(' #include_right .right_1').html(str);
    }


    //绑定事件
    function bindPageEvent() {}
    //销毁页面，单页面时候要用
    function destroy() {

    }
    /**
     * 	
     * 
     */
    var right = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };
    // 暴露对外的接口
    module.exports = right;
});