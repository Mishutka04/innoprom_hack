from fastapi import FastAPI

from services.ai_service import prepare_criterias_prompt, get_ai_criterias
from services.models import QuestionWithAnswers

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
        )
    ]

    criterias_prompt = prepare_criterias_prompt(
        answers, ["Hard skills", "Коммуникация", "Лидерские навыки"]
    )
    criterias_response = get_ai_criterias(criterias_prompt)
    if criterias_response is str:
        return criterias_response
    calculated_criterias = criterias_response.criterias
    return calculated_criterias


@app.get("/calculateAllReviews")
async def calculate_all_reviews():
    pass
