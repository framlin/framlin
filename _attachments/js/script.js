/* Author: Wolfgang Egger
 */
var Framlin = (function(window){
	var $ = null;
	
	function Module() {
		this.initialized = false;
		this.currentSection = '#sec_home';
		this.cameIn = false;
	}
	
	Module.prototype.init = function init() {
		$ = window.$;
	};


	Module.prototype.hideArticle = function hideArticle(id) {
		console.log('hideArticle', id);
		$(id).fadeOut(20);
	};

	Module.prototype.hideArticles = function hideArticles() {
		console.log('hideArticles');
		$('section').fadeOut(20);
		if (!this.initialized) {
			$('#sec_home').fadeIn(20);
		}
	};

	Module.prototype.showSection = function showSection(id, time) {
		console.log('showSection', id);
		this.hideArticles();
		$(id).fadeIn(time||20);
		this.currentSection = id;
	};

	Module.prototype.showHeader = function showHeader(id) {
		this.hideArticle(this.currentSection);
		console.log('showHeader', id);
		var teaser = $('#teaser'),
		clone = $(id + ' header').clone();
		var more = $('<p>klick to read more ...</p>');
		more.addClass('more');
		clone.append(more);
		teaser.wrapInner(clone);
		window.setTimeout(function fadeIn() {
			teaser.fadeIn(400);
		}, 100);
	};

	Module.prototype.hideHeader = function hideHeader(id) {
		console.log('hideHeader', id);
		$('#teaser').fadeOut(20);
        $('#teaser header').remove();
	};

	Module.prototype.activateNavigation = function activateNavigation() {
		var me = this;
		$('nav a').click(function onClickA(){
			var target = '#sec_' + $(this).attr('href').substring(1);
            me.hideHeader(target);
			me.showSection(target, 400);
		});

		$('nav a').hover(
            function onInA(){
                me.cameIn = true;
                var currElem = $(this);
                window.setTimeout(function (){
                    var target = '#sec_' + currElem.attr('href').substring(1);
                    if ((me.cameIn) && (target !== me.currentSection)) {
                        me.showHeader(target);
                        me.cameIn = false;

                    }
                }, 200); 
            }, function onOutA(){
                var target = '#sec_' + $(this).attr('href').substring(1);
                if ((!me.cameIn) && (target !== me.currentSection)) {
                    me.hideHeader(target);
                    window.setTimeout(function showSection() {
                        me.showSection(me.currentSection, 400);
                    }, 100);
                }
                me.cameIn = false;
            });

		$('#topteaser').hover(
				function onInA(){
					$(this).removeClass('box-high');
					$(this).addClass('box-flat');
					$(this).css('margin-left', '-=1');
					$(this).css('margin-top', '-=1');
					$(this).css('margin-bottom', '+=1');
				}, function onOutA(){
					$(this).removeClass('box-flat');
					$(this).addClass('box-high');
					$(this).css('margin-left', '+=1');
					$(this).css('margin-top', '+=1');
					$(this).css('margin-bottom', '-=1');
				});
	};

	

	
	
	Module.prototype.activateHref = function activateHref() {
		$('nav a').each(function(index, anchor){
			$(anchor).attr('href', '#'+$(anchor).attr('href'));
		});
	};
	
	Module.prototype.activatePage = function activatePage() {
		this.activateHref();
		this.activateNavigation();
	};

	Module.prototype.showContent = function showContent() {
		$('#content').removeClass('hidden');
	};
	
	Module.prototype.stylePage = function stylePage() {
		this.showContent();
		this.hideArticles();
		this.initialized = true;
	};

	// ###############################
	return new Module();

});

if (jQuery) {
	jQuery(function() {
		var framlin = Framlin(window);
		framlin.init();
		framlin.stylePage();
		framlin.activatePage();
	});	
}

exports = Framlin;