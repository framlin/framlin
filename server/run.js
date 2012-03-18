var union = require('union'),
    director = require('director'),
    winston = require('winston');//,
    //framlin = require('../_attachments/js/script.js');


var router = new director.http.Router().configure({ async: true });

var server = union.createServer({
	before: [
		function (req, res) {
			if (!router.dispatch(req, res)) {
				res.emit('next');
			}
		},
		require('ecstatic')(__dirname  + '/../_attachments')
	]
});
server.listen(8080);

//router.get('/:id', function (id) {
//	var jsdom = require("jsdom");
//	var me = this;
//	jsdom.env("http://localhost:8080/", [
//	  'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'
//	],
//	function(errors, window) {
//		me.res.writeHead(200, { 'Content-Type': 'text/plain' });
//		me.res.end("there have been " + window.$("a").length + " nodejs releases!\n");
//		console.log("there have been", window.$("a").length, "nodejs releases!\n");
//	});
//});