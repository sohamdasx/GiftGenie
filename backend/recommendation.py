from flask import jsonify
import pandas as pd
import random
from constants import gift_categories, category_questions



def recommendGifts(responses):


    if len(responses) != 25:
        return "Invalid number of responses"
    if not all(isinstance(x,int) and 1<=x<=5 for x in responses):
        return "All responses must be integers between 1 and 5"
    
    df = pd.DataFrame([responses], columns=[f'Q{i+1}' for i in range(25)])


    category_scores = {}

    for category, questions in category_questions.items():
        category_scores[category] = df[questions].sum(axis=1).iloc[0]

    total_score = sum(category_scores.values())
    normalized_scores = {k: (v/total_score)*100 for k, v in category_scores.items()}

    gift_scores = []
    for category, gifts in gift_categories.items():
        category_weight = normalized_scores[category]
        for gift in gifts:
            gift_score = round(category_weight * (1 + random.uniform(-0.1, 0.1)),3)
            gift_scores.append((gift, gift_score))

    ranked_gifts = sorted(gift_scores, key=lambda x: x[1], reverse=True)

    finalJSON = []

    for gift, score in ranked_gifts:
        finalJSON.append((gift, score))


    return finalJSON


# example_responses = [
#     4, 5, 4, 5, 4,  
#     3, 2, 3, 2, 3,  
#     4, 3, 4, 3, 4,  
#     2, 3, 2, 3, 2,
#     3, 4, 3, 4, 3   
# ]


# temp = recommendGifts(example_responses)



        
        



