module.exports.busca_login = function (app, req, res) {
    res.render("login/login", { flagAdmin: req.session.autorizado || null, codLogado: req.session.codLogado || null });
}


module.exports.cadastrar_usuario = function (app, req, res) {
    res.render("login/cadastro_usuario", {flagAdmin: null, codLogado: null });
}

module.exports.salvar_usuario = function (app, req, res) {
    var usuario = req.body;
    var erros = [];

    // Verificações de campos obrigatórios
    if (!usuario.email || !usuario.email.trim()) {
        erros.push({ msg: "O campo E-mail é obrigatório!" });
    }
    if (!usuario.senha || !usuario.senha.trim()) {
        erros.push({ msg: "O campo Senha é obrigatório!" });
    }
    if (!usuario.nome || !usuario.nome.trim()) {
        erros.push({ msg: "O campo Nome é obrigatório!" });
    }
    if (!usuario.dataNascimento || !usuario.dataNascimento.trim()) {
        erros.push({ msg: "O campo Data de Nascimento é obrigatório!" });
    }
    if (!usuario.cpf || !usuario.cpf.trim()) {
        erros.push({ msg: "O campo CPF é obrigatório!" });
    }
    if (!usuario.telefone || !usuario.telefone.trim()) {
        erros.push({ msg: "O campo Telefone é obrigatório!" });
    }

    if (erros.length > 0) {
        res.render('login/cadastro_usuario', { validacao: erros });
        return;
    }

    var connection = app.config.dbConnection();
    var salvarUsuarioModel = new app.app.models.eventosDAO(connection);

    // Verifica se o usuário já existe
    salvarUsuarioModel.getUsuarioEmail(usuario.email, function (error, result) {
        if (result.length > 0) {
            erros.push({ msg: "O e-mail já está cadastrado!" });
            res.render('login/cadastro_usuario', { validacao: erros });
            return;
        }
        // Salva o usuário
        salvarUsuarioModel.salvarUsuario(usuario, function (error, result) {
            if (error) {
                erros.push({ msg: "Erro ao salvar o usuário!" });
                res.render('login/cadastro_usuario', { validacao: erros });
                return;
            }
            res.redirect("/login");
        });
    });
};


module.exports.valida_login = function (app, req, res) {
    var campusDeUsuario = req.body;

    var erros = [];

    if (!campusDeUsuario.email || !campusDeUsuario.email.trim()) {
        erros.push({ msg: "O campo E-mail é obrigatório!" });
    }
    if (!campusDeUsuario.senha || !campusDeUsuario.senha.trim()) {
        erros.push({ msg: "O campo Senha é obrigatório!" });
    }

    if (erros.length > 0) {
        res.render('login/login', { validacao: erros, flagAdmin: null, codLogado: null });
        return;
    }

    var connection = app.config.dbConnection();
    var autentificacao = new app.app.models.eventosDAO(connection);

    autentificacao.getLogin(campusDeUsuario, function (error, result) {
        if (result.length != 0) {
            console.log(result)
            req.session.autorizado = 'usuario';
            req.session.codLogado = result[0].codUsuario; // Definindo o codLogado
            res.redirect(`/`);
            return;
        } else {
            autentificacao.getLoginAdm(campusDeUsuario, function (error, result) {
                if (result.length != 0) {
                    req.session.autorizado = 'adm';
                    req.session.codLogado = result[0].codAdmin; // Definindo o codLogado
                    res.redirect('/');
                    return;
                }
                erros.push({ msg: "Usuario ou Senha Incorretos!" });
                res.render('login/login', { validacao: erros, flagAdmin: null, codLogado: null });
                return;
            });
        }
    });
}

module.exports.sair = function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log('Erro ao tentar destruir a sessão:', err);
            res.redirect('/'); 
        } else {
            res.redirect('/login');
        }
    });
};






