from fastapi import FastAPI
from backend.app.routes import user
import asyncpg
def create_application():
    application = FastAPI()
    application.include_router(user.user_router)
    application.include_router(user.guest_router)
    application.include_router(user.auth_router)
    return application


app = create_application()


@app.get("/")
async def root():
    return {"message": "Hi, We're Mohamed & Chirine. Awesome - Our set up is done & working."}


async def check_database_exists(database_name: str) -> bool:
    conn = None
    try:
        # Connect to PostgreSQL database
        conn = await asyncpg.connect("postgresql://postgres:root@localhost/AI-Recruitment-Database-APP")

        # Execute query to check if the database exists
        query = f"SELECT 1 FROM pg_database WHERE datname='{database_name}';"
        exists = await conn.fetchval(query)

        return exists is not None
    except asyncpg.exceptions.InvalidCatalogNameError:
        return False
    finally:
        if conn is not None:
            await conn.close()

@app.get("/check-database/{database_name}")
async def check_database(database_name: str):
    exists = await check_database_exists(database_name)
    return {"database_name": database_name, "exists": exists}