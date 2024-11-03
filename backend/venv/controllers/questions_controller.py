from flask import Blueprint, request, jsonify
from services.questions import combine_content, extract_keywords, ask_chatbot
#define scrape blueprint
questions_blueprint = Blueprint('questions', __name__)

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