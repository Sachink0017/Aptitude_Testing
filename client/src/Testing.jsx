import { useEffect, useState } from "react";
import { Box, Button, Stack, Text } from "@chakra-ui/react";

export default function Testing() {
  const [question, setQuestion] = useState(null);

  const getQuestion = async (answer = "start") => {
    const res = await fetch("http://127.0.0.1:8000/next-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    });

    const data = await res.json();
    setQuestion(data);
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <Box p={10}>
      {question && (
        <Stack spacing={4}>
          <Text fontSize="xl">{question.question}</Text>

          {question.options.map((opt, i) => (
            <Button key={i} onClick={() => getQuestion("correct")}>
              {opt}
            </Button>
          ))}
        </Stack>
      )}
    </Box>
  );
}
