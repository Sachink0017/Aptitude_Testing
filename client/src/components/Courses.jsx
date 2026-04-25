import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Button,
  VStack,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const courses = [
  {
    title: "Aptitude Training",
    desc: "Learn the fundamentals of quantitative aptitude including percentages, ratios, time & work, and more.",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600",
  },
  {
    title: "Logical Reasoning",
    desc: "Improve your problem-solving and logical thinking skills with structured practice.",
    img: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=600",
  },
  {
    title: "Verbal Ability",
    desc: "Enhance your English skills including grammar, comprehension, and vocabulary.",
    img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
  },
  {
    title: "Mock Tests",
    desc: "Practice full-length tests designed like real placement exams.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600",
  },
  {
    title: "Daily Practice Quizzes",
    desc: "Short quizzes to help you build consistency and improve daily.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
  },
  {
    title: "Performance Analysis",
    desc: "Track your progress and identify strengths and weak areas easily.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
  },
];

export default function Courses() {
  return (
    <Box bg="gray.50" minH="100vh">
      {/* 🔹 HERO / HEADER WITH BACKGROUND */}
      <Box
        h="250px"
        bgImage="url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHVuaXZlcnNpdHl8ZW58MHx8MHx8fDA%3D')"
        bgSize="cover"
        bgPosition="center"
        position="relative"
      >
        <Box
          bg="blackAlpha.500"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <VStack spacing={3} color="white">
            <Heading>Our Courses</Heading>
            <Text maxW="600px">
              Learn aptitude, reasoning, and problem-solving skills with
              structured practice and real tests.
            </Text>
          </VStack>
        </Box>
      </Box>

      {/* 🔹 COURSES GRID */}
      <Box px={10} py={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {courses.map((course, index) => (
            <Box
              key={index}
              bg="white"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="sm"
              border="1px solid #E2E8F0"
              _hover={{ transform: "translateY(-5px)", boxShadow: "md" }}
              transition="0.2s"
            >
              {/* COURSE IMAGE */}
              <Image
                src={course.img}
                alt={course.title}
                w="100%"
                h="160px"
                objectFit="cover"
              />

              {/* CONTENT */}
              <Box p={5}>
                <Heading fontSize="lg" mb={2} color="blue.600">
                  {course.title}
                </Heading>

                <Text color="gray.600" mb={4}>
                  {course.desc}
                </Text>

                <Button size="sm" colorScheme="blue" variant="outline">
                  Learn More
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        {/* 🔹 CTA */}
        <Flex
          mt={16}
          p={8}
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
          border="1px solid #E2E8F0"
          align="center"
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Box>
            <Heading size="md" mb={2}>
              Start Practicing Today
            </Heading>
            <Text color="gray.600">
              Improve your skills step by step with regular practice.
            </Text>
          </Box>

          <Button
            as={RouterLink}
            to="/test"
            mt={{ base: 4, md: 0 }}
            colorScheme="blue"
          >
            Go to Tests
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
