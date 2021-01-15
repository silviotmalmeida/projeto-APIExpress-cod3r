//módulo principal do app

//definindo a porta
const porta = 3003;

//definindo a url principal
const url = "produtos";

//importando o express
//responsável por criar o servidor web
const express = require("express");

//iniciando o servidor web
const app = express();

//importando o body-parser
//responsável por tratar o body da requisição
const bodyParser = require("body-parser");

//importando o banco de dados simulado
const bancoDeDados = require("./bancoDeDados");

app.use(bodyParser.urlencoded({ extended: true }));

//implementando o método GET (consultar)
//a resposta será formatada em um JSON
app.get(`/${url}`, (req, res) => {
  //respondendo com todos os registros do banco de dados
  res.send(bancoDeDados.getProdutos());
});

//implementando o método GET (consultar) com um filtro :id
//a resposta será formatada em um JSON
app.get(`/${url}/:id`, (req, res) => {
  //respondendo com o registro referente ao id informado na request
  res.send(bancoDeDados.getProduto(req.params.id));
});

//implementando o método POST (incluir)
//a resposta será formatada em um JSON
app.post(`/${url}`, (req, res, next) => {
  //criando o novo objeto com os dados dos parâmetros inserido no body da requisição
  const produto = bancoDeDados.salvarProduto({
    nome: req.body.nome,
    preco: req.body.preco,
  });

  //respondendo com o registro criado
  res.send(produto);
});

//implementando o método PUT (editar) com um filtro :id
//a resposta será formatada em um JSON
app.put(`/${url}/:id`, (req, res, next) => {
  //editando o objeto com os dados dos parâmetros inserido no body da requisição
  //a partir do id informado na request
  const produto = bancoDeDados.salvarProduto({
    id: req.params.id,
    nome: req.body.nome,
    preco: req.body.preco,
  });

  //respondendo com o registro editado
  res.send(produto);
});

//implementando o método DELETE (apagar) com um filtro :id
//a resposta será formatada em um JSON
app.delete(`/${url}/:id`, (req, res, next) => {
  //apagando o registro referente ao id informado na request
  const produto = bancoDeDados.excluirProduto(req.params.id);

  //respondendo com o registro apagado
  res.send(produto);
});

//configurando o servidor para escutar a porta pré-definida
app.listen(porta, () => {
  //enviando mensagens pelo terminal
  console.log(`Servidor está executando na porta ${porta}.`);
  console.log(
    `A requisição deverá ser feita na url http://localhost:${porta}/${url}`
  );
  console.log(
    "Os atributos dos produtos a serem cadastrados são: nome e preco."
  );
});
