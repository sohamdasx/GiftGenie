import os
from dotenv import load_dotenv
import google.generativeai as genai
gift_categories = {
    "Artistic Thinker": ["Art Supplies", "Canvas and Paint Set", "Sketchbook", "Photography Book", "Graphic Tablet"],
    "Logical Analyst": ["Puzzle Set", "Programming Book", "Smartwatch", "Board Game", "Calculator"],
    "Creative Explorer": ["Travel Journal", "Cooking Kit", "Portable Speaker", "DIY Craft Kit", "Photography Kit"],
    "Balanced Harmonizer": ["Yoga Mat", "Aromatherapy Kit", "Herbal Tea Set", "Meditation Book", "House Plant"],
    "Adventurous Seeker": ["Camping Gear", "Action Camera", "Hiking Backpack", "Travel Voucher", "Adventure Book"],
}

category_questions = {
        "Artistic Thinker": ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
        "Logical Analyst": ['Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
        "Creative Explorer": ['Q11', 'Q12', 'Q13', 'Q14', 'Q15'],
        "Balanced Harmonizer": ['Q16', 'Q17', 'Q18', 'Q19', 'Q20'],
        "Adventurous Seeker": ['Q21', 'Q22', 'Q23', 'Q24', 'Q25']
}

api_key = os.getenv('GOOGLE_API_KEY')


