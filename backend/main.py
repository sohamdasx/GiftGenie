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
@app.route('/chatbot', methods=['POST'])
def chat():
    return mainChatBot(request.json['message'])




@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        responses = [data[f'Q{i+1}'] for i in range(25)]
        return jsonify(recommendGifts(responses))
        

        

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    






if __name__ == '__main__':
    app.run(debug=True)