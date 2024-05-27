module.exports = function(app) {
    app.get('/login', (req, res) => {
        app.app.controllers.login.login.busca_login(app,req, res)
    });
};
