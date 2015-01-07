var frBuilder = require('fr-builder'),
    partial = require('./partial'),
    homeHTML = partial.load('home'),
    projectsHTML = partial.load('projects');


function Builder() {
    var me = this;

    /**
     * @callback: 'this' is the calling router
     */
    this.home = function home() {
        this.res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        this.res.write(me.partialIndex.top);
        this.res.write(homeHTML);
        this.res.write(projectsHTML);
        this.res.write(me.partialIndex.showcases);
        this.res.write(me.partialIndex.bottom);
        this.res.end();
    };
}

Builder.prototype = frBuilder;

module.exports = new Builder();