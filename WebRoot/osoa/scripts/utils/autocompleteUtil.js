/**
 * 功能:JUICER 工具类
 *
 * @author HUANGRONALDO
 * @time 2014.6.13
 */
define(function (require, exports, module) {
    // 加载依赖模块
    require("jquery");
    require("ext");
    require("gconfig");
    require("/osoa/scripts/utils/autocomplete/js/jquery-ui-1.10.4.custom.min");
    require("/osoa/scripts/utils/autocomplete/css/ui-lightness/jquery-ui-1.10.4.custom.min.css");
    $.fn.extend({
        /**
         * @功能: 自动补全
         * @author: 黄圣宙(HUANGRONALDO)
         * @time: Jun 12, 2014 4:49:43 PM
         * @param dataList
         */
        jAutocomplete: function (dataList, jname, jvalue, jkey, objId) {
            $.ui.autocomplete.prototype._renderMenu = function (ul, items) { //初始化
                var that = this;
                $.each(items, function (index, item) {
                    that._renderItemData(ul, item);
                });
                if ($(ul).height() > 200) {
                    $(ul).css("height", "200px").css("overflow", "auto");
                }
                $(ul).find("li:odd").css("background-color", "#FFFFFF");
            };

            jname = jname || "product_name";
            jvalue = jvalue || "product_code";
            var json = data2Json(dataList, jname, jvalue, jkey);
            $(this).autocomplete({
                minLength: 0,
                source: json,
                focus: function (event, ui) {
                    $(this).val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    $(this).val(ui.item.label);
                    $("#" + objId).val(ui.item.id);
                    return false;
                }
            }).data("ui-autocomplete")._renderItem = function (ul, item) {
                return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
            };
        }
    });

    function data2Json(dataList, jname, jvalue, jkey) {//格式化dataList
        var json = new Array();
        for (var i = 0; i < dataList.length; i++) {
            json.push({"label": dataList[i][jname] + " " + dataList[i][jvalue], "value": dataList[i][jname] + " " + dataList[i][jvalue], "id": dataList[i][jkey]});
        }
        return json;
    }
});