from pathlib import Path
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse

from services.session_service import (
    update_session_status,
    get_session,
    delete_session,
)
from services.file_cleanup import cleanup_previous_files
from services.logger import logger

router = APIRouter(
    prefix="/photo",
    tags=["Photo"]
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload/{session_id}")
async def upload_photo(
    session_id: str,
    file: UploadFile = File(...)
):

    file_path = UPLOAD_DIR / f"{session_id}.jpg"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    update_session_status(session_id, "uploaded")

    logger.info(f"Photo uploaded | Session={session_id}")

    return {
        "success": True,
        "message": "Photo uploaded successfully.",
        "filename": file_path.name
    }


@router.get("/image/{session_id}")
def get_uploaded_photo(session_id: str):

    file_path = UPLOAD_DIR / f"{session_id}.jpg"

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Photo not uploaded yet."
        )

    return FileResponse(file_path)


@router.get("/final/{session_id}")
def get_final_photo(
    session_id: str,
    background_tasks: BackgroundTasks
):

    session = get_session(session_id)

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found."
        )

    student_name = session["student_name"].strip().replace(" ", "_")

    final_path = Path("final") / f"{student_name}.jpg"

    if not final_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Final passport photo not found."
        )

    logger.info(
        f"Passport downloaded | {student_name} | Session={session_id}"
    )

    # Clean AFTER response starts downloading
    background_tasks.add_task(delete_session, session_id)
    background_tasks.add_task(cleanup_previous_files)

    return FileResponse(
        path=final_path,
        filename=f"{student_name}.jpg",
        media_type="image/jpeg"
    )