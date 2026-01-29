const btnProcessar = document.getElementById('btn-processar');
const btnNovaAnalise = document.getElementById('btn-nova-analise');
const areaInput = document.getElementById('area-input');
const areaCarregando = document.getElementById('area-carregando');
const areaResultado = document.getElementById('area-resultado');

const inputArquivo = document.getElementById('input-arquivo');
const labelUpload = document.getElementById('label-upload');
const visualizacaoArquivo = document.getElementById('visualizacao-arquivo');
const nomeArquivoSpan = document.getElementById('nome-arquivo');
const btnRemoverArquivo = document.getElementById('btn-remover-arquivo');

const textoEmail = document.getElementById('texto-email');
const badgeStatus = document.getElementById('badge-status');
const textoResposta = document.getElementById('texto-resposta');

inputArquivo.addEventListener('change', () => {
    if (inputArquivo.files.length > 0) {
        const arquivo = inputArquivo.files[0];

        textoEmail.classList.add('hidden');
        visualizacaoArquivo.classList.remove('hidden');
        visualizacaoArquivo.classList.add('flex');

        nomeArquivoSpan.innerText = arquivo.name.length > 35 
            ? arquivo.name.substring(0, 35) + '...' 
            : arquivo.name;

        labelUpload.classList.add('border-indigo-500', 'bg-indigo-500/10');
    }
});

btnRemoverArquivo.addEventListener('click', (e) => {
    e.stopPropagation(); 
    inputArquivo.value = '';
    
    visualizacaoArquivo.classList.add('hidden');
    visualizacaoArquivo.classList.remove('flex');
    textoEmail.classList.remove('hidden');
    
    labelUpload.classList.remove('border-indigo-500', 'bg-indigo-500/10');
});

btnProcessar.addEventListener('click', async () => {
    const temTexto = textoEmail.value.trim().length > 0;
    const temArquivo = inputArquivo.files.length > 0;

    if (!temTexto && !temArquivo) {
        alert("Por favor, digite o email ou carregue um arquivo.");
        return;
    }

    areaInput.classList.add('hidden');
    areaCarregando.classList.remove('hidden');

    const formData = new FormData();
    formData.append('text_input', textoEmail.value);
    if (temArquivo) {
        formData.append('file_input', inputArquivo.files[0]);
    }

    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Erro na API');

        const dados = await response.json();

        textoResposta.innerText = dados.resposta_sugerida;
        atualizarBadgeStatus(dados.classificacao);
        adicionarAoHistorico(textoEmail.value || inputArquivo.files[0].name, dados);

        areaCarregando.classList.add('hidden');
        areaResultado.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao processar. Tente novamente.");
        areaCarregando.classList.add('hidden');
        areaInput.classList.remove('hidden');
    }
});

btnNovaAnalise.addEventListener('click', () => {
    areaResultado.classList.add('hidden');
    areaInput.classList.remove('hidden');

    textoEmail.value = '';
    inputArquivo.value = '';

    visualizacaoArquivo.classList.add('hidden');
    visualizacaoArquivo.classList.remove('flex');
    textoEmail.classList.remove('hidden');
    labelUpload.classList.remove('border-indigo-500', 'bg-indigo-500/10');
});

function atualizarBadgeStatus(status) {
    const ehProdutivo = status === 'Produtivo';
    badgeStatus.innerText = status;
    
    if (ehProdutivo) {
        badgeStatus.className = 'px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full border shadow-neon-verde bg-emerald-500/10 border-emerald-500/50 text-emerald-400';
    } else {
        badgeStatus.className = 'px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full border shadow-neon-vermelho bg-rose-500/10 border-rose-500/50 text-rose-400';
    }
}

function adicionarAoHistorico(origem, dados) {
    const tbody = document.querySelector('#tabela-historico tbody');
    const row = tbody.insertRow(0);
    
    row.className = "hover:bg-white/5 transition-colors group border-b border-white/5";
    
    const numId = tbody.rows.length;
    const resumo = origem.length > 30 ? origem.substring(0, 30) + '...' : origem;

    const corStatus = dados.classificacao === 'Produtivo' ? 'text-emerald-400' : 'text-rose-400';
    const bolinha = dados.classificacao === 'Produtivo' ? 'bg-emerald-400' : 'bg-rose-400';

    row.innerHTML = `
        <td class="px-6 py-4 font-mono text-gray-600 group-hover:text-indigo-400">#${String(numId).padStart(3, '0')}</td>
        <td class="px-6 py-4 text-gray-300">${resumo}</td>
        <td class="px-6 py-4">
            <span class="inline-flex items-center gap-2 ${corStatus}">
                <span class="w-1.5 h-1.5 rounded-full ${bolinha}"></span>
                ${dados.classificacao}
            </span>
        </td>
        <td class="px-6 py-4 text-gray-400">${dados.justificativa}</td>
    `;
}