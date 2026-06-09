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
        model = genai.GenerativeModel('gemini-2.5-flash')

        prompt = f"""Rewrite the following content so it sounds natural,
human-written, engaging, and conversational.

Requirements:

* Preserve original meaning
* Preserve factual accuracy
* Maintain similar length
* Improve readability
* Remove robotic AI wording
* Avoid repetitive AI phrases
* Make it feel written by a real person

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
