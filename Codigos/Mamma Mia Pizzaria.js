
let pizzas = [];
let relatorio = [];

function esconderSecoes() {
    const secoes = [
        'painel-cadastro-pizza',
        'secao-consulta',
        'secao-alterar',
        'secao-entrega',
        'secao-venda',
        'secao-relatorio'
    ];
    secoes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const perfil = document.querySelector('.perfil-funcionario');
    if (perfil) perfil.style.display = 'none';
}
function mostrarSecao(secao) {
    esconderSecoes();
    if (secao === 'cadastro') {
        document.getElementById('painel-cadastro-pizza').style.display = 'flex';
    } else if (secao === 'consulta') {
        atualizarListaPizzas();
        document.getElementById('secao-consulta').style.display = 'block';
    } else if (secao === 'alterar') {
        atualizarListaAlterarPizzas();
        document.getElementById('secao-alterar').style.display = 'block';
    } else if (secao === 'emprestimo') {
        atualizarListaPizzasEntrega();
        document.getElementById('secao-entrega').style.display = 'block';
    } else if (secao === 'venda') {
        atualizarListaPizzasVenda();
        document.getElementById('secao-venda').style.display = 'block';
    } else if (secao === 'relatorio') {
        gerarRelatorioVendas();
    } else {
        alert("Você clicou na opção: " + secao);
    }
}
function salvarPizza() {
    const nome = document.getElementById('nome-pizza').value.trim();
    const ingredientes = document.getElementById('ingredientes-pizza').value.trim();
    const preco = document.getElementById('preco-pizza').value.trim();
    const msg = document.getElementById('mensagem-cadastro');
    if (!nome || !ingredientes || !preco) {
        msg.style.display = 'block';
        msg.style.color = 'red';
        msg.textContent = 'Preencha todos os campos!';
        return;
    }
    pizzas.push({ nome, ingredientes, preco });
    msg.style.display = 'block';
    msg.style.color = 'green';
    msg.textContent = 'Pizza cadastrada com sucesso!';
    setTimeout(fecharPainelCadastro, 1200);
}

function fecharPainelCadastro() {
    document.getElementById('painel-cadastro-pizza').style.display = 'none';
    document.getElementById('mensagem-cadastro').style.display = 'none';
    document.getElementById('nome-pizza').value = '';
    document.getElementById('ingredientes-pizza').value = '';
    document.getElementById('preco-pizza').value = '';
}
function atualizarListaPizzas() {
    const lista = document.getElementById('lista-pizzas');
    if (!lista) return;
    if (pizzas.length === 0) {
        lista.innerHTML = "<li>Nenhuma pizza cadastrada ainda.</li>";
        return;
    }
    lista.innerHTML = pizzas.map(pizza =>
        `<li>
            <strong>${pizza.nome}</strong> - R$ ${parseFloat(pizza.preco).toFixed(2)}<br>
            <em>Ingredientes:</em> ${pizza.ingredientes}
        </li>`
    ).join('');
}
function atualizarListaAlterarPizzas() {
    const lista = document.getElementById('lista-alterar-pizzas');
    if (!lista) return;
    if (pizzas.length === 0) {
        lista.innerHTML = "<li>Nenhuma pizza cadastrada ainda.</li>";
        return;
    }
    lista.innerHTML = pizzas.map((pizza, idx) =>
        `<li>
            <input type="text" value="${pizza.nome}" id="edit-nome-${idx}" style="width:120px;">
            <input type="text" value="${pizza.ingredientes}" id="edit-ingredientes-${idx}" style="width:180px;">
            <input type="number" value="${pizza.preco}" id="edit-preco-${idx}" style="width:80px;">
            <button onclick="salvarAlteracaoPizza(${idx})">Salvar</button>
        </li>`
    ).join('');
}

function salvarAlteracaoPizza(idx) {
    const nome = document.getElementById(`edit-nome-${idx}`).value.trim();
    const ingredientes = document.getElementById(`edit-ingredientes-${idx}`).value.trim();
    const preco = document.getElementById(`edit-preco-${idx}`).value.trim();
    if (!nome || !ingredientes || !preco) {
        alert('Preencha todos os campos!');
        return;
    }
    pizzas[idx] = { nome, ingredientes, preco };
    atualizarListaAlterarPizzas();
    alert('Pizza alterada com sucesso!');
}
function atualizarListaPizzasEntrega() {
    const div = document.getElementById('pizzas-entrega');
    if (!div) return;
    if (pizzas.length === 0) {
        div.innerHTML = "<p>Nenhuma pizza cadastrada ainda.</p>";
        return;
    }
    div.innerHTML = pizzas.map((pizza, idx) =>
        `<label style="display:block;">
            <input type="checkbox" value="${idx}" class="pizza-entrega"> 
            ${pizza.nome} - R$ ${parseFloat(pizza.preco).toFixed(2)}
        </label>`
    ).join('');
}

function finalizarEntrega() {
    const nome = document.getElementById('nome-cliente').value.trim();
    const endereco = document.getElementById('endereco-cliente').value.trim();
    const forma = document.getElementById('forma-pagamento-entrega').value;
    const selecionados = Array.from(document.querySelectorAll('.pizza-entrega:checked')).map(cb => pizzas[cb.value]);
    const msg = document.getElementById('mensagem-entrega');
    if (!nome || !endereco || !forma || selecionados.length === 0) {
        msg.style.display = 'block';
        msg.style.color = 'red';
        msg.textContent = 'Preencha todos os campos e selecione pelo menos uma pizza!';
        return;
    }
    relatorio.push({
        tipo: 'Entrega',
        cliente: nome,
        data: new Date().toLocaleString(),
        pizzas: selecionados.map(p => p.nome).join(', '),
        forma: forma
    });
    msg.style.display = 'block';
    msg.style.color = 'green';
    msg.textContent = `Entrega registrada para ${nome} no endereço "${endereco}" com as pizzas: ${selecionados.map(p=>p.nome).join(', ')}. Pagamento: ${forma}.`;
    setTimeout(() => {
        msg.style.display = 'none';
        document.getElementById('nome-cliente').value = '';
        document.getElementById('endereco-cliente').value = '';
        document.getElementById('forma-pagamento-entrega').value = '';
        atualizarListaPizzasEntrega();
    }, 2500);
}
function atualizarListaPizzasVenda() {
    const div = document.getElementById('pizzas-venda');
    if (!div) return;
    if (pizzas.length === 0) {
        div.innerHTML = "<p>Nenhuma pizza cadastrada ainda.</p>";
        return;
    }
    div.innerHTML = pizzas.map((pizza, idx) =>
        `<label style="display:block;">
            <input type="checkbox" value="${idx}" class="pizza-venda"> 
            ${pizza.nome} - R$ ${parseFloat(pizza.preco).toFixed(2)}
        </label>`
    ).join('');
}

function finalizarVenda() {
    const nome = document.getElementById('nome-cliente-venda').value.trim();
    const forma = document.getElementById('forma-pagamento-venda').value;
    const selecionados = Array.from(document.querySelectorAll('.pizza-venda:checked')).map(cb => pizzas[cb.value]);
    const msg = document.getElementById('mensagem-venda');
    if (!nome || !hora || !forma || selecionados.length === 0) {
        msg.style.display = 'block';
        msg.style.color = 'red';
        msg.textContent = 'Preencha todos os campos e selecione pelo menos uma pizza!';
        return;
    }
    relatorio.push({
        tipo: 'Venda',
        cliente: nome,
        data: new Date().toLocaleString(),
        pizzas: selecionados.map(p => p.nome).join(', '),
        forma: forma
    });
    msg.style.display = 'block';
    msg.style.color = 'green';
    msg.textContent = `Venda registrada para ${nome} às ${hora}, pagamento: ${forma}, pizzas: ${selecionados.map(p=>p.nome).join(', ')}.`;
    setTimeout(() => {
        msg.style.display = 'none';
        document.getElementById('nome-cliente-venda').value = '';
        document.getElementById('hora-pedido-venda').value = '';
        document.getElementById('forma-pagamento-venda').value = '';
        atualizarListaPizzasVenda();
    }, 2500);
}

function gerarRelatorioVendas() {
    esconderSecoes();
    const secaoRelatorio = document.getElementById('secao-relatorio');
    if (secaoRelatorio) secaoRelatorio.style.display = 'block';

    const lista = document.getElementById('lista-relatorio');
    if (!lista) return;
    if (relatorio.length === 0) {
        lista.innerHTML = "<li>Nenhuma entrega ou venda registrada ainda.</li>";
        return;
    }
    lista.innerHTML = relatorio.map(item =>
        `<li>
            <strong>${item.tipo}</strong> - Cliente: ${item.cliente} <br>
            <em>Pizzas:</em> ${item.pizzas} <br>
            <em>Forma de Pagamento:</em> ${item.forma} <br>
            <em>Data/Hora:</em> ${item.data}
        </li>`
    ).join('');
}

function fazerLogin() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const erro = document.getElementById('login-erro');
    if (usuario === 'Administrador' && senha === '1234') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        if (erro) erro.style.display = 'none';
    } else {
        if (erro) erro.style.display = 'block';
    }
}

function limparPedido() {
    const lista = document.getElementById('lista-pedidos');
    if (lista) lista.innerHTML = "<p>Nenhum pedido adicionado ainda.</p>";
}