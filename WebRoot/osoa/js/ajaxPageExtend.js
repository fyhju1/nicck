
/* page
 * numPerPage
 * ajaxRequestPath :
 * 
 */
function executePage(page,numPerPage,ajaxRequestPath,divId,type,toPos,isCache)
{
	

	if(page > 0)
	{
		if(toPos!==""){
			var t = $(toPos).offset().top;
			$(window).scrollTop(t);
		}
		if((isCache == undefined) || (isCache == "") || (isCache == null))
		{
			isCache = false;	
		}
		jQuery("#"+divId).html("<div class='loading' style='background:none;margin:10px;'><img src='/front/images/loading.gif'/>正在载入……</div>");
		var jsonVal = {'curPage':page,'numPerPage':numPerPage,'type':type};
		/*jQuery.post(ajaxRequestPath,jsonVal,  
		function(data, textStatus){
			if(textStatus=='success')
			{
				
				jQuery("#"+divId).html(data);
			}
			else
			{
				alert('请求数据失败！');
			}
		});*/	
		
		jQuery.ajax({
					type: "post",
					url: ajaxRequestPath,
					cache: isCache,
					data: jsonVal,
					success: function(data, textStatus)
					{
						jQuery("#"+divId).html(data);
					},
					error: function(){
						alert('请求数据失败！');
					}
			});
	}
}
var exFunc = null;

function executeFunc(param)
{
	exFunc(param);
}

(function(jQuery) {
	jQuery.fn.getLinkStr = function(settings) {

		settings = jQuery.extend({
			type:1,//后加的参数 因一个业务的需要 其他项目可不要该参数 亦可去掉
			curpage:1,//当前页
			pagecount:20,//总页数
			breakpage:7,//总页数<=该值时，全部显示
			isShowPage:true,//是否显示总页数，默认显示
			isShowJump:true,//是否显示跳到第几页，默认显示
			style:"",//空为普通样式，mini：精简
			numPerPage:30,//一页显示的记录数，默认20条
			ajaxRequestPath:"",//异步请求路径
			divId:"",//页面div节点
			toPos:"",//滑动位置 #maninfo
			isCache:false,
		    exFunc:null //回调函数
		}, settings);
		
		$obj = this;
		exFunc = settings.exFunc;
		var createNumber = function(num)
		{	    
			if(settings.curpage == num){
				return " <span class='yeshu_span'><a href='javascript:void(0);' class='yeshu_a'><font color='#FF0000'> "+num+" </font></a></span> ";
			}else{
				if(exFunc != null){
					return " <span class='yeshu_span'><a href='javascript:void(0);' class='yeshu_a' onClick='executeFunc("+num+");'> " + num + " </a></span> ";
				}else{
					return " <span class='yeshu_span'><a href='javascript:void(0);' class='yeshu_a' onClick='executePage("+num+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\",\""+settings.isCache+"\");'> " + num + " </a></span> ";
				}
			}
		}
		
		jQuery(this).html("");
		
		var curpage = parseInt(settings.curpage);
		var pagecount = parseInt(settings.pagecount);
		
		var pagestr= "";
		if(settings.curpage>1)
			if(exFunc != null){
				pagestr += "<a href='javascript:void(0);' class='wenzipage' onClick='executeFunc(1);'>首页</a>";
			}else{
				pagestr += "<a href='javascript:void(0);' class='wenzipage' onClick='executePage("+1+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\");'>首页</a>";
			}
		else
		{
			pagestr += "<a href='javascript:void(0);' class='wenzipage'>首页</a>";
		}
		
		if(settings.curpage>1)
		{
			if(exFunc != null){
				pagestr += "<a href='javascript:void(0);' class='wenzipage' onClick='executeFunc("+(curpage-1)+");'>上一页</a>";
			}else{
				pagestr += "<a href='javascript:void(0);' class='wenzipage' onClick='executePage("+(curpage-1)+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\",\""+settings.isCache+"\");'>上一页</a>";
			}
		}else{
			pagestr +="<a href='javascript:void(0);'  class='wenzipage'>上一页 </a>";
		}
		
		//当总页数小于等于breakpage值时，页码全部显示
		if(pagecount <= settings.breakpage)
		{
			for(var i=1;i<=pagecount;i++)
			{
				pagestr += createNumber(i);	
			}
		}
		else
		{
			if(curpage <= 3)
			{
				for(var i=1;i<curpage + 3;i++)
				{
					pagestr += createNumber(i);		
				}
				pagestr += "<span class='yeshu_span'><a href='javascript:void(0);'  onClick='executeFunc("+curpage+3+");' class='yeshu_a'>…</a></span>";
				pagestr += createNumber(pagecount);		
				
			}
			else if(curpage > 3 && curpage <= pagecount - 3)
			{
				pagestr += createNumber(1);	
				pagestr += "<span class='yeshu_span'><a href='javascript:void(0);'  onClick='executeFunc(2);' class='yeshu_a'>…</a></span>";
				for(var i=curpage - 1;i<curpage+2;i++)
				{
					pagestr += createNumber(i);		
				}
				pagestr += pagestr += "<span class='yeshu_span'><a href='javascript:void(0);'  onClick='executeFunc("+curpage+2+");' class='yeshu_a'>…</a></span>";
				pagestr += createNumber(pagecount);	
			}
			else
			{
				pagestr += createNumber(1);	
				pagestr += pagestr += "<span class='yeshu_span'><a href='javascript:void(0);'  onClick='executeFunc(2);' class='yeshu_a'>…</a></span>";;
				for(var i=curpage-2;i<=pagecount;i++)
				{
					pagestr += createNumber(i);	
				}
			}
		}
		
		if(settings.curpage<settings.pagecount)
		{
			if(exFunc != null){
				pagestr += "<a href='javascript:void(0);' class='wenzipage ml' onClick='executeFunc("+(curpage+1)+");'>下一页</a>";
				pagestr +="<a href='javascript:void(0);' class='wenzipage' onClick='executeFunc("+settings.pagecount+");'>尾页</a>";
			}else{
				pagestr += "<a href='javascript:void(0);' class='wenzipage ml' onClick='executePage("+(curpage+1)+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\");'>下一页</a>";
				pagestr +="<a href='javascript:void(0);' class='wenzipage' onClick='executePage("+settings.pagecount+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\");'>尾页</a>";
			}
		}else{
			pagestr +="<a href='javascript:void(0);' class='wenzipage ml'> 下一页</a>";
			pagestr +="<a href='javascript:void(0);' class='wenzipage ml'> 尾页</a>";
		}
		
		
		if(settings.isShowPage){
			pagestr += '<span class="mei_a">共'+settings.pagecount+'页</span>';
		}
		
		jQuery(this).html(pagestr);
		if(settings.isShowJump)
		{
//			 <span class="mei_a">跳转第</span>
  //           <span class="mei_a1"><input type="text" class="input_yeshu" value="1" />页<a href="#" class="buttom_a"></a></span>
			jQuery(this).append("<span class='mei_a'>跳转第</span>");
			var $span=$('<span class="mei_a1"></span>');
			var $jump= $('<input name="jump" type="text" class="input_yeshu"></input>');
			
			var $btn = jQuery('<a class="buttom_a"></a>');
			$span.append($jump).append("页 ").append($btn);;
			
			$btn.click(function()
			{
				var jump = $jump.val();
				if(jQuery.trim(jump).length == 0)
				{
					alert("请输入跳转页数，共" + settings.pagecount + "页");
					$jump.focus();
				}
				else
				{
					if(jump.search("^-?\\d+$") != 0)
					{
						alert("您输入的页码错误，请输入数字！");
						$jump.focus();
					}
					else if(parseInt(jump) < 1 || parseInt(jump) > 	settings.pagecount)
					{
						alert("您输入的页码超出范围，请重新输入！")	;
						$jump.focus();
					}
					else
					{
						if(exFunc != null){
							executeFunc(jump);
						}else{
							executePage(jump,settings.numPerPage,settings.ajaxRequestPath,settings.divId,settings.type,settings.toPos,settings.isCache);
						}
					}
				}
			 });
			jQuery(this).append($span);
		}
	}
})(jQuery);