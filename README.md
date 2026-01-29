# RayAI - Sistema Inteligente de Triagem de E-mails

RayAI é uma solução digital desenvolvida para automatizar a leitura, classificação e sugestão de respostas de e-mails em larga escala, focada no setor financeiro. O objetivo principal é liberar o tempo da equipe técnica, eliminando a necessidade de triagem manual de mensagens improdutivas ou repetitivas.

---

## 🚀 Links do Projeto

- **Deploy1 (Render):** [https://rayai-autou.onrender.com/](https://rayai-autou.onrender.com/)
> [!IMPORTANT]
> **Observação sobre o Deploy:** Como a aplicação está hospedada no plano gratuito do Render, a instância entra em modo de repouso após um período de inatividade. O primeiro acesso pode levar de **30 a 60 segundos** para carregar enquanto o servidor "acorda". Caso a inatividade persistir, acesse o link reserva abaixo.
- **Deploy2 (Koyeb):** [https://grand-tracey-eynish-fd49fdc4.koyeb.app/](https://grand-tracey-eynish-fd49fdc4.koyeb.app/)
- **Repositório GitHub:** [https://github.com/NishimotoEydi/rayai-autou](https://github.com/NishimotoEydi/rayai-autou)

---

## 📁 Estrutura do Projeto

```text
rayai-autou/
├── app/
│   ├── main.py        # Ponto de entrada da aplicação (FastAPI)
│   ├── ai_service.py   # Lógica de integração com a IA (Groq/Llama)
│   └── utils.py        # Funções auxiliares (Limpeza de texto e PDF)
├── static/
│   └── js/
│       └── script.js   # Lógica do frontend (Interações e chamadas de API)
├── index.html          # Interface do usuário (Página única)
├── requirements.txt    # Lista de dependências do Python
├── .env                # Variáveis de ambiente (Chave da API)
└── README.md           # Documentação principal
```

---

## 🎯 Contexto do Desafio

Empresas do setor financeiro lidam com volumes altíssimos de e-mails diários. Muitos desses e-mails são:
- **Produtivos:** Solicitações de suporte, atualizações de casos, dúvidas técnicas.
- **Improdutivos:** Agradecimentos, felicitações, mensagens irrelevantes.

RayAI utiliza Inteligência Artificial para classificar essas mensagens automaticamente e sugerir respostas imediatas e adequadas.

### Funcionalidades Principais
- **Upload de Arquivos:** Suporte para leitura de arquivos `.txt` e `.pdf`.
- **Análise com IA:** Classificação em tempo real entre "Produtivo" e "Improdutivo".
- **Sugestão de Resposta:** Geração automática de uma resposta formal e prestativa para e-mails produtivos.
- **Interface Premium:** Design de interface inovador explorando o 'Dark Glassmorphism'. A composição utiliza fundos profundos, gradientes sofisticados (Indigo/Violeta/Ciano) e a fonte Inter para uma leitura Clara. As microinterações suaves foram desenhadas para tornar a navegação intuitiva e fluida.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python 3.10+**
- **FastAPI:** Framework web de alta performance.
- **Groq SDK:** Integração com o modelo **Llama 3.1 8B** para processamento de linguagem natural ultra-rápido.
- **NLTK:** Processamento de texto e remoção de *stop words*.
- **PyPDF2:** Extração de texto de arquivos PDF.

### Frontend
- **HTML5 & Vanilla JavaScript**
- **Tailwind CSS:** Estilização moderna e responsiva.
- **Phosphor Icons:** Biblioteca de ícones consistente.

---

## ⚙️ Como Executar Localmente

Siga os passos abaixo para rodar o projeto em sua máquina:

### 1. Clonar o Repositório
```bash
git clone https://github.com/NishimotoEydi/rayai-autou.git
cd rayai-autou
```

### 2. Configurar o Ambiente Virtual
```bash
python -m venv venv
# No Windows:
.\venv\Scripts\activate
# No Linux/Mac:
source venv/bin/activate
```

### 3. Instalar Dependências
```bash
pip install -r requirements.txt
```

### 4. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API do Groq:
```env
GROQ_API_KEY=sua_chave_aqui
```

### 5. Iniciar o Servidor
```bash
uvicorn app.main:app --reload
```
Acesse em: `http://localhost:8000`

---

## 🧪 Notas Técnicas
A IA foi configurada com um *System Prompt* específico para garantir que as classificações sigam rigorosamente os critérios do desafio. O processamento de texto inclui uma etapa de limpeza para remover pontuação e palavras irrelevantes, melhorando a precisão da análise pelo modelo de LLM.

---
Desenvolvido por [Eydi Nishimoto](https://github.com/NishimotoEydi)
