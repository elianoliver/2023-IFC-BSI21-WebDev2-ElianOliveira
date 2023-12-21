# Projeto de Desenvolvimento Web 2 - Aplicativo de Tarefas com React, TypeScript e SQLite3

Bem-vindo ao meu projeto de Desenvolvimento Web 2! Este é um aplicativo de lista de tarefas desenvolvido utilizando React, TypeScript e SQLite3. Aqui estão as informações essenciais para entender e executar o projeto:

## Requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript.
- [npm](https://www.npmjs.com/) - Gerenciador de pacotes do Node.js.
- [SQLite3](https://www.sqlite.org/) - Sistema de gerenciamento de banco de dados.

## Configuração

1. Clone o repositório para o seu ambiente local:

   ```bash
   git clone https://seu-repositorio.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd nome-do-projeto
   ```

1. Instale as dependências no Cliente (pasta `client/`):

   ```bash
   cd client
   npm install
   ```

1. Instale as dependências no Servidor (pasta `server/`):

   ```bash
   cd server
   npm install
   ```

3. Inicie o Cliente:

   ```bash
   cd client
   npm start
   ```

4. Inicie o Servidor:

   ```bash
   cd server
   npm start
   ```

Agora, o aplicativo estará em execução localmente em `http://localhost:3000/`.

## Funcionalidades

- Adicionar, remover e editar tarefas.
- Persistência de dados usando SQLite3.
- Interface amigável e responsiva.

## Funcionalidade Adicionada

- Horário de Criação:
    - Agora, ao lado de cada tarefa na lista, é exibido o horário em que a tarefa foi criada.