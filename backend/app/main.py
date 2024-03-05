from fastapi import FastAPI
from .routes import user

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