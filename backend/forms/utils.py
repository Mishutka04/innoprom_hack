import requests
import json

def prepare_prompt(reviews, criteria):
    prompt = "Here are some reviews about an employee:\n\n"
    for i, review in enumerate(reviews, start=1):
        prompt += f"Review {i}:\n{review}\n\n"
        

    prompt += "Based on these reviews, evaluate the employee on a scale from 1 to 5 for the following criteria:\n"
    for i, crit in enumerate(criteria, start=1):
        prompt += f"{i}. {crit}\n"
    prompt += "Add short (2 sentences) explanation for each score you assigned."
    return prompt

def evaluate_reviews_with_llm(prompt):
    url = "https://vk-devinsight-case.olymp.innopolis.university/generate"
    data = {
        "prompt": [prompt],
        "apply_chat_template": True,
        "system_prompt": "You are a helpful assistant. Ответ дай на русском языке. И сделай ответ в виде json с ключами criteria, star, comment. Мне нужен чистый json без твоих комментариев",
        "max_tokens": 1200,
        "n": 1,
        "temperature": 0.7
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, data=json.dumps(data), headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        return f"Error: {response.status_code} - {response.text}"
    
# Function to parse evaluations and save to a new JSON file
def save_evaluations(input_data):
    evaluations = []
    
    # Extracting evaluations from input data
    evaluation_strings = input_data
    
    for evaluation_string in evaluation_strings:
        try:
            evaluations.append({
                "criteria": evaluation_string['criteria'],
                "star": evaluation_string["star"],
                "comment": evaluation_string["comment"]
            })
        except json.JSONDecodeError as e:
            print("Error parsing evaluation:", e)

    return evaluations

