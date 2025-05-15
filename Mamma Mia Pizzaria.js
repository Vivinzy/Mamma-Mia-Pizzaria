// Mamma Mia Pizzaria - JavaScript



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

// Alterna as seções do site
function mostrarSecao(secaoId) {
    document.querySelectorAll('.secao').forEach(sec => sec.classList.remove('ativa'));
    const secao = document.getElementById(secaoId);
    if (secao) secao.classList.add('ativa');
}

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

// Atualiza o carrinho (exemplo: só loga no console)
function atualizarCarrinho() {
    console.clear();
    console.log("Carrinho:", carrinho);
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

// Atualiza todos os preços ao carregar a página
window.onload = () => {
    document.querySelectorAll('.produto .tamanho').forEach(select => atualizarPreco(select));
};
//tela de login
function login() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if (usuario === 'admin' && senha === 'admin') {
        alert('Login bem-sucedido!');
        mostrarSecao('secao-pedidos');
    } else {
        alert('Usuário ou senha incorretos.');
    }
}
// Adiciona eventos aos botões de adicionar ao carrinho
document.querySelectorAll('.adicionar-carrinho').forEach(botao => {
    botao.addEventListener('click', () => adicionarCarrinho(botao));
});