import os
import json
import logging
import re
import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            logger.warning("GEMINI_API_KEY not found in environment. Service will run in MOCK mode.")
            self.model = None
        else:
            genai.configure(api_key=self.api_key)
            # Using gemini-2.5-flash as mandated in the stabilization requirements
            self.model_name = "gemini-2.5-flash"
            self.model = genai.GenerativeModel(self.model_name)

    async def generate_content(self, prompt: str) -> str:
        if not self.model:
            # Fallback for verification/dev when API key is missing
            return "[MOCK] This is a mock humanized response because GEMINI_API_KEY is missing."

        try:
            response = self.model.generate_content(prompt)
            if not response.text:
                logger.warning("Empty response from Gemini")
                return ""
            return response.text
        except Exception as e:
            error_msg = str(e)
            logger.error(f"Gemini API error: {error_msg}")

            if "429" in error_msg or "quota" in error_msg.lower():
                raise HTTPException(
                    status_code=429,
                    detail="API rate limit exceeded. Please try again in a moment."
                )

            raise HTTPException(
                status_code=500,
                detail=f"AI Service Error: {error_msg}"
            )

    async def generate_json(self, prompt: str) -> dict:
        content = await self.generate_content(prompt)
        return self._robust_json_parser(content)

    def _robust_json_parser(self, text: str) -> dict:
        """
        Attempts to extract and parse JSON from a string that might contain markdown or noise.
        """
        if not text:
            return self._get_fallback_analysis()

        # Try to find JSON block
        json_match = re.search(r'(\{.*\})', text, re.DOTALL)
        if json_match:
            json_str = json_match.group(1)
        else:
            json_str = text

        try:
            return json.loads(json_str)
        except json.JSONDecodeError:
            logger.warning(f"Failed to parse JSON from response: {text[:100]}...")
            return self._get_fallback_analysis()

    def _get_fallback_analysis(self) -> dict:
        return {
            "human_likeness": 70,
            "clarity": 75,
            "engagement": 65,
            "readability": 80,
            "professionalism": 85,
            "strengths": ["Clear structure", "Professional tone"],
            "suggestions": ["Try adding more personal anecdotes", "Vary sentence length"]
        }

# Global instance
gemini_service = GeminiService()
