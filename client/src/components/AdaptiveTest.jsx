import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Heading,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Divider,
  Progress,
  Flex,
} from "@chakra-ui/react";

const API = "http://127.0.0.1:8000";
const TOTAL_QUESTIONS = 20;

export default function AdaptiveTest() {
  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [accuracy, setAccuracy] = useState(0);

  const [questionNo, setQuestionNo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  useEffect(() => {
    startSession();
  }, []);

  const startSession = async () => {
    const res = await axios.post(`${API}/start`);
    setSessionId(res.data.session_id);
    loadQuestion(res.data.session_id);
  };

  const loadQuestion = async (sid = sessionId) => {
    const res = await axios.get(`${API}/question/${sid}`);
    setQuestion(res.data);
    setSelected("");
    setFeedback("");
  };

  const submitAnswer = async () => {
    if (!selected) return;

    const res = await axios.post(`${API}/answer`, {
      session_id: sessionId,
      answer: selected,
    });

    setFeedback(
      res.data.correct
        ? " Correct Answer"
        : ` Wrong Answer (Correct: ${res.data.correct_option})`
    );

    setAccuracy(res.data.accuracy);

    if (res.data.correct) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (questionNo + 1 === TOTAL_QUESTIONS) {
      setTestCompleted(true);
    } else {
      setQuestionNo((prev) => prev + 1);
      loadQuestion();
    }
  };

  // FINAL REPORT
  if (testCompleted) {
    return (
      <Box maxW="600px" mx="auto" mt={60} p={8} bg="white" borderRadius="xl" boxShadow="lg">
        <Heading size="lg" mb={4}> Test Completed</Heading>

        <Text><b>Total Questions:</b> {TOTAL_QUESTIONS}</Text>
        <Text><b>Correct Answers:</b> {correctCount}</Text>
        <Text><b>Accuracy:</b> {accuracy}%</Text>

        <Divider my={4} />

        <Heading size="md">
          {accuracy >= 70
            ? " Excellent Performance!"
            : accuracy >= 40
            ? " Good Attempt!"
            : " Keep Practicing!"}
        </Heading>
      </Box>
    );
  }

  if (!question) {
    return (
      <Box textAlign="center" mt={20}>
        <Heading size="md">Loading test...</Heading>
      </Box>
    );
  }

  // 🔹 Progress %
  const progressPercent = ((questionNo + 1) / TOTAL_QUESTIONS) * 100;

  return (
    <Box bg="gray.50" minH="100vh" py={10} marginTop={50}>
      <Box maxW="650px" mx="auto" p={8} bg="white" borderRadius="xl" boxShadow="lg">

        {/*  TOP HEADER */}
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="md">Adaptive Test</Heading>

          {/*  Circular Progress */}
          <Box position="relative" w="60px" h="60px">
            <Progress
              value={progressPercent}
              size="sm"
              borderRadius="full"
              sx={{
                "& > div": {
                  borderRadius: "full",
                },
              }}
            />
            <Flex
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              align="center"
              justify="center"
              fontSize="sm"
              fontWeight="bold"
            >
              {questionNo + 1}/{TOTAL_QUESTIONS}
            </Flex>
          </Box>
        </Flex>

        {/*  INFO */}
        <Text mb={1}><b>Difficulty:</b> {question.difficulty}</Text>
        <Text mb={4}><b>Accuracy:</b> {accuracy}%</Text>

        {/*  QUESTION */}
        <Heading size="md" mb={5}>
          {question.question}
        </Heading>

        {/*  OPTIONS */}
        <RadioGroup onChange={setSelected} value={selected}>
          <Stack spacing={3}>
            {Object.entries(question.options).map(([key, value]) => (
              <Box
                key={key}
                p={3}
                border="1px solid"
                borderColor={selected === key ? "blue.400" : "gray.200"}
                borderRadius="md"
                _hover={{ bg: "gray.50" }}
              >
                <Radio value={key} w="100%">
                  {key} {value}
                </Radio>
              </Box>
            ))}
          </Stack>
        </RadioGroup>

        {/*  BUTTONS */}
        <Stack direction="row" spacing={4} mt={6}>
          <Button
            colorScheme="blue"
            onClick={submitAnswer}
            w="full"
          >
            Submit
          </Button>

          <Button
            colorScheme="green"
            onClick={nextQuestion}
            isDisabled={!feedback}
            w="full"
          >
            Next
          </Button>
        </Stack>

        {/* 🔹 FEEDBACK */}
        {feedback && (
          <Text   mt={5} fontWeight="bold">
            {feedback}
          </Text>
        )}
      </Box>
    </Box>
  );
}