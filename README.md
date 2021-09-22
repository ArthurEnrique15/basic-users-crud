# CRUD básico de usuários e categorias

## Passo a passo para instalação das bibliotecas necessárias para rodar uma aplicação em nodeJS

</br>

<p align="center">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />

<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />

</p>

## Instalação das bibliotecas iniciais

Para executar os comandos a seguir é necessário ter o yarn instalado na máquina. Também é possível realizar a instalação das bibliotecas com o npm.

Lista de comandos iniciais:

```
yarn init -y

yarn add express

yarn add @types/express -D

yarn add typescript -D

yarn tsc --init

yarn add ts-node-dev -D

yarn add typeorm reflect-metadata

yarn add pg

yarn add tsyringe

yarn add uuid

yarn add @types/uuid -D
```

A configuração do **eslint** e do **prettier** para padronização de código e correção automática pode ser feita seguindo o passo a passo presente [neste link](https://www.notion.so/ESLint-e-Prettier-Trilha-Node-js-d3f3ef576e7f45dfbbde5c25fa662779#eaf6e8bdcabc4d809cdae302e29750da). Basta executar os comandos para instalar as bibliotecas e em seguida copiar os arquivos **.editorconfig**, **.eslintignor**e, **.eslint.json** e **prettier.config.js** desse projeto.

## Modificações no arquivo package.json

Adicionar o seguinte código no arquivo package.json, após "license":
```json
"scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules --respawn src/server.ts",
    "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli"
},
```

Esse código define alguns comandos que serão executados ao longo do desenvolvimento.

## Modificações no arquivo tsconfig.json

Deixar comentada a seguinte linha (desabilita a checagem estrita de tipos):
```json
"strict": true,
```

Descomentar as seguintes linhas (necessário para fazer o typeorm funcionar):
```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

## Docker, docker-compose e banco de dados

Para o banco de dados, iremos utilizar o **typeorm** e o **postgres**.

As configurações do typeorm estão no arquivo **ormconfig.json**, e as configurações dos dois containers (container do banco e da aplicação) estão no arquivo **docker-compose.yml**, então basta copiar tais arquivos e alterá-los de acordo com suas necessidades.

O arquivo **Dockerfile** também contém configurações do docker, então copie ele também.

A conexão com o banco de dados é feita pelo arquivo **/database/index.ts**.




## Upload de arquivo

## Testes unitários e de integração

## Documentação com swaggerUI

## injeção de dependência com tsyringe



