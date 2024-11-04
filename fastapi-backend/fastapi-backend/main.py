from fastapi import FastAPI

from services.ai_service import (
    prepare_criterias_prompt,
    get_ai_criterias,
    prepare_summary_prompt,
    get_ai_summary,
)
from services.models import QuestionWithAnswers
from services.reviews_service import calculate_reviews_from_answers

app = FastAPI()


@app.get("/test")
async def test():
    answers = [
        QuestionWithAnswers(
            question="Этот сотрудник умеет работать в команде?",
            answers=[
                "Да, он очень хорошо взаимодействует с коллегами и способен эффективно сотрудничать в команде.",
                "Да, но иногда бывают проблемы",
            ],
        ),
        QuestionWithAnswers(
            question="Этот сотрудник имеет опыт работы в данной области?",
            answers=[
                "Да, он работал в этой области более 5 лет.",
                "Да, но только 2 года",
            ],
        ),
        QuestionWithAnswers(
            question="Этот сотрудник имеет лидерские навыки?",
            answers=[
                "Да, он умеет мотивировать команду и принимать решения.",
                "Нет, он не имеет опыта руководства командой.",
            ],
        ),
    ]

    return calculate_reviews_from_answers(answers, 123)


@app.get("/calculateAllReviews")
async def calculate_all_reviews():
    pass
