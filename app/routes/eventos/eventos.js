module.exports = function (app) {

    // Rota para renderizar a galeria de eventos
    app.get('/eventos', (req, res) => {
        app.app.controllers.eventos.eventos.renderiza_eventos(app, req, res);
    });

    // Rota para renderizar a página de adicionar evento
    app.get('/add_evento', (req, res) => {
        app.app.controllers.eventos.eventos.renderiza_add_evento(app, req, res);
    });

    // Rota para salvar o evento, incluindo imagens
    app.post('/salva_evento', app.upload.array('imagens'), (req, res) => {
        app.app.controllers.eventos.eventos.add_evento(app, req, res);
    });

    // Rota para detalhes do evento
    app.get('/evento_detalhe/:id', (req, res) => {
        app.app.controllers.eventos.eventos.detalha_evento(app, req, res);
    });

    // Rota para deletar evento
    app.get('/deletar_evento/:id', (req, res) => {
        console.log(res)
        app.app.controllers.eventos.eventos.deleta_evento(app, req, res);
    });

    // Rota para renderizar a página de edição do evento
    app.get('/editarEvento/:id', (req, res) => {
        app.app.controllers.eventos.eventos.renderiza_editar_evento(app, req, res);
    });

    app.post('/atualizar_evento/:id', app.upload.array('imagens'), (req, res) => {
        app.app.controllers.eventos.eventos.atualizar_evento(app, req, res);
    });

    app.get('/deletar_imagem/:codEvento/:nomeImagem', (req, res) => {
        app.app.controllers.eventos.eventos.deletar_imagem_evento(app, req, res);
    });

};
