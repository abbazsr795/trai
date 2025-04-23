import os
from dotenv import load_dotenv
from pydantic import BaseModel
import google.genai as genai
import json
from typing import Dict
from google.genai.types import GenerateContentConfig,GenerateContentResponse
load_dotenv()

class ImageInfo(BaseModel):
    object_type: str
    object_condition: str


# Set your API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_client() -> genai.Client:
    client : genai.Client = genai.Client()
    return client

def get_response(image,client: genai.Client) -> Dict[str,str]:
    response : GenerateContentResponse = client.models.generate_content(
        model='gemini-1.5-flash',
        contents = [
            image,
            "Classify the object" + 
            "Classify the object in this image into one of the following categories: " +
            "'perfectly reusable', 'reusable with some level of tinkering', or 'can't be used anymore'."
            + "only give the name of the class and not any text"
        ],
        config=GenerateContentConfig(
            system_instruction='you are a object classifier as well as a object condition classifier',
            response_mime_type= 'application/json',
            response_schema=ImageInfo,
            seed=42,
        ),
    )
    dictionary : Dict[str,str] = json.loads(response.text)
    return dictionary

def main(image) -> Dict[str,str]:
    client : genai.Client = get_client()
    response : Dict[str,str] = get_response(image,client)
    return response