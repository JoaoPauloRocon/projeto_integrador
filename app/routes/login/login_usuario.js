module.exports = function(app) {
    app.get('/login', (req, res) => {
        app.app.controllers.login.login.busca_login(app,req, res)
    });

    app.post('/cadastro_usuarios', function(req, res){
        console.log('chego aq')
        app.app.controllers.login.login.salvar_usuario(app, req, res);
    });
};


