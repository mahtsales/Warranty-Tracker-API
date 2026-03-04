require("dotenv").config(); // carrega as variáveis para dentro do node, sem isso, process.env.PORT n iria exisitr
const express = require("express"); // importa o express (library do servidor)
const itemsRoutes = require("./routes/items.routes"); //carrega o "pacote de rotas" dos items

const app = express(); //cria o "app" express (seu servidor)
app.use(express.json()); //diz pro express: quando chegar requisição com JSON, converte para objeto JS
//essencial para POST/PUT com body
app.use("/items", itemsRoutes); //traduzindo: tudo que estiver na itemsRoutes, vai começar com /items

app.get("/health", (req, res) => { //cria uma rota GET na url (health) //req (o que chega no cliente) //res (o que devolve)
  res.json({ ok: true, message: "API rodando" }); //responde em JSON, facilitando em testes.
});

const PORT = process.env.PORT || 3000; //tenta porta do .env || se não tiver, usa 3000 padrão
app.listen(PORT, () => console.log(`🔥 Server on http://localhost:${PORT}`));
//"liga" o servidor na porta escolhida, realizando um callback (imprime a mensagem somente quando estiver rodando)