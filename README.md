# Cardápio da Lanchonete

Sistema web completo para visualização de cardápio e realização de pedidos online com interface responsiva.

## Funcionalidades

- Listagem de itens do cardápio por categoria (lanches, bebidas, doces)
- Busca de itens por nome em tempo real
- Filtro por categoria
- Carrinho de compras com cálculo automático de subtotais
- Interface responsiva (desktop e mobile)
- Envio de pedidos com nome do cliente e observações
- Design moderno com drawer mobile para o carrinho

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Armazenamento**: Arquivos JSON
- **API**: REST API com CORS configurado

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes)
- Navegador web moderno

## Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/Joao07912/cardapio-lanchonete.git
cd cardapio-lanchonete
```

### 2. Instalar dependências do backend
```bash
cd backend
npm install
```

### 3. Iniciar o servidor backend
```bash
npm start
```
**Servidor rodando em:** http://localhost:3000

### 4. Abrir o frontend
Abra o arquivo `frontend/index.html` em um navegador web ou use um servidor local:
```bash
# Opção 1: Abrir diretamente
# Clique duas vezes em frontend/index.html

# Opção 2: Servidor local (recomendado)
cd ../frontend
python -m http.server 5500
# Acesse: http://localhost:5500
```

## Estrutura do Projeto

```
cardapio-lanchonete/
├── frontend/                    # Interface do usuário
│   ├── index.html              # Página principal
│   ├── style.css               # Estilos responsivos
│   └── app.js                  # Lógica do frontend
├── backend/                     # Servidor API
│   ├── server.js               # Servidor Express
│   ├── package.json            # Dependências Node.js
│   ├── cardapio.json           # Dados do cardápio
│   └── pedidos.json            # Pedidos realizados
├── .gitignore                  # Arquivos ignorados pelo Git
└── README.md                   # Documentação
```

## API Endpoints

| Método | Endpoint | Descrição | Parâmetros |
|--------|----------|-----------|------------|
| `GET` | `/cardapio` | Retorna todos os itens do cardápio | - |
| `POST` | `/pedidos` | Cria um novo pedido | `{ cliente, observacoes, itens, total }` |

### Exemplo de Requisição POST /pedidos:
```json
{
  "cliente": "João Silva",
  "observacoes": "Sem cebola no X-Burger",
  "itens": [
    { "id": 1, "nome": "X-Burger", "preco": 15.90, "quantidade": 2 }
  ],
  "total": 31.80
}
```

## Dados do Cardápio

### Lanches
- **X-Burger** - R$ 15,90
- **X-Salada** - R$ 17,90  
- **X-Bacon** - R$ 19,90

### Bebidas
- **Coca-Cola** - R$ 5,00
- **Suco de Laranja** - R$ 7,00
- **Água** - R$ 3,00

### Doces
- **Brigadeiro** - R$ 4,00
- **Pudim** - R$ 8,00

## Armazenamento de Dados

Os pedidos são salvos automaticamente em `backend/pedidos.json` com:
- ID único do pedido
- Nome do cliente
- Observações especiais
- Lista de itens pedidos
- Valor total
- Data e hora do pedido

## Funcionalidades Técnicas

- **CORS configurado** para desenvolvimento local
- **Validação de dados** no backend
- **Interface responsiva** com CSS Grid e Flexbox
- **Carrinho persistente** durante a sessão
- **Drawer mobile** para melhor UX em dispositivos móveis
- **Cálculos automáticos** de subtotais e total

## Deploy

Para deploy em produção:
1. Configure as variáveis de ambiente
2. Ajuste a URL da API no frontend
3. Use um servidor web para servir os arquivos estáticos
4. Configure HTTPS para segurança

## Compatibilidade

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Dispositivos móveis (iOS/Android)