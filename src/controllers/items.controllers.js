const db = require("../db"); //pegando o que foi exportado em src/db/index.js

//-------------------CRIANDO GET (BUSCAR ITENS)---------------------------------
async function listItems(req, res) { //função que "espera" resultado -- buscar os items
    try { //req = o que o cliente mandou // res = o que vai ser devolvido
        const result = await db.query("SELECT * FROM items ORDER BY created_at DESC"); //manda um SQL pro postgres
        return res.json(result.rows); //'await' = espera o postgres responder
        //'return.rows'= as linhas sao retornadas (array de objetos) //'res.json' = devolve isso como JSON para o cliente
    } catch (err) {
        console.error(err); //mostra o erro no terminal
        return res.status(500).json({ error: "Erro ao buscar itens" }); //erro interno do servidor (padrao HTTP)
    } //'.json'= cliente entende o que houve (de forma controlada)
}

//-------------------CRIANDO POST (CRIAR ITENS)---------------------------------
async function createItems(req, res) { //função que "espera" resultado -- criar os items
    console.log("BODY RECEBIDO:", req.body)
    const { name, category, purchase_date, warranty_end, notes } = req.body; // req.body é o JSON que o cliente mandou 
// as {} fazem destructuring (desempacotamento): pegam campos especificos
    if (!name || !category || !purchase_date || !warranty_end) {
        return  res.status(400).json({ erro: "Campos obrigatórios: name, category, purchase_date, warranty_end" })
    }
    try {
        const query = `
        INSERT INTO items (name, category, purchase_date, warranty_end, notes)
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *;
    `;

    const values = [name, category, purchase_date, warranty_end, notes ?? null];
    //se notes vier undefined, vira null (para não gerar problema na query)

    const result = await db.query(query, values); //manda um SQL pro postgres
    return res.status(201).json(result.rows[0]); //status 'criado com sucesso'
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao criar itens"});
    }
}

module.exports = { listItems, createItems }; //a rota vai importar essa(s) função(ões)