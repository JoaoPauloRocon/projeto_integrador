module.exports = function(app){
    app.get('/login', function(req, res){
        app.app.controllers.login.login_usuario(app, req, res)
        console.log("to aqui na rota")
    })
}