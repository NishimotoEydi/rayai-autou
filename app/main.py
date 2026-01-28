from fastapi import FastAPI, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import nltk
import os

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')
    nltk.download('punkt')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse("index.html")

@app.post("/analyze/")
async def analyze_endpoint(
    text_input: str = Form(None),
    file_input: UploadFile = File(None)
):
    raw_text = ""

    if file_input:
        pdf_text = extract_text_from_pdf(file_input.file)
        raw_text = pdf_text

    elif text_input:
        raw_text = text_input

    cleaned = limpar_texto(raw_text)
    result = analisar_email(cleaned)

    return result

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)