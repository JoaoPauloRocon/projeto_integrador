module.exports = function(app) {
    app.get('/home', (req, res) => {
        app.app.controllers.home.home.renderiza_home(app,req, res)
    });
};