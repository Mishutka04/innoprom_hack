from database import engine, get_db, Base
from models.models import Answer, QuestionWithAnswersAggregate
from models.db_models import DBAnswer

# Create all tables
Base.metadata.create_all(bind=engine)


def save_answers(answers: list[Answer]) -> None:
    db = next(get_db())

    try:
        # Convert and save each answer
        for answer in answers:
            db_answer = DBAnswer(
                user_answered=answer.user_answered,
                user_reviewed=answer.user_reviewed,
                answer_text=answer.answer_text,
                question_text=answer.question_text,
            )
            db.add(db_answer)

        db.commit()
    except Exception as e:
        db.rollback()
        raise e


def load_answers_aggregate_for_user(user_id: int) -> list[QuestionWithAnswersAggregate]:
    db = next(get_db())

    # Get all unique questions for the user
    questions = (
        db.query(DBAnswer.question_text)
        .filter(DBAnswer.user_reviewed == user_id)
        .distinct()
        .all()
    )

    result = []

    # For each question, gather all answers
    for (question_text,) in questions:
        answers = (
            db.query(DBAnswer.answer_text)
            .filter(
                DBAnswer.user_reviewed == user_id,
                DBAnswer.question_text == question_text,
            )
            .all()
        )

        # Convert to list of answer strings
        answer_texts = [answer for (answer,) in answers]

        # Create aggregate
        question_aggregate = QuestionWithAnswersAggregate(
            question=question_text, answers=answer_texts
        )

        result.append(question_aggregate)

    return result
