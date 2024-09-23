module.exports = function(app) {
    app.get('/galeria', (req, res) => {
        app.app.controllers.galeria.galeria.renderiza_galeria(app,req, res)
    });

    app.get('/add_galeria', (req, res) => {
        app.app.controllers.galeria.galeria.renderiza_add_galeria(app,req, res)
    });

    app.post('/salva_galeria',app.upload.single("img"), function(req, res){
        app.app.controllers.galeria.galeria.add_galeria(app, req, res);
    })
};

