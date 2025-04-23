import os
from dotenv import load_dotenv
from pydantic import BaseModel
import google.generativeai as genai
import json
from typing import Dict
from google.generativeai.types import GenerationConfig
load_dotenv()

class ImageInfo(BaseModel):
    object_type: str
    object_condition: str


# Set your API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_model() -> genai.GenerativeModel:
    model = genai.GenerativeModel('gemini-1.5-flash')
    return model

def get_response(image,model: genai.GenerativeModel) -> Dict[str,str]:
    response = model.generate_content(
        contents = [
            image,
            "Classify the object" + 
            "Classify the object in this image into one of the following categories: " +
            "'perfectly reusable', 'reusable with some level of tinkering', or 'can't be used anymore'."
            + "only give the name of the class and not any text"
        ],
        generation_config=GenerationConfig(
            response_mime_type='application/json',
            response_schema=ImageInfo,
        ),
    )
    dictionary = json.loads(response.text)
    return dictionary

def main(image) -> Dict[str,str]:
    model : genai.GenerativeModel = get_model()
    response = get_response(image,model)
    return response