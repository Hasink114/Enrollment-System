from pydantic import BaseModel
from schemas.common import ApiResponse


class UploadData(BaseModel):
    filename: str
    image: str


class UploadResponse(ApiResponse):
    data: UploadData