/**
 * 项目公共方法-时间倒计时
 * @author HUANGRONALDO
 * @time 2014.3.15
 */
define(function(require, exports, module) {
    // 加载依赖模块
    require("jquery");
    require("ext");
    require("gconfig");
    require("/osoa/scripts/utils/commonUtil");
   layerWeb = require("/osoa/scripts/utils/layer/layerWeb");
    /**
     * 功能：校验输入框的格式
     * 参数：
     * 	    objId :输入框的id
     *      type :校验类型 ---NotEmpty(不能为空), Date(日期)
     *                    AlphaNumeric(字母数字), Email(电子邮箱)
     *                    Money(货币)，Numeric(数字), NumberFloat(浮点数)
     *                    Mobile（手机），Phone(电话），Tel(固话），Stock（股票）
     *                    PostalCode（邮编）, URL(url地址)，CardID（身份证）
     *                    StrongPwd:(强密码)
     *       filters:用于密码强弱校验，过滤数组,数组中的每一项都不能包含当前的密码串，
     *                否则认为密码为弱密码，比如可以用身份证，手机等校验
     * 返回：建议不通过就showError(),并return false，return true
     */
    function checkInput(ObjId, type, filters, pFlag,showTitle) {// ObjId为对象id

        if ($.string.isEmpty(type)) {
            type = "NotEmpty";
        }
        var title ="";
        if($.string.isEmpty(showTitle)){
        	title = $("#" + ObjId).attr("title");
        	if(title==undefined||title==null)
        	{
        		title="";
        	}
        }else
        {
        	title=showTitle;
        }
        
        var message = $("#" + ObjId).checkValid(title, type, filters);
        var obj;
        if (pFlag == "p") {//父节点
            obj = $("#" + ObjId).parent();
        } else {
            obj = $("#" + ObjId);
        }
        if ($.string.isNotEmpty(message)) {
        	layerWeb.showObjError(message,obj,2);
            return false;
        } else {
            return true;
        }
    }

    /**
     * 功能：校验下拉框的是否已经选择
     * 参数：
     * 	    objId :输入框的id
     * 返回：建议不通过就showError(),并return false，return true
     */
    function checkSelect(ObjId) {// ObjId为对象id
        var title = $("#" + ObjId).attr("title");
        var value = $("#" + ObjId).val();
        var message = "";
        if ($.string.isEmpty(value)) {
            message = "请选择【" + title + "】 !";
        }
        if ($.string.isNotEmpty(message)) {
            var index = layerWeb.showError(message, ObjId);
            $("#" + ObjId).focus();
            $("#" + ObjId).change(function() {
                layerWeb.close(index);
            });
            return false;
        } else {
            return true;
        }

    }

    /**
     * 功能：校验多选框的是否已经选择
     * 参数：
     * 	    objId :输入框的id
     * 返回：建议不通过就showError(),并return false，return true
     */
    function checkCBox(ObjId) {// ObjId为对象id
        var title = $("#" + ObjId).attr("title");
        var message = "";

        var value = $("#" + ObjId).attr("checked");

        if ($.string.isEmpty(value)) {
            message = "请勾选 【" + title + "】 !";
        }
        if ($.string.isNotEmpty(message)) {
            $("#" + ObjId).css("border", "1px solid #FF0000").showTips(message);
            $("#" + ObjId).bind("click", function() {
                $(this).css("border", "1px solid #c7c7c7").closeTips();
            });
            return false;
        } else {
            return true;
        }

    }

    /**
     * @功能:检验两次输入是否相同。
     * @param: srcObj：源对象,targetObj:目标对象，message：错误提示，filter:过滤串
     * @return: 建议不通过就showError(),并return false，return true
     */
    function checkIdentical(srcObj, targetObj, message, filter) {

        var flag = checkInput(srcObj, "", filter);
        var flag1 = checkInput(targetObj, "", filter);
        if (flag && flag1 && !equals(srcObj, targetObj)) {
            message = $.string.isEmpty(message) ? "两次输入不一致" : message;
            var index = layerWeb.showError(message, targetObj);
            $("#" + targetObj).focus();
            $("#" + targetObj).change(function() {
                layerWeb.close(index);
            });
            return false;

        } else if (flag && flag1 && equals(srcObj, targetObj)) {
            return true;
        } else {
            return false;
        }

    }

    function equals(srcObj, targetObj) {
        return $("#" + srcObj).val() === $("#" + targetObj).val();
    }

    var checkUtil = {
        "checkInput" : checkInput,
        "checkSelect" : checkSelect,
        "checkCBox" : checkCBox,
        "checkIdentical" : checkIdentical
    };
    // 暴露对外的接口
    module.exports = checkUtil;
}); 