from typing import Optional
from database import engine, get_db, Base
from models.models import (
    CalculatedUserReviews,
    CalculatedUserReview,
    CalculatedCriteria,
)
from models.db_models import DBReview, DBCriteria


def save_reviews(reviews: CalculatedUserReviews) -> None:
    db = next(get_db())

    # Create DBReview
    db_review = DBReview(
        user_id=reviews.user_id,
        summary=reviews.review.summary,
        average=reviews.review.average,
    )
    db.add(db_review)
    db.flush()  # Flush to get the review ID

    # Create DBCriteria entries
    for criteria in reviews.review.criterias:
        db_criteria = DBCriteria(
            review_id=db_review.id,
            criteria_name=criteria.criteria_name,
            comment=criteria.comment,
            rating=criteria.rating,
        )
        db.add(db_criteria)

    db.commit()


def load_reviews_for_user(user_id: int) -> Optional[CalculatedUserReviews]:
    db = next(get_db())

    db_review = db.query(DBReview).filter(DBReview.user_id == user_id).first()
    if not db_review:
        return None

    # Convert DB models to Pydantic models
    criterias = [
        CalculatedCriteria(
            criteria_name=c.criteria_name, comment=c.comment, rating=c.rating
        )
        for c in db_review.criterias
    ]

    calculated_review = CalculatedUserReview(
        criterias=criterias, summary=db_review.summary
    )

    return CalculatedUserReviews(user_id=db_review.user_id, review=calculated_review)
