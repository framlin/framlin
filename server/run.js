var union = require('union'),
    director = require('director'),
    winston = require('winston');


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

router.get('/action', function () {
this.res.writeHead(200, { 'Content-Type': 'text/plain' });
this.res.end('Hello world!\n');
});