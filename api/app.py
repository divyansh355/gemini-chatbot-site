from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

app = Flask(__name__)
# CORS(app)  # This will allow all origins.
CORS(app, resources={r"/chat": {"origins": "https://gemini-chatbot-site.netlify.app"}}) # This will allows some specific origins

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/chat', methods=['POST'])
def get_command():
    user_query = request.json['query']
    response = query_google_genai(user_query)
    return jsonify({'result': response})

def query_google_genai(query):
    response = model.generate_content(query)
    return response.text

if __name__ == '__main__':
    app.run()