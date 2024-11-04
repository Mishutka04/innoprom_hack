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
    
    urls = [
    'https://vk-devinsight-case.olymp.innopolis.university',
    'https://vk-scoreworker-case.olymp.innopolis.university',
    'https://mts-aidocprocessing-case.olymp.innopolis.university'
]   
    
    url = urls[0] + "/generate"
    
    data = {
        "prompt": [prompt],
        "apply_chat_template": True,
        "system_prompt": "You are a helpful assistant. Ответ на русском. По каждому критерию запиши в properties данные. Criteria - название критерия, comment - комментарий, star - Оценка от 1 - до 5.",
        "max_tokens": 1200,
        "n": 1,
        "temperature": 0.7,
        "schema": json.dumps({
            "title": "User",
            "type": "object",
            "properties": {
                "criteries": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "criteria": {"type": "string"},
                            "comment": {"type": "string"},
                            "star": {"type": "integer"}
                        },
                        "required": ["criteria", "comment", "star"]
                    }
                }
            }
        })
    }

    headers = {
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, data=json.dumps(data, ensure_ascii=False).encode('utf-8'), headers=headers)

    if response.status_code == 200:
        print(response.json())
        return response.json()
    else:
        return f"Error: {response.status_code} - {response.text}"
# Function to parse evaluations and save to a new JSON file
