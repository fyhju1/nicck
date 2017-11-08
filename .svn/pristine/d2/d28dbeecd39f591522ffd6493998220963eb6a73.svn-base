/**
 * 众筹工具类
 */
define(function(require,exports,module){
	var gconfig = require("gconfig"),
		global = gconfig.global,
		layerUtils = require("layerUtils");
	
	/**
	 * 指定目标对象加载JSON数据,不支持数组
	 * @param jsonObj 数据对象
	 * @param jqueryObj 目标对象
	 */
	function loadJsonWithObj (jsonObj, jqueryObj) {
		_loadDataWithObj (jsonObj, jqueryObj, null);
	}

	/**
	 * 指定目标对象加载JSON数组
	 * @param jsonArr 数据对象 必须
	 * @param jqueryObj 目标对象 必须
	 * @param isClear 是否清空数据 ture Or false 非必须，默认false
	 */
	function loadArrayWithObj (jsonArr, jqueryObj, isClear) {
		if (!jsonArr instanceof Array) {
			return;
		}

		var item = $(jqueryObj).children("[data-item]").eq(0),
			itemHide = item.clone();
		if (isClear) {
			$(jqueryObj).empty();
			itemHide.css("display", "none");
			$(jqueryObj).append(itemHide);
		}

		for (var i = 0; i < jsonArr.length; i++) {
			var data = jsonArr[i];
			var obj = item.clone();
			obj.css("display", "");
			_loadDataWithObj (data, obj, isClear);
			$(jqueryObj).append(obj);
		};
	}
	
	/**
	 * 指定目标对象加载JSON数据, 支持JSON数组或单个JSON对象, 允许多层数组嵌套
	 * @param jsonObj 数据对象
	 * @param jqueryObj 目标对象
	 * @param isClear 是否清空数据 ture Or false 非必须，默认false
	 * @param afterCallback 加载完毕后回调 非比须
	 */
	function loadDataWithObj (json, jqueryObj, isClear, afterCallback) {
		_loadDataWithObj(json, jqueryObj, isClear);
		
		if (afterCallback) {
			afterCallback(jqueryObj);
		}
	}
	
	function _loadDataWithObj (json, jqueryObj, isClear) {
		//layerUtils.loading(true);
		if (json instanceof Array) {
			loadArrayWithObj(json, jqueryObj, isClear);
		} else if (json instanceof Object && !json.length) {
			for (var name in json) {
				var targets = $(jqueryObj).find("[data-name='"+name+"']"),
					cssTargets = $(jqueryObj).find("[data-css-width='"+name+"']"),
					value = json[name];
				if (targets.length < 1 && cssTargets.length < 1) {
					continue;
				}
				
				if (value instanceof Array) {
					for (var i = 0; i < targets.length; i++) {
						var obj = $(targets[i]);
						loadArrayWithObj(value, obj, isClear);
					}
				} else {
					// 数据加载
					for (var i = 0; i < targets.length; i++) {
						var obj = $(targets[i]),
							tag = obj[0].tagName;
	
						var isText = obj.is("td") || obj.is("span") || obj.is("p") || obj.is("em") || /^H\d$/.test(tag),
							isVal = obj.is("input") || obj.is("textarea"),
							isSrc = obj.is("video") || obj.is("img"),
							isHref = obj.is("a");
	
						if (isText) {
							obj.text(value);
						} else if (isVal) {
							obj.val(value);
						} else if (isSrc) {
							obj.attr("src", global.actionPath + value);
						} else if (isHref) {
							obj.attr("href", global.actionPath + value);
						} else {
							obj.html(value);
						}
					};
					
					// 进度条加载
					for (var i = 0; i < cssTargets.length; i++) {
						var obj = $(cssTargets[i]);
						obj.css("width", value);
					}
				}
				
			}
		}
		//layerUtils.loading(false);
	}

	/**
	 * 金额格式化
	 * @param s 数字金额
	 * @param n 小数位
	 */
	function fmoney(s, n) {
		s = s.toString();
		// 判断是否带+-号，提取出来
		var prefix = '';
		if (s.startsWith('+') || s.startsWith('-')) {
			prefix = s.substring(0, 1);
			s = s.substring(1);
		}
		
		n = n >= 0 && n <= 20 ? n : 2; 
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
		var l = s.split(".")[0].split("").reverse(), 
			r = s.split(".")[1]; 
		var t = ""; 
		for (var i = 0; i < l.length; i++) { 
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
		} 
		var ret = t.split("").reverse().join("") + (n > 0 ? "." + r : ""); 
		return prefix + ret;
	}

	/**
	 * 重置表单数据, 需要在对应HTML元素加上data-origin属性
	 * @param $obj jquery对象
	 */
	function resetForm($obj) {
		var objs = $obj.find("[data-origin]");
		
		for (var j = 0; j < objs.length; j++) {
			var obj = $(objs[j]),
				tag = obj[0].tagName,
				defaultValue = obj.attr("data-origin");

			var isText = obj.is("td") || obj.is("span") || obj.is("p") || obj.is("em") || /^H\d$/.test(tag),
				isVal = obj.is("input") || obj.is("textarea"),
				isSrc = obj.is("video") || obj.is("img"),
				isHref = obj.is("a");
			
			var value = defaultValue ? defaultValue : "";
			
			if (isText) {
				obj.text(value);
			} else if (isVal) {
				obj.val(value);
			} else if (isSrc) {
				obj.attr("src", value);
			} else if (isHref) {
				obj.attr("href", value);
			} else {
				obj.html(value);
			}
		}
	}
	
	var cfdUtils = {
		"loadJsonWithObj" : loadJsonWithObj,
		"loadArrayWithObj" : loadArrayWithObj,
		"loadDataWithObj" : loadDataWithObj,
		"resetForm" : resetForm,
		"fmoney" : fmoney
	};
	module.exports = cfdUtils;
});