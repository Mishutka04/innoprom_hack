from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/calculateAllReviews")
async def calculate_all_reviews():
    pass
