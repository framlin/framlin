var frRouting = require('fr-routing');



function configureRouter(sitename, router, builder, next) {

    function cv() {
        builder.cv(this);
    }

    function cvEntry(cvid) {
        builder.cvEntry(this, cvid);
    }

    frRouting.configure(router, builder);

    router.get('/cv', cv);
    router.get('/cv/:cvid', cvEntry);

    builder.loadContent(sitename, next);
}

module.exports = {
    configure: configureRouter
};