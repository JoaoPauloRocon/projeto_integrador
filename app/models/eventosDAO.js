function eventosDAO(connection) {
    this._connection = connection;
}

eventosDAO.prototype.salvarUsuario = function (usuario, callback) {
    console.log(usuario)
    console.log("to aq no DAO")
    this._connection.query("INSERT INTO usuario SET ? ", usuario, callback)
};

module.exports = function () {
    return eventosDAO;
}