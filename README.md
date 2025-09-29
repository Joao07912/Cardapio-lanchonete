# Cardápio da Lanchonete

Sistema web para visualização de cardápio e realização de pedidos online.

## Funcionalidades

- Listagem de itens do cardápio por categoria (lanches, bebidas, doces)
- Busca de itens por nome
- Filtro por categoria
- Carrinho de compras com subtotais
- Envio de pedidos com nome do cliente e observações
- Interface responsiva

## Tecnologias

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Armazenamento**: Arquivos JSON

## Dependências

- Node.js (versão 14 ou superior)
- npm

## Instalação e Execução

### 1. Instalar dependências do backend

```bash
cd backend
npm install
```

### 2. Iniciar o servidor backend

```bash
npm start
```

O servidor será executado na porta 3000.

### 3. Abrir o frontend

Abra o arquivo `frontend/index.html` em um navegador web.

## Estrutura do Projeto

```
problema1_cardapio/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── cardapio.json
│   └── pedidos.json
└── README.md
```

## API Endpoints

- `GET /cardapio` - Retorna todos os itens do cardápio
- `POST /pedidos` - Cria um novo pedido

## Dados de Exemplo

O cardápio inclui:
- **Lanches**: X-Burger, X-Salada, X-Bacon
- **Bebidas**: Coca-Cola, Suco de Laranja, Água
- **Doces**: Brigadeiro, Pudim

Os pedidos são salvos no arquivo `backend/pedidos.json` com as seguintes informações:
- ID do pedido
- Nome do cliente
- Observações
- Itens do pedido
- Total
- Data/hora do pedido