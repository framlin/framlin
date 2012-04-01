var http = require('http'), httpProxy = require('http-proxy');

var options = {
	hostnameOnly : true,
	router : {
		'www.runjs.de' : '127.0.0.1:8001',
		'www.framlin.de' : '127.0.0.1:5984',
		'www.framlin.com' : '127.0.0.1:5984',
		'www.framlin.info' : '127.0.0.1:5984',
		'www.wolfgang-egger.de' : '127.0.0.1:5984',
		'framlin.de' : '127.0.0.1:5984',
		'framlin.com' : '127.0.0.1:5984'
	}
};

var proxyServer = httpProxy.createServer(options);
proxyServer.listen(80);

