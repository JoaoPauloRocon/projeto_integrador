module.exports = function(app) {
    app.get('/', (req, res) => {
        app.app.controllers.home.home.renderiza_home(app,req, res)
    });
};