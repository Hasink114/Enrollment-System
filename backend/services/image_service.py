import base64
from pathlib import Path
from fastapi import UploadFile, HTTPException
from config import settings


class ImageService:

    @staticmethod
    async def process_upload(file: UploadFile):

        extension = Path(file.filename).suffix.lower()

        if extension not in settings.ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail="Unsupported image format."
            )

        image_bytes = await file.read()

        max_size = settings.MAX_IMAGE_SIZE_MB * 1024 * 1024

        if len(image_bytes) > max_size:
            raise HTTPException(
                status_code=400,
                detail="Image exceeds maximum size."
            )

        encoded = base64.b64encode(image_bytes).decode("utf-8")

        return encoded