import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import prompt_builder

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

class HumanizeRequest(BaseModel):
    text: str
    mode: str = "humanize"
    strength: str = "medium"
    tone: str = "professional"

class HumanizeResponse(BaseModel):
    humanized_text: str

class AnalysisRequest(BaseModel):
    text: str

class AnalysisResponse(BaseModel):
    human_likeness: int
    clarity: int
    engagement: int
    readability: int
    professionalism: int
    strengths: list[str]
    suggestions: list[str]

@app.post("/humanize", response_model=HumanizeResponse)
async def humanize_text(request: HumanizeRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    if not api_key:
        # For development/testing purposes when API key is missing
        return HumanizeResponse(humanized_text=f"[MOCK] {request.mode.capitalize()}d version of: {request.text}")

    try:
        model = genai.GenerativeModel('gemini-2.5-flash')

        prompt = prompt_builder.get_prompt(
            mode=request.mode,
            tone=request.tone,
            strength=request.strength,
            text=request.text
        )

        response = model.generate_content(prompt)
        return HumanizeResponse(humanized_text=response.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_text(request: AnalysisRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    if not api_key:
        return AnalysisResponse(
            human_likeness=85,
            clarity=90,
            engagement=75,
            readability=88,
            professionalism=92,
            strengths=["Clear structure", "Professional tone", "Good grammar"],
            suggestions=["Use more active voice", "Vary sentence length"]
        )

    try:
        model = genai.GenerativeModel('gemini-pro')
        prompt = prompt_builder.build_analysis_prompt(request.text)

        response = model.generate_content(prompt)
        text_response = response.text

        # Clean response if it contains markdown markers
        if text_response.startswith("```json"):
            text_response = text_response.strip("```json").strip("```").strip()
        elif text_response.startswith("```"):
            text_response = text_response.strip("```").strip()

        import json
        analysis_data = json.loads(text_response)
        return AnalysisResponse(**analysis_data)

    except Exception as e:
        print(f"Analysis Error: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
