/**
 * Css 公用的快速修改、设置css类
 * @author HUANGRONALDO
 * @time 2014.3.15
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");

	/**
	 * 根据id设置子节点第i个元素的class，参数：id，class，index
	 */
	function addClass2Child(objId, className, index) {
		var i = parseInt(index) ;
		$("#"+objId).children().eq(i).addClass(className) ;
	}
	/**
	 * 根据id设置子节点第i个元素的class，参数：id，class，index
	 */
	function addClass2Child(objId, className, index,tagName) {
		var i = parseInt(index) ;
		if($.string.isEmpty(tagName)){
			$("#"+objId).children().eq(i).addClass(className) ;
		}else{
			$("#"+objId).children().eq(i).find(tagName).addClass(className) ;
		}
		
	}
	/**
	 * 根据className 截取显示 指定长度字符串，
	 * 如：class="text_substring_20":截取该节点的text文本的长度为20，常用
	 * class="value_substring_20":截取该节点的value文本的长度为20，
	 */
	function classSubstring() {
		// 截取该节点的text文本的长度,常用
		$("[class^='text_substring_']").each(function() {
			var obj = this;
			var className = $(this).attr("class");
			var array = className.split(" ");
			$.each(array, function(n, value) {
				if (value.indexOf("text_substring_") > -1) {
					var temp = array[n];
					var count = parseInt($.string.replaceAll(temp,"text_substring_", ""));
					if (!isNaN(count)) {// 返回NaN，说明格式化错误
						var text = $(obj).text();
						var ellipsis = "";
						if (count < text.length) {
							ellipsis = " ...";
						}
						$(obj).text(text.substring(0, count) + ellipsis);
					}
				}

			});

		});

		// 截取该节点的value文本的长度
		$("[class^='value_substring_']").each(function() {
			var obj = this;
			var className = $(this).attr("class");
			var array = className.split(" ");
			$.each(array, function(n, value) {
				if (value.indexOf("value_substring_") > -1) {
					var temp = array[n];
					var count = parseInt($.string.replaceAll(temp, "value_substring_", ""));
					if (!isNaN(count)) {// 返回NaN，说明格式化错误
						var text = $(obj).val();
						var ellipsis = "";
						if (count < text.length) {
							ellipsis = " ...";
						}
						$(obj).val($(obj).val().substring(0, count) + ellipsis);
					}
				}
	
			});
	
		});
	}
	
	var css = {
		"addClass2Child" : addClass2Child,
		"classSubstring" : classSubstring
	};
	// 暴露对外的接口
	module.exports = css;
});