module.exports.renderiza_conta = function(app, req, res) {
   

    var connection = app.config.dbConnection();
    var contaUsuario = new app.app.models.eventosDAO(connection);

    contaUsuario.getUsuarioById(req.session.codLogado, function(err, usuario) {
        if (err) {
            console.error("Erro ao buscar dados do usuário:", err);
            return res.status(500).send("Erro ao buscar dados do usuário.");
        }

        res.render("conta/conta", {
            flagAdmin: req.session.autorizado || null,
            codLogado: req.session.codLogado || null,

            usuario: usuario // Passa os dados do usuário para a view
        });
    });
};
