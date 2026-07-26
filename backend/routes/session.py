from fastapi import APIRouter, HTTPException

from schemas.session import (
    SessionCreateRequest,
    SessionResponse,
    SessionStatusResponse,
)

from services.session_service import (
    create_session,
    get_session,
    delete_session,
)

router = APIRouter(
    prefix="/session",
    tags=["Session"]
)


@router.post(
    "/create",
    response_model=SessionResponse
)
def create_new_session(request: SessionCreateRequest):

    session = create_session(request.student_name)

    return {
        "success": True,
        "message": "Session created successfully.",
        "data": session
    }


@router.get(
    "/{session_id}",
    response_model=SessionStatusResponse
)
def get_session_status(session_id: str):

    session = get_session(session_id)

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Session not found."
        )

    return {
        "success": True,
        "message": "Session fetched successfully.",
        "data": session
    }


@router.delete("/{session_id}")
def remove_session(session_id: str):

    deleted = delete_session(session_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Session not found."
        )

    return {
        "success": True,
        "message": "Session deleted successfully."
    }