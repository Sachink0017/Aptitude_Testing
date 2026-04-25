import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // FastAPI backend
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Start the aptitude test
 * METHOD: POST
 * ENDPOINT: /start
 */
export const startTest = async () => {
  const response = await API.post("/start");
  return response.data;
};

/**
 * Get next question
 * METHOD: POST (NOT GET)
 * ENDPOINT: /question
 */
export const getQuestion = async (sessionId) => {
  const response = await API.post("/question", {
    session_id: sessionId,
  });
  return response.data;
};

/**
 * Submit answer
 * METHOD: POST
 * ENDPOINT: /answer
 */
export const submitAnswer = async (sessionId, answer) => {
  const response = await API.post("/answer", {
    session_id: sessionId,
    answer: answer,
  });
  return response.data;
};

export default API;
