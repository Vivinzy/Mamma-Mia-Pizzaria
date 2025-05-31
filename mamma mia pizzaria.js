// Array para armazenar as pizzas cadastradas
let pizzas = [];

function mostrarSecao(secao) {
    document.getElementById('painel-cadastro-pizza').style.display = 'none';
    const secaoConsulta = document.getElementById('secao-consulta');
    const secaoAlterar = document.getElementById('secao-alterar');
    const secaoEntrega = document.getElementById('secao-entrega');
    const secaoVenda = document.getElementById('secao-venda');
    const secaoRelatorio = document.getElementById('secao-relatorio');
    if (secaoConsulta) secaoConsulta.style.display = 'none';
    if (secaoAlterar) secaoAlterar.style.display = 'none';
    if (secaoEntrega) secaoEntrega.style.display = 'none';
    if (secaoVenda) secaoVenda.style.display = 'none';
    if (secaoRelatorio) secaoRelatorio.style.display = 'none'; // <-- Adicione esta linha

    const perfil = document.querySelector('.perfil-funcionario');
    if (perfil) perfil.style.display = 'none';

    if (secao === 'cadastro') {
        document.getElementById('painel-cadastro-pizza').style.display = 'flex';
    } else if (secao === 'consulta') {
        atualizarListaPizzas();
        if (secaoConsulta) secaoConsulta.style.display = 'block';
    } else if (secao === 'alterar') {
        atualizarListaAlterarPizzas();
        if (secaoAlterar) secaoAlterar.style.display = 'block';
    } else if (secao === 'emprestimo') {
        atualizarListaPizzasEntrega();
        if (secaoEntrega) secaoEntrega.style.display = 'block';
    } else if (secao === 'venda') {
        atualizarListaPizzasVenda();
        if (secaoVenda) secaoVenda.style.display = 'block';
    }
}

// Função para salvar uma pizza cadastrada
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

// Atualiza a lista de pizzas cadastradas na tela
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

// Fecha o painel de cadastro e limpa os campos
function fecharPainelCadastro() {
    document.getElementById('painel-cadastro-pizza').style.display = 'none';
    document.getElementById('mensagem-cadastro').style.display = 'none';
    document.getElementById('nome-pizza').value = '';
    document.getElementById('ingredientes-pizza').value = '';
    document.getElementById('preco-pizza').value = '';
}

// Função para gerar relatório de vendas (exemplo simples)
function gerarRelatorioVendas() {
    alert("Relatório de vendas gerado!");
}

// Funções para o pedido (exemplo simples)
function limparPedido() {
    const lista = document.getElementById('lista-pedidos');
    if (lista) lista.innerHTML = "<p>Nenhum pedido adicionado ainda.</p>";
}


// Função de login simples
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
// Mostra a seção de alteração e lista as pizzas com campos editáveis
function mostrarSecao(secao) {
    // Esconde todas as seções extras
    document.getElementById('painel-cadastro-pizza').style.display = 'none';
    const secaoConsulta = document.getElementById('secao-consulta');
    const secaoAlterar = document.getElementById('secao-alterar');
    if (secaoConsulta) secaoConsulta.style.display = 'none';
    if (secaoAlterar) secaoAlterar.style.display = 'none';

    // Esconde perfil do funcionário e pedido
    const perfil = document.querySelector('.perfil-funcionario');
    if (perfil) perfil.style.display = 'none';

    if (secao === 'cadastro') {
        document.getElementById('painel-cadastro-pizza').style.display = 'flex';
    } else if (secao === 'consulta') {
        atualizarListaPizzas();
        if (secaoConsulta) secaoConsulta.style.display = 'block';
    } else if (secao === 'alterar') {
        atualizarListaAlterarPizzas();
        if (secaoAlterar) secaoAlterar.style.display = 'block';
    } else {
        alert("Você clicou na opção: " + secao);
    }
}

// Lista as pizzas para alteração
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

// Salva a alteração feita na pizza
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
// Adicione no início da função mostrarSecao:
function mostrarSecao(secao) {
    document.getElementById('painel-cadastro-pizza').style.display = 'none';
    const secaoConsulta = document.getElementById('secao-consulta');
    const secaoAlterar = document.getElementById('secao-alterar');
    const secaoEntrega = document.getElementById('secao-entrega');
    if (secaoConsulta) secaoConsulta.style.display = 'none';
    if (secaoAlterar) secaoAlterar.style.display = 'none';
    if (secaoEntrega) secaoEntrega.style.display = 'none';

    const perfil = document.querySelector('.perfil-funcionario');
    if (perfil) perfil.style.display = 'none';

    if (secao === 'cadastro') {
        document.getElementById('painel-cadastro-pizza').style.display = 'flex';
    } else if (secao === 'consulta') {
        atualizarListaPizzas();
        if (secaoConsulta) secaoConsulta.style.display = 'block';
    } else if (secao === 'alterar') {
        atualizarListaAlterarPizzas();
        if (secaoAlterar) secaoAlterar.style.display = 'block';
    } else if (secao === 'emprestimo') {
        atualizarListaPizzasEntrega();
        if (secaoEntrega) secaoEntrega.style.display = 'block';
    } else {
        alert("Você clicou na opção: " + secao);
    }
}

// Lista as pizzas cadastradas para seleção na entrega
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
// Adicione no início da função mostrarSecao:
function mostrarSecao(secao) {
    document.getElementById('painel-cadastro-pizza').style.display = 'none';
    const secaoConsulta = document.getElementById('secao-consulta');
    const secaoAlterar = document.getElementById('secao-alterar');
    const secaoEntrega = document.getElementById('secao-entrega');
    const secaoVenda = document.getElementById('secao-venda');
    if (secaoConsulta) secaoConsulta.style.display = 'none';
    if (secaoAlterar) secaoAlterar.style.display = 'none';
    if (secaoEntrega) secaoEntrega.style.display = 'none';
    if (secaoVenda) secaoVenda.style.display = 'none';

    const perfil = document.querySelector('.perfil-funcionario');
    if (perfil) perfil.style.display = 'none';

    if (secao === 'cadastro') {
        document.getElementById('painel-cadastro-pizza').style.display = 'flex';
    } else if (secao === 'consulta') {
        atualizarListaPizzas();
        if (secaoConsulta) secaoConsulta.style.display = 'block';
    } else if (secao === 'alterar') {
        atualizarListaAlterarPizzas();
        if (secaoAlterar) secaoAlterar.style.display = 'block';
    } else if (secao === 'emprestimo') {
        atualizarListaPizzasEntrega();
        if (secaoEntrega) secaoEntrega.style.display = 'block';
    } else if (secao === 'venda') {
        atualizarListaPizzasVenda();
        if (secaoVenda) secaoVenda.style.display = 'block';
    } else {
        alert("Você clicou na opção: " + secao);
    }
}

// Lista as pizzas cadastradas para seleção na venda presencial
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

// Finaliza a venda presencial
function finalizarVenda() {
    const nome = document.getElementById('nome-cliente-venda').value.trim();
    const hora = document.getElementById('hora-pedido-venda').value.trim();
    const forma = document.getElementById('forma-pagamento-venda').value;
    const selecionados = Array.from(document.querySelectorAll('.pizza-venda:checked')).map(cb => pizzas[cb.value]);
    const msg = document.getElementById('mensagem-venda');
    if (!nome || !hora || !forma || selecionados.length === 0) {
        msg.style.display = 'block';
        msg.style.color = 'red';
        msg.textContent = 'Preencha todos os campos e selecione pelo menos uma pizza!';
        return;
    }
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
let relatorio = [];
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
    // Salva no relatório
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
function finalizarVenda() {
    const nome = document.getElementById('nome-cliente-venda').value.trim();
    const hora = document.getElementById('hora-pedido-venda').value.trim();
    const forma = document.getElementById('forma-pagamento-venda').value;
    const selecionados = Array.from(document.querySelectorAll('.pizza-venda:checked')).map(cb => pizzas[cb.value]);
    const msg = document.getElementById('mensagem-venda');
    if (!nome || !hora || !forma || selecionados.length === 0) {
        msg.style.display = 'block';
        msg.style.color = 'red';
        msg.textContent = 'Preencha todos os campos e selecione pelo menos uma pizza!';
        return;
    }
    // Salva no relatório
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
    // Esconde todas as seções extras
    document.getElementById('painel-cadastro-pizza').style.display = 'none';
    const secaoConsulta = document.getElementById('secao-consulta');
    const secaoAlterar = document.getElementById('secao-alterar');
    const secaoEntrega = document.getElementById('secao-entrega');
    const secaoVenda = document.getElementById('secao-venda');
    const secaoRelatorio = document.getElementById('secao-relatorio');
    if (secaoConsulta) secaoConsulta.style.display = 'none';
    if (secaoAlterar) secaoAlterar.style.display = 'none';
    if (secaoEntrega) secaoEntrega.style.display = 'none';
    if (secaoVenda) secaoVenda.style.display = 'none';
    if (secaoRelatorio) secaoRelatorio.style.display = 'block';

    // Atualiza o relatório na tela
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