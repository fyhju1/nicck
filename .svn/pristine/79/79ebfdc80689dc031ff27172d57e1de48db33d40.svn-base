/**
 * 项目公共方法-加解密
 * @author HUANGRONALDO
 * @time 2014.3.21
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");
	result = require("osoa/scripts/utils/resultVoUtil");
	passwordService = require("osoa/scripts/service/password/passwordService");
	
	var modulus = "";
	var publicExponent = "" ;
	
	/**
	 * 功能：rsa解密
	 * 参数：	password:需要解密的密码串
	 * 返回： 解密后的密钥串
	 */
	function rsaDecrypt(password) {
		
	}
	
	/**
	 * 功能：rsa加密
	 * 参数：	password:需要加密的密码串
	 * 		backFunc:回调函数
	 */
	function rsaEncrypt(password,backFunc) {
		if($.string.isNotEmpty(modulus) && $.string.isNotEmpty(publicExponent)){
			password = $.crypto.rsa.encrypt(modulus,publicExponent,password);
			backFunc(password) ;
		}else{
			var back = function(resultVo){
				var dataList = result.getResultList(resultVo);
				modulus = dataList.modulus;
				publicExponent = dataList.publicExponent;
				password = $.crypto.rsa.encrypt(modulus,publicExponent,password);
				backFunc(password) ;
			} ;
			passwordService.getRSAKey(back);
		}
	}

    /**
     * 功能：rsa同步加密
     * 参数：	password:需要加密的密码串
     * 	@return password
     */
    function rsaAsyncEncrypt(password) {
        if($.string.isNotEmpty(modulus) && $.string.isNotEmpty(publicExponent)){
            password = $.crypto.rsa.encrypt(modulus,publicExponent,password);
            return password;
        }else{
            var callback = function(resultVo){
                var dataList = result.getResultList(resultVo);
                modulus = dataList.modulus;
                publicExponent = dataList.publicExponent;
                password = $.crypto.rsa.encrypt(modulus,publicExponent,password);
                return password;
            }
             passwordService.asyncGetRSAKey(callback);

        }

        return password;
    }

	var password = {
		"rsaEncrypt" : rsaEncrypt,
		"rsaDecrypt" : rsaDecrypt,
        "rsaAsyncEncrypt":rsaAsyncEncrypt
	};
	// 暴露对外的接口
	module.exports = password;
});