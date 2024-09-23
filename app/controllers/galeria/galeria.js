module.exports.renderiza_galeria = function(app, req, res) {
    var connection = app.config.dbConnection();
    var eventosDAO = new app.app.models.eventosDAO(connection);

    eventosDAO.getGaleria(function (error, result) {
        console.log(result)
        if (error) {
            console.error('Erro ao recuperar a galeria:', error);
            res.redirect('/erro'); // ou alguma página de erro
        } else {
            res.render('galeria/galeria', {
                flagAdmin: req.session.autorizado || null,
                codLogado: req.session.codLogado || null,
                galeria: result
            });
        }
    });
};


module.exports.renderiza_add_galeria = function(app, req, res) {
    console.log('Session Data:', req.session);
    console.log('flagAdmin:', req.session.autorizado);
    console.log('codLogado:', req.session.codLogado);
   
        res.render('galeria/add_galeria', {
            validacao: [], // Inicializa como array vazio
            galeria: {},   // Adicione galeria vazio para prevenir erros de template
            flagAdmin: req.session.autorizado,
            codLogado: req.session.codLogado
        });
 
    
};


module.exports.add_galeria = function (app, req, res) {
    var galeria = req.body;

    if(req.file != undefined){
        galeria.img = req.file.filename;
    }
    
    req.assert('titulo', 'Título é obrigatório').notEmpty();
    req.assert('descricao', 'Descrição é obrigatória').notEmpty();
    req.assert('img', 'Imagem é obrigatória').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.render('galeria/add_galeria', {
            validacao: erros,
            galeria: galeria,
            flagAdmin: req.session.autorizado || null,
            codLogado: req.session.codLogado || null
        });
        return;
    }

    var connection = app.config.dbConnection();
    var salvarGaleriaModel = new app.app.models.eventosDAO(connection);
    salvarGaleriaModel.salvarGaleria(galeria, function (error, result) {
        if (error) {
            console.error('Erro ao salvar a galeria:', error);
            res.redirect('/add_galeria'); // ou alguma página de erro
        } else {
            res.redirect('/galeria');
        }
    });
};
