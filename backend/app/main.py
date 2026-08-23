from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine
from app.routers import festivals_router

app = FastAPI(
    title="FestFuse API",
    description="API for FestFuse application",
    version="1.0.0"
)

app.include_router(festivals_router, prefix="/api/v1")


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