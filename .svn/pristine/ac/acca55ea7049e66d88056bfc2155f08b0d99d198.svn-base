/**
 * 投资回报计算器
 */
define("osoa/scripts/index/calculator/returns", function(require, exports, module) {
    var pageId = "#index_calculator_returns ";
	 var layerUtils = require("layerUtils");
    require("osoa/js/datepicker.js");
    //初始化 
    function init(param) {
        $("#choose_date_buy").datepicker({
            dateFormat: "yy-mm-dd",
            maxDate: '%y-%M-%d'
        });
        $("#choose_date_return").datepicker({
            dateFormat: "yy-mm-dd",
            maxDate: '%y-%M-%d'
        });
    }

    //绑定事件
    function bindPageEvent() {
		
		
	
		$(pageId+ " #qk").click(function(){
           //申购费率
			$(pageId+" #sgfl").attr("value","");
			//申购金额
			 $(pageId+" #sgje").attr("value","");
			//分红总额
			 $(pageId+" #fhze").attr("value","");
			//赎回费率
			$(pageId+" #shfl").attr("value","");
			//申购单位净值
			$(pageId+" #sgdwjz").attr("value","");
			//赎回单位净值
			$(pageId+" #shdwjz").attr("value","");
        });
		$(pageId+ " #js").click(function(){
			//申购费率
			var sgfl = $(pageId+" #sgfl").attr("value");
			//申购金额
			var sgje = $(pageId+" #sgje").attr("value");
			//分红总额
			var fhze = $(pageId+" #fhze").attr("value");
			//赎回费率
			var shfl = $(pageId+" #shfl").attr("value");
			//申购单位净值
			var sgdwjz = $(pageId+" #sgdwjz").attr("value");
			//赎回单位净值
			var shdwjz = $(pageId+" #shdwjz").attr("value");
			if ($.string.isEmpty(sgfl)) {
                layerUtils.iAlert("请输入申购费率");
                return;
            }
			if(2<sgfl||sgfl<0){
				 layerUtils.iAlert("申购费率有误,请输入0%~2%");
				 return;
			}
			if ($.string.isEmpty(sgje)) {
                layerUtils.iAlert("请输入申购金额");
                return;
            }
			if ($.string.isEmpty(fhze)) {
                layerUtils.iAlert("请输入分红总额");
                return;
            }
			if ($.string.isEmpty(shfl)) {
                layerUtils.iAlert("请输入赎回费率");
                return;
            }
			if(2<shfl||shfl<0){
				 layerUtils.iAlert("赎回费率有误,请输入0%~2%");
				 return;
			}
			if ($.string.isEmpty(sgdwjz)) {
                layerUtils.iAlert("请输入申购单位净值");
                return;
            }
			if ($.string.isEmpty(shdwjz)) {
                layerUtils.iAlert("请输入赎回单位净值");
                return;
            }
			
			
           //申购费用＝申购金额－净申购金额 
			var sgfy = sgje - sgje/(1+sgfl/100);
			//申购份额＝净申购金额/T日基金份额净值 
			var sgfe =(sgje - sgfy)/sgdwjz ;
			//赎回费用	
			var shfy =  sgfe*shdwjz*shfl/100;
			//赎回金额
			var shje = sgfe*shdwjz- shfy;
			//盈亏额
			var ske =shje-sgje + fhze*0.1*10;
			//收益率 	收益率=盈亏额/申购金额
			var syl = ske/sgje*100;
			$(pageId+" #dispaly").html("<tr class='title'>" +
                                   " <th>盈亏额</th>" +
                                   " <th>收益率</th>" +
                                  "  <th>申购费用</th>" +
                                  "  <th>赎回费用</th>" +
                                   " <th>申购份额</th>" +
                                  "  <th>赎回金额</th>" +
                               " </tr>" +
                               " <tr class='res'>" +
                               "     <td>"+ske.toFixed(2)+"元</td>" +
                               "     <td>"+syl.toFixed(2)+"%</td>" +
                               "     <td>"+sgfy.toFixed(2)+"元</td>" +
                               "     <td>"+shfy.toFixed(2)+"元</td>" +
                               "     <td>"+sgfe.toFixed(2)+"份</td>" +
                               "     <td>"+shje.toFixed(2)+"元</td>" +
							   "" +
                               " </tr>");
			
        }); 
    }

    //销毁页面，单页面时候要用
    function destroy() {

    }



    var returns = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };

    // 暴露对外的接口
    module.exports =
        returns;
});