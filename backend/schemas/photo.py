from pydantic import BaseModel


class PhotoUploadResponse(BaseModel):
    success: bool
    message: str
    filename: str