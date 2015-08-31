var backlog_status_color = [
	{name:"todo",bgcolor:"#ffffff",txtcolor:"#333333"},
	{name:"未",bgcolor:"#ffffff",txtcolor:"#333333"},
	{name:"In Process",bgcolor:"#F2F2FC",txtcolor:"#2957C9"},
	{name:"作業中",bgcolor:"#F2F2FC",txtcolor:"#2957C9"},
	{name:"To Verify",bgcolor:"#F8EDD1",txtcolor:"#2957C9"},
	{name:"確認中",bgcolor:"#F8EDD1",txtcolor:"#2957C9"},
	{name:"終了",bgcolor:"#eee",txtcolor:"#A79F9F"},
	{name:"Done",bgcolor:"#eee",txtcolor:"#A79F9F"},
];
jQuery.extend(jQuery.easing, {
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInExpo: function (x, t, b, c, d) {
	return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
	return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
});
function setStatusClass($parent,status){
	for (var i=0; i < backlog_status_color.length; i++) {
		if(status == backlog_status_color[i].name){
			$parent.css({
				'cssText':"color:"+backlog_status_color[i].txtcolor+"!important",
				"background-color":backlog_status_color[i].bgcolor,
			});
		};
	};
}

$(function()
{
	/**
	 * backlog status color
	 */
	var status = $(".status_id.editable.story_field .t");
	for (var i = 0; i < status.length; i++) {
		setStatusClass(status.eq(i).parents(".model.story.fff-wrapper"),status.eq(i).text());
	};
	var status = $(".story-swimlane .story.closed");
	for (var i = 0; i < status.length; i++) {
		status.eq(i).parents(".story-swimlane").addClass("status_closed");
	};
	$(".model.story.fff-wrapper").click(function(){
		var $el = $(this);
		var status = $el.find(".status_id.editor");
		$(this).find(".save").click(function(){
			console.log($el.attr("class"));
			
			setStatusClass($el,status.find("option:selected").text());
		});
	});
	
	/**
	 * backlog & kanban themes.js 
	 */
	// var script = document.createElement("script");
	// script.setAttribute("src", "/themes/redmine-theme-gitmike-design/javascripts/jquery.ui.touch-punch.min.js");
	// document.getElementsByTagName("head")[0].appendChild(script);

	/**
	 * #project_quick_jump_box
	 */
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
	 * #sidebar
	 */
	if(!$("#main").hasClass("nosidebar")){

		$('#main').prepend('<div id="sidebar_button">Sidebar</div>');
		var $_sidebar_button = $("#sidebar_button");
		$_sidebar_button.css({opacity: 0.3});
		function func_sidebar_show(el){
			$("#sidebar").stop(true, false).hide("slow");
			el.removeClass("sidebar-hide").fadeTo("fast", 0.3);
			$("#main").removeClass("nosidebar");
			$.cookie("sidebar-hide","show");
		}
		function func_sidebar_hide(el){
			$("#sidebar").stop(true, false).show("slow");
			el.addClass("sidebar-hide").fadeTo("fast", 1);
			$("#main").addClass("nosidebar");
			$("#main.nosidebar div#content > div.contextual").css({"margin-right":"40px"});
			$.cookie("sidebar-hide","hide");
		}

		if($.cookie("sidebar-hide")!="show"){
			func_sidebar_hide($_sidebar_button);
		}
		$_sidebar_button.click(
			function(){
				if($(this).hasClass("sidebar-hide")){
					func_sidebar_show($(this));
				}else{
					func_sidebar_hide($(this));
				}
		});
		delete $_sidebar_button;
	}

	/**
	 * issues attributes
	 */
	$(".controller-issues.action-show .attributes").wrap('<div id="attributes_wrap">');
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
	if($(".journal.has-details").length>0){
		$(".journal.has-details").not(".has-notes").wrap('<div class="balloon-left"></div>');
		$(".balloon-left").hide();
		$('<a id="history_btn">show detail</a>').appendTo(".action-show #history > h3");
	}
	$(".journal.has-notes").wrap('<div class="balloon-right"></div>');

	$("#history_btn").addClass("history-detail-hide");
	$("#history_btn").click(
		function(){
			if($(this).hasClass("history-detail-hide")){
				$(".balloon-left").stop(true, false).
				slideDown("normal","easeOutBounce");
				$(this).removeClass("history-detail-hide").fadeTo("normal", 0.3);
			}else{
				$(".balloon-left").stop(true, false).
				slideUp("normal","easeOutQuint");;
				$(this).addClass("history-detail-hide").fadeTo("normal", 1);
			}
	});
	/**
	 * changesets
	 */
	if($("#issue-changesets .changeset").length>1){
		$('<a id="issue-changesets_btn" class="changesets-hide">show detail</a>').appendTo("#issue-changesets h3");
		$("#issue-changesets .changeset:not(:first)").hide();
	
		$("#issue-changesets_btn").click(
			function(){
				if($(this).hasClass("changesets-hide")){
					$("#issue-changesets .changeset:not(:first)").stop(true, false).
					slideDown("normal","easeOutBounce");
					$(this).removeClass("changesets-hide").fadeTo("normal", 0.3);
				}else{
					$("#issue-changesets .changeset:not(:first)").stop(true, false).
					slideUp("normal","easeOutQuint");;
					$(this).addClass("changesets-hide").fadeTo("normal", 1);
				}
		});
	}
	/**
	 * toc scroller
	 */
	$(".wiki .toc").each(function(){
		$(".wiki.wiki-page").append('<div class="toc_home"></div>');
	});

	$(".wiki .toc a").click(function(){
		var href= $(this).attr("href").replace("#","");
		var position = $('a[name="'+href+'"]').offset().top;
		$('html,body').stop().animate({ scrollTop: position }, 500, "easeOutExpo",function () {
			//callback
		});
		return false;
	});

	$(".toc_home").click(function(){
		var position = $(".wiki.wiki-page .toc").offset().top;
		$('html,body').stop().animate({ scrollTop: position }, 500, "easeOutExpo",function () {
			//callback
		});
	});
});


