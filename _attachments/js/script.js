/* Author: Wolfgang Egger
*/
/*
 * #t1993{
	margin-left:20px;	
}
#t1997{
	margin-left:24px;	
}
#t2000{
	margin-left:43px;	
}
#t2006{
	margin-left:27px;	
}
*/

function topteaserStyling(){
	$('#topteaser').css({
		position: 'relative'
	});
	experiencedStyling();
}

function experiencedStyling(){
	var languagePostions = {
			'#cpp'		:{left:'20px', top:'25px'}, 
			'#t1993'	:{left:'20px', top:'50px'}, 
			'#delphi'	:{left:'104px', top:'25px'}, 
			'#t1997'	:{left:'100px', top:'50px'}, 
			'#java'		:{left:'180px', top:'25px'}, 
			'#t2000'	:{left:'156px', top:'50px'}, 
			'#js'		:{left:'270px', top:'25px'},
			'#t2006'	:{left:'262px', top:'50px'}
	},
	pos = '';
	$('#language div, #timeline div').css( {
		//'background-color': 'blue',
		display:'block'
	});
	
	$('#experienced').css({
		//'background-color': 'blue',
		position: 'relative',
		'height': '80px'
	});
	//#cpp, #delphi, #java, #js
	$('#cpp, #delphi, #java, #js, #t1993, #t1997, #t2000, #t2006').css({
		position: 'absolute'
	});
	
	for(pos in languagePostions) {
		$(pos).css(languagePostions[pos]);
	}
}

function styling() {
	topteaserStyling();
}

jQuery(function() {
	styling();
});