from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from database import Base


class DBCriteria(Base):
    __tablename__ = "criterias"

    id = Column(Integer, primary_key=True, index=True)
    review_id = Column(Integer, ForeignKey("reviews.id"))
    criteria_name = Column(String)
    comment = Column(String)
    rating = Column(Integer)

    review = relationship("DBReview", back_populates="criterias")


class DBReview(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    summary = Column(String)
    average = Column(Float)

    criterias = relationship("DBCriteria", back_populates="review")


class DBAnswer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    user_answered = Column(Integer, index=True)
    user_reviewed = Column(Integer, index=True)
    answer_text = Column(String)
    question_text = Column(String, index=True)
