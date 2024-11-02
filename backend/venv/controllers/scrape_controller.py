from flask import Blueprint, request, jsonify
from services.scraper import scrape_website

#define scrape blueprint
scrape_blueprint = Blueprint('scrape', __name__)

@scrape_blueprint.route('/scrape', methods=['POST'])
def scrape():
    #get url from JSON payload
    data=request.get_json()
    url=data.get('url')

    if not url:
        return jsonify({'error': 'URL is required'}), 400
    
    #call the scrape service
    result, error=scrape_website(url)

    if error:
        return jsonify({'error': error}), 500
    
    return jsonify(result),200