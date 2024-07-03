module.exports.busca_login = function(app, req, res){
    res.render("login/login");
}

module.exports.cadastrar_usuario = function(app, req, res){
    res.render("login/cadastro_usuario");
}

module.exports.salvar_usuario = function (app, req, res) {
    var usuario = req.body;
    console.log(usuario)

    var connection = app.config.dbConnection();
    var salvarUsuarioModel = new app.app.models.eventosDAO(connection);
    salvarUsuarioModel.salvarUsuario(usuario, function (error, result) {
        res.render("login/login");
    });
}

module.exports.valida_login = function (app, req, res) {
    var campusDeUsuario = req.body;
    console.log(campusDeUsuario)
    
    var connection = app.config.dbConnection();
    var autentificacao = new app.app.models.eventosDAO(connection);
    console.log(campusDeUsuario)

    autentificacao.getLogin(campusDeUsuario, function (error, result) {
        if (result.length != 0) {
            console.log(result)
            console.log('usuario')
            req.session.autorizado = 'usuario';
            req.session.codLogado = result[0].IDCliente;
            res.redirect('/home');
            return;
        } else {
            autentificacao.getLoginAdm(campusDeUsuario, function (error, result) {
                if (result.length != 0) {
                    req.session.autorizado = 'adm';
                    req.session.codLogado = result[0].IDAdm;
                    res.redirect('/home');
                    console.log(result)
                    return;
                }
                var erro = [];
                erro.push({ msg: "Usuario ou Senha Incorretos!" })
                res.render('login/login', { validacao: erro, flagAdmin: req.session.autorizado, codLogado: req.session.codLogado });
                return;
            });
        }

    });
}
