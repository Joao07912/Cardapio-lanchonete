const API_URL = 'http://localhost:3000';

let cardapio = [];
let carrinho = [];
let categoriaAtiva = '';

// Elementos DOM
const cardapioEl = document.getElementById('cardapio');
const buscaEl = document.getElementById('busca');
const itensCarrinhoEl = document.getElementById('itens-carrinho');
const totalEl = document.getElementById('total');
const finalizarBtn = document.getElementById('finalizar-pedido');
const modal = document.getElementById('modal');
const formPedido = document.getElementById('form-pedido');
const mensagemEl = document.getElementById('mensagem');

// Elementos mobile
const carrinhoFlutuante = document.getElementById('carrinho-flutuante');
const contadorItens = document.getElementById('contador-itens');
const carrinhoDrawer = document.getElementById('carrinho-drawer');
const itensCarrinhoMobile = document.getElementById('itens-carrinho-mobile');
const totalMobile = document.getElementById('total-mobile');
const finalizarBtnMobile = document.getElementById('finalizar-pedido-mobile');
const fecharDrawer = document.getElementById('fechar-drawer');

// Carregar cardápio
async function carregarCardapio() {
    try {
        const response = await fetch(`${API_URL}/cardapio`);
        cardapio = await response.json();
        renderizarCardapio();
    } catch (error) {
        mostrarMensagem('Erro ao carregar cardápio', 'erro');
    }
}

// Renderizar cardápio
function renderizarCardapio() {
    const busca = buscaEl.value.toLowerCase();
    
    const itensFiltrados = cardapio.filter(item => {
        const matchBusca = item.nome.toLowerCase().includes(busca);
        const matchCategoria = !categoriaAtiva || item.categoria === categoriaAtiva;
        return matchBusca && matchCategoria;
    });

    cardapioEl.innerHTML = itensFiltrados.map(item => `
        <div class="item">
            <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzUgODBIMTY1VjEyMEgxMzVWODBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMjAgMTAwSDE4MFYxMDBIMTIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K'">
            <div class="item-content">
                <h3>${item.nome}</h3>
                <span class="categoria">${item.categoria}</span>
                <div class="preco">R$ ${item.preco.toFixed(2)}</div>
                <button onclick="adicionarAoCarrinho(${item.id})">Adicionar</button>
            </div>
        </div>
    `).join('');
}

// Alterar categoria ativa
function alterarCategoria(categoria) {
    categoriaAtiva = categoria;
    
    // Atualizar botões
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.classList.remove('ativo');
        if (btn.dataset.categoria === categoria) {
            btn.classList.add('ativo');
        }
    });
    
    renderizarCardapio();
}

// Adicionar ao carrinho
function adicionarAoCarrinho(id) {
    const item = cardapio.find(i => i.id === id);
    const itemCarrinho = carrinho.find(i => i.id === id);
    
    if (itemCarrinho) {
        itemCarrinho.quantidade++;
    } else {
        carrinho.push({ ...item, quantidade: 1 });
    }
    
    renderizarCarrinho();
}

// Remover do carrinho
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    renderizarCarrinho();
}

// Renderizar carrinho
function renderizarCarrinho() {
    const carrinhoHTML = carrinho.length === 0 ? '<p>Carrinho vazio</p>' : carrinho.map(item => `
        <div class="item-carrinho">
            <div class="item-carrinho-info">
                <div class="item-carrinho-nome">${item.nome}</div>
                <div class="item-carrinho-detalhes">${item.quantidade}x R$ ${item.preco.toFixed(2)} = R$ ${(item.quantidade * item.preco).toFixed(2)}</div>
            </div>
            <button onclick="removerDoCarrinho(${item.id})">×</button>
        </div>
    `).join('');

    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    
    // Desktop
    itensCarrinhoEl.innerHTML = carrinhoHTML;
    totalEl.textContent = total.toFixed(2);
    finalizarBtn.disabled = carrinho.length === 0;
    
    // Mobile
    itensCarrinhoMobile.innerHTML = carrinhoHTML;
    totalMobile.textContent = total.toFixed(2);
    finalizarBtnMobile.disabled = carrinho.length === 0;
    contadorItens.textContent = totalItens;
    
    // Mostrar/ocultar botão flutuante
    carrinhoFlutuante.style.display = totalItens > 0 ? 'block' : 'none';
}

// Finalizar pedido
async function finalizarPedido(event) {
    event.preventDefault();
    
    const nomeCliente = document.getElementById('nome-cliente').value;
    const observacoes = document.getElementById('observacoes').value;
    
    const pedido = {
        nomeCliente,
        observacoes,
        itens: carrinho,
        total: parseFloat(totalEl.textContent)
    };

    try {
        const response = await fetch(`${API_URL}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });

        if (response.ok) {
            mostrarMensagem('Pedido enviado com sucesso!', 'sucesso');
            carrinho = [];
            renderizarCarrinho();
            modal.style.display = 'none';
            formPedido.reset();
        } else {
            mostrarMensagem('Erro ao enviar pedido', 'erro');
        }
    } catch (error) {
        mostrarMensagem('Erro ao enviar pedido', 'erro');
    }
}

// Mostrar mensagem
function mostrarMensagem(texto, tipo) {
    mensagemEl.textContent = texto;
    mensagemEl.className = `mensagem ${tipo}`;
    mensagemEl.style.display = 'block';
    
    setTimeout(() => {
        mensagemEl.style.display = 'none';
    }, 3000);
}

// Event listeners
buscaEl.addEventListener('input', renderizarCardapio);

// Botões de categoria
document.querySelectorAll('.categoria-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alterarCategoria(btn.dataset.categoria);
    });
});
finalizarBtn.addEventListener('click', () => modal.style.display = 'block');
finalizarBtnMobile.addEventListener('click', () => {
    carrinhoDrawer.classList.remove('ativo');
    modal.style.display = 'block';
});
document.getElementById('cancelar').addEventListener('click', () => modal.style.display = 'none');
formPedido.addEventListener('submit', finalizarPedido);

// Mobile carrinho
carrinhoFlutuante.addEventListener('click', () => carrinhoDrawer.classList.add('ativo'));
fecharDrawer.addEventListener('click', () => carrinhoDrawer.classList.remove('ativo'));
carrinhoDrawer.addEventListener('click', (e) => {
    if (e.target === carrinhoDrawer) carrinhoDrawer.classList.remove('ativo');
});

// Fechar modal clicando fora
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Inicializar
carregarCardapio();