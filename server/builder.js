var frBuilder = require('fr-builder'),
    PARTIALS_PATH = __dirname + '/../site/partials/',
    localPartials = frBuilder.loadAllPartials(PARTIALS_PATH);

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
        this.res.write(me.partialIndex.heading);
        this.res.write(me.partialIndex.maintop);
        this.res.write(me.partialIndex.topnav);
        this.res.write(me.articleIndex.home);
        this.res.write(me.articleIndex.projects);
        this.res.write(me.partialIndex.bottomnav);
        this.res.write(me.partialIndex.metanav);
        this.res.write(me.partialIndex.mainbottom);
        this.res.write(me.partialIndex.bottom);
        this.res.end();
    };
}

Builder.prototype = new frBuilder(localPartials);

module.exports = new Builder();