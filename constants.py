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


gifts = {
    "Art Supplies" : 120,
    "Canvas and Paint Set" : 150,   
    "Sketchbook" : 20,
    "Photography Book" : 30,
    "Graphic Tablet" : 200,
    "Puzzle Set" : 50,
    "Programming Book" : 40,
    "Smartwatch" : 300,
    "Board Game" : 60,
    "Calculator" : 20,
    "Travel Journal" : 30,
    "Cooking Kit" : 100,
    "Portable Speaker" : 80,
    "DIY Craft Kit" : 70,
    "Photography Kit" : 200,
    "Yoga Mat" : 50,
    "Aromatherapy Kit" : 40,
    "Herbal Tea Set" : 30,
    "Meditation Book" : 20,
    "House Plant" : 20,
    "Camping Gear" : 150,
    "Action Camera" : 250,
    "Hiking Backpack" : 100,
    "Travel Voucher" : 200,
    "Adventure Book" : 30


}

desc = {
    "Art Supplies" : "A set of art supplies for drawing and painting",
    "Canvas and Paint Set" : "A set of canvas and paint for creating artwork",
    "Sketchbook" : "A sketchbook for drawing and sketching",
    "Photography Book" : "A book on photography techniques and tips",
    "Graphic Tablet" : "A graphic tablet for digital drawing and design",
    "Puzzle Set" : "A set of puzzles for solving and entertainment",
    "Programming Book" : "A book on programming languages and concepts",
    "Smartwatch" : "A smartwatch for tracking health and fitness",
    "Board Game" : "A board game for playing with friends and family",
    "Calculator" : "A calculator for solving math problems",
    "Travel Journal" : "A journal for documenting travel experiences",
    "Cooking Kit" : "A cooking kit for preparing meals and recipes",
    "Portable Speaker" : "A portable speaker for listening to music",
    "DIY Craft Kit" : "A DIY craft kit for creating handmade crafts",
    "Photography Kit" : "A photography kit for capturing photos and videos",
    "Yoga Mat" : "A yoga mat for practicing yoga and meditation",
    "Aromatherapy Kit" : "An aromatherapy kit for relaxation and stress relief",
    "Herbal Tea Set" : "A set of herbal teas for brewing and drinking",
    "Meditation Book" : "A book on meditation techniques and practices",
    "House Plant" : "A house plant for decorating and purifying the air",
    "Camping Gear" : "A set of camping gear for outdoor adventures",
    "Action Camera" : "An action camera for recording action sports",
    "Hiking Backpack" : "A hiking backpack for carrying gear and supplies",
    "Travel Voucher" : "A travel voucher for booking flights and hotels",
    "Adventure Book" : "A book on adventure stories and experiences"
    
}

api_key = os.getenv('GOOGLE_API_KEY')


