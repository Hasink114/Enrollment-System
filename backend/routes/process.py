from pathlib import Path

from fastapi import APIRouter, HTTPException
from PIL import Image, ImageEnhance, ImageFilter

from services.session_service import (
    get_session,
    update_final_filename,
    update_session_status
)
from services.background_service import background_service
from services.logger import logger


router = APIRouter(
    prefix="/process",
    tags=["Process"]
)


UPLOAD_DIR = Path("uploads")
PROCESSED_DIR = Path("processed")
FINAL_DIR = Path("final")

UPLOAD_DIR.mkdir(exist_ok=True)
PROCESSED_DIR.mkdir(exist_ok=True)
FINAL_DIR.mkdir(exist_ok=True)


@router.post("/{session_id}")
def process_photo(session_id: str):

    # ---------------------------------------------------------
    # 1. FIND ORIGINAL UPLOADED PHOTO
    # ---------------------------------------------------------

    image_path = UPLOAD_DIR / f"{session_id}.jpg"

    if not image_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Uploaded image not found."
        )

    # ---------------------------------------------------------
    # 2. GET SESSION
    # ---------------------------------------------------------

    session = get_session(session_id)

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found."
        )

    student_name = (
        session["student_name"]
        .strip()
        .replace(" ", "_")
    )

    # ---------------------------------------------------------
    # 3. KEEP ORIGINAL PHOTO EXACTLY AS CAPTURED
    # ---------------------------------------------------------
    #
    # IMPORTANT:
    #
    # We intentionally DO NOT:
    #
    # - detect the face
    # - crop the face
    # - zoom the face
    # - calculate margins
    # - resize the student's composition
    # - change the position of the student
    #
    # The photograph is already framed correctly by the
    # camera operator.
    #
    # ---------------------------------------------------------

    original = Image.open(image_path).convert("RGB")

    logger.info(
        f"Processing original photo | "
        f"{student_name} | "
        f"Session={session_id} | "
        f"Resolution={original.width}x{original.height}"
    )

    # ---------------------------------------------------------
    # 4. SAVE ORIGINAL TO PROCESSED DIRECTORY
    # ---------------------------------------------------------

    processed_path = (
        PROCESSED_DIR /
        f"{session_id}_original.jpg"
    )

    original.save(
        processed_path,
        format="JPEG",
        quality=100,
        subsampling=0
    )

    # ---------------------------------------------------------
    # 5. REMOVE ORIGINAL BACKGROUND
    #    AND REPLACE IT WITH APS BLUE
    # ---------------------------------------------------------

    final_path = FINAL_DIR / f"{student_name}.jpg"

    background_service.replace_with_blue(
        str(processed_path),
        str(final_path)
    )

    # ---------------------------------------------------------
    # 6. OPTIONAL QUALITY PRESERVATION
    # ---------------------------------------------------------
    #
    # We do NOT upscale or resize the image.
    #
    # We only apply extremely light sharpening if the
    # segmentation service produced a slightly soft image.
    #
    # The dimensions remain EXACTLY the same as the
    # original photograph.
    #
    # ---------------------------------------------------------

    final_image = Image.open(final_path).convert("RGB")

    # Very light sharpening only.
    final_image = final_image.filter(
        ImageFilter.UnsharpMask(
            radius=0.6,
            percent=105,
            threshold=3
        )
    )

    # Preserve original resolution and save at maximum JPEG quality.
    final_image.save(
        final_path,
        format="JPEG",
        quality=100,
        subsampling=0,
        optimize=True
    )

    # ---------------------------------------------------------
    # 7. SAVE FINAL FILENAME IN SESSION
    # ---------------------------------------------------------

    update_session_status(
        session_id,
        "processing"
    )

    update_final_filename(
        session_id,
        final_path.name
    )

    update_session_status(
        session_id,
        "uploaded"
    )

    # ---------------------------------------------------------
    # 8. LOG
    # ---------------------------------------------------------

    logger.info(
        f"Passport generated successfully | "
        f"{student_name} | "
        f"Session={session_id} | "
        f"Resolution={final_image.width}x{final_image.height}"
    )

    # ---------------------------------------------------------
    # 9. RESPONSE
    # ---------------------------------------------------------

    return {
        "success": True,
        "message": "Passport image generated successfully.",
        "student_name": student_name,
        "original_image": processed_path.name,
        "final_image": final_path.name,
        "width": final_image.width,
        "height": final_image.height
    }