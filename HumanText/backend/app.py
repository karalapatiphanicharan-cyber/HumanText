import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import prompt_builder
from services.gemini_service import gemini_service

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

    prompt = prompt_builder.get_prompt(
        mode=request.mode,
        tone=request.tone,
        strength=request.strength,
        text=request.text
    )

    try:
        humanized_text = await gemini_service.generate_content(prompt)
        return HumanizeResponse(humanized_text=humanized_text)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_text(request: AnalysisRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    prompt = prompt_builder.build_analysis_prompt(request.text)

    try:
        analysis_data = await gemini_service.generate_json(prompt)
        return AnalysisResponse(**analysis_data)
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Analysis Error: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
