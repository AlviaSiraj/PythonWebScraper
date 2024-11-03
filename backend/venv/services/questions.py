from openai import OpenAI
import time
import json
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import yake
import requests
from bs4 import BeautifulSoup

load_dotenv()

# Access your API key
#TO USE, GET AN API KEY FROM OPENAI AND ADD IT TO THE .env FILE 
#(i had to pay for mine)
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
client = OpenAI( api_key=OPENAI_API_KEY)

yake_extractor = yake.KeywordExtractor(lan="en", n=1, dedupLim=0.9, top=10)
#combine the content and the headings to send a better prompt to the AI
def combine_content(content,headings):
    """Classify content based on keyword matching."""
    # Join content and headers paragraphs into a single text
    content_text = content + headings
    return content_text

#take the contend and return keywords to send to the chatbot
def extract_keywords(content):
    """Extracts top keywords from content using YAKE."""
    keywords = yake_extractor.extract_keywords(content)
    return [kw[0] for kw in keywords]

def ask_chatbot(keywords):
    """Ask the openai chatbot a question based on content and keywords."""
    prompt = f"""
You are an expert assistant generating 5 user-friendly questions with multiple choice options based on these keywords.
Keywords: {', '.join(keywords)}

Return the questions and answer choices in JSON format like this:
{{
  "questions": [
    {{
      "question": "What is Diwali?",
      "options": ["A) Festival of Lights", "B) Festival of Colors", "C) Harvest Festival", "D) New Year"]
    }},
    ...
  ]
}}
    """
    #handle the rate limit exceeded problem
    retries = 5  # You can increase the number of retries
    wait_time = 5  # Start with 5 seconds between retries
    for attempt in range(retries):
        try:
            response = client.chat.completions.create(
                model="gpt-4-turbo",  # or your intended model
                messages=[{"role": "user", "content": prompt}]
            )
            
            # Correctly access the content of the response
            response_content = response.choices[0].message.content.strip()
            parsed_json = json.loads(response_content)
            return parsed_json  # Return JSON object
            
        except json.JSONDecodeError:
           
            return {"error": "Invalid JSON format in response"}
        except Exception as e:
            print(f"Rate limit exceeded. Retrying in {wait_time} seconds...")
            time.sleep(wait_time)
            wait_time *= 2  # Exponential backoff
        except Exception as e:
            print(f"An error occurred: {e}")
            break

    return "Request failed after several retries."