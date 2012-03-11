var union = require('union');
var flatiron = require('flatiron');
var ecstatic = require('ecstatic');

app = new flatiron.App();
app.use(flatiron.plugins.http);

app.http.before = [
  ecstatic(__dirname + '/../_attachments')
];



app.router.get('/action', function () {
    this.res.writeHead(200, { 'Content-Type': 'text/plain' });
    this.res.end('do some action!\n');
  });

app.start(8080);

console.log('Listening on :8080');
