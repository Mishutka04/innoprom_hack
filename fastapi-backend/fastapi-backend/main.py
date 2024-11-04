from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware

from models.models import QuestionWithAnswersAggregate, Answer
from services.answers_repository import save_answers, load_answers_aggregate_for_user
from services.reviews_service import (
    calculate_reviews_from_answers,
    get_users_with_rating,
)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/test")
async def test():
    return load_answers_aggregate_for_user(1)


@app.get("/calculateAllReviews")
async def calculate_all_reviews():
    pass


@app.get("/users")
async def get_users():
    return get_users_with_rating()


@app.post("/answers")
async def post_answers(
    answers: list[Answer],
) -> dict:
    save_answers(answers)
    try:
        return {"message": "Answers saved successfully", "count": len(answers)}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save answers: {str(e)}"
        )
