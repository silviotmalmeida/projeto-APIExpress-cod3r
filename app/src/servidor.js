const porta = 3003;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bancoDeDados = require("./bancoDeDados");

const url = 'produtos'

app.use(bodyParser.urlencoded({ extended: true }));

app.get(`/${url}`, (req, res, next) => {
  res.send(bancoDeDados.getProdutos());
});

app.get(`/${url}/:id`, (req, res, next) => {
  res.send(bancoDeDados.getProduto(req.params.id));
});

app.post(`/${url}`, (req, res, next) => {
  const produto = bancoDeDados.salvarProduto({
    nome: req.body.nome,
    preco: req.body.preco,
  });
  console.log(produto);
  res.send(produto); // JSON
});

app.put(`/${url}/:id`, (req, res, next) => {
  const produto = bancoDeDados.salvarProduto({
    id: req.params.id,
    nome: req.body.nome,
    preco: req.body.preco,
  });
  res.send(produto); // JSON
});

app.delete(`/${url}/:id`, (req, res, next) => {
  const produto = bancoDeDados.excluirProduto(req.params.id);
  res.send(produto); // JSON
});

app.listen(porta, () => {
  console.log(`Servidor está executando na porta ${porta}.`);
  console.log(`A requisição deverá ser feita na url http://localhost:${porta}/${url}`);
  console.log(
    "Os atributos dos produtos a serem cadastrados são: nome e preco."
  );
});
