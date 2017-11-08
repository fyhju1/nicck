var swiper = null;
var main = {
    init: function() {
        var self = this;
        self.bindEvent();
        self.swipeInit();
        self.rightArrow();
        // self.tab();
        self.star()
        self.viewed()
    },
    bindEvent: function() {
        var self = this;
        var $banner = $('.banner');
        var $myaccount = $('.myaccount');

        $myaccount.on('click', '.account_help', function(e) {
            e.stopPropagation();
            self.triggerHelp();
        });

        $(document).on('click', function() {
            $('.help_wrap').removeClass('show');
        });

        if ($banner.length > 0) {
            $banner.on('click', '.swiper_des_item', function() {
                var index = $(this).index();
                if (swiper) {
                    swiper.slideTo(index + 1);
                }
            });
        }

        $('.rate-select')
            .change(function() {
                var oThis = $(this),
                    sVal = oThis.val(),
                    sDefault = '手动输入',
                    oParent = oThis.parent('.content-buy-sel'),
                    oInputParent = oParent.nextAll('.buy_ipt').eq(0)

                if (sVal == sDefault) {
                    oInputParent
                        .addClass('show')
                } else {
                    oInputParent
                        .removeClass('show')
                }
            })
    },
    swipeInit: function() {
        var target = '.swiper-container';
        if ($(target).length <= 0) {
            return false;
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
                var swiper_length = $('.swiper_des_item').length;
                var domIndex = (index - 1) % swiper_length;
                $('.swiper_des_item').removeClass('cur');
                $('.swiper_des_item').removeClass('curs');
                $('li.swiper_des_item').eq(domIndex).addClass('curs');
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
    },
    triggerHelp: function() {
        var isShow = $('.help_wrap').hasClass('show');
        if (isShow) {
            $('.help_wrap').removeClass('show');
        } else {
            $('.help_wrap').addClass('show');
        }
    },
    viewed: function() {
        var show = $('.viewed_wrap'),
            storage = window.localStorage

        if (!storage) {
            console.error('您的浏览器不支持localStorage')
            return false
        }

        var viewedData = storage.getItem('viewed') ? JSON.parse(storage.getItem('viewed')) : {}

        function render(data) {
            var html = '',
                tHead = show.find('tr').eq(0)

            $.each(data, function(index, item) {
                html += '<tr><td>' + item.fund_name + '</td><td>' + item.fund_id + '</td><td>' + item.fund_net_value + '</td><td><span class="red">' + item.fund_change + '</span></td></tr>'
            })

            tHead
                .siblings()
                .remove()
            tHead
                .after(html)
        }

        render(viewedData)
    },
    addViewedData: function(id, data) {
        var storage = window.localStorage

        if (!storage) {
            console.error('您的浏览器不支持localStorage')
            return false
        }

        var viewedData = storage.getItem('viewed') ? JSON.parse(storage.getItem('viewed')) : {}
        viewedData[id] = data
        var jsonData = JSON.stringify(viewedData)
        storage.setItem('viewed', jsonData)
        this.viewed()
    },
    star: function() {}
};
main.init();

function setViewed(data) {

}