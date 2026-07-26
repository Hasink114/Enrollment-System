from pydantic import BaseModel


class SessionCreateRequest(BaseModel):
    student_name: str


class SessionData(BaseModel):
    session_id: str
    student_name: str
    status: str


class SessionResponse(BaseModel):
    success: bool
    message: str
    data: SessionData


class SessionStatusResponse(BaseModel):
    success: bool
    message: str
    data: SessionData