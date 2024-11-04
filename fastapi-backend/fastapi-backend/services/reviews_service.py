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
from services.answers_repository import load_answers_aggregate_for_user
from services.reviews_repository import load_reviews_for_user, save_user_reviews
from services.users_repository import load_users

_criteria_names = ["Hard skills", "Коммуникация", "Лидерские навыки"]


def _calculate_reviews_from_answers_ai(
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


def calculate_all_reviews() -> None:
    users = load_users()
    users = filter(lambda u: u.id == 1, users)

    for user in users:
        answers = load_answers_aggregate_for_user(user.id)
        if len(answers) < 1:
            print(f"No answers for user {user.name}")
            continue
        else:
            print(f"Calculating reviews for user {user.name}")

        calculated_reviews_or_error = _try_calculate_reviews(answers, user)
        if calculated_reviews_or_error is str:
            print(calculated_reviews_or_error)
            continue

        print(f"Calculated reviews for user {user.name}")
        save_user_reviews(calculated_reviews_or_error)


def _try_calculate_reviews(answers, user) -> CalculatedUserReviews | str:
    max_retries = 3
    for attempt in range(max_retries):
        try:
            calculated_reviews_or_error = _calculate_reviews_from_answers_ai(
                answers, user.id
            )
            return calculated_reviews_or_error
        except Exception as e:
            print(
                f"Error calculating reviews for user {user.name}: {str(e)}, retrying..."
            )
            if attempt == max_retries - 1:  # Last attempt
                return f"Failed to calculate reviews for user {user.name} after {max_retries} attempts. Error: {str(e)}"
    raise ValueError("Unreachable code")


class UserWithRating(BaseModel):
    rating: float
    id: int
    name: str
    role: str
    department: str
    avatar_url: str


def get_users_with_rating() -> list[UserWithRating]:
    users = load_users()
    reviews = [load_reviews_for_user(user.id) for user in users]

    return [
        UserWithRating(
            rating=review.review.average if review else 0.0, **user.model_dump()
        )
        for user, review in zip(users, reviews)
    ]


def get_review_for_user(user_id: int) -> CalculatedUserReviews:
    return load_reviews_for_user(user_id)
