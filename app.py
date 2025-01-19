from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
from flask_cors import CORS
import os
from dotenv import load_dotenv
from chatbot import mainChatBot
from recommendation import recommendGifts
from constants import desc, gifts

model = genai.GenerativeModel('gemini-1.5-flash')
api_key = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')
app = Flask(__name__)
CORS(app)
CORS(app, resources={
    r"/*": {  # Apply to all endpoints
        "origins": "http://10.70.37.143:5173",  # Allow all origins
        "methods": ["GET", "POST", "OPTIONS"],  # Allow common methods
        "allow_headers": ["Content-Type", "Authorization"],  # Allow common headers
        "supports_credentials" : True  # Allow cookies
    }
})




#ChatBot Routes

@app.route('/')
def index():
    return "<p>Hello World</p><br>"

@app.route('/chatbot', methods=['POST'])
def chat():
    try : 
        data = request.json
        question = data['message']
        return mainChatBot(question)
    except Exception as e:
        return jsonify({"error": str(e)}), 500




@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        responses = [data[f'Q{i+1}'] for i in range(25)]
        return jsonify(recommendGifts(responses)),200
        # responses = jsonify(data)
        # return recommendGifts(responses)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/getGifts', methods=['GET'])
def getGifts():
    return {
        "gifts": gifts,
        "desc": desc
    }
    

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))