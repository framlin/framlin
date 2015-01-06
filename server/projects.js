var fs = require('fs'),
    content = fs.readFileSync(__dirname + '/../site/partials/projects.html', {encoding: 'utf-8'});

module.exports = content;