const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rota para obter cardápio
app.get('/cardapio', (req, res) => {
  try {
    const cardapio = JSON.parse(fs.readFileSync(path.join(__dirname, 'cardapio.json'), 'utf8'));
    res.json(cardapio);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar cardápio' });
  }
});

// Rota para criar pedido
app.post('/pedidos', (req, res) => {
  try {
    const { nomeCliente, observacoes, itens, total } = req.body;
    
    if (!nomeCliente || !itens || itens.length === 0) {
      return res.status(400).json({ error: 'Nome do cliente e itens são obrigatórios' });
    }

    const pedidos = JSON.parse(fs.readFileSync(path.join(__dirname, 'pedidos.json'), 'utf8'));
    
    const novoPedido = {
      id: Date.now(),
      nomeCliente,
      observacoes: observacoes || '',
      itens,
      total,
      data: new Date().toISOString()
    };

    pedidos.push(novoPedido);
    fs.writeFileSync(path.join(__dirname, 'pedidos.json'), JSON.stringify(pedidos, null, 2));
    
    res.json({ success: true, pedido: novoPedido });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar pedido' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});