import os
import json
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

client = Groq(api_key=api_key)

def analisar_email(clean_text: str):
    
    system_prompt = {
        "role": "system",
        "content": (
            "Você é um especialista em triagem de e-mails para o setor financeiro. "
            "Sua tarefa é classificar e-mails em 'Produtivo' ou 'Improdutivo' e sugerir uma resposta. \n\n"
            "CRITÉRIOS:\n"
            "- Produtivo: Mensagens que exigem ação, suporte técnico, dúvidas sobre sistemas, arquivos para processamento ou status de solicitações.\n"
            "- Improdutivo: Mensagens de agradecimento, felicitações (aniversário, feriados), elogios sem solicitação ou spam.\n\n"
            "EXEMPLOS:\n"
            "1. Usuário: 'Boa tarde, meu acesso ao portal de investimentos está bloqueado. Podem ajudar?'\n"
            "   Resposta: {'classificacao': 'Produtivo', 'justificativa': 'Solicitação de suporte técnico para acesso ao portal.', 'resposta_sugerida': 'Olá! Lamento pelo inconveniente com seu acesso. Já encaminhei sua solicitação para nossa equipe de TI, que entrará em contato em breve para realizar o desbloqueio. Enquanto isso, verifique se seus dados estão corretos.'}\n\n"
            "2. Usuário: 'Parabéns pelo excelente atendimento de ontem! Grande abraço.'\n"
            "   Resposta: {'classificacao': 'Improdutivo', 'justificativa': 'Elogio sem solicitação de ação imediata.', 'resposta_sugerida': 'Muito obrigado pelo feedback positivo! Ficamos felizes em saber que você teve uma boa experiência conosco. Seguimos à disposição.'}\n\n"
            "INSTRUÇÕES FINAIS:\n"
            "- A resposta sugerida deve ser formal, prestativa e empática.\n"
            "- Responda OBRIGATORIAMENTE em formato JSON válido.\n"
            "- Campos: 'classificacao', 'justificativa', 'resposta_sugerida'."
        )
    }
    user_prompt = {
        "role": "user",
        "content": f"Analise o seguinte e-mail: {clean_text}"
    }
    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[system_prompt, user_prompt],
        response_format={"type": "json_object"}
    )

    return json.loads(completion.choices[0].message.content)

