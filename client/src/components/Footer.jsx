import { Box, Flex, Link, Text, HStack, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box
      bg="#020617"
      color="gray.400"
      pt={16}
      pb={8}
      mt={20}
      borderTop="1px solid rgba(255,255,255,0.08)"
      position="relative"
      overflow="hidden"
    >
      {/* Glow Background */}
      <Box
        position="absolute"
        top="0"
        left="30%"
        w="300px"
        h="300px"
        bg="purple.500"
        filter="blur(120px)"
        opacity="0.2"
      />

      <Flex
        maxW="7xl"
        mx="auto"
        px={6}
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="flex-start"
        gap={10}
        position="relative"
        zIndex="1"
      >
        {/* Brand Section */}
        <VStack align="flex-start" spacing={3}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            bgGradient="linear(to-r, purple.400, cyan.400)"
            bgClip="text"
          >
            APTIGO
          </Text>
          <Text fontSize="sm" maxW="250px">
            Smart aptitude testing platform to boost your logical and analytical skills.
          </Text>
        </VStack>

        {/* Quick Links */}
        <VStack align="flex-start" spacing={3}>
          <Text fontWeight="semibold" color="gray.200">
            Quick Links
          </Text>
          <Link  as={RouterLink} to= "/" _hover={{ color: "white" }}>Home</Link>
          <Link as={RouterLink} to="/test" _hover={{ color: "white" }}>Tests</Link>
          <Link as={RouterLink} to="/course" _hover={{ color: "white" }}>Courses</Link>
          <Link as={RouterLink} to="/demo" _hover={{ color: "white" }}>Demo</Link>
        </VStack>

        {/* Resources */}
        <VStack align="flex-start" spacing={3}>
          <Text fontWeight="semibold" color="gray.200">
            Resources
          </Text>
          <Link _hover={{ color: "white" }}>Blog</Link>
          <Link _hover={{ color: "white" }}>Help Center</Link>
          <Link _hover={{ color: "white" }}>Privacy Policy</Link>
          <Link _hover={{ color: "white" }}>Terms of Service</Link>
        </VStack>

        {/* Contact */}
        <VStack align="flex-start" spacing={3}>
          <Text fontWeight="semibold" color="gray.200">
            Contact
          </Text>
          <Link _hover={{ color: "white" }}>Support</Link>
          <Link _hover={{ color: "white" }}>Email Us</Link>
          <Link _hover={{ color: "white" }}>Feedback</Link>
        </VStack>
      </Flex>

      {/* Bottom Line */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="7xl"
        mx="auto"
        px={6}
        mt={12}
        pt={6}
        borderTop="1px solid rgba(255,255,255,0.08)"
        gap={4}
      >
        <Text fontSize="sm" opacity={0.6}>
          © 2025 APTIGO - Aptitude Testing Platform. All rights reserved.
        </Text>

        <HStack spacing={6}>
          <Link _hover={{ color: "white" }}>Privacy</Link>
          <Link _hover={{ color: "white" }}>Terms</Link>
          <Link _hover={{ color: "white" }}>Cookies</Link>
        </HStack>
      </Flex>
    </Box>
  );
}