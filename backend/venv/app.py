from flask import Flask, request, jsonify
from flask_cors import CORS
from controllers.scrape_controller import scrape_blueprint
from controllers.questions_controller import questions_blueprint
from controllers.answers_controller import answers_blueprint

app=Flask(__name__)
CORS(app) #enable cross-origin requests

app.config.from_object('config')
app.register_blueprint(scrape_blueprint)
app.register_blueprint(questions_blueprint, url_prefix='/api')
app.register_blueprint(answers_blueprint, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)