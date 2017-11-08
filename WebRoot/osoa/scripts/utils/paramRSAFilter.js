/**
* Created by SIMON on 2014-04-16.
 */
define(function(require, exports, module) {
    require("jquery");
    require("ext");
    require("gconfig");
    serviceConstants = require("osoa/scripts/constants/serviceConstants");
    password = require("osoa/scripts/utils/password");
    /**
     * @描述:项目中针对每次都需要加密字符 在 js中出现大量相同代码,统一对service中的 param 进行加密操作.
     * @author:SIMON
     * @param paramArr
     */
    function rsaEncryptParam(paramArr){
        var value ="";
        var rsavalue ="";
        for(var key in paramArr){
            if (!isFilter(key)) {
            } else {
                value = paramArr[key];

               rsavalue = password.rsaAsyncEncrypt(value);

               paramArr[key] =rsavalue;
            }
        }
        return paramArr;
    }

    /**
     * @description:当前 key  是否需要进行加密处理.
     * @param key
     * @returns {boolean}
     */
    function isFilter(key){
       var param =  serviceConstants.rsaParam;
        for(var item in param){
            if( param[item] == key){
                return true;
            }
        }

        return false;
    }



    var RSAFilter = {
        rsaEncryptParam:rsaEncryptParam
    };
    // 暴露对外的接口
    module.exports = RSAFilter;
})