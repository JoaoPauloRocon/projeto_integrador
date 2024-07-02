module.exports.busca_login = function(app, req, res){
    console.log("to aq no controller");
    res.render("login/login");
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
