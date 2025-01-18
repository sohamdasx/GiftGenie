from flask import Flask, request, jsonify, render_template
from constants import gift_categories
from constants import model


conversation_history = []



#Handling the prompt

def handle_prompt(prompt):
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


def mainChatBot(user_input):
    global conversation_history #Fetch from the database
    if not user_input:
        return jsonify({"response": "Please enter a valid message."}), 404

    ai_response = handle_prompt(user_input)

    conversation_history.append(f"User: {user_input}")
    conversation_history.append(f"AI: {ai_response}")

    return jsonify({"response": ai_response}),200
