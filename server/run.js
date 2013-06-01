var union = require('union');

var server = union.createServer({
    before: [
        require('ecstatic')(__dirname  + '/../site')
    ]
});
server.listen(8080);
