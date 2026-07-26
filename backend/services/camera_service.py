from services.session_service import get_session


def connect_camera(session_id: str):
    session = get_session(session_id)

    if not session:
        return None

    return session