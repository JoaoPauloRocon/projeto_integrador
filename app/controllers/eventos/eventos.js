module.exports.renderiza_eventos = function (app, req, res) {
    var connection = app.config.dbConnection();
    var eventosDAO = new app.app.models.eventosDAO(connection);

    eventosDAO.getEventos(function (error, result) {

        console.log(result);
        if (error) {
            console.error('Erro ao buscar os eventos:', error);
            res.status(500).send('Erro ao buscar os eventos');
        } else {
            const eventosAgrupados = result.reduce((acc, evento) => {
                if (!acc[evento.codEvento]) {
                    acc[evento.codEvento] = {
                        codEvento: evento.codEvento,
                        tituloEvento: evento.tituloEvento,
                        descricaoEvento: evento.descricaoEvento,
                        dataEvento: evento.dataEvento,
                        cidadeEvento: evento.cidade,
                        ruaEvento: evento.rua,
                        bairroEvento: evento.bairro,
                        numeroEvento: evento.numero,
                        cepEvento: evento.cep,
                        estadoEvento: evento.estado,
                        imagens: []
                    };
                }
                if (evento.imgEvento) {
                    acc[evento.codEvento].imagens.push(evento.imgEvento);
                }
                return acc;
            }, {});

            res.render('eventos/eventos', {
                eventos: Object.values(eventosAgrupados),
                flagAdmin: req.session.autorizado || null,
                codLogado: req.session.codLogado || null
            });
        }
    });
};

module.exports.detalha_evento = function (app, req, res) {
    var connection = app.config.dbConnection();
    var eventosDAO = new app.app.models.eventosDAO(connection);
    var id = req.params.id;

    eventosDAO.getEventoById(id, function (error, result) {
        if (error) {
            console.error('Erro ao buscar o evento:', error);
            res.status(500).send('Erro ao buscar o evento');
        } else {
            const evento = result.length > 0 ? {
                codEvento: result[0].codEvento,
                tituloEvento: result[0].tituloEvento,
                descricaoEvento: result[0].descricaoEvento,
                dataEvento: result[0].dataEvento,
                cidadeEvento: result[0].cidade,
                ruaEvento: result[0].rua,
                numeroEvento: result[0].numero,
                bairroEvento: result[0].bairro,
                cepEvento: result[0].cep,
                estadoEvento: result[0].estado,
                imagens: result.map(r => r.imgEvento).filter(img => img)
            } : null;

            res.render('eventos/evento_detalhe', {
                evento: evento,
                flagAdmin: req.session.autorizado || null,
                codLogado: req.session.codLogado || null
            });
        }
    });
};


module.exports.renderiza_add_evento = function (app, req, res) {
    console.log('Session Data:', req.session);
    console.log('flagAdmin:', req.session.autorizado);
    console.log('codLogado:', req.session.codLogado);

    res.render('eventos/add_evento', {
        validacao: [], // Inicializa como array vazio
        evento: {},   // Adiciona evento vazio para prevenir erros de template
        flagAdmin: req.session.autorizado,
        codLogado: req.session.codLogado
    });
};

module.exports.add_evento = function (app, req, res) {
    var evento = req.body;
    console.log("Evento:", evento);
    console.log("Arquivos recebidos:", req.files);

    // Validação do evento
    req.assert('titulo', 'Título é obrigatório').notEmpty();
    req.assert('descricao', 'Descrição é obrigatória').notEmpty();
    req.assert('data', 'Data é obrigatório').notEmpty();
    req.assert('cidade_endereco', 'Cidade é obrigatória').notEmpty();
    req.assert('numero', 'Número é obrigatória').notEmpty();
    req.assert('rua', 'Rua é obrigatória').notEmpty();
    req.assert('bairro', 'Bairro é obrigatório').notEmpty();
    req.assert('cep', 'CEP é obrigatório').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.render('eventos/add_evento', {
            validacao: erros,
            evento: evento,
            flagAdmin: req.session.autorizado || null,
            codLogado: req.session.codLogado || null
        });
        return;
    }

    var connection = app.config.dbConnection();
    var eventosDAO = new app.app.models.eventosDAO(connection);


    // Salvar o evento
    eventosDAO.salvarEvento(evento, function (error, result) {
        if (error) {
            console.error('Erro ao salvar o evento:', error);
            res.redirect('/add_evento'); // ou alguma página de erro
        } else {
            const codEvento = result.insertId;  // Pega o ID do evento recém-criado

            // Adicionar as imagens do evento na tabela imagens_eventos
            if (req.files && req.files.length > 0) {
                let imagens = req.files;
                imagens.forEach(img => {
                    var imagemEvento = {
                        codEvento: codEvento, // Usando o codEvento retornado
                        imgEvento: img.filename,
                        descricaoImagem: evento.descricaoImagem || ""
                    };
                    console.log("Imagem do evento:", imagemEvento);
                    eventosDAO.salvarImagemEvento(imagemEvento, function (error) {
                        if (error) {
                            console.error('Erro ao salvar imagem do evento:', error);
                        }
                    });
                });
            }

            res.redirect('/eventos'); // Redireciona para a página de eventos
        }
    });
};
