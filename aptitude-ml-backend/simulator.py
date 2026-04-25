import random, math

DIFFICULTY_SCORE = {"Easy": 0.5, "Medium": 1.0, "Hard": 1.6}

class SimulatedStudent:
    def __init__(self, skill=1.0, noise=0.5):
        self.skill = skill
        self.noise = noise

    def answer_question(self, question_row, question_difficulty, category):
        diff = DIFFICULTY_SCORE.get(question_difficulty, 1.0)
        x = (self.skill - diff) / (1 + self.noise)
        p = 1 / (1 + math.exp(-x))
        correct = random.random() < p
        time_taken = max(1.0, 8.0 - self.skill * 2) + random.random() * 2
        return correct, time_taken
