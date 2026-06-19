from fastapi import FastAPI, HTTPException
from model import RecommendationEngine

app = FastAPI(
    title="Recommendation Engine API"
)

engine = RecommendationEngine(
    "data/movies.csv"
)

@app.get("/")
def home():
    return {
        "message": "Recommendation API Running"
    }

@app.get("/items")
def get_items():
    return engine.df.to_dict(
        orient="records"
    )

@app.get("/recommend/{title}")
def recommend(title: str):

    recommendations = engine.recommend(title)

    if not recommendations:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )

    return {
        "input": title,
        "recommendations": recommendations
    }