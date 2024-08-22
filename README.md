# brisa

Criar a api (node.js) e fazer definições globais que serão utilizadas no futuro.

- rastreamento de rotas (express),
- estilização de código (eslint),
- padronização fileNames (camelCase).

## Requisitos de projeto

1. docker cli
2. um banco mongodb configurado nas variáveis em `docker-compose.yml`
3. é necessário ter o banco relacional (postgresql) configurado para receber
   conexões externas (além do endereço de localhost).

## Para rodar o projeto

Inicie executando o comando `docker network create backend`, em seguida rode
`docker-compose up` para iniciar o container em modo de debug do projeto.

Para rodar o frontend, encaminhe para a pasta respectiva e execute `npm install`
e `npm start` para executar o vite em modo de debug.
