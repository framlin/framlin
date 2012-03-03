/* Author: Wolfgang Egger
*/

function styleArticles() {
	$('section').addClass('hidden');
}
function styleContent() {
	$('#content').addClass('hidden');
}

function activatePage() {
	activateNavigation();
}

function showSection(id) {
	styleArticles();
	$(id).removeClass('hidden');
}

function activateNavigation() {
	$('nav a').click(function onClickA(){
		//styleArticle();
		var target = '#sec_' + $(this).attr('href').substring(1);
		showSection(target);
	});
}

function stylePage() {
	styleArticles();
}

jQuery(function() {
	stylePage();
	activatePage();
});