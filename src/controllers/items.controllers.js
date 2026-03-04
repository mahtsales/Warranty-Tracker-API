const db = require("../db"); //pegando o que foi exportado em src/db/index.js

async function listItems(req, res) { //função que "espera" resultado
    try { //req = o que o cliente mandou // res = o que vai ser devolvido
        const result = await db.query("SELECT * FROM items ORDER BY created_at DESC"); //manda um SQL pro postgres
        return res.json(result.rows); //'await' = espera o postgres responder
        //'return.rows'= as linhas sao retornadas (array de objetos) //'res.json' = devolve isso como JSON para o cliente
    } catch (err) {
    console.error(err); //mostra o erro no terminal
        return res.status(500).json({ error: "Erro ao buscar itens" }); //erro interno do servidor (padrao HTTP)
    } //'.json'= cliente entende o que houve (de forma controlada)
}

module.exports = { listItems }; //a rota vai importar essa função