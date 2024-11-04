from pydantic import BaseModel


class CalculatedCriteria(BaseModel):
    criteria_name: str
    comment: str
    rating: int


class CalculatedUserReview(BaseModel):
    criterias: list[CalculatedCriteria]
    summary: str

    @property
    def average(self) -> float:
        if not self.criterias:
            return 0.0
        return sum(criteria.rating for criteria in self.criterias) / len(self.criterias)


class CalculatedUserReviews(BaseModel):
    user_id: int
    review: CalculatedUserReview


class QuestionWithAnswers(BaseModel):
    question: str
    answers: list[str]
