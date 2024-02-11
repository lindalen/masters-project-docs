from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router
import os
import psycopg2

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(router)

# Your PostgreSQL connection URL
connection_url = os.getenv("INTERNAL_DB_URL")

try:
    # Connect to your PostgreSQL database
    conn = psycopg2.connect(connection_url)
    
    # Create a cursor object
    cursor = conn.cursor()
    
    # Execute a query
    cursor.execute("SELECT version();")
    
    # Fetch and print the result
    db_version = cursor.fetchone()
    print("Connected to PostgreSQL database! Version:", db_version)
    
    # Close the cursor and connection
    cursor.close()
    conn.close()
except Exception as e:
    print("An error occurred:", e)


@app.get("/")
async def root():
    return {"message": "LLM Processing API is up and running"}

