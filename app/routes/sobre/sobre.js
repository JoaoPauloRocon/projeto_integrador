module.exports = function(app) {
    app.get('/sobre', (req, res) => {
        app.app.controllers.sobre.sobre.renderiza_sobre(app,req, res)
    });
};