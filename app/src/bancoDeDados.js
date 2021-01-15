//módulo que simula um banco de dados

//objeto responsável por gerenciar o id autoincrementável
const sequence = {
  //notação de atributo privado
  _id: 1,

  //implementação do método get
  //acessível através de sequence.id
  get id() {
    return this._id++;
  },
};

//inicializando o banco zerado
const produtos = {};

//função responsável pelo insert ou update do produto
function salvarProduto(produto) {
  //se o id não estiver setado, ativa o auto incremento do id
  if (!produto.id) produto.id = sequence.id;

  //inserindo ou atualizando o registro da posição referente ao id
  produtos[produto.id] = produto;

  //retornando o registro atualizado
  return produto;
}

//função responsável pela consulta de um produto pelo id
function getProduto(id) {
  //se o id estiver setado, retorna o referido registro,
  //senão retorna um objeto vazio
  return produtos[id] || {};
}

//função responsável por retornar a lista completa de produtos
function getProdutos() {
  //retornando os valores dos produtos
  return Object.values(produtos);
}

//função responsável por apagar um produto pelo id
function excluirProduto(id) {
  //obtendo o produto selecionado
  const produto = produtos[id];

  //apagando o registro da posição referente ao id
  delete produtos[id];

  //retornando o registro apagado
  return produto;
}

//exportando as funções para utilização por outros módulos
module.exports = { salvarProduto, getProduto, getProdutos, excluirProduto };
