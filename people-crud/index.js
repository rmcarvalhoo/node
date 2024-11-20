const express = require('express');

const server = express();

server.use(express.json()); // faz com que o express entenda JSON

const people = ['Maria', 'Aderson', 'Paulo', 'Jessica'];

server.use((req, res, next) => { // server.use cria o middleware global
  console.time('Request'); // marca o início da requisição
  console.log(`Método: ${req.method}; URL: ${req.url}; `); // retorna qual o método e url foi chamada

  next(); // função que chama as próximas ações 

  console.log('Finalizou'); // será chamado após a requisição ser concluída

  console.timeEnd('Request'); // marca o fim da requisição
});

function checkExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'people name is required' });
    // middleware local que irá checar se a propriedade name foi infomada, 
    // caso negativo, irá retornar um erro 400 - BAD REQUEST 
  }
  return next(); // se o nome for informado corretamente, a função next() chama as próximas ações
} 
  
function checkInArray(req, res, next) {
  const geek = people[req.params.index];
  if (!geek) {
    return res.status(400).json({ error: 'people does not exists' });
  } // checa se o pessoa existe no array, caso negativo informa que o index não existe no array

  req.b = geek;

  return next();
}

server.get('/people', (req, res) => {
  return res.json(people);
}) // rota para listar todos os people

server.get('/people/:index', checkInArray, (req, res) => {
  console.log(req.geek);
  return res.json(req.geek);
})

server.post('/people', checkExists, (req, res) => {
  const { name } = req.body; // assim esperamos buscar o name informado dentro do body da requisição  
  people.push(name);
  return res.json(people); // retorna a informação da variavel people
})

server.put('/people/:index', checkInArray, checkExists, (req, res) => {
  const { index } = req.params; // recupera o index com os dados
  const { name } = req.body;
  people[index] = name; // sobrepõe/edita o index obtido na rota de acordo com o novo valor
  return res.json(people);
}); // retorna novamente os people atualizados após o update

server.delete('/people/:index', checkInArray, (req, res) => {
  const { index } = req.params; // recupera o index com os dados

  people.splice(index, 1); // percorre o vetor até o index selecionado e deleta uma posição no array

  return res.send();
}); // retorna os dados após exclusão


server.listen(3000);