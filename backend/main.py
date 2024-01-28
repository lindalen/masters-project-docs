from fastapi import FastAPI
from routes import router

app = FastAPI()

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "LLM Processing API is up and running"}

