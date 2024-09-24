from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


app = FastAPI()

# Mount the static directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to restrict allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load OpenAI API key from environment variable
client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

# Define request and response models
class QueryRequest(BaseModel):
    prompt: str
    data: str = None

class QueryResponse(BaseModel):
    response: str


# Endpoint to interact with OpenAI API via LangChain
@app.post("/generateChart", response_model=QueryResponse)
async def generate_chart(request: QueryRequest):
    try:

        # Set your OpenAI API key
        prompt = f"""You are an AI Assistant. Here is some data:
                    {request.data}

                    Using this data, make a chart that pertains to the following user prompt. 
                    

                     If the following prompt is not relevant to the data, respond with a lowercase "no". Any prompt that is not specifically asking for a piece of data relevant to the chart should be responded to with a no. This includes casual conversation, asking about other data sets, etc. Otherwise, Return a string that can be directly parsed by JSON.parse() with no other informatino except the vega lite specs. Don't make the height or width greater than 400px.

                     {request.prompt}
                     """,
        print(prompt)
        # Call the OpenAI API via LangChain
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"{prompt}",
                }
            ],
            model="gpt-4o-mini",
        )
        print(chat_completion)
        return QueryResponse(response=chat_completion.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to interact with OpenAI API via LangChain
@app.post("/getDescription", response_model=QueryResponse)
async def getDesc(request: QueryRequest):
    try:
        
        # Set your OpenAI API key
        prompt = f"""You are an AI Assistant. Here is a chart:

                    Using this chart, generate a brief 1-2 sentence of what it represents. Keep it very simple, only describing what the graph does. 
                    {request.prompt}

                     """,
        print(prompt)
        # Call the OpenAI API via LangChain
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"{prompt}",
                }
            ],
            model="gpt-4o-mini",
        )
        print(chat_completion)
        return QueryResponse(response=chat_completion.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



# Root endpoint
@app.get("/")
async def read_root():
    return FileResponse('static/index.html')