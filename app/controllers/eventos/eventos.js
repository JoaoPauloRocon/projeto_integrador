module.exports.deleta_evento = function (app, req, res) {
    var connection = app.config.dbConnection();
    var eventosDAO = new app.app.models.eventosDAO(connection);
    var id = req.params.id;

    // Primeiro, deletar as imagens associadas ao evento
    eventosDAO.deletarImagensDoEvento(id, function (error) {
        if (error) {
            console.error('Erro ao deletar imagens do evento:', error);
            res.status(500).send('Erro ao deletar imagens do evento');
        } else {
            // Depois, deletar o evento
            eventosDAO.deleteEventoById(id, function (error, result) {
                if (error) {
                    console.error('Erro ao deletar evento:', error);
                    res.status(500).send('Erro ao deletar evento');
                } else {
                    res.redirect('/eventos'); // Redireciona para a listagem de eventos
                }
            });
        }
    });
};


module.exports.renderiza_eventos = function (app, req, res) {
    var connection = app.config.dbConnection();
    var eventosDAO = new app.app.models.eventosDAO(connection);

    eventosDAO.getEventos(function (error, result) {
        if (error) {
            console.error('Erro ao buscar os eventos:', error);
            return res.status(500).send('Erro ao buscar os eventos');
        }

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
    });
};

module.exports.detalha_evento = function (app, req, res) {
    var connection = app.config.dbConnection();
    var eventosDAO = new app.app.models.eventosDAO(connection);
    var id = req.params.id;

    eventosDAO.getEventoById(id, function (error, result) {
        if (error) {
            console.error('Erro ao buscar o evento:', error);
            return res.status(500).send('Erro ao buscar o evento');
        }

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
    });
};

module.exports.renderiza_add_evento = function (app, req, res) {
    res.render('eventos/add_evento', {
        validacao: [],
        evento: {},
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
    req.assert('numero', 'Número é obrigatório').notEmpty();
    req.assert('rua', 'Rua é obrigatória').notEmpty();
    req.assert('bairro', 'Bairro é obrigatório').notEmpty();
    req.assert('cep', 'CEP é obrigatório').notEmpty();

    var erros = req.validationErrors();
    if (erros) {
        return res.render('eventos/add_evento', {
            validacao: erros,
            evento: evento,
            flagAdmin: req.session.autorizado || null,
            codLogado: req.session.codLogado || null
        });
    }

    var connection = app.config.dbConnection();
    var eventosDAO = new app.app.models.eventosDAO(connection);

    // Salvar o evento
    eventosDAO.salvarEvento(evento, function (error, result) {
        if (error) {
            console.error('Erro ao salvar o evento:', error);
            return res.redirect('/add_evento');
        }

        const codEvento = result.insertId;

        // Adicionar as imagens do evento
        if (req.files && req.files.length > 0) {
            let imagens = req.files;
            imagens.forEach(img => {
                var imagemEvento = {
                    codEvento: codEvento,
                    imgEvento: img.filename,
                    descricaoImagem: evento.descricaoImagem || ""
                };
                eventosDAO.salvarImagemEvento(imagemEvento, function (error) {
                    if (error) {
                        console.error('Erro ao salvar imagem do evento:', error);
                    }
                });
            });
        }

        res.redirect('/eventos');
    });
};
