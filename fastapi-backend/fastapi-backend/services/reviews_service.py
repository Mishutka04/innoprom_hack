from pydantic import BaseModel

from services.ai_service import (
    prepare_criterias_prompt,
    get_ai_criterias,
    prepare_summary_prompt,
    get_ai_summary,
)
from models.models import (
    CalculatedUserReviews,
    QuestionWithAnswersAggregate,
    CalculatedUserReview,
)
from services.reviews_repository import load_reviews_for_user
from services.users_repository import load_users

_criteria_names = ["Hard skills", "Коммуникация", "Лидерские навыки"]


def calculate_reviews_from_answers(
    answers: list[QuestionWithAnswersAggregate], user_id: int
) -> CalculatedUserReviews | str:
    criterias_prompt = prepare_criterias_prompt(answers, _criteria_names)
    criterias_response = get_ai_criterias(criterias_prompt)
    if criterias_response is str:
        return criterias_response
    calculated_criterias = criterias_response.criterias

    summary_prompt = prepare_summary_prompt(calculated_criterias)
    summary_response = get_ai_summary(summary_prompt)
    if summary_response is str:
        return summary_response
    summary = summary_response.summary

    return CalculatedUserReviews(
        user_id=user_id,
        review=CalculatedUserReview(criterias=calculated_criterias, summary=summary),
    )


class UserWithRating(BaseModel):
    rating: int
    id: int
    name: str
    role: str
    department: str


def get_users_with_rating() -> list[UserWithRating]:
    users = load_users()
    reviews = [load_reviews_for_user(user.id) for user in users]

    return [
        UserWithRating(
            rating=review.review.average if review else 0.0, **user.model_dump()
        )
        for user, review in zip(users, reviews)
    ]
