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


	Module.prototype.hideArticles = function hideArticles() {
		$('section').fadeOut(20);
		if (!this.initialized) {
			$('#sec_home').fadeIn(20);
		}
	};

	Module.prototype.showSection = function showSection(id, time) {
		this.hideArticles();
		$(id).fadeIn(time||20);
		this.currentSection = id;
	};

	Module.prototype.showHeader = function showHeader(id) {
		var teaser = $('#teaser'),
		clone = $(id + ' header').clone();
		this.hideArticles();
		teaser.fadeIn(20);
		teaser.wrapInner(clone);		
	};

	Module.prototype.hideHeader = function hideHeader(id) {
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
                    me.showSection(me.currentSection);
                }
                me.cameIn = false;
            });
	};

	Module.prototype.activatePage = function activatePage() {
		this.activateNavigation();
	};

	Module.prototype.stylePage = function stylePage() {
		this.hideArticles();
		this.initialized = true;
	};

	// ###############################
	return new Module();

})(window);


jQuery(function() {
	Framlin.init();
	Framlin.stylePage();
	Framlin.activatePage();
});