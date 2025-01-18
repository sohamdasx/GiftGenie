from flask import Flask, request, jsonify, render_template
import google.generativeai as genai

# Initialize Flask app
app = Flask(__name__)

# Configure API key for Google Generative AI
genai.configure(api_key="AIzaSyA5KBLVRgHH14RISOsnrZKZsZwW76cLiF8")

# Initialize generative model
model = genai.GenerativeModel('gemini-1.5-flash')

# Predefined gift categories and suggestions
gift_categories = {
    "Artistic Thinker": ["Art Supplies", "Canvas and Paint Set", "Sketchbook", "Photography Book", "Graphic Tablet"],
    "Logical Analyst": ["Puzzle Set", "Programming Book", "Smartwatch", "Board Game", "Calculator"],
    "Creative Explorer": ["Travel Journal", "Cooking Kit", "Portable Speaker", "DIY Craft Kit", "Photography Kit"],
    "Balanced Harmonizer": ["Yoga Mat", "Aromatherapy Kit", "Herbal Tea Set", "Meditation Book", "House Plant"],
    "Adventurous Seeker": ["Camping Gear", "Action Camera", "Hiking Backpack", "Travel Voucher", "Adventure Book"],
}

# Store conversation history
conversation_history = []

def handle_prompt(prompt):
    """
    Handles user prompts by detecting the intent and responding accordingly.
    """
    global conversation_history
    prompt_lower = prompt.lower()
    
    # Suggest gifts
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
    
    # Refine suggestions
    elif "refine" in prompt_lower:
        category = extract_category(prompt_lower)
        if category:
            refined_suggestions = gift_categories.get(category, [])[:3]  # Refine to the top 3
            return f"Refined suggestions for a {category}: {', '.join(refined_suggestions)}."
        else:
            return "Could you specify the type of person or their interests for refining the suggestions?"

    # Provide alternatives
    elif "alternatives" in prompt_lower:
        alternatives = [
            item
            for sublist in gift_categories.values()
            for item in sublist
        ]
        sampled_alternatives = ", ".join(alternatives[:5])  # Top 5 alternatives
        return f"Here are some alternative gifts: {sampled_alternatives}."
    
    # Default response using the generative model
    else:
        # Combine conversation history with current prompt
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

# Routes

@app.route('/')
def index():
    return render_template('index.html')  # Renders a basic HTML interface

@app.route('/chat', methods=['POST'])
def chat():
    global conversation_history

    user_input = request.json.get("message", "")
    if not user_input:
        return jsonify({"response": "Please enter a valid message."}), 400

    # Handle the user input
    ai_response = handle_prompt(user_input)

    # Update conversation history
    conversation_history.append(f"User: {user_input}")
    conversation_history.append(f"AI: {ai_response}")

    return jsonify({"response": ai_response})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)