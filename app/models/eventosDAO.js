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

eventosDAO.prototype.getEventos = function (callback) {
    this._connection.query('SELECT * FROM eventos', callback);
};

eventosDAO.prototype.salvarEvento = function (evento, callback) {
    console.log(evento)
    this._connection.query(
        'INSERT INTO eventos (tituloEvento, descricaoEvento, dataEvento, cidade, rua, numero, bairro, cep, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            evento.titulo,
            evento.descricao,
            evento.data,
            evento.cidade_endereco,
            evento.rua,               
            evento.numero,            
            evento.bairro,                 
            evento.cep,
            evento.estado               
        ],
        callback
    );
};

eventosDAO.prototype.salvarImagemEvento = function (imagemEvento, callback) {
    console.log(imagemEvento)
    this._connection.query('INSERT INTO imagens_eventos (codEvento, imgEvento, descricaoImagem) VALUES (?, ?, ?)',
        [imagemEvento.codEvento, imagemEvento.imgEvento, imagemEvento.descricaoImagem], callback);
};


eventosDAO.prototype.getImagensByEvento = function (codEvento, callback) {
    this._connection.query('SELECT * FROM imagens_eventos WHERE codEvento = ?', [codEvento], callback);
};

eventosDAO.prototype.deletarImagensDoEvento = function (codEvento, callback) {
    this._connection.query('DELETE FROM imagens_eventos WHERE codEvento = ?', [codEvento], callback);
};

// Função para deletar o evento pelo ID
eventosDAO.prototype.deleteEventoById = function (codEvento, callback) {
    this._connection.query('DELETE FROM eventos WHERE codEvento = ?', [codEvento], callback);
};

eventosDAO.prototype.getEventos = function (callback) {
    const sql = `
        SELECT e.codEvento, e.tituloEvento, e.descricaoEvento, e.dataEvento, e.cidade, e.rua, e.numero, e.bairro, e.cep, e.estado 
        FROM eventos e
        LEFT JOIN imagens_eventos i ON e.codEvento = i.codEvento
        GROUP BY e.codEvento, e.tituloEvento, e.descricaoEvento, e.dataEvento, e.cidade
        ORDER BY e.dataEvento DESC, e.cidade ASC
    `;
    this._connection.query(sql, callback);
};


eventosDAO.prototype.getEventoById = function (id, callback) {
    const sql = `
        SELECT e.*, i.imgEvento
        FROM eventos e
        LEFT JOIN imagens_eventos i ON e.codEvento = i.codEvento
        WHERE e.codEvento = ?
    `;
    this._connection.query(sql, [id], callback);
};

eventosDAO.prototype.getTodosUsuarios = function (callback) {
    this._connection.query("SELECT email FROM usuario", callback);
};

eventosDAO.prototype.buscarEventosEntreDatas = function (dataInicio, dataFim, callback) {
    const sql = `
        SELECT * FROM eventos 
        WHERE dataEvento BETWEEN ? AND ?
        ORDER BY dataEvento ASC
    `;

    this._connection.query(sql, [dataInicio, dataFim], callback);
};

module.exports = function () {
    return eventosDAO;
}