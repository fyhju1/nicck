/**
 * 弹出层的帮组类
 */
define("osoa/scripts/utils/popup", function (require, exports, module) {
    var layerUtils = require("osoa/scripts/utils/layerUtils");
    var common = require("common");
    require("art");

    /**
     * 功能:弹出窗口,也会加载初始化对应的窗口页面js模块类
     * 参数:title标题 默认显示为"提示"
     *      pageCode:页面编码
     *      param:页面入参
     *      callback(param):回调函数
     *      left:距离左边距离 默认居中
     *      top:距离顶部距离 默认居中
     *      isShowWait:是否显示加载效果,默认是false
     */
    function popWindow(title, pageCode, param, callback, left, top, isShowWait) {
        if (isShowWait) {
            layerUtils.iLoading(true, tipsWords, true);
        }
        var callBackFunc = function (content) {
            popWindowContent(title, content, left, top);
            if (isShowWait) {
                layerUtils.iLoading(false);
            }
            setTimeout(function () {
                $.loadPageJsModle(pageCode, param, callback);
            }, 500);
        };
        $.getHtmlContent(pageCode, callBackFunc);
    }

    /*
     *	读取模板的弹出框
     */
    function popXdtWindow(title, pageCode, param, callback, isShowWait, isLoadJs) {
        var LoadJs = "";
        if ($.string.isEmpty(isLoadJs) || isLoadJs == undefined) {
            LoadJs = true;
        } else {
            LoadJs = false;
        }
        if (isShowWait) {
            layerUtils.iLoading(true, tipsWords, true);
        }

        /*
         * xdtWindow的HTML基础框架 - 内容之前部分
         * 不做成模板的原因是: 减少一次Ajax请求, 且这部分不易变
         */
        var CONTENT_BEFORE_FRAME = '<div id="popup_xdtWindow"> ' +
            '<div class="popup" id="popup_xdtWindow_bg" style="display:none; position: fixed;overflow: hidden;z-index: 1000;"></div> ' +
            '<div class="w721" id="popup_xdtWindow_box" style="display:none"> ' +
            '<div class="popupTil"> ' +
            '<h6 id="popup_xdtWindow_title"></h6> ' +
            '<a href="javascript:" class="btn_close" id="popup_xdtWindow_btnClose"></a> ' +
            '</div> ' +
            '<div> ' +
            '<div id="popup_xdtWindow_content"> ' +
            '<div class="popupCont">';

        /*
         * xdtWindow的HTML基础框架 - 内容之后部分
         */
        var CONTENT_AFTER_FRAME = '</div> ' +
            '</div> ' +
            '</div> ' +
            '<div class="popupBot"></div> ' +
            '</div> ' +
            '</div>';


        var bindXdtWindowEvent = function () {
            $("#popup_xdtWindow_btnClose").unbind("click");
            $("#popup_xdtWindow_btnClose").bind("click", closeXdtWindow);
        };

        var closeXdtWindow = function () {
            if ($('#popup_xdtWindow_content').length > 0) {
                $('#popup_xdtWindow_content').html("");
                $("#popup_xdtWindow_bg,#popup_xdtWindow_box").hide();
            }
            layerUtils.iTipsClose();
            $("#popup_xdtWindow").remove();
        };

        var adjustWindow = function () {
            $("#popup_xdtWindow_box").attr("style", "position:fixed;z-index: 1001;");

            $("#popup_xdtWindow_bg").show();
            $("#popup_xdtWindow_box").show();
        };

        var getHtmlContentComplete = function (content) {
            $("body").append(CONTENT_BEFORE_FRAME + content + CONTENT_AFTER_FRAME);
            if (LoadJs) {
                setTimeout(function () {
                    $.loadPageJsModle(pageCode, param, callback);
                }, 500);
            } else {
                callback();
            }
            if (title) {
                $("#popup_xdtWindow_title").html(title);
            }

            bindXdtWindowEvent();
            adjustWindow();
            common.postionPopToMiddle("#popup_xdtWindow_box");
        };

        $.getHtmlContent(pageCode, getHtmlContentComplete);
    }


    /**
     * 功能:弹出窗口
     * 参数:title标题 默认显示为"提示"
     *      content:内容
     *      left:距离左边距离 默认居中
     *      top:距离顶部距离 默认居中
     */
    function popWindowContent(title, content, left, top) {
        title = title || "温馨提示";
        var movePopup = function () {
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();
            if (!top) {
                top = 0;
            }
            var dialogTop = ($(window).height() / 5) + top;
            var offsetleft = ($("#layer_box").outerWidth() / 2);
            if (!offsetleft || offsetleft == 0 || offsetleft == "0") {
                offsetleft = maskWidth / 6;
            }
            if (left) {
                offsetleft = left;
            }
            var leftset = (maskWidth / 2) - offsetleft;
            if (!$.support.cssFloat) {
                leftset = 0;
                if (navigator.userAgent.indexOf("MSIE 8.0") > 0 && navigator.userAgent.indexOf("SV1") < 0 && $.browser.version == "8.0") {
                    leftset = (maskWidth / 2) - offsetleft;
                }
            }
            $('#layer_bg').css({height: maskHeight, width: maskWidth}).show();
            $('#layer_box').css({top: dialogTop, left: leftset}).show();
        };
        var loadContent = function () {
            $("#layer_box_close").bindEvent(function () {
                closeWindow();
            });
            $("#layer_bg,#layer_box").hide();
            if (title) {
                $("#layer_box_title").html(title);
            }
            $("#layer_title_div").hide();
            if (content) {
                $('#layer_box_content').html(content);
                movePopup();
            }
            $(window).resize(function () {
                if (!$('#layer_box').is(":hidden")) {
                    movePopup();
                }
            });
            movePopup();
        };
        if ($("#popup_popup").length < 1) {
            var callBackFunc = function (data) {
                $("body").append(data);
                loadContent();
            };
            $.getHtmlContent("popup/popup", callBackFunc);
        }
        else {
            loadContent();
        }
    }

    /**
     * 功能:弹出协议窗口
     * 参数:title标题 默认显示为"温馨提示"
     *      content:内容
     *      callback:确定按钮的回调参数
     */
    function popProtocolContent(title, content, callback) {
        title = title || "温馨提示";
        var loadContent = function () {
            $("#popup_protocol_close").bindEvent(function () {
                closeProtocolWindow();
            });
            $("#popup_protocol_btn").bindEvent(function () {
                if (callback) {
                    callback();
                }
                closeProtocolWindow();
            });
            $("#popup_protocol_bg,#popup_protocol_box").show();
            if (title) {
                $("#popup_protocol_title").html(title);
            }
            if (content) {
                $('#popup_protocol_content').html(content);
            }
        };
        if ($("#popup_protocol").length < 1) {
            var callBackFunc = function (data) {
                $("body").append(data);
                loadContent();
            };
            $.getHtmlContent("popup/protocol", callBackFunc);
        }
        else {
            loadContent();
        }
    }

    /**
     * 显示加载效果
     */
    function showLoading(title) {
        //title = title || "请等待...";
        var loadContent = function () {
            if (title) {
                $("#popup_loading_title").html(title);
            }
            var width = document.body.clientWidth;
            width = width / 2;
            $("#popup_loading_content").attr("style", "position: absolute;left: " + width + "px;top: 300px;");

            //$("#popup_loading_bg,#popup_loading_content").show();
            //$("#password_par").hide();
        };
        if ($("#popup_loading").length < 1) {
            //var callBackFunc = function (data) {
            //    $("body").append(data);
            //    loadContent();
            //};
            //$.getHtmlContent("popup/loading", callBackFunc).show();
            var loadingHTML = '<div id="popup_loading">'+
                '<div id="shadebackground" class="shadebackground"></div>'+
            '<div class="shadebackground" id="popup_loading_bg"></div>'+
            '<div class="fg_loadbox" id="popup_loading_content">'+
            '<div class=""><img src="/front/images/spinner-small.gif"/></div>'+
            '<p id="popup_loading_title" style="text-align: center;"></p>'+
            '</div>'+
            '</div>';
            $("body").append(loadingHTML);
            $("#popup_loading").show();
        }
        else {
            loadContent();
        }
    }


    /**
     * 功能:温馨提示窗口
     * 参数:title标题 默认显示为"温馨提示"
     *      content:内容
     *      callback:确定按钮的回调参数
     *      errorNo:错误号
     *
     *      style:特殊样式
     */
    function alert(title, iconType, content, errorNo, callback, options) {
        if (errorNo == "-9999") {
            $.redirect("index");
            return;
        }
        var btnName = "确定", width = 400, height = 100;
        if (options) {
            btnName = options['btnName'] || "确定";
            width = options['width'] || 400;
            height = options['height'] || 100;
        }


        title = title || "温馨提示";
        var _iconType = "error";
        if (iconType == "1") {
            _iconType = "error";
        } else if (iconType == "2") {
            _iconType = "succeed";
        } else if (iconType == "3") {
            _iconType = "warning";
        } else if (iconType == "4") {
            _iconType = "question";
        }
        art.dialog({
            lock: true,
            drag: false,
            opacity: 0.5,
            content: content,
            title: title,
            width: width,
            height: height,
            icon: _iconType,
            button: [{
                name: btnName,
                callback: function () {
                    closeAlert();
                    if (callback) {
                        callback();
                    }
                }
            }]
        });
        /*var movePopup = function(){
         if(width){
         $("#popup_alert_content").width(width);
         }
         if(height){
         $("#popup_alert_content").height(height);
         }
         var maskHeight = $(document).height();
         var maskWidth = $(window).width();
         if(!top){
         top = 0;
         }
         var dialogTop =  ($(window).height()/5) + top;
         var offsetleft = ($("#popup_alert_content").outerWidth()/2);
         if(!offsetleft || offsetleft == 0 || offsetleft == "0"){
         offsetleft = maskWidth / 6;
         }
         if(left){
         offsetleft = left;
         }
         var leftset = (maskWidth/2) - offsetleft;
         if(!$.support.cssFloat){
         leftset = 0;
         if(navigator.userAgent.indexOf("MSIE 8.0")>0 && navigator.userAgent.indexOf("SV1")<0 && $.browser.version=="8.0"){
         leftset = (maskWidth / 2) - offsetleft;
         }
         }
         $('#popup_alert_bg').css({height:maskHeight, width:maskWidth}).show();
         $('#popup_alert_box').css({top:dialogTop}).show();
         $('#popup_alert_box').attr("style", "position:fixed");

         };
         var loadContent = function(){
         $("#popup_alert_close").bindEvent(function(){
         $("#password").show();
         closeAlert();
         });
         $("#popup_alert_btn").bindEvent(function(){
         $("#password").show();
         closeAlert();
         if(callback){
         callback();
         }
         });
         if(title){
         $("#popup_alert_title").html(title);
         }
         if (content){
         if(style){
         $('#popup_alert_content').attr("style",style).removeClass("tips_wrong tips_wrong2").html(content);
         }else{
         $('#popup_alert_content').html(content);
         }

         }
         if(errorNo==(-9999)){
         $("#popup_alert_content").html("用户已退出，请重新登陆");
         if($("#popup_confrim_btn").html() == undefined){
         addBtn('重新登陆',function(){
         location.reload();
         });
         }
         }
         movePopup();
         };

         if($("#popup_alert").length < 1){
         var callBackFunc = function(data){
         $("body").append(data);
         loadContent();
         };
         $.getHtmlContent("popup/alert",callBackFunc);
         }
         else{
         loadContent();
         }
         $("#password").hide();*/
    }

    function addBtn(ok_btn, btnFunction) {
        var btn01_html = "<div style='margin-left: 120px;'><a href='javascript:void(0);'  id='popup_confrim_btn'  class='btn01 closeDetail'>确定</a></div>";
        $('#popup_alert_content').after(btn01_html);
        ok_btn = ok_btn || "确认";
        $("#popup_confrim_btn").html(ok_btn);
        $("#popup_confrim_btn").bindEvent(function () {
            closeAlert();
            if (btnFunction) {
                btnFunction();
            }
        });
    }

    function changeToRight() {
        $('#popup_alert_content').attr("style", "background:url(../../front/images/icon05.gif) 20px -107px no-repeat;line-height:66px;font-size:22px;margin:27px 0px;padding-left:130px");
    }

    /**
     * 功能:温馨提示成功窗口
     * 参数:title标题 默认显示为"温馨提示"
     *      content:内容
     *      callback:确定按钮的回调参数
     */
    function alertSuccess(title, content, callback, width, height, left, top, content2) {
        $("#popup_alert").remove();
        title = title || "温馨提示";
        var movePopup = function () {
            if (width) {
                $("#popup_alert_content").width(width);
            }
            if (height) {
                $("#popup_alert_content").height(height);
            }
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();
            if (!top) {
                top = 0;
            }
            var dialogTop = ($(window).height() / 5) + top;
            var offsetleft = ($("#popup_alert_content").outerWidth() / 2);
            if (!offsetleft || offsetleft == 0 || offsetleft == "0") {
                offsetleft = maskWidth / 6;
            }
            if (left) {
                offsetleft = left;
            }
            var leftset = (maskWidth / 2) - offsetleft;
            if (!$.support.cssFloat) {
                leftset = 0;
                if (navigator.userAgent.indexOf("MSIE 8.0") > 0 && navigator.userAgent.indexOf("SV1") < 0 && $.browser.version == "8.0") {
                    leftset = (maskWidth / 2) - offsetleft;
                }
            }
            $('#popup_alert_bg').css({height: maskHeight, width: maskWidth}).show();
            $('#popup_alert_box').css({top: dialogTop}).show();
            $('#popup_alert_box').attr("style", "position:fixed");
            $('#popup_alert_content').attr("style", "background:url(../../front/images/icon05.gif) 20px -107px no-repeat;line-height:66px;font-size:22px;margin:27px 0px;padding-left:130px");

        };
        var loadContent = function () {
            $("#popup_alert_close").bindEvent(function () {
                closeAlert();
            });
            $("#popup_alert_btn").bindEvent(function () {
                closeAlert();
                if (callback) {
                    callback();
                }
            });
            if (title) {
                $("#popup_alert_title").html(title);
            }
            if (content) {
                $('#popup_alert_content').html(content);
            }
            if (content2) {
                $('.pop_mid').append(content2);
            }
            movePopup();
        };
        if ($("#popup_alert").length < 1) {
            var callBackFunc = function (data) {
                $("body").append(data);
                loadContent();
            };
            $.getHtmlContent("popup/alert", callBackFunc);
        }
        else {
            loadContent();
        }
    }

    /**
     * 功能:成功确认提示窗口
     * 参数:title标题 默认显示为"温馨提示"
     *      content:内容
     *      callback:确认按钮的回调参数
     *      ok_btn:确定按钮名称,默认为"确认"
     *      status: 'error'对应的框是错误提示框  'success'对应成功提示框  默认成功提示框
     */
    function alertConfirm(title, content, callback, status, ok_btn, left, top) {
        $("#popup_alert").remove();
        var btn01_html = "<div style='margin-left: 140px;'><a href='javascript:void(0);' id='popup_confrim_btn' class='btn01 closeDetail' style='width:150px;'>确定</a></div>";
        title = title || "温馨提示";
        ok_btn = ok_btn || "确认";
        var movePopup = function () {
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();
            if (!top) {
                top = 0;
            }
            var dialogTop = ($(window).height() / 5) + top;
            var offsetleft = ($("#popup_alert_content").outerWidth() / 2);
            if (!offsetleft || offsetleft == 0 || offsetleft == "0") {
                offsetleft = maskWidth / 6;
            }
            if (left) {
                offsetleft = left;
            }
            var leftset = (maskWidth / 2) - offsetleft;
            if (!$.support.cssFloat) {
                leftset = 0;
                if (navigator.userAgent.indexOf("MSIE 8.0") > 0 && navigator.userAgent.indexOf("SV1") < 0 && $.browser.version == "8.0") {
                    leftset = (maskWidth / 2) - offsetleft;
                }
            }
            $('#popup_alert_bg').css({height: maskHeight, width: maskWidth}).show();
            $('#popup_alert_box').css({top: dialogTop}).show();
            $('#popup_alert_box').attr("style", "position:fixed");
            if (status != 'error') {
                $('#popup_alert_content').attr("style", "background:url(../../front/images/icon05.gif) 20px -107px no-repeat;line-height:66px;font-size:22px;margin:27px 0px;padding-left:130px");
            }

        };
        var loadContent = function () {
            $("#popup_alert_close").bindEvent(function () {
                closeAlert();
            });
            $("#popup_alert_btn").bindEvent(function () {
                closeAlert();

            });


            if (title) {
                $("#popup_alert_title").html(title);
            }
            if (content) {
                $('#popup_alert_content').html(content);
            }
            $('#popup_alert_content').after(btn01_html);

            $("#popup_confrim_btn").html(ok_btn);

            if (callback) {
                $("#popup_confrim_btn").bindEvent(function () {
                    closeAlert();
                    callback();
                });
            } else {
                $("#popup_confrim_btn").bindEvent(function () {
                    closeAlert();
                });
            }
            movePopup();
        };
        if ($("#popup_alert").length < 1) {
            var callBackFunc = function (data) {
                $("body").append(data);
                loadContent();
            };
            $.getHtmlContent("popup/alert", callBackFunc);
        }
        else {
            loadContent();
        }
    }


    /**
     * 功能:温馨提示窗口
     * 参数:title标题 默认显示为"温馨提示"
     *      content:内容
     *      callback(flag):确定按钮的回调参数为true，取消为false
     */
    function confirm(title, iconType, content, errorNo, callback, options) {
        title = title || "温馨提示";
        var _iconType = "error";
        if (iconType == "1") {
            _iconType = "error";
        } else if (iconType == "2") {
            _iconType = "succeed";
        } else if (iconType == "3") {
            _iconType = "warning";
        } else if (iconType == "4") {
            _iconType = "question";
        }
        var confirmName = "确定", cancelName = "取消", width = 400, height = 100;
        if (options) {
            confirmName = options['confirmName'] || confirmName;
            cancelName = options['cancelName'] || cancelName;
            width = options['width'] || width;
            height = options['height'] || height;
        }

        art.dialog({
            lock: true,
            drag: false,
            opacity: 0.5,
            content: content,
            title: title,
            width: width,
            height: height,
            icon: _iconType,
            button: [{
                name: confirmName,
                callback: function () {
                    closeAlert();
                    if (callback) {
                        callback(true);
                    }
                }
            }, {
                name: cancelName,
                callback: function () {
                    if (callback) {
                        callback(false);
                    }
                }
            }
            ]
        });
        /*var movePopup = function(){
         if(width){
         $("#popup_alert_content").width(width);
         }
         if(height){
         $("#popup_alert_content").height(height);
         }
         var maskHeight = $(document).height();
         var maskWidth = $(window).width();
         if(!top){
         top = 0;
         }
         var dialogTop =  ($(window).height()/5) + top;
         var offsetleft = ($("#popup_alert_content").outerWidth()/2);
         if(!offsetleft || offsetleft == 0 || offsetleft == "0"){
         offsetleft = maskWidth / 6;
         }
         if(left){
         offsetleft = left;
         }
         var leftset = (maskWidth/2) - offsetleft;
         if(!$.support.cssFloat){
         leftset = 0;
         if(navigator.userAgent.indexOf("MSIE 8.0")>0 && navigator.userAgent.indexOf("SV1")<0 && $.browser.version=="8.0"){
         leftset = (maskWidth / 2) - offsetleft;
         }
         }
         $('#popup_alert_bg').css({height:maskHeight, width:maskWidth}).show();
         $('#popup_alert_box').css({top:dialogTop}).show();
         };
         var loadContent = function(){
         $("#popup_alert_btn1").show();
         $("#popup_alert_close").bindEvent(function(){
         closeAlert();
         });
         $("#popup_alert_btn").bindEvent(function(){
         closeAlert();
         if(callback){
         callback(true);
         }
         });
         $("#popup_alert_btn1").bindEvent(function(){
         closeAlert();
         if(callback){
         callback(false);
         }
         });
         if(title){
         $("#popup_alert_title").html(title);
         }
         if (content){
         $('#popup_alert_content').html(content);
         }
         if(yesTitle){
         $("#popup_alert_btn").text(yesTitle);
         }
         if(noTitle){
         $("#popup_alert_btn1").text(noTitle);
         }
         movePopup();
         };
         if($("#popup_alert").length < 1){
         var callBackFunc = function(data){
         $("body").append(data);
         loadContent();
         };
         $.getHtmlContent("popup/alert",callBackFunc);
         }
         else{
         loadContent();
         }*/
    }

    /**
     * 关闭加载效果
     */
    function closeLoading() {
        if ($("#popup_loading").length > 0) {
            //$("#popup_loading_bg,#popup_loading_content").hide();
            //$("#password_par").show();
            $("#popup_loading").hide();
            $("#popup_loading").remove();
        }
    }

    /**
     * 关闭窗口
     */
    function closeWindow() {
        if ($('#layer_box_content').length > 0) {
            $('#layer_box_content').html("");
            $("#layer_bg,#layer_box").hide();
        }
    }

    /**
     * 关闭协议窗口
     */
    function closeProtocolWindow() {
        if ($('#popup_protocol_content').length > 0) {
            $('#popup_protocol_content').html("");
            $("#popup_protocol_bg,#popup_protocol_box").hide();
        }
    }

    /**
     * 关闭提示框
     */
    function closeAlert() {
        if ($('#popup_alert_content').length > 0) {
            $('#popup_alert_content').html("");
            $("#popup_alert_bg,#popup_alert_box").hide();
            $("#popup_alert_btn1").hide();
        }
    }

    /**
     * 文本框后提示内容显示
     *   id 文本框id
     *   msg 提示消息
     *   flag true和不传值为显示提示，false和其他为不显示提示
     */
    function showTip(id, msg, flag) {
        if (flag == undefined || flag) {
            if (msg && msg != "") {
                $("#" + id).parent().children("span").remove();
                $("#" + id).parent().append("<span class=\"tip_no\" temp=\"tip\">" + msg + "</span>");
            } else {
                $("#" + id).parent().children("span").remove();
                $("#" + id).parent().append("<span class=\"tip_yes\" temp=\"tip\" style=\"margin-top:5px;\"></span>");
            }
        } else if (!flag) {
            if ($.string.isNotEmpty(id)) {
                $("#" + id).parent().children("span").remove();
            } else {
                $("span[temp='tip']").remove();
            }
        }

    }

    /**
     * select后提示内容显示
     *   id select框id
     *   msg 提示消息
     *   flag true和不传值或空字符串为显示提示，false和其他为不显示提示
     */
    function showSpecialTip(id, msg, flag, parent_num) {
        var parent_num = parseInt(parent_num);
        if (flag == undefined || flag || flag == "") {
            var parentObj = $("#" + id);
            for (var i = 0; i < parent_num; i++) {
                parentObj = parentObj.parent();
            }
            if (msg && msg != "") {
                parentObj.children("span[temp='tip']").remove();
                parentObj.append("<span class=\"tip_no\" temp=\"tip\" style=\"margin-top:5px;\">" + msg + "</span>");
            } else {
                parentObj.children("span[temp='tip']").remove();
                parentObj.append("<span class=\"tip_yes\" temp=\"tip\" style=\"margin-top:5px;\"></span>");
            }
        } else if (!flag) {
            $("span[temp='tip']").remove();
        }
    }

    var popup = {
        "popWindow": popWindow,
        "popXdtWindow": popXdtWindow,
        "popWindowContent": popWindowContent,
        "popProtocolContent": popProtocolContent,
        "alert": alert,
        "alertConfirm": alertConfirm,
        "alertSuccess": alertSuccess,
        "confirm": confirm,
        "closeWindow": closeWindow,
        "showLoading": showLoading,
        "closeLoading": closeLoading,
        "closeAlert": closeAlert,
        "showTip": showTip,
        "showSpecialTip": showSpecialTip
    };
    module.exports = popup;
});