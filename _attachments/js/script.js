/* Author: Wolfgang Egger
*/

function hideArticles() {
	$('section').addClass('hidden');
}

function showSection(id) {
	hideArticles();
	$(id).removeClass('hidden');
}

function activateNavigation() {
	$('nav a').click(function onClickA(){
		var target = '#sec_' + $(this).attr('href').substring(1);
		showSection(target);
	});
}

function activatePage() {
	activateNavigation();
}

function stylePage() {
	hideArticles();
}

jQuery(function() {
	stylePage();
	activatePage();
});