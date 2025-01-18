from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
import os
from dotenv import load_dotenv
from chatbot import mainChatBot

model = genai.GenerativeModel('gemini-1.5-flash')
api_key = os.getenv('GOOGLE_API_KEY')
app = Flask(__name__)
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')




#ChatBot Routes
@app.route('/chatbot', methods=['POST'])
def chat():
    return mainChatBot(request.json['message'])

if __name__ == '__main__':
    app.run(debug=True)