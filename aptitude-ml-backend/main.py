from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from adaptive_env import AdaptiveAptitudeEnv, DIFFICULTIES
from session_manager import SessionManager
from stable_baselines3 import PPO

app = FastAPI(title="Adaptive Aptitude AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv("dataset.csv")
model = PPO.load("rl_model.zip", device="cpu")

sessions = SessionManager()

class StartResponse(BaseModel):
    session_id: str

class AnswerRequest(BaseModel):
    session_id: str
    answer: str

@app.get("/")
def root():
    return {"status": "ok", "message": "Adaptive Aptitude API running"}


# ------------------ START ------------------

@app.post("/start", response_model=StartResponse)
def start_test():
    env = AdaptiveAptitudeEnv(df, simulate=False)
    env.reset()

    session_id = sessions.create_session(env)
    return {"session_id": session_id}


# ------------------ GET QUESTION ------------------

@app.get("/question/{session_id}")
def get_question(session_id: str):
    session = sessions.get(session_id)
    if session is None:
        raise HTTPException(status_code=404, detail="Invalid session")

    env = session["env"]

    # ✅ Track question count
    session["question_count"] += 1

    # ✅ First 2 questions ALWAYS Medium
    if session["question_count"] <= 2:
        env.current_difficulty = "Medium"

    q = env.sample_question(env.current_difficulty)
    session["current_question"] = q

    return {
        "difficulty": env.current_difficulty,
        "question": q["question_text"],
        "options": {
            "A": q["option_a"],
            "B": q["option_b"],
            "C": q["option_c"],
            "D": q["option_d"],
        }
    }


# ------------------ SUBMIT ANSWER ------------------

@app.post("/answer")
def submit_answer(req: AnswerRequest):
    session = sessions.get(req.session_id)
    if session is None:
        raise HTTPException(status_code=404, detail="Invalid session")

    env = session["env"]
    q = session.get("current_question")

    if q is None:
        raise HTTPException(status_code=400, detail="No active question")

    correct_option = str(q["correct_option"]).strip().upper()
    correct = req.answer.upper() == correct_option

    # 🚫 LOCK FIRST 2 QUESTIONS TO MEDIUM
    if session["question_count"] <= 2:
        obs, reward, done, _, info = env.apply_answer(correct)

        session["total"] += 1
        session["correct"] += int(correct)
        session["reward"] += reward

        accuracy = session["correct"] / session["total"]

        return {
            "correct": correct,
            "correct_option": correct_option,
            "next_difficulty": "Medium",  # 🔒 force Medium
            "reward": reward,
            "accuracy": round(accuracy * 100, 2),
            "done": done
        }

    # ------------------ AFTER FIRST 2 QUESTIONS ------------------

    # ✅ Update streak
    if correct:
        session["consec_correct"] += 1
    else:
        session["consec_correct"] = 0

    # ✅ Difficulty logic (same as console)
    if correct and session["consec_correct"] >= 2:
        if env.current_difficulty == "Easy":
            env.current_difficulty = "Medium"
        elif env.current_difficulty == "Medium":
            env.current_difficulty = "Hard"

        session["consec_correct"] = 0

    if not correct:
        if env.current_difficulty == "Hard":
            env.current_difficulty = "Medium"
        elif env.current_difficulty == "Medium":
            env.current_difficulty = "Easy"

    # ✅ Update environment tracking
    obs, reward, done, _, info = env.apply_answer(correct)

    session["total"] += 1
    session["correct"] += int(correct)
    session["reward"] += reward

    accuracy = session["correct"] / session["total"]

    return {
        "correct": correct,
        "correct_option": correct_option,
        "next_difficulty": env.current_difficulty,
        "reward": reward,
        "accuracy": round(accuracy * 100, 2),
        "done": done
    }













# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import pandas as pd
# from adaptive_env import AdaptiveAptitudeEnv, DIFFICULTIES
# from session_manager import SessionManager
# from stable_baselines3 import PPO

# # ------------------ APP INIT ------------------

# app = FastAPI(title="Adaptive Aptitude AI")

# # ------------------ CORS (REQUIRED FOR REACT) ------------------

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
#         "http://127.0.0.1:5173",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ------------------ LOAD DATA & MODEL ------------------

# df = pd.read_csv("dataset.csv")

# model = PPO.load("rl_model.zip", device="cpu")

# sessions = SessionManager()

# # ------------------ REQUEST SCHEMAS ------------------

# class StartResponse(BaseModel):
#     session_id: str

# class AnswerRequest(BaseModel):
#     session_id: str
#     answer: str   # A/B/C/D

# # ------------------ ROOT (OPTIONAL) ------------------

# @app.get("/")
# def root():
#     return {"status": "ok", "message": "Adaptive Aptitude API running"}

# # ------------------ API ENDPOINTS ------------------

# @app.post("/start", response_model=StartResponse)
# def start_test():
#     env = AdaptiveAptitudeEnv(df, simulate=False)
#     env.reset()

#     session_id = sessions.create_session(env)

#     return {"session_id": session_id}


# @app.get("/question/{session_id}")
# def get_question(session_id: str):
#     session = sessions.get(session_id)
#     if session is None:
#         raise HTTPException(status_code=404, detail="Invalid session")

#     env = session["env"]

#     # RL model decides difficulty
#     state = env._build_obs()
#     action, _ = model.predict(state, deterministic=True)

#     # 🔧 FIX: apply difficulty directly (method did not exist)
#     action = int(action)
#     env.current_difficulty = DIFFICULTIES[action]

#     # Sample and STORE question
#     q = env.sample_question(env.current_difficulty)
#     session["current_question"] = q

#     return {
#         "difficulty": env.current_difficulty,
#         "question": q["question_text"],
#         "options": {
#             "A": q["option_a"],
#             "B": q["option_b"],
#             "C": q["option_c"],
#             "D": q["option_d"],
#         }
#     }


# @app.post("/answer")
# def submit_answer(req: AnswerRequest):
#     session = sessions.get(req.session_id)
#     if session is None:
#         raise HTTPException(status_code=404, detail="Invalid session")

#     env = session["env"]
#     q = session.get("current_question")

#     if q is None:
#         raise HTTPException(status_code=400, detail="No active question")

#     correct_option = str(q["correct_option"]).strip().upper()
#     correct = req.answer.upper() == correct_option

#     obs, reward, done, _, info = env.apply_answer(correct)

#     session["total"] += 1
#     session["correct"] += int(correct)
#     session["reward"] += reward

#     accuracy = session["correct"] / session["total"]

#     return {
#         "correct": correct,
#         "correct_option": correct_option,
#         "next_difficulty": info["current_difficulty"],
#         "reward": reward,
#         "accuracy": round(accuracy * 100, 2),
#         "done": done
#     }
