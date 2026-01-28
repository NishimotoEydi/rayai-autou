from fastapi import FastAPI, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.utils import extract_text_from_pdf, limpar_texto
from app.ai_service import analisar_email

app = FastAPI()
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