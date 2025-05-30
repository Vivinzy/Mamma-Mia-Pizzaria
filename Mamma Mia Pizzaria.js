// Preços das pizzas
const precos = {
    'Pizza Margherita': { P: 30, M: 40, G: 50 },
    'Pizza Pepperoni': { P: 32, M: 42, G: 52 },
    'Pizza Quatro Queijos': { P: 34, M: 44, G: 54 },
    'Pizza Vegetariana': { P: 28, M: 38, G: 48 },
    'Pizza Frango com Catupiry': { P: 35, M: 45, G: 55 },
    'Pizza Portuguesa': { P: 33, M: 43, G: 53 },
    'Pizza de Nutella': { P: 36, M: 46, G: 56 },
    'Pizza de Banana com Canela': { P: 30, M: 40, G: 50 },
    'Pizza de Morango com Chocolate': { P: 38, M: 48, G: 58 },
    'Pizza de Abacaxi com Canela': { P: 32, M: 42, G: 52 },
    'Pizza de Chocolate com Morango': { P: 39, M: 49, G: 59 },
    'Pizza de Doce de Leite com Coco': { P: 35, M: 45, G: 55 }
};

let carrinho = [];

// Adiciona pizza ao carrinho
function adicionarCarrinho(botao) {
    const produtoDiv = botao.closest('.produto');
    const nomeProduto = produtoDiv.querySelector('h3').textContent.trim();
    const tamanhoSelect = produtoDiv.querySelector('.tamanho');
    const tamanho = tamanhoSelect ? tamanhoSelect.value : '';
    const quantidadeInput = produtoDiv.querySelector('.quantidade');
    const quantidade = quantidadeInput ? parseInt(quantidadeInput.value) : 1;
    let preco = precos[nomeProduto];
    if (typeof preco === 'object') {
        preco = preco[tamanho];
    }
    let existente = carrinho.find(i => i.produto === nomeProduto && i.tamanho === tamanho);
    if (existente) {
        existente.quantidade += quantidade;
    } else {
        carrinho.push({ produto: nomeProduto, tamanho, quantidade, preco });
    }
    atualizarCarrinho();
}

// Atualiza o carrinho na tela
function atualizarCarrinho() {
    const lista = document.getElementById('lista-pedidos');
    if (!lista) return;

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Nenhum pedido adicionado ainda.</p>";
        return;
    }

    let html = "<ul>";
    carrinho.forEach((item, idx) => {
        html += `<li>
            ${item.quantidade}x ${item.produto} (${item.tamanho}) - R$ ${item.preco.toFixed(2)} cada
            <button onclick="removerItemCarrinho(${idx})" style="margin-left:10px; color:red;">Remover</button>
        </li>`;
    });
    html += "</ul>";
    lista.innerHTML = html;
}

// Remove item do carrinho
function removerItemCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Atualiza o preço exibido ao trocar o tamanho
function atualizarPreco(select) {
    const produtoDiv = select.closest('.produto');
    const nomeProduto = produtoDiv.querySelector('h3').textContent.trim();
    const tamanho = select.value;
    const precoAtualDiv = produtoDiv.querySelector('.preco-atual');
    if (precos[nomeProduto] && precos[nomeProduto][tamanho]) {
        precoAtualDiv.textContent = 'Valor: R$ ' + precos[nomeProduto][tamanho].toFixed(2);
    } else {
        precoAtualDiv.textContent = '';
    }
}

// Finaliza o pedido
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Nenhum pedido para finalizar!");
        return;
    }
    let resumo = "Resumo do pedido:\n";
    let total = 0;
    carrinho.forEach(item => {
        resumo += `${item.quantidade}x ${item.produto} (${item.tamanho}) - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
        total += item.preco * item.quantidade;
    });
    resumo += `\nTotal: R$ ${total.toFixed(2)}\n\nPedido finalizado com sucesso!\nObrigado por comprar na Mamma Mia Pizzaria!`;
    alert(resumo);
    carrinho = [];
    atualizarCarrinho();
}

// Limpa o pedido
function limparPedido() {
    carrinho = [];
    atualizarCarrinho();
}

// ...existing code...

function fazerLogin() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');

    if (usuario === 'admin' && senha === '1234') {
        mensagem.textContent = "Login realizado com sucesso!";
        mensagem.className = "mensagem sucesso";
        mensagem.classList.remove("hidden");
        setTimeout(() => {
            document.getElementById('login').style.display = 'none';
            document.getElementById('perfil-admin').style.display = 'flex';
            mensagem.classList.add("hidden");
        }, 1000);
    } else {
        mensagem.textContent = "Usuário ou senha incorretos!";
        mensagem.className = "mensagem erro";
        mensagem.classList.remove("hidden");
        setTimeout(() => {
            mensagem.classList.add("hidden");
        }, 3000);
    }
}

function mostrarPedidos() {
    document.getElementById('perfil-admin').style.display = 'none';
    document.getElementById('pedido').classList.add('ativa');
}

// ...existing code...

// Inicialização dos eventos ao carregar a página
window.onload = () => {
    // Atualiza todos os preços dos produtos
    document.querySelectorAll('.produto .tamanho').forEach(select => atualizarPreco(select));
    // Adiciona eventos aos botões de adicionar ao carrinho
    document.querySelectorAll('.adicionar-carrinho').forEach(botao => {
        botao.addEventListener('click', () => adicionarCarrinho(botao));
    });
    // Atualiza o carrinho na tela
    atualizarCarrinho();
};
function mostrarSabores() {
    const perfil = document.getElementById('perfil-admin');
    if (perfil) perfil.style.display = 'none';

    const pedido = document.getElementById('pedido');
    if (pedido) pedido.classList.add('ativa');

    // Muda o título para "Pedido"
    const titulo = document.getElementById('titulo-pedido');
    if (titulo) titulo.textContent = "Pedido";
}

function mostrarRelatorio() {
    const perfil = document.getElementById('perfil-admin');
    if (perfil) perfil.style.display = 'none';

    const pedido = document.getElementById('pedido');
    if (pedido) pedido.classList.add('ativa');

    // Muda o título para "Pedido"
    const titulo = document.getElementById('titulo-pedido');
    if (titulo) titulo.textContent = "Pedido";
}

function mostrarPedidos() {
    document.getElementById('perfil-admin').style.display = 'none';
    document.getElementById('pedido').classList.add('ativa');
    // Se quiser, pode voltar o título para "Monte o pedido do cliente"
    const titulo = document.getElementById('titulo-pedido');
    if (titulo) titulo.textContent = "Monte o pedido do cliente";
}