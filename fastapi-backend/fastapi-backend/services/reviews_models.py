from pydantic import BaseModel


class ReviewCriteria(BaseModel):
    criteriaName: str
    comment: str
    rating: int


class Review(BaseModel):
    criterias: list[ReviewCriteria]
    summary: str

    @property
    def average(self) -> float:
        if not self.criterias:
            return 0.0
        return sum(criteria.rating for criteria in self.criterias) / len(self.criterias)
