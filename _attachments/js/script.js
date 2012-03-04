/* Author: Wolfgang Egger
 */
var Framlin = (function(window){
	var $ = null;
	
	function Module() {
		this.initialized = false;
		this.currentSection = '';

	}
	
	Module.prototype.init = function init() {
		$ = window.$;
	};


	Module.prototype.hideArticles = function hideArticles() {
		$('section').addClass('hidden');
		if (!this.initialized) {
			$('#sec_home').removeClass('hidden');
		}
	};

	Module.prototype.showSection = function showSection(id) {
		this.hideArticles();
		$(id).removeClass('hidden');
		this.currentSection = id;
	};

	Module.prototype.showHeader = function showHeader(id) {
		var teaser = $('#teaser'),
		clone = $(id + ' header').clone();

		teaser.removeClass('hidden');
		teaser.wrapInner(clone);		
	};

	Module.prototype.hideHeader = function hideHeader(id) {
		$('#teaser header').remove();
		$('#teaser').addClass('hidden');
	};

	Module.prototype.activateNavigation = function activateNavigation() {
		var me = this;
		$('nav a').click(function onClickA(){
			var target = '#sec_' + $(this).attr('href').substring(1);
			me.showSection(target);
			me.hideHeader(target);
		});

		$('nav a').hover(function onInA(){
			var target = '#sec_' + $(this).attr('href').substring(1);
			if (target !== me.currentSection) {
				me.showHeader(target);
			}
		}, function onOutA(){
			var target = '#sec_' + $(this).attr('href').substring(1);
			me.hideHeader(target);
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