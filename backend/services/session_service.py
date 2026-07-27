from uuid import uuid4
from datetime import datetime, timedelta
from services.file_cleanup import cleanup_previous_files

# In-memory session storage
sessions = {}


def generate_session_id():
    return uuid4().hex[:6].upper()

cleanup_previous_files()

def create_session(student_name):
    session_id = generate_session_id()

    session = {
        "session_id": session_id,
        "student_name": student_name,
        "status": "waiting",
        "created_at": datetime.now(),
        "final_filename": None
    }

    sessions[session_id] = session

    return session


def get_session(session_id):
    session = sessions.get(session_id)

    if not session:
        return None

    # Expire session after 2 minutes
    if datetime.now() - session["created_at"] > timedelta(minutes=10):
        del sessions[session_id]
        return None

    return session


def update_session_status(session_id, status):
    session = sessions.get(session_id)

    if not session:
        return None

    session["status"] = status

    return session


def update_final_filename(session_id, filename):
    session = sessions.get(session_id)

    if not session:
        return None

    session["final_filename"] = filename

    return session


def delete_session(session_id):
    return sessions.pop(session_id, None)