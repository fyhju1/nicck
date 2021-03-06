﻿/**
 * 程序入口配置读取
 * 项目开发时需要的自定义配置
 */
define(function(require, exports, module) {

    var configuration = {
        "firstLoadCss": "/osoa/css/style.css", //加载的样式文件
        "pageTitle": "c华商基金管理有限公司 -天利宝|基金|理财|专户", //页面标题
        "projPath": "/osoa/", //工程目录

        //错误功能号定义
        "filters": {
            "-999": function(resultVo) {}, //未登录
            "-998": function(resultVo) {}, //后台返回数据格式不正确，请联系管理员
            "-997": function(resultVo) {}, //网络中断或跨域请求或服务器异常！
            "-996": function(resultVo) {} //请求超时
        },
        /**
         * 登陆检测
         */
        "loginCheck": {

        },

        /**
         * 项目中的别名配置
         */
        "pAlias": {
            "common": "osoa/scripts/utils/common.js",
            "popup": "osoa/scripts/utils/popup.js",
            "art": "osoa/scripts/utils/artDialog.source.js",
            "articleService": "osoa/scripts/service/article/articleService.js",
            "fundService": "osoa/scripts/service/fund/fundService.js",
            "fxckhService": "osoa/scripts/service/query/fxckhService.js",
            "layerUtils": "plugins/layer/scripts/layerUtils.js",
            "pagination": "osoa/scripts/common/pagination.js",
            "echarJs": "osoa/scripts/common/echar.js",
            "chartsUtils": "osoa/scripts/utils/chartsUtils.js",
            "constants": "osoa/scripts/constants/serviceConstants.js"
        },

        /**
         * 项目中需要用到的常量变量配置
         * 通过require("gconfig").global.*来调用
         */
        "global": {
            "session_time": 30, //session过期时间
            "server": "/servlet/json"
        },

        initFunc: function(callBackFunc) {
            //初始化js和css
            var jsAndCss = [];

            //jsAndCss.push("/front/style/style.css");
            jsAndCss.push("/osoa/js/jquery.SuperSlide.2.1.1.js");
            require.async(jsAndCss, function() {
                if (callBackFunc) {
                    callBackFunc();
                }
            });
        }
    };

    //暴露对外的接口
    module.exports = window.configuration = configuration;
});