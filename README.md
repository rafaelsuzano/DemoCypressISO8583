

# API de Pagamento e ISO 8583

Este projeto é uma API RESTful de simulação de transações de pagamento. Ele foi desenvolvido em **Node.js** com **Express.js** e incorpora validações essenciais de cartão de crédito, como o **Algoritmo de Luhn** e a verificação de **data de expiração**.

A aplicação também inclui um conjunto de testes automatizados com **Cypress**, que valida o comportamento da API em diversos cenários, seguindo as regras básicas do padrão **ISO 8583**.

-----

## 🚀 Como Rodar o Projeto

Siga estas instruções para configurar e executar a aplicação localmente.

### Pré-requisitos

  * **Node.js**
  * **npm** ou **yarn**

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/rafaelsuzano/DemoCypressISO8583.git
    cd DemoCypressISO8583
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```

### Execução

Para iniciar o servidor da API, execute o seguinte comando:

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`.

-----

## 📌 Endpoints da API

A API expõe o seguinte endpoint para processamento de pagamentos.

### `POST /payment`

Processa uma transação de pagamento.

**Corpo da Requisição:**

```json
{
  "cardNumber": "string",       // Número do cartão (13 a 19 dígitos)
  "expiryMonth": "number",      // Mês de expiração (1-12)
  "expiryYear": "number",       // Ano de expiração (ano atual ou futuro)
  "amount": "number"            // Valor da transação
}
```

**Respostas:**

  * **`200 OK`**: Pagamento processado com sucesso.
  * **`400 Bad Request`**: Dados de pagamento inválidos ou incompletos.

-----

## 🧪 Testes Automatizados com Cypress

O projeto inclui testes de API que validam todos os cenários de pagamento definidos em um arquivo de fixture.

### Como Rodar os Testes

1.  Certifique-se de que o servidor da API está rodando (`npm start`).
2.  Inicie o Cypress em modo interativo:
    ```bash
    npx cypress open
    ```
3.  Na interface do Cypress, clique no arquivo de teste `apiPayment.cy.js` para executar os testes.

### Estrutura dos Testes

Os testes usam um **arquivo de fixture (`cypress/fixtures/paymentData.json`)** para cobrir os seguintes cenários:

  * Pagamento válido.
  * Número de cartão com falha no **Algoritmo de Luhn**.
  * Número de cartão com formato inválido.
  * Cartão expirado (verificação por mês e ano).
  * Dados de requisição incompletos.

-----

## 🛠️ Tecnologias Utilizadas

  * **Node.js**: Ambiente de execução JavaScript.
  * **Express.js**: Framework para construção da API.
  * **`body-parser`**: Middleware para processar o corpo das requisições JSON.
  * **Cypress**: Framework de testes end-to-end.
  * **`cypress-plugin-api`**: Plugin para otimizar os testes de API.

-----

Se precisar de ajuda para ajustar o código ou para qualquer outra coisa, é só me avisar.
