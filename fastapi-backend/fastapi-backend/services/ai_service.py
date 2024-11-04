import json

import requests
from pydantic import BaseModel

from models.models import QuestionWithAnswersAggregate, CalculatedCriteria


def prepare_criterias_prompt(
    question_with_answers: list[QuestionWithAnswersAggregate], criteria_names: list[str]
) -> str:
    answers_section = "\n\n".join(
        (f"Question {i}: {qna.question}\n" + "\n".join([f"- {a}" for a in qna.answers]))
        for i, qna in enumerate(question_with_answers, start=1)
    )

    criterias_section = "\n".join(
        f"{i}. {c}" for i, c in enumerate(criteria_names, start=1)
    )

    return "\n\n".join(
        [
            "Вот несколько отзывов о сотруднике:",
            answers_section,
            "На основании отзывов, оцени сотрудника по шкале 1 to 5 по следующим критериям",
            criterias_section,
            "Добавь короткое (4 предложения) объяснение, почему ты дал пользователю такую оценку",
        ]
    )


def prepare_summary_prompt(criterias: list[CalculatedCriteria]) -> str:
    criterias_section = "\n".join(
        f"- {c.criteria_name}: {c.rating} ({c.comment})" for c in criterias
    )

    return "\n\n".join(
        [
            "Here are the scores for an employee's performance in various criteria:",
            criterias_section,
            "Based on these scores, provide a summary of the employee's overall performance and potential areas for improvement.",
        ]
    )


_ai_endpoints = [
    "https://vk-devinsight-case.olymp.innopolis.university",
    "https://vk-scoreworker-case.olymp.innopolis.university",
    "https://mts-aidocprocessing-case.olymp.innopolis.university",
]


def _get_ai_response(prompt: str, schema: dict, system_prompt: str) -> dict | str:
    body = {
        "prompt": [prompt],
        "apply_chat_template": True,
        "system_prompt": system_prompt,
        "max_tokens": 1200,
        "n": 1,
        "temperature": 0.7,
        "schema": json.dumps(schema),
    }

    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(
            _ai_endpoints[0] + "/generate",
            data=json.dumps(body, ensure_ascii=False).encode("utf-8"),
            headers=headers,
        )

        print(f"AI response: {response}")
        response.raise_for_status()
        return json.loads(response.json())

    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}"


class CriteriasResponse(BaseModel):
    criterias: list[CalculatedCriteria]


def get_ai_criterias(prompt: str) -> CriteriasResponse | str:
    response_schema = {
        "title": "User",
        "type": "object",
        "properties": {
            "criterias": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "criteria_name": {"type": "string"},
                        "comment": {"type": "string"},
                        "rating": {"type": "integer"},
                    },
                    "required": ["criteria_name", "summary", "rating"],
                },
            }
        },
    }

    system_prompt = (
        "You are a helpful assistant. Ответ на русском. "
        "По каждому критерию запиши в properties данные. "
        "criteria_name - название навыка, который оценивается, "
        "comment - словесное резюме навыков пользователя , rating - Оценка от 1 - до 5."
        "Пример: 1. {criteria_name: 'Коммуникативные навыки', comment: "
        "'На основании отзывов видно, что сотрудник демонстрирует умение эффективно общаться "
        "и сотрудничать с коллегами. Однако некоторые отзывы указывают на то, что он долго отвечает на сообщения', rating: 4}"
    )

    response = _get_ai_response(prompt, response_schema, system_prompt)

    if response is str:
        return response
    return CriteriasResponse(**response)


class SummaryResponse(BaseModel):
    summary: str


def get_ai_summary(prompt: str) -> SummaryResponse | str:
    response_schema = {
        "title": "User",
        "type": "object",
        "properties": {
            "summary": {
                "type": "string",
            }
        },
    }

    system_prompt = (
        "You are a helpful assistant. Ответ на русском. "
        "Сделай краткий анализ отзыва и выдели ключевые моменты."
    )

    response = _get_ai_response(prompt, response_schema, system_prompt)

    if response is str:
        return response
    return SummaryResponse(**response)
