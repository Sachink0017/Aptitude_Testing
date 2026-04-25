def get_next_question(user_answer):
    if user_answer == "start":
        return {
            "question_id": 1,
            "question": "What is 5 + 3?",
            "options": ["6", "7", "8", "9"],
            "difficulty": "easy"
        }

    if user_answer == "correct":
        return {
            "question_id": 2,
            "question": "What is 12 × 8?",
            "options": ["96", "88", "108", "92"],
            "difficulty": "medium"
        }

    return {
        "question_id": 3,
        "question": "What is 4 + 2?",
        "options": ["4", "5", "6", "7"],
        "difficulty": "easy"
    }
