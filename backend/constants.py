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


