from fastapi import APIRouter, UploadFile, File
from schemas.upload import UploadResponse, UploadData
from services.image_service import ImageService
from utils.logger import logger

router = APIRouter(
    prefix="/session",
    tags=["Photo Upload"]
)



@router.post(
    "/{session_id}/upload",
    response_model=UploadResponse
)
async def upload_image(
    session_id: str,
    image: UploadFile = File(...)
):

    logger.info(
    f"Session: {session_id} | File: {image.filename}"
    )

    encoded = await ImageService.process_upload(image)

    return UploadResponse(
        success=True,
        message="Image uploaded successfully.",
        data=UploadData(
            filename=image.filename,
            image=encoded
        )
    )