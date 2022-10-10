const express = require('express')
const router = express.Router()

const AutoavaliacaoController = require('../controllers/AutoavaliacaoController')

router.get('/autoavaliacao', AutoavaliacaoController.autoavaliacao)
router.get('/', AutoavaliacaoController.showAutoavaliacao)

router.get('/testeAnsiedade', AutoavaliacaoController.testeAnsiedade)
router.get('/', AutoavaliacaoController.showTesteAnsiedade)

router.get('/testeDepressao', AutoavaliacaoController.testeDepressao)
router.get('/', AutoavaliacaoController.showTesteDepressao)

router.get('/testeEstresse', AutoavaliacaoController.testeEstresse)
router.get('/', AutoavaliacaoController.showTesteEstresse)

module.exports = router