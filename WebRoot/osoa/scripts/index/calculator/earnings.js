/**
 * 定投收益计算器
 */
define("osoa/scripts/index/calculator/earnings", function(require, exports, module) {

    var pageId = "#index_calculator_earnings ";
	 var fxckhService = require("fxckhService");
	 var layerUtils = require("layerUtils");
    require("osoa/js/datepicker.js");
	
    //初始化 
    function init(param) {
    	//时间插件
    	$(pageId +" #startdate").datepicker({
            dateFormat: "yy-mm-dd",
            maxDate: '%y-%M-%d'
        });
        //时间插件
        $(pageId +" #enddate").datepicker({
            dateFormat: "yy-mm-dd",
            maxDate: '%y-%M-%d'
        });
    }

    //绑定事件
    function bindPageEvent() {
		
		
		$(pageId+ " #qk").click(function(){
           
			
			
			 $(pageId+" #startdate").attr("value","");
			
			 $(pageId+" #enddate").attr("value","");
			
			$(pageId+" #kkje").attr("value","");
		
			$(pageId+" #dtfl").attr("value","");
			
			$(pageId+" #shfl").attr("value","");
			
        });
		
		$(pageId+ " #js").click(function(){
		//基金代码
		var fundcode = $(pageId+" #fundcode").attr("value");
		 if ($.string.isEmpty(fundcode)) {
                layerUtils.iAlert("请输入基金代码");
                return;
            }
		//开始时间
		var startdate = $(pageId+" #startdate").attr("value");
		if ($.string.isEmpty(startdate)) {
                layerUtils.iAlert("请输入开始时间");
                return;
            }
		
		if(!checkDate(startdate)){
			 layerUtils.iAlert("开始时间有误");
             return;
		}
		//结束时间
		var enddate = $(pageId+" #enddate").attr("value");
		if ($.string.isEmpty(enddate)) {
                layerUtils.iAlert("请输入结束时间");
                return;
            }
		if(!checkDate(enddate)){
			 layerUtils.iAlert("结束时间有误");
            return;
		}
		//扣款金额
		var kkje = $(pageId+" #kkje").attr("value");
		if ($.string.isEmpty(kkje)) {
                layerUtils.iAlert("请输入扣款金额");
                return;
            }
		//定投费率
		var dtfl = $(pageId+" #dtfl").attr("value");
		if(2<dtfl||dtfl<0){
			 layerUtils.iAlert("定投费率有误,请输入0%~2%");
			  return;
		}
		if ($.string.isEmpty(dtfl)) {
			layerUtils.iAlert("请输入定投费率");
               
                return;
            }
		//赎回费率
		var shfl = $(pageId+" #shfl").attr("value");
		if ($.string.isEmpty(shfl)) {
                layerUtils.iAlert("请输入赎回费率");
                return;
            }
		if(2<shfl||shfl<0){
			 layerUtils.iAlert("赎回费率有误,请输入0%~2%");
		}
		var start = new Date(startdate).getTime();
		var end = new Date(enddate).getTime();
		if( start>end){
			
                layerUtils.iAlert("开始时间大于结束时间");
                return;
            
		}
		
		if( start==end){
			
            layerUtils.iAlert("开始时间与结束时间不能相同");
            return;
        
		}
		
		calculatorFunction(fundcode,startdate,enddate,kkje,dtfl,shfl);
		   });
    }

    function checkDate(date){
        return (new Date(date).getDate()==date.substring(date.length-2));
    }
	 //定投计算
    
    function calculatorFunction(fundcode, startdate, enddate,kkje,dtfl,shfl) {
        var param = {
            fundcode: $.trim(fundcode),
            startdate: $.trim(startdate),
            enddate: $.trim(enddate),
			kkje: $.trim(kkje),
			dtfl: $.trim(dtfl),
			shfl: $.trim(shfl),
			
        }
        var callBack = function(resultVo) {
            var error_no = resultVo.getErrorNo();
            var error_info = resultVo.getErrorInfo();
			   var result = resultVo.obj.results;
            var list = result.xmlist;
			var map = result.xmMap;
		
            if (error_no == 0) {
            	if(list.length>0){
				var str = "<tr class='title'>"+
                                        "<th width='16%'>投入本金（元）</th>"+
                                        "<th width='16%'>定投日期</th>"+
                                        "<th width='16%'>当日价格（元）</th>"+
                                       " <th width='16%'>购得份额（份）</th>"+
                                       " <th width='16%'>累计份额（份）</th>"+
                                       
                                   " </tr>"
				for(var i = 0 ; i<list.length ; i++){
					
						str =str+ "  <tr class='res'>"+   
                                     " <td>"+kkje+"元</td>"+
									 " <td>"+list[i].nv_date+"</td>"+
									  " <td>"+parseFloat(list[i].unit_nv).toFixed(2)+"</td>"+
									  " <td>"+parseFloat(list[i].gmfe).toFixed(2)+"</td>"+
									   " <td>"+parseFloat(list[i].ljfe).toFixed(2)+"</td>"+
                                    "</tr>"
									
				}
				 $(pageId + " #dtmx").html(str)
				 $(pageId + " #shhz").html(" <tr class='title'>"+
                                        " <th width='20%'>当前市值（元）</th>"+
                                       "  <th width='20%'>赎回日期</th>"+
                                       "  <th width='20%'>赎回价格（元）</th>"+
                                      "   <th width='20%'>赎回份额（份）</th>"+
                                      "   <th width='20%'>赎回费用（元）</th>"+
										"  </tr>"+
								" <tr class='res'>"+
                                "     <td>"+parseFloat(map[0].dqsz).toFixed(2)+"元</td>"+
                                "     <td>"+map[0].shdate+"</td>"+
                                 "    <td>"+parseFloat(map[0].shjg).toFixed(2)+"元</td>"+
                                 "    <td>"+parseFloat(map[0].shfe).toFixed(2)+"份</td>"+
                                 "    <td>"+parseFloat(map[0].shfy).toFixed(2)+"元</td>"+
									"  </tr>");
				 
				 $(pageId + " #syhz").html(" <tr class='title'>"+
                                       "  <th width='20%'>赎回所得（元）</th>"+
                                       "  <th width='20%'>累计红利（元）</th>"+
                                      "   <th width='20%'>累计转投（份）</th>"+
                                     "    <th width='20%'>定投总收益（元）</th>"+
                                      "   <th width='20%'>定投总收益率</th>"+
                                    "</tr>"+
										" <tr class='res'>"+ 
									"     <td>"+parseFloat(map[0].shsd).toFixed(2)+"元</td>"+
									"     <td>"+parseFloat(map[0].ljhl).toFixed(2)+"元</td>"+
									 "    <td>"+0+"份</td>"+
									 "    <td>"+parseFloat(map[0].dtssy).toFixed(2)+"元</td>"+
									 "    <td>"+ parseFloat( map[0].dtzsyl).toFixed(2)+"%</td>"+
										"  </tr>");
				 
            	}else { 
            		 $(pageId + " #dtmx").html("<td colspan='6'>"+
                                            "<img src='/osoa/images/no_cal_res.png' alt=''>"+
                                            "  <br> 暂无内容"+
                                            "</td>");
            		 $(pageId + " #shhz").html("<td colspan='6'>"+
                             "<img src='/osoa/images/no_cal_res.png' alt=''>"+
                             "  <br> 暂无内容"+
                             "</td>");
            		 $(pageId + " #syhz").html("<td colspan='6'>"+
                             "<img src='/osoa/images/no_cal_res.png' alt=''>"+
                             "  <br> 暂无内容"+
                             "</td>");
                }
                
            } else { 
                layerUtils.iAlert(error_info);
            }
        };
        fxckhService.dtjsq(callBack, param);
    }
    //销毁页面，单页面时候要用
    function destroy() {

    }

    var earnings = {
        "init": init,
        "bindPageEvent": bindPageEvent,
        "destroy": destroy
    };

    // 暴露对外的接口
    module.exports = earnings;
});