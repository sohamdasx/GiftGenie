from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
import os
from dotenv import load_dotenv
from chatbot import mainChatBot
from recommendation import recommendGifts

model = genai.GenerativeModel('gemini-1.5-flash')
api_key = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')
app = Flask(__name__)




#ChatBot Routes

@app.route('/')
def index():
    return "Hello World"

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
    






if __name__ == '__main__':
    app.run(debug=True)