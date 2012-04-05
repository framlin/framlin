/* Author: Wolfgang Egger
 */
function prcPrefix() {
	return '<!doctype html>\n' +
	'<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->\n' +
	'<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->\n' +
	'<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->\n' +
	'<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->\n' +
	'<!-- Consider adding a manifest.appcache: h5bp.com/d/Offline -->\n' +
	'<!--[if gt IE 8]><!--> <html class="no-js" lang="en">\n';	
}

function Framlin(win){
	var $ = null,
		window = win,
		logger = console,
		server = false,
		client = true,
		bodyClone = null,
		prefix = prcPrefix();
		
	function Module() {
		this.initialized = false;
		this.currentSection = '#sec_home';
		this.cameIn = false;
		this.headerDisplayed = false;
	};
	

	
	Module.prototype.init = function init(config) {
		try {
			if (typeof config !== 'undefined') {
				if (typeof config.logger !== 'undefined') {
					logger = config.logger;
				}
				
				logger.log('info', 'INIT');
				if (typeof config.win !== 'undefined') {
					window = config.win;
				}
				
				if (typeof config.server !== 'undefined') {
					server = config.server;
					bodyClone = window.$("body").clone();

				}
				client = !server;
			}
			$ = window.$;
		} catch(e) {
			logger.log('error', e);
		}
	};
	
	Module.prototype.reset = function reset() {
		var newBodyClone = bodyClone.clone();
		window.$("body").replaceWith(bodyClone);
		bodyClone = newBodyClone;
	};


	Module.prototype.hideElem = function hideElem(elem, time) {
		if (client) {
			elem.fadeOut(time);			
		} else {
			elem.addClass('hidden');
		}		
	};

	Module.prototype.showElem = function showElem(elem, time) {
		if (client) {
			elem.fadeIn(time);			
		} else {
			elem.removeClass('hidden');
		}		
	};

	Module.prototype.hideArticle = function hideArticle(id) {
		$(id).fadeOut(20);
	};

	Module.prototype.hideArticles = function hideArticles() {
		this.hideElem($('section'), 20);
		if (!this.initialized) {
			this.showElem($('#sec_home'), 20);
		}
	};

	Module.prototype.showSection = function showSection(id, time) {
		this.hideArticles();
		this.showElem($(id), time||20);
		this.currentSection = id;
	};

	Module.prototype.showHeader = function showHeader(id, href, text) {
		if (text === '') {
			text = 'das Logo';
		}
		
		this.hideArticle(this.currentSection);
		var me = this,
			teaser = $('#teaser'),
			clone = $(id + ' header').clone(),
			link = $("<a href='" + href + "'>Auf " + text + " klicken, oder </a>"),
			timeLeft = 9,
			timer = $('<em/>').text(timeLeft),
			more = $("<p/>");
		
		link.append(timer);
		timer.append('<em> Sekunden warten, um  mehr zu lesen ...</em>');
		link.click(function onClickA(){
			var target = '#sec_' + $(this).attr('href').substring(1);
			me.navigationClicked(target, 400);
		});
		more.wrapInner(link);
		more.addClass('more');
		clone.append(more);
		teaser.wrapInner(clone);
		window.setTimeout(function fadeIn() {
			teaser.fadeIn(400);
    		me.currentSection = id;
		}, 100);
		
		var counter = window.setInterval(function setTimer(){
			timer.text(--timeLeft).append('<em> Sekunden warten, um  mehr zu lesen ...</em>')
			if (!timeLeft) {
				window.clearInterval(counter);
				link.click();
			}
		}, 1000);
	};

	Module.prototype.hideHeader = function hideHeader(id) {
		this.hideElem($('#teaser'), 20);
        $('#teaser header').remove();
	};
	
	Module.prototype.navigationClicked = function navigationClicked(target, time) {
		if (client) {
	        this.hideHeader(target);    
		}
		this.showSection(target, time);
		if (client) {
			$('html, body').animate({scrollTop:0}, 'slow');
		}
	};

	Module.prototype.activateNavigation = function activateNavigation() {
		var me = this;
		$('nav a').click(function onClickA(){
			var target = '#sec_' + $(this).attr('href').substring(1);
			me.navigationClicked(target, 400);
		});

		$('nav a').hover(
            function onInA(){
                me.cameIn = true;
                var currElem = $(this);

                window.setTimeout(function (){
                	var href = currElem.attr('href');
                    var target = '#sec_' + currElem.attr('href').substring(1);
                    if ((me.cameIn) && (target !== me.currentSection)) {
                    	if(me.headerDisplayed) {
                          me.hideHeader(target);
                    	}
                        me.showHeader(target, href, currElem.text());
                        me.cameIn = false;
                        me.headerDisplayed = true;
                    }
                }, 200); 
            }, function onOutA(){
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
		$('section').removeClass('hidden');
	};
	
	Module.prototype.stylePage = function stylePage() {
		this.showContent();
		this.hideArticles();
		this.initialized = true;
	};

	Module.prototype.render = function render(id) {
		this.navigationClicked('#sec_'+id, 0);
		var result =  prefix + window.$("html").html() + '</html>';
		this.reset();
		return result;
	};
	// ###############################
	return new Module();

};

if (typeof jQuery !== 'undefined') {
	jQuery(function() {
		var framlin = Framlin(window);
		framlin.init();
		framlin.stylePage();
		framlin.activatePage();
	});	
} else {
    exports.Framlin = Framlin;    
}

