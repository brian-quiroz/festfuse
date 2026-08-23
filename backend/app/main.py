from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine

app = FastAPI(
    title="FestFuse API",
    description="API for FestFuse application",
    version="1.0.0"
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/health/database")
def database_health_check():
    with engine.connect() as connection:
        database_name = connection.execute(
            text("SELECT current_database()")
        ).scalar_one()

    return {
        "status": "healthy",
        "database": database_name,
    }