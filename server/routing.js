var frRouting = require('fr-routing'),
    builder = require('./builder');

function cv() {
    builder.cv(this);
}

function cvEntry(cvid) {
    builder.cvEntry(this, cvid);
}


function configureRouter(router, cbDone) {
    frRouting.configure(router, builder);

    router.get('/cv', cv);
    router.get('/cv/:cvid', cvEntry);

    builder.loadContent(cbDone);
}

module.exports = {
    configure: configureRouter
};