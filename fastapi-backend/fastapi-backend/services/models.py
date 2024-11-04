from pydantic import BaseModel, computed_field


class CalculatedCriteria(BaseModel):
    criteria_name: str
    comment: str
    rating: int


class CalculatedUserReview(BaseModel):
    criterias: list[CalculatedCriteria]
    summary: str

    @computed_field
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
