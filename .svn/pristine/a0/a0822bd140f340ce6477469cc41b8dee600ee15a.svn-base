// JavaScript Document
//2015-12-08

$('.ddw').val(0);
$('.ddw2').val(0);
(function(){
	//滚屏按钮
	var len = $('.section').length;
	if(len > 1){
		var btn = "<div class='scroll_btn'>"; 
		for(var i=0; i < len; i++) { 
			btn += "<span></span>"; 
		} 
		btn += "</div>"; 
		$("body").append(btn);
	}
	$('.scroll_btn span').eq(0).addClass('on');
	var $btn = $(".scroll_btn");
	var b_h = $btn.height();
	$btn.css('marginTop',-b_h/2);
	$('.section_inner').eq(0).addClass('active');
	
})(jQuery);

$(function(){
	$('.main_scroll').mousewheel(function(event, delta){
		var aaaa=$('.ddw2').val();
		if (aaaa == 1){
			return;	
		}
		qpgd(delta);
	});
});
function qpgd(a){
	var z = $('.ddw').val();
    b = parseInt(z);
	c = $('.section').length;
	if(a<0){
		if(-b==c-1){
			return;
		}
		b-=1;
		$('.ddw2').val(1);
	}else if(a>0){
		if(-b==0){
			return;
		}
		b+=1;
		$('.ddw2').val(1);
	}
	$('.ddw').val(b);
	$('.scroll_btn span').eq(-b).addClass('on').siblings('span').removeClass('on');
	var single_hh = $(window).height();
	click_hh =-single_hh*b;
	$('.main_scroll').animate({'bottom': click_hh},1000);
	setTimeout(function(){
		$('.ddw2').val(0);
		},1000);
	$('.section_inner').eq(-b).addClass('active').parent('.section').siblings().children('.section_inner').removeClass('active');
};
$('.scroll_btn span').click(function(){
	var b = $(this).index();
	$('.ddw').val(-b);
	$(this).addClass('on').siblings('span').removeClass('on');
	var single_hh = $(window).height();
	click_hh =single_hh*b;
	$('.main_scroll').animate({'bottom': click_hh},1000);
	$('.section_inner').eq(b).addClass('active').parent('.section').siblings().children('.section_inner').removeClass('active');
});
$('.btn_box a').each(function(){
	var z = $('.ddw').val();
    b = parseInt(z);
	c = $('.section').length;
	$(this).on('click',function(){
		b-=1;
		if(-b > c-1){
			return;
		}else{
			$('.ddw').val(b);
			$('.scroll_btn span').eq(-b).addClass('on').siblings('span').removeClass('on');
			var single_hh = $(window).height();
			click_hh =-single_hh*b;
			$('.main_scroll').animate({'bottom': click_hh},1000);
			$('.section_inner').eq(-b).addClass('active').parent('.section').siblings().children('.section_inner').removeClass('active');
		}
	})
});
function quanp(){
	var single_hh = $(window).height();
	var single_ww = $(window).width();
	$('.section').height(single_hh);
}
quanp();
















