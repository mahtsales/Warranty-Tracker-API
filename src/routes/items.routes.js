const express = require("express"); //importa o express
const router = express.Router(); //cria um 'mini app'de rotas 

const { listItems } = require("../controllers/items.controllers.js"); //importa a function do controller
// as chaves {} significam: pegar somente a função listItems que foi exportada
router.get("/", listItems); //quando chegar GET dessa raiz -->  chama listItems

module.exports = router; //exporta o router para ser usado no server.js