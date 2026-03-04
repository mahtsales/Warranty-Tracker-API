const { Pool } = require("pg"); //importa o Pool da biblioteca pg
const pool = new Pool({ // pool = gerenciador de conexões (reaproveita conexões, evita abrir/fechar toda hora)
  connectionString: process.env.DATABASE_URL,  
}); //cria o pool utilizando a URL do .env

module.exports = pool; //exporta o pool para outros arquivos usarem