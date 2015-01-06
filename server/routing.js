var builder = require('./builder');

function cv() {
    builder.cv(this);
}

function cvEntry(cvid) {
    builder.cvEntry(this, cvid);
}

function ciStyle(stylePath) {
    builder.ciStyle(this, stylePath);
}

function ciPartial(partialPath) {
    builder.ciPartial(this, partialPath);
}

function ciImage(imagePath) {
    builder.ciImage(this, imagePath);
}

function ciFont(fontPath) {
    builder.ciFont(this, fontPath);
}

function configureRouter(router, cbDone) {

    router.get('/cv', cv);
    router.get('/cv/:cvid', cvEntry);
    router.get('/ci/style/:path', ciStyle);
    router.get('/ci/partial/:path', ciPartial);
    router.get('/ci/image/:path', ciImage);
    router.get('/ci/font/:path', ciFont);
    router.get('/impressum', builder.impressum);
    router.get('/disclaimer', builder.disclaimer);
    router.get('/', builder.home);

//---- LEGACY Routes ----------------------
    router.get('/index.html', builder.home);
//------------------------------------------

    builder.loadPartials(cbDone);
}

module.exports = {
    configure: configureRouter
};