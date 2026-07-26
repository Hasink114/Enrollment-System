from fastapi import APIRouter, HTTPException

from schemas.camera import (
    CameraConnectRequest,
    CameraConnectResponse,
)

from services.camera_service import connect_camera

router = APIRouter(
    prefix="/camera",
    tags=["Camera"],
)


@router.post(
    "/connect",
    response_model=CameraConnectResponse,
)
def connect(request: CameraConnectRequest):

    session = connect_camera(request.session_id)

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Session not found."
        )

    return {
        "success": True,
        "message": "Camera connected successfully.",
        "data": session,
    }