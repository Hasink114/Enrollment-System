from pydantic import BaseModel


class CameraConnectRequest(BaseModel):
    session_id: str


class CameraConnectData(BaseModel):
    session_id: str
    student_name: str
    status: str


class CameraConnectResponse(BaseModel):
    success: bool
    message: str
    data: CameraConnectData