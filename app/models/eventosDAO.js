function eventosDAO(connection) {
    this._connection = connection;
}

eventosDAO.prototype.salvarUsuario = function (usuario, callback) {
    console.log(usuario)
    console.log("to aq no DAO")
    this._connection.query("INSERT INTO usuario SET ? ", usuario, callback)
};

eventosDAO.prototype.getLogin = function (campusDeUsuario, callback) {
    this._connection.query("SELECT codUsuario FROM usuario WHERE email = '" + campusDeUsuario.email + "'AND senha ='" + campusDeUsuario.senha + "'", callback)
};

eventosDAO.prototype.getLoginAdm = function (campusDeUsuario, callback) {
    this._connection.query("SELECT codAdmin FROM admin WHERE email = '" + campusDeUsuario.email + "'AND senha ='" + campusDeUsuario.senha + "'", callback)
};

module.exports = function () {
    return eventosDAO;
}