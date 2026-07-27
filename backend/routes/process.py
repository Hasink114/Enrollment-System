from pathlib import Path

import cv2
from fastapi import APIRouter, HTTPException
from PIL import Image

from services.session_service import (
    get_session,
    update_final_filename,
    update_session_status
)
from services.face_service import face_service
from services.background_service import background_service
from services.logger import logger
from services.session_service import delete_session
from services.session_service import update_session_status

router = APIRouter(
    prefix="/process",
    tags=["Process"]
)

UPLOAD_DIR = Path("uploads")
PROCESSED_DIR = Path("processed")
FINAL_DIR = Path("final")

PROCESSED_DIR.mkdir(exist_ok=True)
FINAL_DIR.mkdir(exist_ok=True)


@router.post("/{session_id}")
def process_photo(session_id: str):

    image_path = UPLOAD_DIR / f"{session_id}.jpg"

    if not image_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Uploaded image not found."
        )

    session = get_session(session_id)

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found."
        )

    result = face_service.detect_face(str(image_path))

    if result["count"] == 0:
        raise HTTPException(
            status_code=400,
            detail="No face detected."
        )

    image = cv2.imread(str(image_path))

    face = result["faces"][0]

    x = int(face["x"])
    y = int(face["y"])
    w = int(face["width"])
    h = int(face["height"])

    margin_x = int(w * 0.45)
    top_margin = int(h * 0.75)
    bottom_margin = int(h * 0.35)

    x1 = max(0, x - margin_x)
    y1 = max(0, y - top_margin)

    x2 = min(image.shape[1], x + w + margin_x)
    y2 = min(image.shape[0], y + h + bottom_margin)

    cropped = image[y1:y2, x1:x2]

    crop_path = PROCESSED_DIR / f"{session_id}_crop.jpg"

    cv2.imwrite(str(crop_path), cropped)

    student_name = session["student_name"].strip().replace(" ", "_")

    final_path = FINAL_DIR / f"{student_name}.jpg"

    background_service.replace_with_blue(
        str(crop_path),
        str(final_path)
    )

    # Save filename in session
    update_session_status(session_id, "processing")
    update_final_filename(session_id, final_path.name)
    update_session_status(session_id, "uploaded")

    logger.info(
    f"Passport generated | {student_name} | Session={session_id}"
    )

    return {
        "success": True,
        "message": "Passport image generated.",
        "crop_image": crop_path.name,
        "final_image": final_path.name
    }