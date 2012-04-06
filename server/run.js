var union = require('union'),
	url = require('url'),
    director = require('director'),
    winston = require('winston'),
    framlin = require('../site/js/script.js').Framlin,
    window = null,
    jsdom = require("jsdom"),
    Framlin = framlin();


function getIP(req) {
	return {
		ip: ( req.headers["X-Forwarded-For"]
		|| req.headers["x-forwarded-for"]
		|| (typeof req.connection !== 'undefined' ? req.connection.remoteAddress : 'n.a') )
	};
};


var router = new director.http.Router().configure({ async: true });

var server = union.createServer({
	before: [
	         function (req, res) {
	      	   winston.log('info', new Date() + ' :: ' + getIP(req).ip + ' :: ' + url.parse(req.url).pathname);
	      	   res.emit('next');
	         },
	         function (req, res) {
	        	 if (!router.dispatch(req, res)) {
	        		 res.emit('next');
	        	 }
	         },
	         require('ecstatic')(__dirname  + '/../site')
	]
});
server.listen(8080);


//--------- server-side rendering ----------------------------------

function requestHandler(id) {
	//winston.log('info', ['REQUEST ', new Date(), id]);	
	this.res.writeHead(200, { 'Content-Type': 'text/html' });
	this.res.end(Framlin.render(id));
}


router.get('/:id', function (id) {
	var me = this;
	if ( id !== 'favicon.ico') {
		if (!window) {
			jsdom.env("http://localhost:8080/", [
	     	 	'js/libs/jquery-1.7.1.min.js',
	     	 	],
	     	 	function(errors, win) {
	     			window = win;
	     			Framlin.init({
	     				win: window,
	     				logger: winston,
	     				server: true
	     			});
	     			Framlin.stylePage();
	     			requestHandler.call(me, id);
	     	 	}
	     	 );
		} else {
			requestHandler.call(me, id);
		}
	} else {
		//handle favicon
	}
});