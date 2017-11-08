/**
 * 项目公共方法 订单确认公共js
 * @author HUANGRONALDO
 * @time 2014.4.11
 */
define("osoa/scripts/utils/HChartUtil",function(require, exports, module) {
    // 加载依赖模块
    var $ = require("jquery");
    require("ext");
    require("gconfig");
    require("/osoa/scripts/utils/hChart/highstock.src.1.0.7");
  
    $.fn.extend({
    	//条状图
    	barChart:function(width,height,title,name,field1,field2,dataList,min,max,str){
    		var xAxis = json2Array(dataList, field1);
    		var data = json2Array(dataList, field2);
    		max = Math.ceil(getMax(data));
    		
    		$(this).highcharts({
    	        chart: {
    	            type: 'bar'
    	        }, 
    	        //colors:['#f39c11', '#E6E6E6' ],  //自定义的颜色
    	        title: {
    	            text: title
    	        },  
    	                                                        
    	        xAxis: {
    	            categories: xAxis
    	        },                                                                 
    	        
    	        yAxis: {

    	            title: {
    	                text: '', 
    	                align: 'high'          
    	            },  
    	            
    	            labels: {
    	            	formatter: function() {
                            return this.value / 10000 +'万';
                        },
    	                overflow: 'justify'
    	            }                                                              
    	        }, 
    	        tooltip: {
    	            valueSuffix: str
    	        }, 
    	                                                                
    	        plotOptions: {
    	            bar: {                                   
    	                dataLabels: {enabled: false}
    	            }
    	        },                                                                 
    	        legend: {
    	            layout: 'vertical',
    	            align: 'right', 
    	            verticalAlign: 'top', 
    	            x: -40,                                                        
    	            y: 100,                                                        
    	            borderWidth: 1,          
    	            enabled:false
    	        },                                                                 
    	        credits: {                   
    	            enabled: false                                                 
    	        }, 
    	        series: [{                         
    	            name: name,                                             
    	            data: data
    	        }]
    	    }); 
    	},
    	
    	
		//饼图
		pieChart:function(width, height, title, fields , dataList, index){ //默认选中index
    		var _series = json2SeriesPie(dataList,fields, index) ;
    		
			$(this).highcharts({
		        chart: { 
		        	width: width ,
                    height:height,
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
                	align:'center',
                    text: title,
                    style: {
                        fontSize:20,
                        fontWeight: 'bold'
                    }
                },
                legend: {
                	width: 100,
                	borderWidth: 0,
                	align: "right",
                    layout: "vertical",
                    itemMarginTop: 6,
                    itemMarginBottom: 8,
                    itemStyle: { cursor: 'pointer', align:'right',fontSize:14,width:100 }
                },
		        tooltip: {
		        	formatter: function () {  
		        		return "<b>" + this.point.name + "<b>: " + Highcharts.numberFormat(this.y, 2) + "(" +  Highcharts.numberFormat(this.percentage, 2) + " %)";
                    } 
		        },
		        colors: ["#DDDF0D", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
		         		"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
                credits: {
                    enabled: false  //不显示链接 
                },
		        plotOptions: {
		        	pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: false
	                    },
	                    showInLegend: true,
	                    innerSize: '75%',
	                    size:'130%'
	                }
		        },
		        series: [{
		            type: 'pie',
		            name: "所占比例",
		            data: _series
		        }]
		    });
		}
    }) ;
    
    
    
    
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
    		if(field=="percentage" || field=="money"){
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

    function getMax(arr){
        var max  = 0;//初始化角标
        for(var x = 1;x<arr.length;x++){
            if(arr[x]>arr[max])// 1的角标>0的角标吗？
            max = x;//如果大于那么就把1的角标对应的参数赋值给max角标对应的参数。
        }
        return arr[max];
       }

    hChart = {
    	
    };

    // 暴露对外的接口
    module.exports = hChart;
});
