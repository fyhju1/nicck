
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
		jQuery("#"+divId).html("<div class='loading' style='background:none;margin:10px;'><img src='/front/images/loading.gif'/>�������롭��</div>");
		var jsonVal = {'curPage':page,'numPerPage':numPerPage,'type':type};
		/*jQuery.post(ajaxRequestPath,jsonVal,  
		function(data, textStatus){
			if(textStatus=='success')
			{
				
				jQuery("#"+divId).html(data);
			}
			else
			{
				alert('��������ʧ�ܣ�');
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
						alert('��������ʧ�ܣ�');
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
			type:1,//��ӵĲ��� ��һ��ҵ�����Ҫ ������Ŀ�ɲ�Ҫ�ò��� ���ȥ��
			curpage:1,//��ǰҳ
			pagecount:20,//��ҳ��
			breakpage:7,//��ҳ��<=��ֵʱ��ȫ����ʾ
			isShowPage:true,//�Ƿ���ʾ��ҳ����Ĭ����ʾ
			isShowJump:true,//�Ƿ���ʾ�����ڼ�ҳ��Ĭ����ʾ
			style:"",//��Ϊ��ͨ��ʽ��mini������
			numPerPage:30,//һҳ��ʾ�ļ�¼����Ĭ��20��
			ajaxRequestPath:"",//�첽����·��
			divId:"",//ҳ��div�ڵ�
			toPos:"",//����λ�� #maninfo
			isCache:false,
		    exFunc:null //�ص�����
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
				pagestr += "<a href='javascript:void(0);' class='wenzipage' onClick='executeFunc(1);'>��ҳ</a>";
			}else{
				pagestr += "<a href='javascript:void(0);' class='wenzipage' onClick='executePage("+1+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\");'>��ҳ</a>";
			}
		else
		{
			pagestr += "<a href='javascript:void(0);' class='wenzipage'>��ҳ</a>";
		}
		
		if(settings.curpage>1)
		{
			if(exFunc != null){
				pagestr += "<a href='javascript:void(0);' class='wenzipage' onClick='executeFunc("+(curpage-1)+");'>��һҳ</a>";
			}else{
				pagestr += "<a href='javascript:void(0);' class='wenzipage' onClick='executePage("+(curpage-1)+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\",\""+settings.isCache+"\");'>��һҳ</a>";
			}
		}else{
			pagestr +="<a href='javascript:void(0);'  class='wenzipage'>��һҳ </a>";
		}
		
		//����ҳ��С�ڵ���breakpageֵʱ��ҳ��ȫ����ʾ
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
				pagestr += "<span class='yeshu_span'><a href='javascript:void(0);'  onClick='executeFunc("+curpage+3+");' class='yeshu_a'>��</a></span>";
				pagestr += createNumber(pagecount);		
				
			}
			else if(curpage > 3 && curpage <= pagecount - 3)
			{
				pagestr += createNumber(1);	
				pagestr += "<span class='yeshu_span'><a href='javascript:void(0);'  onClick='executeFunc(2);' class='yeshu_a'>��</a></span>";
				for(var i=curpage - 1;i<curpage+2;i++)
				{
					pagestr += createNumber(i);		
				}
				pagestr += pagestr += "<span class='yeshu_span'><a href='javascript:void(0);'  onClick='executeFunc("+curpage+2+");' class='yeshu_a'>��</a></span>";
				pagestr += createNumber(pagecount);	
			}
			else
			{
				pagestr += createNumber(1);	
				pagestr += pagestr += "<span class='yeshu_span'><a href='javascript:void(0);'  onClick='executeFunc(2);' class='yeshu_a'>��</a></span>";;
				for(var i=curpage-2;i<=pagecount;i++)
				{
					pagestr += createNumber(i);	
				}
			}
		}
		
		if(settings.curpage<settings.pagecount)
		{
			if(exFunc != null){
				pagestr += "<a href='javascript:void(0);' class='wenzipage ml' onClick='executeFunc("+(curpage+1)+");'>��һҳ</a>";
				pagestr +="<a href='javascript:void(0);' class='wenzipage' onClick='executeFunc("+settings.pagecount+");'>βҳ</a>";
			}else{
				pagestr += "<a href='javascript:void(0);' class='wenzipage ml' onClick='executePage("+(curpage+1)+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\");'>��һҳ</a>";
				pagestr +="<a href='javascript:void(0);' class='wenzipage' onClick='executePage("+settings.pagecount+","+settings.numPerPage+",\""+settings.ajaxRequestPath+"\",\""+settings.divId+"\",\""+settings.type+"\",\""+settings.toPos+"\");'>βҳ</a>";
			}
		}else{
			pagestr +="<a href='javascript:void(0);' class='wenzipage ml'> ��һҳ</a>";
			pagestr +="<a href='javascript:void(0);' class='wenzipage ml'> βҳ</a>";
		}
		
		
		if(settings.isShowPage){
			pagestr += '<span class="mei_a">��'+settings.pagecount+'ҳ</span>';
		}
		
		jQuery(this).html(pagestr);
		if(settings.isShowJump)
		{
//			 <span class="mei_a">��ת��</span>
  //           <span class="mei_a1"><input type="text" class="input_yeshu" value="1" />ҳ<a href="#" class="buttom_a"></a></span>
			jQuery(this).append("<span class='mei_a'>��ת��</span>");
			var $span=$('<span class="mei_a1"></span>');
			var $jump= $('<input name="jump" type="text" class="input_yeshu"></input>');
			
			var $btn = jQuery('<a class="buttom_a"></a>');
			$span.append($jump).append("ҳ ").append($btn);;
			
			$btn.click(function()
			{
				var jump = $jump.val();
				if(jQuery.trim(jump).length == 0)
				{
					alert("��������תҳ������" + settings.pagecount + "ҳ");
					$jump.focus();
				}
				else
				{
					if(jump.search("^-?\\d+$") != 0)
					{
						alert("�������ҳ��������������֣�");
						$jump.focus();
					}
					else if(parseInt(jump) < 1 || parseInt(jump) > 	settings.pagecount)
					{
						alert("�������ҳ�볬����Χ�����������룡")	;
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