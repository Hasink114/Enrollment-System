from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routes.upload import router as upload_router
from routes.session import router as session_router
from fastapi.middleware.cors import CORSMiddleware
from routes.camera import router as camera_router

app = FastAPI(
    title="Student Photo System API",
    version="1.0.0"
)

app.include_router(upload_router)
app.include_router(session_router)
app.include_router(camera_router)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def root():
    return {
        "status": "running",
        "message": "Student Photo System Backend"
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)