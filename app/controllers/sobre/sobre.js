module.exports.renderiza_sobre = function(app, req, res) {
    res.render("sobre/sobre", { flagAdmin: req.session.autorizado || null, codLogado: req.session.codLogado || null });
};
