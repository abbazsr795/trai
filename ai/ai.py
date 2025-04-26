from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import Dict
import os
import uvicorn
import json
import google.genai as genai
from google.genai.types import GenerateContentConfig, GenerateContentResponse
from fastapi.responses import JSONResponse

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Define output model
class ImageInfo(BaseModel):
    object_type: str
    object_condition: str

# Initialize Gemini Client
def get_client() -> genai.Client:
    client: genai.Client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
    return client

# Function to get the Gemini response
def get_response(image_data: bytes, client: genai.Client) -> Dict[str, str]:
    response: GenerateContentResponse = client.models.generate_content(
        model='gemini-1.5-flash',
        contents=[
            {"mime_type": "image/png", "data": image_data},
            "Classify the object. Classify the object in this image into one of the following categories: " +
            "'perfectly reusable', 'reusable with some level of tinkering', or 'can't be used anymore'." +
            " Only give the name of the class and not any text."
        ],
        config=GenerateContentConfig(
            system_instruction='You are an object classifier as well as an object condition classifier',
            response_mime_type='application/json',
            response_schema=ImageInfo,
            seed=42,
        ),
    )
    dictionary: Dict[str, str] = json.loads(response.text)
    return dictionary

# FastAPI endpoint
@app.post("/classify-image", response_model=ImageInfo)
async def classify_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    image_data = await file.read()

    client: genai.Client = get_client()
    
    try:
        response: Dict[str, str] = get_response(image_data, client)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error from Gemini API: {str(e)}")

    return response

# @app.post("/classify-image/")
# async def classify_image(file: UploadFile = File(...)):
#     image_bytes = await file.read()
#     client = get_client()
#     try:
#         result = get_response(image_bytes, client)
#         return JSONResponse(content=result)
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})
    
if __name__ == "__main__":
    uvicorn.run(
        "main:app",  # "main" is your filename (without .py), "app" is your FastAPI instance
        host="0.0.0.0",
        port=8000,
        reload=True  # optional, for development (auto-reload on code change)
    )
    