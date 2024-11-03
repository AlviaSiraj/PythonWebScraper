from flask import Blueprint, request, jsonify
from services.answers import submit_answer

#define answers blueprint
answers_blueprint = Blueprint('answer', __name__)

@answers_blueprint.route('/answers', methods=['POST'])
def post_answers():
    data=request.get_json()
    category=data.get('category')
    question=data.get('question')
    answer=data.get('answer')

    if not category: 
        return jsonify({'error': 'category is required'}), 400
    
    if not question:
        return jsonify({'error': 'question is required'}), 400  
    
    if not answer:  
        return jsonify({'error': 'answer is required'}), 400
    
    #call the scrape service
    result, error=submit_answer(category, question, answer)

    if error:
        return jsonify({'error': error}), 500
    
    return jsonify(result),200