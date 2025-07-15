from fastapi import FastAPI, UploadFile, File, Form, HTTPException
import os
from google import genai
from dotenv import load_dotenv
from pathlib import Path
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
from datetime import datetime
# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Get encryption key from environment variables
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", "elevate-resume-ai-secret-key-2024")

def decrypt_api_key(encrypted_key: str) -> str:
    """Decrypt the AES encrypted API key using CryptoJS format"""
    try:
        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
        from cryptography.hazmat.backends import default_backend
        import hashlib
        
        # Fix Base64 format (replace spaces with + signs)
        encrypted_key = encrypted_key.replace(' ', '+')
        
        # Decode the Base64 encrypted string
        encrypted_data = base64.b64decode(encrypted_key)
        
        # CryptoJS format: "Salted__" + salt (8 bytes) + ciphertext
        if not encrypted_data.startswith(b'Salted__'):
            raise ValueError("Invalid CryptoJS format - missing 'Salted__' prefix")
        
        # Extract salt and ciphertext
        salt = encrypted_data[8:16]  # Next 8 bytes after "Salted__"
        ciphertext = encrypted_data[16:]  # Rest is ciphertext
        
        # Derive key and IV using CryptoJS method (EVP_BytesToKey equivalent)
        def derive_key_and_iv(password, salt, key_len=32, iv_len=16):
            """
            Equivalent to OpenSSL's EVP_BytesToKey() with count=1
            MD5 is used as the hash function (same as CryptoJS)
            """
            derived = b''
            password = password.encode() if isinstance(password, str) else password
            while len(derived) < (key_len + iv_len):
                hash_obj = hashlib.md5()
                hash_obj.update(derived[-16:] if derived else b'')
                hash_obj.update(password)
                hash_obj.update(salt)
                derived += hash_obj.digest()
            return derived[:key_len], derived[key_len:key_len + iv_len]
        
        # Derive key and IV
        key, iv = derive_key_and_iv(ENCRYPTION_KEY, salt)
        
        # Decrypt using AES CBC
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        decryptor = cipher.decryptor()
        decrypted_padded = decryptor.update(ciphertext) + decryptor.finalize()
        
        # Remove PKCS7 padding
        padding_len = decrypted_padded[-1]
        decrypted_key = decrypted_padded[:-padding_len].decode('utf-8')
        
        return decrypted_key
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to decrypt API key: {str(e)}")

origins = [
    "https://hiremeats.vercel.app",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/ping")
def ping():
    return {"message": "Server is running"}



@app.post("/validate-api-key")
def validate_api_key(api_key: str):
    try:
        # Decrypt the API key
        decrypted_api_key = decrypt_api_key(api_key)
        
        client = genai.Client(api_key=decrypted_api_key)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=["Hello How are you"]
        )
        if not response or not response.text:
            raise HTTPException(status_code=401, detail="Invalid API key")
        return {"valid": True, "message": "API key is valid"}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid API key")

@app.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: Optional[str] = Form(None),
    job_title: Optional[str] = Form(None),
    company: Optional[str] = Form(None),
    api_key: str = Form(...),
    experience: Optional[int] = Form(None)
):
    try:
        # Create upload directory if it doesn't exist
        save_folder = "uploaded_files"
        Path(save_folder).mkdir(parents=True, exist_ok=True)
        
        # Save the uploaded file
        save_path = Path(save_folder, file.filename)
        with open(save_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # Decrypt and initialize Gemini client with provided API key
        decrypted_api_key = decrypt_api_key(api_key)
        client = genai.Client(api_key=decrypted_api_key)
        
        
        myfile = client.files.upload(file=str(save_path))
        
        # Get current date for timeline accuracy
        current_date = datetime.now().strftime("%B %d, %Y")
        
        # Compose job description prompt
        prompt = f""" 

```
Current date is {current_date}. You are an ATS (Applicant Tracking System) resume evaluation expert. First verify if the uploaded file is a valid resume, then analyze resumes for compatibility with specific job roles using industry-standard ATS criteria. If the file is not a resume, return the invalid response format below.

## Input Data:
- **Resume**: {file.filename}
- **Job Title**: {job_title}
- **Company**: {company}
- **Job Description**: {job_description if job_description else f'Use your knowledge of typical {job_title} roles at {company} to infer the requirements'}
- **Candidate's Experience Level**: {experience if experience else 'Not provided'}

## Analysis Instructions:

### 1. Overall Resume Score (0-100)
Calculate based on weighted average of all ATS criteria:
- Skill Match (25%)
- Keyword Match (20%)
- Experience Relevance (20%)
- Resume Formatting (15%)
- Action Verb Usage (10%)
- Job Fit (10%)

### 2. Feedback Summary (Exactly 10 lines)
- Lines 1-5: Highlight strengths and positive aspects
- Lines 6-10: Identify areas for improvement with specific recommendations

### 3. Pros and Cons Analysis
- **Pros**: Exactly 3 specific strengths
- **Cons**: Exactly 3 specific weaknesses with improvement suggestions

### 4. ATS Criteria Ratings (Each scored 0-10)
- **Skill Match Score**: Technical and soft skills alignment with job requirements
- **Keyword Match Score**: Presence of relevant industry keywords and job-specific terms
- **Experience Relevance Score**: How well past experience matches role requirements
- **Resume Formatting Score**: ATS-friendly formatting, readability, structure
- **Action Verb Usage Score**: Strong action verbs that demonstrate impact
- **Job Fit Score**: Overall suitability for the specific role and company

### 5. Confidence Score (0-100)
Rate your confidence in the assessment accuracy based on:
- Clarity of resume information
- Completeness of job description
- Availability of specific role requirements
- Quality of resume formatting/readability

## Output Format:
RESPONSE FORMAT: Return ONLY the JSON object. No markdown, no code blocks, no additional text.
WRONG: ```json{...}```
RIGHT: `{...}`

```json
{{
  "overall_score": 85,
  "feedback_summary": [
    "Strength point 1",
    "Strength point 2", 
    "Strength point 3",
    "Strength point 4",
    "Strength point 5",
    "Improvement area 1",
    "Improvement area 2",
    "Improvement area 3",
    "Improvement area 4",
    "Improvement area 5"
  ],
  "pros": [
    "Specific strength 1",
    "Specific strength 2", 
    "Specific strength 3"
  ],
  "cons": [
    "Specific weakness 1 with improvement suggestion",
    "Specific weakness 2 with improvement suggestion",
    "Specific weakness 3 with improvement suggestion"
  ],
  "ats_criteria_ratings": {{
    "skill_match_score": 8,
    "keyword_match_score": 7,
    "experience_relevance_score": 9,
    "resume_formatting_score": 6,
    "action_verb_usage_score": 8,
    "job_fit_score": 7
  }},
  "confidence_score": 85
}}
```

## Invalid Resume Response Format:
If the uploaded file is not a valid resume (e.g., random document, image without resume content, etc.), return this exact format:
```json
{{
  "overall_score": 0,
  "feedback_summary": [
    "Not a valid resume file",
  ],
  "pros": [
    "Not a valid resume file",
  ],
  "cons": [
    "Not a valid resume file",
  ],
  "ats_criteria_ratings": {{
    "skill_match_score": 0,
    "keyword_match_score": 0,
    "experience_relevance_score": 0,
    "resume_formatting_score": 0,
    "action_verb_usage_score": 0,
    "job_fit_score": 0
  }},
  "confidence_score": 0
}}
```

## Guidelines:
- Use clear, actionable language suitable for job seekers
- Return ONLY pure JSON without markdown wrappers (```json), code blocks, or any additional text
- Output must start with  and end with - no extra characters or formatting
- Use clear, actionable language suitable for job seekers
- Be specific in feedback rather than generic
- Focus on measurable improvements
- Ensure all scores are realistic and justified
- Also about Resume layouts and formatting
- Maintain consistency in scoring methodology
- Higher confidence scores indicate more reliable assessments
```
ABSOLUTELY CRITICAL - READ THIS CAREFULLY:
1. NO markdown formatting whatsoever
2. NO ```json or ``` in your response
3. Start with "{" and end with "}"
4. MUST include confidence_score field
5. If you include any formatting other than pure JSON, the response is INVALID
  """  
        # Call Gemini model
        response = client.models.generate_content(
            model="gemini-2.5-pro",
            contents=[prompt, myfile]
        )
        
        # Clean the response text to remove markdown formatting
        clean_response = response.text.replace('```json\n', '').replace('\n```', '').replace('```json', '').replace('```', '')
        print(clean_response)
        
        # Clean up: remove the uploaded file
        if save_path.exists():
            save_path.unlink()
            
        return {"response": clean_response}
        
    except Exception as e:
        # Clean up in case of error
        if 'save_path' in locals() and save_path.exists():
            save_path.unlink()
        raise HTTPException(status_code=500, detail=str(e)) 



