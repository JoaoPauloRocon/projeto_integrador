function eventosDAO(connection) {
    this._connection = connection;
}

eventosDAO.prototype.salvarUsuario = function (usuario, callback) {
    console.log(usuario)
    console.log("to aq no DAO")
    this._connection.query("INSERT INTO usuario SET ? ", usuario, callback)
};

eventosDAO.prototype.getUsuarioEmail = function (email, callback) {
    this._connection.query("SELECT * FROM usuario WHERE email = ?", [email], callback);
};

eventosDAO.prototype.getLogin = function (campusDeUsuario, callback) {
    this._connection.query("SELECT codUsuario FROM usuario WHERE email = '" + campusDeUsuario.email + "'AND senha ='" + campusDeUsuario.senha + "'", callback)
};

eventosDAO.prototype.getLoginAdm = function (campusDeUsuario, callback) {
    this._connection.query("SELECT codAdmin FROM admin WHERE email = '" + campusDeUsuario.email + "'AND senha ='" + campusDeUsuario.senha + "'", callback)
};

eventosDAO.prototype.getUsuarioById = function (id, callback) {
    this._connection.query("SELECT * FROM usuario WHERE codUsuario = ?", [id], callback);
};

eventosDAO.prototype.getAdminById = function (id, callback) {
    this._connection.query("SELECT * FROM admin WHERE codAdmin = ?", [id], callback);
};

eventosDAO.prototype.salvarGaleria = function (galeria, callback) {
    this._connection.query("INSERT INTO galeria SET ? ", galeria, callback)
};

eventosDAO.prototype.getGaleria = function (callback) {
    this._connection.query("SELECT * FROM galeria", callback);
};


module.exports = function () {
    return eventosDAO;
}