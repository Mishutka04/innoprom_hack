from services.ai_service import (
    prepare_criterias_prompt,
    _get_ai_response,
    get_ai_criterias,
    prepare_summary_prompt,
    get_ai_summary,
)
from services.models import (
    CalculatedUserReviews,
    QuestionWithAnswers,
    CalculatedUserReview,
)

_criteria_names = ["Hard skills", "Коммуникация", "Лидерские навыки"]


def save_reviews(reviews: CalculatedUserReviews) -> None:
    pass


def get_reviews(user_id: int) -> CalculatedUserReviews:
    pass


def calculate_reviews_from_answers(
    answers: list[QuestionWithAnswers], user_id: int
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
