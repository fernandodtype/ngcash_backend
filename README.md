
# Backend ng_cash

Backend da aplicação para movimentação de valores entre usuáros


## Stack utilizada

**Front-end:** React, Redux, MaterialUI

**Back-end:** Node, Express, TypeORM


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/fernandodtype/ngcash_backend.git
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install -D typescript nodemon ts-node @types/express @types/node 
  npm install express pg typeorm dotenv reflect-metadata validator express-validator 
  npm install bcrypt @types/bcrypt jsonwebtoken @types/jsonwebt
```

Inicie o servidor

```bash
  npm run dev
```




## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

```bash
    DB_PORT (porta do banco de dados)
    DB_HOST (host do banco de dados)
    DB_USERNAME (usuário de acesso ao banco de dados)
    DB_PASSWORD (senha do usuário para acesso ao banco de dados)
    DB_NAME (nome do banco de dados)
    JWT_SALT_ROUNDS (Número de caracteres aleatório para adicionar na senha haseada)
    JWT_HASH (valor de base para hash da senha)
```


## Documentação da API

#### Cadastro de usuário

```http
  POST /singup
```


| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. Nome do usuário que irá utilizar, com no mínimo 3 caracteres |
| `password` | `string` | **Obrigatório**. Senha do usuário, contendo uma letra maiúscula e um número pelo menos |

![singup](src/img/signup.jpg)

#### Login

```http
  POST /signin
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username`      | `string` | **Obrigatório**. Nome do usuário cadastrado |
| `password` | `string` | **Obrigatório**. Senha de cadastro do usuário |

![signin](src/img/signin.jpg)


```http
    GET /user/balance
```

| Parâmetro | Tipo | Descrição |
| :---------| :--- | --------- |
|`token`    |(HEADER) Bearer token authorization | **Obrigatório** Token de autorização obtido no login|

![saldo](src/img/saldo.jpg)

```http
    POST /user/transaction/create
```

| Parâmetro | Tipo | Descrição |
| :---------| :--- | --------- |
|`token`    | (HEADER) Bearer token authorization | **Obrigatório** Token de autorização obtido no login|
|`username` | `string` | **Obrigatório** Nome do usuário, qual será o destino da transação |
|`value` | `number` | **Obrigatório** Valor da trasação a ser realizada |

![transacao](src/img/transacao.jpg)

```http
    POST /user/transactions
```

| Parâmetro | Tipo | Descrição |
| :---------| :--- | --------- |
|`token`    | (HEADER) Bearer token authorization | **Obrigatório** Token de autorização obtido no login|
|`date` | `string` | Data no formato DD/MM/AAAA para fazer filtragem |
|`typeTransaction` | `string` | Tipo de transação a ser filtrada, "cash-out" para saídas ou "cash-in" para entradas |

![transacoes](src/img/transacoes.jpg)