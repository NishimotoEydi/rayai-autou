import re
import PyPDF2
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')
stop_words = set(stopwords.words('portuguese'))

def extract_text_from_pdf(file, max_pages=5):
    reader = PyPDF2.PdfReader(file)
    full_text = ""
    pages_to_read = min(len(reader.pages), max_pages)
    for i in range(pages_to_read):
        content = reader.pages[i].extract_text()
        if content:
            full_text += content + " "
    return full_text

def limpar_texto(text: str):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    words = text.split()
    filtered_words = [w for w in words if w not in stop_words]
    return ' '.join(filtered_words)
