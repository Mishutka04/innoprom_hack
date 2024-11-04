from fastapi import FastAPI

from models.models import QuestionWithAnswersAggregate
from services.reviews_service import calculate_reviews_from_answers, get_users_with_rating

app = FastAPI()


@app.get("/test")
async def test():
    answers = [
        QuestionWithAnswersAggregate(
            question="Этот сотрудник умеет работать в команде?",
            answers=[
                "Да, он очень хорошо взаимодействует с коллегами и способен эффективно сотрудничать в команде.",
                "Да, но иногда бывают проблемы",
            ],
        ),
        QuestionWithAnswersAggregate(
            question="Этот сотрудник имеет опыт работы в данной области?",
            answers=[
                "Да, он работал в этой области более 5 лет.",
                "Да, но только 2 года",
            ],
        ),
        QuestionWithAnswersAggregate(
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


@app.get("/users")
async def get_users():
    return get_users_with_rating()
