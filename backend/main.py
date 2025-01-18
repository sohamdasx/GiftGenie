from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv('GOOGLE_API_KEY')

app = Flask(__name__)
API_KEY = os.getenv

genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-1.5-flash')

gift_categories = {
    "Artistic Thinker": ["Art Supplies", "Canvas and Paint Set", "Sketchbook", "Photography Book", "Graphic Tablet"],
    "Logical Analyst": ["Puzzle Set", "Programming Book", "Smartwatch", "Board Game", "Calculator"],
    "Creative Explorer": ["Travel Journal", "Cooking Kit", "Portable Speaker", "DIY Craft Kit", "Photography Kit"],
    "Balanced Harmonizer": ["Yoga Mat", "Aromatherapy Kit", "Herbal Tea Set", "Meditation Book", "House Plant"],
    "Adventurous Seeker": ["Camping Gear", "Action Camera", "Hiking Backpack", "Travel Voucher", "Adventure Book"],
}

conversation_history = []

def handle_prompt(prompt):
    """
    Handles user prompts by detecting the intent and responding accordingly.
    """
    global conversation_history
    prompt_lower = prompt.lower()
    
    if "suggest" in prompt_lower:
        category = extract_category(prompt_lower)
        if category:
            suggestions = gift_categories.get(category, [])
            if suggestions:
                return f"For a {category}, I suggest: {', '.join(suggestions)}."
            else:
                return f"Sorry, I don't have suggestions for {category}."
        else:
            return "Could you specify the type of person or their interests?"
    
    elif "refine" in prompt_lower:
        category = extract_category(prompt_lower)
        if category:
            refined_suggestions = gift_categories.get(category, [])[:3]
            return f"Refined suggestions for a {category}: {', '.join(refined_suggestions)}."
        else:
            return "Could you specify the type of person or their interests for refining the suggestions?"

    elif "alternatives" in prompt_lower:
        alternatives = [
            item
            for sublist in gift_categories.values()
            for item in sublist
        ]
        sampled_alternatives = ", ".join(alternatives[:5])
        return f"Here are some alternative gifts: {sampled_alternatives}."
    
    else:
        conversation_context = "\n".join(conversation_history + [f"User: {prompt}"])
        response = model.generate_content(conversation_context)
        return response.text

def extract_category(prompt):
    """
    Extracts the category of interest from the user prompt.
    """
    for category in gift_categories.keys():
        if category.lower() in prompt:
            return category
    return None


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    global conversation_history

    user_input = request.json.get("message", "")
    if not user_input:
        return jsonify({"response": "Please enter a valid message."}), 400

    ai_response = handle_prompt(user_input)

    conversation_history.append(f"User: {user_input}")
    conversation_history.append(f"AI: {ai_response}")

    return jsonify({"response": ai_response})

if __name__ == '__main__':
    app.run(debug=True)