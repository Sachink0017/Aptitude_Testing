import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const tests = [
  { id: 1, name: "Numerical Aptitude", image: "https://plus.unsplash.com/premium_vector-1723627044028-8a015a759823?w=600&auto=format&fit=crop&q=60", path: "/test/numerical" },
  { id: 2, name: "Logical Reasoning", image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600", path: "/test/logical" },
  { id: 3, name: "Verbal Ability", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600", path: "/test/verbal" },
  { id: 4, name: "Visual Reasoning", image: "https://plus.unsplash.com/premium_vector-1698192128950-03bde4cddbc4?w=600", path: "/test/visual" },
  { id: 5, name: "Memory Test", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600", path: "/test/memory" },
  { id: 6, name: "Attention Test", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600", path: "/test/attention" },
  { id: 7, name: "Problem Solving", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600", path: "/test/problem" },
  { id: 8, name: "Speed Test", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600", path: "/test/speed" },
  { id: 9, name: "Pattern Recognition", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600", path: "/test/pattern" },
];

export default function Test() {
  return (
    <Box p={10}  marginTop= {50} bg="gray.50" minH="100vh">

      {/* Heading */}
      <Heading
        textAlign="center"
        mb={10}
        color="blue.500"
        letterSpacing="wide"
      >
        Choose Your Test
      </Heading>

      {/*  ADAPTIVE TEST */}
      <Box
        as={Link}
        to="/test/adaptive"
        mb={12}
        borderRadius="xl"
        overflow="hidden"
        boxShadow="md"
        bg="white"
        border="1px solid #E2E8F0"
        _hover={{ transform: "translateY(-3px)", boxShadow: "lg" }}
        transition="0.2s"
      >
        <Flex
          p={8}
          align="center"
          justify="space-between"
          direction={{ base: "column", md: "row" }}
        >
          <Box
  as={Link}
  to="/test/adaptive"
  mb={12}
  borderRadius="xl"
  overflow="hidden"
  boxShadow="md"
  position="relative"
  bgGradient="linear(to-r, blue.50, purple.50)"
  border="1px solid #E2E8F0"
  _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
  transition="0.25s"
>
  <Flex
    p={8}
    align="center"
    justify="space-between"
    direction={{ base: "column", md: "row" }}
  >
    {/* LEFT TEXT */}
    <Box>
      <Heading size="md" mb={2} color="blue.600">
        Adaptive Aptitude Test
      </Heading>

      <Text color="gray.600" fontSize="md">
        AI-powered test that adjusts difficulty based on your performance.
      </Text>
    </Box>

    {/* RIGHT BUTTON */}
    <Box mt={{ base: 5, md: 0 }}>
      <Box
        px={8}
        py={3}
        borderRadius="full"
        fontWeight="bold"
        color="white"
        bgGradient="linear(to-r, blue.500, purple.500)"
        _hover={{
          bgGradient: "linear(to-r, blue.600, purple.600)",
          transform: "scale(1.05)",
        }}
        transition="0.2s"
        textAlign="center"
      >
        Start Test →
      </Box>
    </Box>
  </Flex>
</Box>
          
        </Flex>
      </Box>

      {/* 🔹 TEST GRID */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {tests.map((test) => (
          <Box
            key={test.id}
            as={Link}
            to={test.path}
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="sm"
            border="1px solid #E2E8F0"
            _hover={{ transform: "translateY(-5px)", boxShadow: "md" }}
            transition="0.2s"
          >
            {/* FIXED IMAGE */}
            <Image
              src={test.image}
              alt={test.name}
              w="100%"
              h="180px"
              objectFit="cover"
            />

            <Box p={4}>
              <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                {test.name}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}