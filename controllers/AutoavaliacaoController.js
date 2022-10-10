const { autoavaliacao } = require('../routes/autoavaliacaoRoutes')

module.exports = class AutoavaliacaoController{
    static async showAutoavaliacao(req,res){
        res.render('autoavaliacao/home')
    }

    static async autoavaliacao(req,res){

        res.render('autoavaliacao/home',{ autoavaliacao })

    }

    static async showTesteAnsiedade(req,res){
        res.render('autoavaliacao/testeAnsiedade')
    }

    static async testeAnsiedade(req,res){

        res.render('autoavaliacao/testeAnsiedade',{ autoavaliacao })

    }

    static async showTesteDepressao(req,res){
        res.render('autoavaliacao/testeDepressao')
    }

    static async testeDepressao(req,res){

        res.render('autoavaliacao/testeDepressao',{ autoavaliacao })

    }

    static async showTesteEstresse(req,res){
        res.render('autoavaliacao/testeEstresse')
    }

    static async testeEstresse(req,res){

        res.render('autoavaliacao/testeEstresse',{ autoavaliacao })

    }



}