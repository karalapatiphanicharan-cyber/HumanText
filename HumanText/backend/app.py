import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

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
    strength: str = "medium"
    tone: str = "professional"

class HumanizeResponse(BaseModel):
    humanized_text: str

@app.post("/humanize", response_model=HumanizeResponse)
async def humanize_text(request: HumanizeRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    if not api_key:
        # For development/testing purposes when API key is missing
        return HumanizeResponse(humanized_text=f"[MOCK] Humanized version of: {request.text}")

    try:
        model = genai.GenerativeModel('gemini-pro')

        strength_instructions = {
            "light": "Perform minimal rewriting. Preserve original wording as much as possible while slightly improving the flow.",
            "medium": "Perform balanced rewriting. Improve readability and flow while keeping the structure natural.",
            "strong": "Aggressively humanize the content. Rewrite it heavily to ensure it sounds entirely human-written while strictly preserving the original meaning."
        }

        tone_instructions = {
            "professional": "Use a formal business style.",
            "casual": "Use a conversational and relaxed tone.",
            "academic": "Use a research-oriented and educational tone.",
            "friendly": "Use a warm and approachable tone.",
            "linkedin": "Use a professional networking style suitable for LinkedIn."
        }

        selected_strength = strength_instructions.get(request.strength.lower(), strength_instructions["medium"])
        selected_tone = tone_instructions.get(request.tone.lower(), tone_instructions["professional"])

        prompt = f"""Rewrite the following content to sound natural, human-written, and engaging.

Specific Requirements:
* Strength: {selected_strength}
* Tone: {selected_tone}
* Preserve original meaning and factual accuracy.
* Maintain similar length.
* Improve readability and remove robotic AI wording.
* Avoid repetitive AI phrases.
* Make it feel like it was written by a real person.

Content:
{request.text}

Return only the rewritten text."""

        response = model.generate_content(prompt)
        return HumanizeResponse(humanized_text=response.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
