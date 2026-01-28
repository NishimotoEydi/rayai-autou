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
            "Você é um assistente de triagem de e-mails. "
            "Classifique como 'Produtivo' ou 'Improvutivo'. "
            "Produtivo: Emails que requerem uma ação ou resposta específica (ex.: solicitações de suporte técnico, atualização sobre casos em aberto, dúvidas sobre o sistema). "
            "Improdutivo: Emails que não necessitam de uma ação imediata (ex.: mensagens de felicitações, agradecimentos)."
            "Se for produtivo, sugira uma resposta leve, prestativa e formal. "
            "Responda OBRIGATORIAMENTE em JSON com as chaves: "
            "'classificacao', 'justificativa' e 'resposta_sugerida'."
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

