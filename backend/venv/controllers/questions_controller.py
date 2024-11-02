from flask import Blueprint, request, jsonify
import json
import os
from services.questions import combine_content, extract_keywords, ask_chatbot
#define scrape blueprint
questions_blueprint = Blueprint('questions', __name__)


# #load Questions form JSON file
# #opening and reading file
# def load_questions():
#     file_path=os.path.join(os.path.dirname(__file__),'../questions.json')  
#     with open(file_path,'r') as file:
#         questions=json.load(file)
#     return questions

@questions_blueprint.route('/generate-questions', methods=['POST'])
def generate_questions():
    data=request.get_json()
    content=data.get("content")
    headings=data.get("headings")

    if not content:
        return jsonify({'error': 'Content is required'}), 400
    
    #combine the content and headings
    combined_content=combine_content(content,headings)
    #extract keywords
    keywords=extract_keywords(combined_content)
    print(f"Extracted Keywords: {keywords}")
    #ask the chatbot to generate questions
    questions=ask_chatbot(keywords)

    return jsonify(questions),200








#based on the category and previous responses load the questions for the category
# def generate_questions():
#     data=request.get_json()
#     category=data.get('category')

#     questions=load_questions()
#     category_questions=questions.get(category,[])
#     return jsonify(category_questions),200
    
# @questions_blueprint.route('/generate-questions', methods=['POST'])
# #based on the category and previous responses load the questions for the category
# def generate_questions():
#     data=request.get_json()
#     content=data.get("content")

#     if not content:
#         return jsonify({'error': 'Content is required'}), 400
    
#     #extract keywords
#     keywords=extract_keywords(content)
#     print(f"Extracted Keywords: {keywords}")
#     #generate questions
#     questions=generate_questions_from_Keywords(keywords)
#     print(generate_questions_from_Keywords(keywords))

#     return jsonify(questions),200
