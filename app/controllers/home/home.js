module.exports.renderiza_home = function(app, req, res) {
    console.log('Session Data:', req.session);
    console.log('flagAdmin:', req.session.autorizado);
    console.log('codLogado:', req.session.codLogado);
    res.render("home/home", { flagAdmin: req.session.autorizado || null, codLogado: req.session.codLogado || null });
};
