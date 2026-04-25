import gymnasium as gym
from gymnasium import spaces
import numpy as np
import pandas as pd
import random
from simulator import SimulatedStudent

# Single source of truth
DIFFICULTIES = ["Easy", "Medium", "Hard"]


class AdaptiveAptitudeEnv(gym.Env):
    metadata = {"render_modes": ["human"]}

    def __init__(self, dataset_csv_or_df, simulate=True, simulator=None, max_history=20):
        super().__init__()

        if isinstance(dataset_csv_or_df, str):
            self.df = pd.read_csv(dataset_csv_or_df)
        else:
            self.df = dataset_csv_or_df.copy()

        # Normalize difficulty labels
        self.df["difficulty_level"] = (
            self.df["difficulty_level"]
            .astype(str)
            .str.strip()
            .str.capitalize()
        )

        self.categories = sorted(self.df["category"].dropna().unique().tolist())
        self.cat_to_idx = {c: i for i, c in enumerate(self.categories)}

        self.simulate = simulate
        self.simulator = simulator or SimulatedStudent()
        self.max_history = max_history

        obs_dim = 3 + 1 + 1 + len(self.categories)
        self.observation_space = spaces.Box(0, 1, shape=(obs_dim,), dtype=np.float32)
        self.action_space = spaces.Discrete(3)

        self.reset()

    def reset(self, seed=None, options=None):
        super().reset(seed=seed)

        # Always start from Medium
        self.current_difficulty = "Medium"
        self.current_category = random.choice(self.categories)
        self.last_correct = 0.0
        self.history = []

        return self._build_obs(), {}

    def _build_obs(self):
        diff_onehot = np.zeros(3, dtype=np.float32)

        #  Safety check (prevents crashes)
        if self.current_difficulty in DIFFICULTIES:
            diff_onehot[DIFFICULTIES.index(self.current_difficulty)] = 1.0

        cat_onehot = np.zeros(len(self.categories), dtype=np.float32)
        cat_onehot[self.cat_to_idx[self.current_category]] = 1.0

        recent_acc = np.mean(self.history[-self.max_history:]) if self.history else 0.0

        return np.concatenate([
            diff_onehot,
            [self.last_correct],
            [recent_acc],
            cat_onehot
        ])

    def sample_question(self, difficulty: str):
        subset = self.df[
            (self.df["difficulty_level"] == difficulty) &
            (self.df["category"] == self.current_category)
        ]

        if subset.empty:
            subset = self.df[self.df["difficulty_level"] == difficulty]

        if subset.empty:
            subset = self.df

        return subset.sample(1).iloc[0]

    def apply_answer(self, correct: bool):
        prev_difficulty = self.current_difficulty  # 🔑 reward depends on this

        self.last_correct = float(correct)
        self.history.append(self.last_correct)

        #  Difficulty transition logic (CLEAR & CORRECT)
        if correct:
            if self.current_difficulty == "Easy":
                self.current_difficulty = "Medium"
            elif self.current_difficulty == "Medium":
                self.current_difficulty = "Hard"
        else:
            if self.current_difficulty == "Hard":
                self.current_difficulty = "Medium"
            elif self.current_difficulty == "Medium":
                self.current_difficulty = "Easy"

        #  Reward logic
        reward = 1.0 if correct else -1.0

        if correct and prev_difficulty == "Hard":
            reward += 0.8
        elif correct and prev_difficulty == "Medium":
            reward += 0.3
        elif not correct and prev_difficulty == "Hard":
            reward -= 0.3

        done = len(self.history) >= self.max_history

        return self._build_obs(), reward, done, False, {
            "current_difficulty": self.current_difficulty
        }



















# import gymnasium as gym
# from gymnasium import spaces
# import numpy as np
# import pandas as pd
# import random
# from simulator import SimulatedStudent

# DIFFICULTIES = ["Easy", "Medium", "Hard"]

# class AdaptiveAptitudeEnv(gym.Env):
#     metadata = {"render_modes": ["human"]}

#     def __init__(self, dataset_csv_or_df, simulate=True, simulator=None, max_history=20):
#         super().__init__()

#         if isinstance(dataset_csv_or_df, str):
#             self.df = pd.read_csv(dataset_csv_or_df)
#         else:
#             self.df = dataset_csv_or_df.copy()

#         self.df["difficulty_level"] = self.df["difficulty_level"].astype(str).str.capitalize()

#         self.categories = sorted(self.df["category"].dropna().unique().tolist())
#         self.cat_to_idx = {c: i for i, c in enumerate(self.categories)}

#         self.simulate = simulate
#         self.simulator = simulator or SimulatedStudent()
#         self.max_history = max_history

#         obs_dim = 3 + 1 + 1 + len(self.categories)
#         self.observation_space = spaces.Box(0, 1, shape=(obs_dim,), dtype=np.float32)
#         self.action_space = spaces.Discrete(3)

#         self.reset()

#     def reset(self, seed=None, options=None):
#         super().reset(seed=seed)
#         self.current_difficulty = "Medium"
#         self.current_category = random.choice(self.categories)
#         self.last_correct = 0.0
#         self.history = []
#         return self._build_obs(), {}

#     def _build_obs(self):
#         diff_onehot = np.zeros(3)
#         diff_onehot[DIFFICULTIES.index(self.current_difficulty)] = 1.0

#         cat_onehot = np.zeros(len(self.categories))
#         cat_onehot[self.cat_to_idx[self.current_category]] = 1.0

#         recent_acc = np.mean(self.history[-self.max_history:]) if self.history else 0.0

#         return np.concatenate([
#             diff_onehot,
#             [self.last_correct],
#             [recent_acc],
#             cat_onehot
#         ]).astype(np.float32)

#     def set_difficulty_from_action(self, action: int):
#         self.current_difficulty = DIFFICULTIES[int(action)]

#     def sample_question(self, difficulty: str):
#         subset = self.df[
#             (self.df["difficulty_level"] == difficulty) &
#             (self.df["category"] == self.current_category)
#         ]
#         if subset.empty:
#             subset = self.df[self.df["difficulty_level"] == difficulty]
#         if subset.empty:
#             subset = self.df
#         return subset.sample(1).iloc[0]

#     def apply_answer(self, correct: bool):
#         self.last_correct = float(correct)
#         self.history.append(self.last_correct)

#         if correct:
#             if self.current_difficulty == "Easy":
#                 self.current_difficulty = "Medium"
#             elif self.current_difficulty == "Medium":
#                 self.current_difficulty = "Hard"
#         else:
#             if self.current_difficulty == "Hard":
#                 self.current_difficulty = "Medium"
#             elif self.current_difficulty == "Medium":
#                 self.current_difficulty = "Easy"

#         reward = 1.0 if correct else -1.0
#         if correct and self.current_difficulty == "Hard":
#             reward += 0.8
#         if correct and self.current_difficulty == "Medium":
#             reward += 0.3
#         if not correct and self.current_difficulty == "Hard":
#             reward -= 0.3

#         done = len(self.history) >= self.max_history
#         return self._build_obs(), reward, done, False, {
#             "current_difficulty": self.current_difficulty
#         }
