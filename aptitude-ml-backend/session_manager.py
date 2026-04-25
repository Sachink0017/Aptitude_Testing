import uuid

class SessionManager:
    def __init__(self):
        self.sessions = {}

    def create_session(self, env):
        session_id = str(uuid.uuid4())
        self.sessions[session_id] = {
            "env": env,
            "current_question": None,
            "total": 0,
            "correct": 0,
            "reward": 0.0,
            "consec_correct": 0,
            "question_count": 0
        }
        return session_id

    def get(self, session_id):
        return self.sessions.get(session_id)
    