# Testes de interface com Cypress 14 para DOT

Este projeto contém testes automatizados de interface utilizando o **Cypress** para verificar a funcionalidade de cadastro de usuários no sistema.
Este projeto foi feito usando um site de teste disponivel para a comunidade de testes utilizar a fins de estudo. Segue o link:
https://opensource-demo.orangehrmlive.com/

## Pré-requisitos

Antes de executar os testes, verifique se você tem as seguintes ferramentas instaladas:

- **Node.js** (você pode verificar se o Node.js está instalado no seu sistema executando `node -v` no terminal)
- **npm** (gerenciador de pacotes para Node.js)

Se você não tiver o Node.js, pode baixar e instalar a partir de [nodejs.org](https://nodejs.org/).

## Instalação

1. Clone o repositório do projeto para a sua máquina local (branch master):
    ```bash
    git clone https://github.com/Deividcl/TesteDot.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd nome-do-repositorio
    ```
3. Instale as dependências do projeto:
    ```bash
    npm install
    ```
    Isso irá instalar o Cypress e todas as dependências necessárias.

    **Caso seja necessário, instale o faker:**
    ```bash
    npm install faker --save-dev
    ```
    E instale o dotenv
    ```bash
    npm install dotenv --save
    ```

## Executando os Testes
1. Para executar os testes com o Cypress, use o seguinte comando:
    ```bash
    npx cypress open
    ```
    Esse comando abrirá a interface gráfica do Cypress. Nela, você pode selecionar o arquivo de teste que deseja rodar.

2. Caso queira rodar os testes diretamente no terminal, sem a interface gráfica, você pode usar:
    ```bash
    npx cypress run
    ```
    Esse comando executa todos os testes de forma headless (sem interface gráfica).

## Estrutura de Comandos Customizados
Para facilitar o reuso de código, criei algiuns comandos no arquivo `cypress/support/commands.js` 
Esses comandos são:
- **Login Success** (Executar login com sucesso no sistema)
- **Login Failure** (Executar tentativas de login falhas no sistema e logout após login com sucesso)
- **Seach User** (Buscar usuários fixo no sistema)
- **Register User** (Registrar novo usuário)


A spec possui 3 suites de testes
- **CRUD de registro de usuário** (Está dividida para que todo o CRUD seja executado sem dependencia)
- **Teste de validação de regras** (Está validando algumas regras existentes na tela de cadastro de usuários)
- **Teste de login** (Está validando as interações de login inválidas e logout do sistema com sucesso)

## Para melhorar a legibilidade do código criei o arquivo elements.js e .env

- O arquivo elements possui toda a estrura de mapeamento de elementos disponiveis e utilizaveis no código.
- O arquivo .env é responsável por armazenar os dados de login no sistema


