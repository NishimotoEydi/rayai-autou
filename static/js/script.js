const btnAnalisar = document.getElementById('btn-analisar');
const btnReset = document.getElementById('btn-reset');
const inputSection = document.getElementById('input-section');
const loadingState = document.getElementById('loading-state');
const resultsSection = document.getElementById('results-section');
const fileUpload = document.getElementById('file-upload');
const btnFile = document.getElementById('btn-file');
const uploadLabel = document.getElementById('upload-label');
const textoEmail = document.getElementById('email-content');
const uploadSection = document.getElementById('upload-section');
const iconUpload = document.getElementById('icon-upload');

fileUpload.addEventListener('change', () => {
    if (fileUpload.files.length > 0) {
        const fileName = fileUpload.files[0].name;
        textoEmail.classList.add('hidden');
        iconUpload.classList.remove('hidden');
        uploadSection.classList.add('justify-center', 'h-48');
        btnFile.innerText = `Arquivo selecionado: ${fileName.substring(0, 20) + (fileName.length > 20 ? '...' : '')}`;
        uploadLabel.classList.add('animate-pulse-glow', 'bg-cyan-900', 'items-end', 'flex');
        setTimeout(() => {
            uploadLabel.classList.remove('animate-pulse-glow');
        }, 3000);
    } else {
        btnFile.innerText = 'Upload Arquivo (.txt, .pdf)';
        uploadLabel.classList.remove('animate-pulse-glow', 'bg-cyan-900');
    }
});

btnAnalisar.addEventListener('click', async () => {
    const arquivoPdf = document.getElementById('file-upload');
    const elementoStatus = document.getElementById('status');
    const aiResponseText = document.getElementById('ai-response-text');
    if (!textoEmail.value && !arquivoPdf.files[0]) {
        alert("Por favor, cole um texto ou selecione um arquivo.");
        return;
    }
    inputSection.classList.add('hidden');
    loadingState.classList.remove('hidden');
    const formData = new FormData();
    formData.append('text_input', textoEmail.value);
    if (arquivoPdf.files[0]) {
        formData.append('file_input', arquivoPdf.files[0]);
    }
    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Erro na comunicação');
        const data = await response.json();
        aiResponseText.innerText = data.resposta_sugerida;
        if (data.classificacao === 'Produtivo') {
            elementoStatus.innerText = 'PRODUTIVO';
            elementoStatus.className = 'px-3 py-1 text-sm font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 rounded-full shadow-neon-green';
        } else {
            elementoStatus.innerText = 'IMPRODUTIVO';
            elementoStatus.className = 'px-3 py-1 text-sm font-bold text-rose-300 bg-rose-950/80 border border-rose-500/30 rounded-full shadow-neon-red';
        }
        adicionarAoHistorico(textoEmail.value || arquivoPdf.files[0].name, data);
        loadingState.classList.add('hidden');
        resultsSection.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        alert("Erro ao processar. Tente novamente.");
        loadingState.classList.add('hidden');
        inputSection.classList.remove('hidden');
    }
});
function adicionarAoHistorico(origem, dadosIA) {
    const table = document.getElementById('history-table');
    const row = table.insertRow(1);
    row.className = "border-b border-slate-700 hover:bg-slate-800/50 transition-colors";
    const cellNum = row.insertCell(0);
    const cellCont = row.insertCell(1);
    const cellStat = row.insertCell(2);
    const cellMot = row.insertCell(3);
    cellNum.innerText = table.rows.length - 1;
    cellCont.innerText = origem.substring(0, 40) + "...";
    cellStat.innerText = dadosIA.classificacao;
    cellMot.innerText = dadosIA.justificativa;
    [cellNum, cellCont, cellStat, cellMot].forEach(c => c.className = "px-4 py-3 text-sm text-slate-300 border-x border-slate-700");
    if (dadosIA.classificacao === 'Produtivo') {
        cellStat.classList.add('text-emerald-400', 'font-bold');
    } else {
        cellStat.classList.add('text-rose-400', 'font-bold');
    }
}
btnReset.addEventListener('click', () => {
    resultsSection.classList.add('hidden');
    inputSection.classList.remove('hidden');
    document.getElementById('email-content').value = '';
    document.getElementById('file-upload').value = '';
    btnFile.innerText = 'Upload Arquivo (.txt, .pdf)';
    uploadLabel.classList.remove('animate-pulse-glow', 'bg-cyan-900');
    textoEmail.classList.remove('hidden');
    uploadSection.classList.remove('justify-center', 'h-48');
    iconUpload.classList.add('hidden');
});