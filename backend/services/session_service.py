from uuid import uuid4

sessions = {}


def generate_session_id():
    return uuid4().hex[:6].upper()


def create_session(student_name):
    session_id = generate_session_id()

    session = {
        "session_id": session_id,
        "student_name": student_name,
        "status": "waiting"
    }

    sessions[session_id] = session

    return session


def get_session(session_id):
    return sessions.get(session_id)


def delete_session(session_id):
    return sessions.pop(session_id, None)