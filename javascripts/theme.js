jQuery.extend(jQuery.easing, {
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
});
$(function()
{
	$("#project_quick_jump_box").css({"display":"inline"}).appendTo("#header h1");
	/**
	 * account
	 */
	$("#account").css({"width":"0","overflow":"hidden"});
	$("#account,#loggedas").hover(
		function(){
			$("#account").stop().animate({"width":"160px"});
		},function(){
			$("#account").stop().animate({"width":0});
		}
	);
	
	/**
	 * search form
	 */
	var search_w = 100;
	var search_w_expand = search_w+100;
	$("#quick-search input").focusin(
		function(){
			$(this).animate({width:search_w_expand+"px"},{ duration: 100,easing: 'easeOutCubic',});
		}).focusout(
		function(){
			$(this).animate({width:search_w+"px"},{ duration: 100,easing: 'easeOutCubic',});
		}).css({width:search_w+"px"}
	);
	$("#quick-search form").prepend('<input type="hidden" name="scope" value="all">');
	$("#quick-search a").attr("href",function(){
		return $(this).attr("href")+"/?scope=all";
		
	});
	/**
	 * scope=all
	 */
	$("#taskboard .story, .label_sprint_impediments").append('<div class="box_tape">');
	
	/**
	 * backlog kanban
	 */
	$("#taskboard .issue").click(function(){
		$(this).css(":befor","none");
	});
	/**
	 * issues attributes
	 */
	$(".action-show .attributes").wrap('<div id="attributes_wrap">');
	$("#attributes_wrap").before('<a id="attributes_btn">show attributes</a>');
	$("#attributes_btn").addClass("attributes-hide");
	$("#attributes_wrap").hide(0);
	$("#attributes_btn").click(
		function(){
			if($(this).hasClass("attributes-hide")){
				$("#attributes_wrap").stop(true, false).
				slideDown("slow","easeOutQuint");
				$(this).removeClass("attributes-hide").fadeTo("normal", 0.5);
			}else{
				$("#attributes_wrap").stop(true, false).
				slideUp("slow","easeOutQuint");;
				$(this).addClass("attributes-hide").fadeTo("normal", 1);
			}
	});
	
	/**
	 * issues history
	 */
	$(".journal.has-details").not(".has-notes").wrap('<div class="balloon-left"></div>');
	$(".journal.has-notes").wrap('<div class="balloon-right"></div>');

	$('<a id="history_btn">show detail</a>').appendTo(".action-show #history h3");
	$(".balloon-left").hide();
	$("#history_btn").addClass("history-detail-hide");
	$("#history_btn").click(
		function(){
			if($(this).hasClass("history-detail-hide")){
				$(".balloon-left").stop(true, false).
				slideDown("normal","easeOutQuint");
				$(this).removeClass("history-detail-hide").fadeTo("normal", 0.3);
			}else{
				$(".balloon-left").stop(true, false).
				slideUp("normal","easeOutQuint");;
				$(this).addClass("history-detail-hide").fadeTo("normal", 1);
			}
	});
});


