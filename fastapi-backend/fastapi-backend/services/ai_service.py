import json

import requests
from pydantic import BaseModel


class QuestionWithAnswers(BaseModel):
    question: str
    answers: list[str]


class ReviewCriteria(BaseModel):
    criteria_name: str


def prepare_prompt(
    answers: list[QuestionWithAnswers], criterias: list[ReviewCriteria]
) -> str:
    reviews_section = "\n\n".join(
        f"Review {i}:\n{review}" for i, review in enumerate(answers, start=1)
    )

    criteria_section = "\n".join(
        f"{i}. {crit}" for i, crit in enumerate(criterias, start=1)
    )

    return "\n\n".join(
        [
            "Here are some reviews about an employee:",
            reviews_section,
            "Based on these reviews, evaluate the employee on a scale from 1 to 5 for the following criteria:",
            criteria_section,
            "Add short (2 sentences) explanation for each score you assigned.",
        ]
    )


class AIResponse(BaseModel):
    criterias: list[ReviewCriteria]


_system_prompt = (
    "You are a helpful assistant. Ответ на русском. "
    "По каждому критерию запиши в properties данные. "
    "Criteria - название критерия, comment - комментарий, star - Оценка от 1 - до 5."
)


def get_ai_response(self, prompt: str) -> AIResponse | str:
    body = {
        "prompt": [prompt],
        "apply_chat_template": True,
        "system_prompt": _system_prompt,
        "max_tokens": 1200,
        "n": 1,
        "temperature": 0.7,
        "schema": json.dumps(self.response_schema),
    }

    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(
            self.ai_endpoints[0] + "/generate",
            data=json.dumps(body, ensure_ascii=False).encode("utf-8"),
            headers=headers,
        )

        response.raise_for_status()
        return AIResponse(**response.json())

    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}"
