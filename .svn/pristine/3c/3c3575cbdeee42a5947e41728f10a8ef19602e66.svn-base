define("osoa/scripts/utils/highstockUtil",function(require, exports, module) {
    // 加载依赖模块
    var $ = require("jquery");
    require("ext");
    require("gconfig");
    require("/osoa/scripts/utils/hChart/highstock.src.1.0.7");
    var fundInfoService = require("osoa/scripts/service/fund/FundInfoService");
	var result = require("osoa/scripts/utils/resultVoUtil");
  
    var Sys = {};//浏览器版本
    /**
     * 描述：检测浏览器
     */
   function checkSys(){
   	 var ua = navigator.userAgent.toLowerCase();
   	if (window.ActiveXObject)
   	    Sys.ie = ua.match(/msie ([\d.]+)/)[1]
   }
    $.fn.extend({
    	
    	/**
    	 * @author：欧阳磊
    	 * @version 1.0
    	 * 描述：净值、收益率，曲线图。
    	 * flag：0：（单位净值、累计净值）。
    	 * 1：（基金收益率、比较基准收益率）
    	 */
    	createCharNav:function(flag,dataList,incomeName){
    		if(incomeName=="" || incomeName.length>0){
    			incomeName = "万份收益";
    		}
    		var bool = true;
    		var navList = "";
    		var totalNavList = "";
    		
    		if(flag == 1){
    			bool = false;
    		}
    		
    		var f=2;//显示小数位数
    		var f1=4;
    		checkSys();
    		var obj;
    		if (flag == 0) {
    				navList =  json2SeriesPie(dataList,{'datestamp':'float','nav':'float'});
    				totalNavList = json2SeriesPie(dataList,{'datestamp':'float','sumofnav':'float'});
    			obj = [ {
    				name : '单位净值',
    				data : navList,
    				tooltip : {
    					valueDecimals : f1
    				}
    			}, {
    				name : '累计净值',
    				data : totalNavList,
    				tooltip : {
    					valueDecimals : f1
    				}
    			}];
    		} else if(flag==1){
    			navList =  json2SeriesPie(dataList,{'datestamp':'float','daygrowth':'float'});
    			obj = [ {
    				name : '基金收益率',
    				data : navList,
    				tooltip : {
    					valueDecimals : f1
    				},
    				dataGrouping: {
    					enabled: false
    				}
    			}/*, {
    				name : '比较基准收益率',
    				data : totalNavList,
    				tooltip : {
    					valueDecimals : f
    				},
    				dataGrouping: {
    					enabled: false
    				}
    			}*/];
    		}else if(flag==2){//货币基金
    			/*
    			 * navList：万份收益
    			 * totalNavList：7日年化收益率
    			 */
    			navList =  json2SeriesPie(dataList,{'datestamp':'float','fmwfsy':'float'});
    			totalNavList = json2SeriesPie(dataList,{'datestamp':'float','fqrsyl':'float'});
    			obj = [ {
    				name : incomeName,
    				data : navList,
    				tooltip : {
    					valueDecimals : f1
    				}
    			}, {
    				name : '七日年化收益率',
    				data : totalNavList,
    				tooltip : {
    					valueDecimals : f1
    				}
    			} ];
    		}
    		
    		if(flag==1){
    			$(this).highcharts(
    					'StockChart',
    					{
    						navigator : {
    							adaptToUpdatedData: false,
    							series : {
    								data : navList
    							}
    						},
    						colors : [ '#4572a7', '#fc8800', '#da0049', '#cc515b',
    								'#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525',
    								'#a6c96a' ],
    								
    								rangeSelector : {
    	    							buttons:[{
    	    								type: 'month',
    	    								count: 1,
    	    								text: '1月'
    	    							}, {
    	    								type: 'month',
    	    								count: 3,
    	    								text: '3月'
    	    							}, {
    	    								type: 'month',
    	    								count: 6,
    	    								text: '6月'
    	    							}, {
    	    								type: 'year',
    	    								count: 1,
    	    								text: '1年'
    	    							}],
    	    							selected : 3,
    	    							buttonTheme:{
    	    								width:60
    	    							},
    	    							inputDateFormat: '%Y-%m-%d',
    	    							inputEditDateFormat: '%Y-%m-%d',
    	    							inputEnabled : Sys.ie?false:true,
    	    							enabled: false
    	    						},
    								
    	    						scrollbar:{
    	    							enabled : false
    	    						},
    	    						
    						xAxis : {
    							type : 'datetime', // 定义x轴上日期的显示格式
    							labels : {
    								formatter : function() {
    									var vDate = new Date(this.value);
    									// alert(this.value);
    									return vDate.getFullYear() + "."
    											+ (vDate.getMonth() + 1) + "."
    											+ vDate.getDate();
    								},
    								align : 'center',
    								enabled: true
    							},
    							events : {
    								afterSetExtremes : afterSetExtremes
    							},
    							minRange: 3600 * 1000 // one hour
    						},
    						tooltip : {
    							xDateFormat : '%Y-%m-%d',// 鼠标移动到趋势线上时显示的日期格式
    							pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}%<br/>'
    						},
    						rangeSelector : {
    							inputEnabled : true
    						},
    						series : obj,
    						legend:{
    							enabled:true
    						},
    						scrollbar: {
    							liveRedraw: false,
        							enabled : false
    						}
    					});
    		}else{
    			$(this).highcharts(
    					'StockChart',
    					{
    						colors : [ '#4572a7', '#fc8800', '#da0049', '#cc515b',
    								'#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525',
    								'#a6c96a' ],
    						rangeSelector : {
    							buttons:[{
    								type: 'month',
    								count: 1,
    								text: '1月'
    							}, {
    								type: 'month',
    								count: 3,
    								text: '3月'
    							}, {
    								type: 'month',
    								count: 6,
    								text: '6月'
    							}, {
    								type: 'year',
    								count: 1,
    								text: '1年'
    							},{
    								type: 'ytd',
    								text: '今年以来'
    							},{
    						        type: 'all',
    						        text:'成立以来'
    							}],
    							selected : 4,
    							buttonTheme:{
    								width:60
    							},
    							inputDateFormat: '%Y-%m-%d',
    							inputEditDateFormat: '%Y-%m-%d',
    							inputEnabled : Sys.ie?false:true
    						},
    						
    						credits:{
    							enabled: false
    						},
    						xAxis : {
    							type : 'datetime', // 定义x轴上日期的显示格式
    							labels : {
    								formatter : function() {
    									var vDate = new Date(this.value);
    									// alert(this.value);
    									return vDate.getFullYear() + "."
    											+ (vDate.getMonth() + 1) + "."
    											+ vDate.getDate();
    								},
    								align : 'center'
    							}
    						},
    						
    						tooltip : {
    							xDateFormat : '%Y-%m-%d',//鼠标移动到趋势线上时显示的日期格式
    							pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}<br/>'
    						},
    						series : obj,
    						legend:{
    							enabled:true
    						}
    					});
    		}
    	},
    	
    	createCharIncome:function(fundnames,dataList0,dataList1,dataList2,dataList3){
    		var income1 = "";
    		var income2 = "";
    		var income3 = "";
    		var income4 = "";
    		
    		var f=2;//显示小数位数
    		var f1=4;
    		checkSys();
    		
    		var list = new Array();
    		if(dataList0 != undefined && dataList0.length > 0){
    			list.push(dataList0);
    		}
       		if(dataList1 != undefined && dataList1.length > 0){
       			list.push(dataList1);
       		}
    		if(dataList2 != undefined && dataList2.length > 0){
    			list.push(dataList2);
    		}
    		if(dataList3 != undefined && dataList3.length > 0){
    			list.push(dataList3);
    		}
    		
    		fundnames = fundnames.substring(0,fundnames.lastIndexOf(","));
    		
    		var names = new Array(); 
    		names=fundnames.split(","); 
    		var obj = new Array();
    		for(var i=0;i<names.length;i++)
    		{
    			obj[i] = {name:names[i],data:json2SeriesPie(list[i],{'datestamp':'float','daygrowth':'float'}),tooltip:{valueDecimals : f}};
    		}
    		
    			$(this).highcharts(
    					'StockChart',
    					{
    						colors : [ '#4572a7', '#fc8800', '#da0049', '#cc515b',
    								'#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525',
    								'#a6c96a' ],
    						
    								
    						rangeSelector : {
    									enabled: false,
    	    							inputEnabled : Sys.ie?false:true
    	    						},
    	    						
    						credits:{
    							enabled: false
    						},
    						xAxis : {
    							type : 'datetime', // 定义x轴上日期的显示格式
    							labels : {
    								formatter : function() {
    									var vDate = new Date(this.value);
    									// alert(this.value);
    									return vDate.getFullYear() + "."
    											+ (vDate.getMonth() + 1) + "."
    											+ vDate.getDate();
    								},
    								align : 'center'
    							}
    						},
    						
    						tooltip : {
    							xDateFormat : '%Y-%m-%d, %A',// 鼠标移动到趋势线上时显示的日期格式
    							pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}<br/>'
    						},
    						series : obj,
    						legend:{
    							enabled:true
    						}
    					});
    		}
    	
    }) ;
    
    function json2Array(dataList, field, length){ //dataList 转 数组
    	var data = new Array() ;
    	if(typeof(length)=="undefined" || $.string.isEmpty(length) || length > dataList.length){
    		length = dataList.length ;
		}
    	for(var i=0 ; i<length ; i++){
    		dataRow = dataList[i] ;
    		data.push(dataRow[field]) ;
    	}
    	return data ;
    }
    
    
    function json2Series(dataList,xField,dataTitle,length) {
    	if(typeof(length)=="undefined" || $.string.isEmpty(length) || length > dataList.length){
    		length = dataList.length ;
		}
    	//var title_length = 0 ;
    	var json = {};
    	for(var _title in dataTitle){ //初始化json数组
    		json[_title] = [];
		}
    	
    	for(var i=0 ; i<length ; i++){ //遍历list，将值塞到对象中
    		dataRow = dataList[i] ;
    		for(var _title in dataTitle){
    			var _row = new Array() ; 
    			_row.push(parseFloat(dataRow[xField])) ;
    			_row.push(parseFloat(dataRow[_title])) ;
    			_row.push(null) ;
    			json[_title].push(_row) ;	
    		}
    	}
    	var _series = new Array() ; 
    	for(var title in dataTitle){ //json数组
    		var _json = {name:dataTitle[title],data:json[title]} ;
    		_series.push(_json) ;
		}
    	return _series ;
    }
    
    
    function json2Array(dataList, field, length){ //dataList 转 数组
    	var data = new Array() ;
    	if(typeof(length)=="undefined" || $.string.isEmpty(length) || length > dataList.length){
    		length = dataList.length ;
		}
    	for(var i=0 ; i<length ; i++){
    		dataRow = dataList[i] ;
    		if(field=="percentage"){
    			data.push(parseFloat(dataRow[field]));
    		}else{
    			data.push(dataRow[field]) ;
    		}
    	}
    	return data ;
    }
    
    //饼图
    function json2SeriesPie(dataList, fields, index) {
    	var _series = new Array() ; 
    	if(dataList){
    		for(var i=0 ; i<dataList.length ; i++){ //遍历list，将值塞到对象中
        		dataRow = dataList[i] ;
        		var _data = new Array() ;
        		var j = 0 ;
        		for(var title in fields){ //json数组
        			if(fields[title]=="float"){
        				_data[j] = parseFloat(dataRow[title]);
        			}else{
        				_data[j] = dataRow[title];
        			}
        			j++ ;
        		}
        		_series.push(_data) ;
        	}	
    	}
    	return _series ;
    }

    /**
     * 基金收益走势图拖动后执行事件
     * @param e
     */
    function afterSetExtremes(e) {

    	var currentExtremes = this.getExtremes(),
    		range = e.max - e.min,
    		chart = $('#pic_income_div').highcharts();
    		
    	chart.showLoading('正在加载数据...');
    	ajaxNavList(Math.round(e.min),Math.round(e.max));
    	//alert(Math.round(e.max));
    }
    
    function ajaxNavList(startDate,endDate){
    	var fundid = $("#fundid").val();
    	var callBackFunc = function (resultVo) {
			var dataList = result.getResultList(resultVo);
			if(dataList.length > 0){
				chart = $('#pic_income_div').highcharts();
				chart.series[0].setData(json2SeriesPie(dataList,{'datestamp':'float','daygrowth':'float'}));
				//$("#pic_income_div").createCharNav(1,dataList);
				chart.hideLoading();
			}
		}
		fundInfoService.getIncome(callBackFunc,fundid,startDate,endDate);
    }
    
    
    
    hChart = {
    	
    };

    // 暴露对外的接口
    module.exports = hChart;
});
