from flask import jsonify
import google.generativeai as genai
from constants import gift_categories
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv('GOOGLE_API_KEY')

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')







#Handling the prompt
def handle_chat(user_input, personality_type=None):
    """Handle chat interactions for gift recommendations."""
    input_lower = user_input.lower()
    
    # Refine suggestions based on personality type
    if "refine" in input_lower and personality_type:
        suggestions = gift_categories.get(personality_type, [])[:3]  # Top 3 items
        prompt = f"""
        For a {personality_type}, I suggested these gifts: {', '.join(suggestions)}
        The user wants refinements. Please provide a brief explanation of why these specific 
        items would be good for this personality type, focusing on personal traits.
        Keep the response under 3 sentences.
        """
        response = model.generate_content(prompt)
        return response.text
    
    elif "alternative" in input_lower or "other" in input_lower:
        # Get items from other categories
        current_items = set(gift_categories.get(personality_type, []))
        all_items = [item for items in gift_categories.values() for item in items]
        alternatives = list(set(all_items) - current_items)[:5]
        
        prompt = f"""
        The user is looking for alternative gift suggestions to the standard recommendations.
        Here are some alternatives: {', '.join(alternatives)}
        Please explain why these might be interesting alternatives, considering they're different 
        from the usual suggestions for their personality type.
        Keep the response under 3 sentences.
        """
        response = model.generate_content(prompt)
        return response.text
    
    else:
        prompt = f"""
        You are a gift recommendation assistant. The user says: {user_input}
        Their personality type is: {personality_type if personality_type else 'unknown'}
        
        Provide a helpful, friendly response that:
        1. Addresses their specific question about gifts
        2. Maintains context of their personality type if provided
        3. Suggests relevant gifts from our catalogue: {gift_categories}
        
        Keep the response concise and friendly, under 3 sentences.
        """
        response = model.generate_content(prompt)
        return response.text





def mainChatBot(user_input):
    if not user_input:
        return jsonify({"response": "Please enter a valid message."}), 404

    ai_response = handle_chat(user_input)

    

    return jsonify({"response": ai_response}),200
