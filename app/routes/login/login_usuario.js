module.exports = function (app) {
    app.get('/login', (req, res) => {
        app.app.controllers.login.login.busca_login(app, req, res)
    });

    app.get('/cadastrar', (req, res) => {
        app.app.controllers.login.login.cadastrar_usuario(app, req, res)
    });

    app.post('/cadastro_usuarios', function (req, res) {
        console.log('chego aq')
        app.app.controllers.login.login.salvar_usuario(app, req, res);
    });

    app.post('/valida_login', function (req, res) {
        app.app.controllers.login.login.valida_login(app, req, res);
    });

    app.get('/sair', function (req, res) {
        app.app.controllers.login.login.sair(req, res);
    });


};


