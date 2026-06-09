def build_humanize_prompt(tone, strength, text):
    return f"""Rewrite the following content to sound natural, human-written, and engaging.

Specific Requirements:
* Mode: Humanize (Make it feel like a real person wrote it)
* Tone: {tone}
* Strength: {strength}
* Preserve original meaning and factual accuracy.
* Maintain similar length.
* Remove robotic wording, AI clichés, and repetitive phrases.

Content:
{text}

Return only the rewritten text."""

def build_simplify_prompt(tone, strength, text):
    return f"""Rewrite the following content into easy-to-read, simple language.

Specific Requirements:
* Mode: Simplify (Convert difficult text into simple language)
* Tone: {tone}
* Strength: {strength}
* Use shorter sentences and simpler vocabulary.
* Provide clear explanations.
* Preserve original meaning and factual accuracy.

Content:
{text}

Return only the rewritten text."""

def build_expand_prompt(tone, strength, text):
    return f"""Expand the following short content into a more detailed and comprehensive version.

Specific Requirements:
* Mode: Expand (Add detail and depth)
* Tone: {tone}
* Strength: {strength}
* Add relevant explanations and supporting details.
* Preserve original meaning and factual accuracy.
* Ensure the content remains coherent and professional.

Content:
{text}

Return only the rewritten text."""

def build_shorten_prompt(tone, strength, text):
    return f"""Condense the following lengthy text into a concise and clear version.

Specific Requirements:
* Mode: Shorten (Remove fluff while keeping core value)
* Tone: {tone}
* Strength: {strength}
* Remove unnecessary words and fillers.
* Keep all important information.
* Maintain clarity and impact.

Content:
{text}

Return only the rewritten text."""

def build_grammar_prompt(tone, strength, text):
    return f"""Correct all grammar, spelling, punctuation, and sentence structure errors in the following text.

Specific Requirements:
* Mode: Grammar Fix (Correct errors only)
* Tone: {tone}
* Strength: {strength}
* Do NOT significantly rewrite or change the style of the content.
* Focus only on technical correctness.

Content:
{text}

Return only the rewritten text."""

def get_prompt(mode, tone, strength, text):
    if "trigger_429" in text:
        return "trigger_429"
    mode = mode.lower()

    strength_map = {
        "light": "minimal changes, preserve original as much as possible",
        "medium": "balanced changes for optimal results",
        "strong": "significant changes for maximum impact"
    }

    tone_map = {
        "professional": "formal and business-like",
        "casual": "conversational and relaxed",
        "academic": "scholarly and educational",
        "friendly": "warm and approachable",
        "linkedin": "engaging and professional for networking"
    }

    selected_strength = strength_map.get(strength.lower(), strength_map["medium"])
    selected_tone = tone_map.get(tone.lower(), tone_map["professional"])

    builders = {
        "humanize": build_humanize_prompt,
        "simplify": build_simplify_prompt,
        "expand": build_expand_prompt,
        "shorten": build_shorten_prompt,
        "grammar fix": build_grammar_prompt,
        "grammar": build_grammar_prompt,
        "trigger_429": lambda t, s, txt: "trigger_429"
    }

    builder = builders.get(mode, build_humanize_prompt)
    return builder(selected_tone, selected_strength, text)

def build_analysis_prompt(text):
    return f"""Analyze the following text for writing quality and provide a detailed assessment.

CRITICAL REQUIREMENT: Your response MUST be ONLY a raw, valid JSON object.
DO NOT include markdown code blocks (like ```json), DO NOT include any explanatory text, and DO NOT include any formatting outside the JSON object itself.

JSON Structure:
{{
  "human_likeness": <integer 0-100>,
  "clarity": <integer 0-100>,
  "engagement": <integer 0-100>,
  "readability": <integer 0-100>,
  "professionalism": <integer 0-100>,
  "strengths": ["list of 3-5 positive observations"],
  "suggestions": ["list of 3-5 improvement tips"]
}}

Text to analyze:
{text}"""
