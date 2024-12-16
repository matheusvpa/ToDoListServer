let contadorTarefas = 1;
const listaTarefas = document.getElementById('listaTarefas');
let tarefaEditando = null;

// Função para adicionar ou editar tarefa
function adicionarTarefa() {
    const campoTarefa = document.getElementById('campoTarefa');
    const selecaoPrioridade = document.getElementById('selecaoPrioridade');
    const valorTarefa = campoTarefa.value.trim();
    const valorPrioridade = selecaoPrioridade.value;

    if (valorTarefa === '') return;

    if (tarefaEditando) {
        // Caso esteja editando, atualize a tarefa
        const tarefa = tarefaEditando.querySelector('.texto-tarefa');
        tarefa.textContent = valorTarefa;
        tarefaEditando.classList.remove(`prioridade-${tarefaEditando.dataset.prioridade}`);
        tarefaEditando.classList.add(`prioridade-${valorPrioridade}`);
        tarefaEditando.dataset.prioridade = valorPrioridade;
        tarefaEditando = null;
    } else {
        // Adiciona uma nova tarefa
        const li = document.createElement('li');
        li.classList.add(`prioridade-${valorPrioridade}`);
        li.setAttribute('data-id', contadorTarefas++);
        li.setAttribute('data-prioridade', valorPrioridade);

        li.innerHTML = `
            <span class="texto-tarefa">${valorTarefa}</span>
            <div class="botoes">
                <button onclick="editarTarefa(${contadorTarefas-1})">Editar</button>
                <button onclick="cancelarEdicao(${contadorTarefas-1})">Cancelar</button>
                <button onclick="confirmarEdicao(${contadorTarefas-1})">Confirmar</button>
            </div>
        `;
        listaTarefas.appendChild(li);
    }

    // Limpa o campo de input
    campoTarefa.value = '';
}

// Função para editar a tarefa
function editarTarefa(id) {
    const itemTarefa = document.querySelector(`[data-id="${id}"]`);
    const textoTarefa = itemTarefa.querySelector('.texto-tarefa');
    const campoTarefa = document.getElementById('campoTarefa');
    
    // Coloca o texto da tarefa no campo de input para edição
    campoTarefa.value = textoTarefa.textContent;
    
    // Marca a tarefa como sendo a tarefa em edição
    tarefaEditando = itemTarefa;

    // Alterar o título do botão "Adicionar" para "Salvar"
    const botaoAdicionar = document.getElementById('botaoAdicionar');
    botaoAdicionar.textContent = 'Salvar';
}

// Função para cancelar a edição da tarefa
function cancelarEdicao(id) {
    const itemTarefa = document.querySelector(`[data-id="${id}"]`);
    if (itemTarefa) {
        listaTarefas.removeChild(itemTarefa);
    }
}

// Função para confirmar a edição da tarefa
function confirmarEdicao(id) {
    const itemTarefa = document.querySelector(`[data-id="${id}"]`);
    const textoTarefa = itemTarefa.querySelector('.texto-tarefa');
    const campoTarefa = document.getElementById('campoTarefa');

    // Atualiza o texto da tarefa com o conteúdo do campo de input
    textoTarefa.textContent = campoTarefa.value;

    // Atualiza a classe de prioridade caso necessário
    const selecaoPrioridade = document.getElementById('selecaoPrioridade');
    const valorPrioridade = selecaoPrioridade.value;
    itemTarefa.classList.remove(`prioridade-${itemTarefa.dataset.prioridade}`);
    itemTarefa.classList.add(`prioridade-${valorPrioridade}`);
    itemTarefa.dataset.prioridade = valorPrioridade;

    // Limpa o campo de input
    campoTarefa.value = '';

    // Limpa a tarefa que está sendo editada
    tarefaEditando = null;

    // Restaura o texto do botão "Salvar" para "Adicionar"
    const botaoAdicionar = document.getElementById('botaoAdicionar');
    botaoAdicionar.textContent = 'Adicionar';
}