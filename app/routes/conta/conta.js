module.exports = function(app) {
    app.get('/conta', (req, res) => {
        app.app.controllers.conta.conta.renderiza_conta(app,req, res)
    });
};