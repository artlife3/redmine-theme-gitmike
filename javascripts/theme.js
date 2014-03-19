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
	// $("#header h1:not(a)").hover(
		// function(){
		// $("#project_quick_jump_box").slideDown("fast");
		// },
		// function(){
		// $("#project_quick_jump_box").slideUp("fast");
	// });
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
});


