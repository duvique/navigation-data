## 💻 Captura de dados de navegação

O projeto possui dois componentes principais:
* __Api__ - responsável por disponibilizar endpoints de CRUD de dados de navegação utilizando `mongodb`
* __Script de captação__ - quando adicionado em uma página, registra todas mudanças de rotas do usuário através do evento nativo `onLoad`

Tecnologias utilizadas
- Script: `javascript vanilla`
- Api: `typescript`, `nodeJs`, `express`
- Banco de dados: `MongoDB` (Cluster do MongoDB Atlas, logo, as informações necessárias para acesso são específicas)

## Script de captação de dados

Branch: `main`

O script atualmente possui as seguintes informações hard-coded:
* Url da api - o valor atual é de `http://localhost:3005`, que é a url default da API caso não seja modificada a porta no `.env` do projeto
* Token da api - o valor atual é de  `a4f58ef4-2abb-46b6-ba56-740d63498d53`, é o token utilizado pela api para autenticar requests, informado no `.env` do projeto da api
 
__Caso modifique os valores padrão, altere essas informações de acordo dentro do script__

O script, ao ser adicionado nas páginas alvo, realizará a captação das mudanças de rotas através do método onLoad como citado anteriormente, utilizando `cookies` para armazenar sessoes e hashs do usuário utilizador com id's genéricos.


## Api

Branch: `api`

Para rodar a API é necessário seguir os seguintes passos:


1. Instalar as dependências do node com um dos comandos abaixo de acordo com seu gerenciador de pacotes:
  * ```
    npm install
    yarn
    ```

2. Será necessário remover o `.example` do arquivo `.env.example` que é possui o modelo das variáveis necessárias para o funcionamento da API, preencha com as informações necessárias


   `Obs: 📧 - dependendo do caso as informações citadas terão sido enviadas via e-mail :D`



3. Executar a API utilizando o comando:
* ```
  npm run dev
  ```

4. A API estará rodando na url `localhost:PORT`, onde `PORT` é o valor definido no `.env` ou `3005` como padrão


## Script de testes - Postman workspace

Link: https://www.postman.com/duvique/workspace/dados-de-navegao

É necessário modificar o valor das variáveis dentro de `Environments` no environment global `Globals`:
* __dev__ --> link da API, normalmente `http://localhost:PORT` ou apenas `localhost:PORT` dependendo da sua versão do postman
* __api_token__ --> Token da API utilizado no middleware de autenticação, o mesmo informado no `.env`
