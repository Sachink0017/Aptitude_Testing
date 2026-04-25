import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Button,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import Footer from "../components/Footer.jsx";

import { useEffect, useRef } from "react";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);

export default function Home() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      if (container) {
        scrollAmount += 260;
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 0;
        }
        container.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 2500);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <Box
      bgColor="purple.50"
      minH="100vh"
      bgImage="url('https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      {/* Overlay */}
      <Box bg="whiteAlpha.700" minH="100vh" backdropFilter="blur(2px)">
        {/* HERO */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={6}
          p={14}
          maxW="6xl"
          mx="auto"
          minH="80vh"
          align="center"
        >
          <Stack flex="1" spacing={6}>
            <MotionHeading
              fontSize={{ base: "4xl", lg: "6xl" }}
              fontWeight="bold"
              color="gray.800"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              Unlock the{" "}
              <Text as="span" color="blue.500">
                Magic
              </Text>
              <br />
              in your Mind!
            </MotionHeading>

            <MotionBox color="gray.600" pt="4">
              Fun quizzes and tricky challenges that make your brain grow
              stronger.
            </MotionBox>

            <MotionButton
              as={RouterLink}
              to="/signin"
              colorScheme="blue"
              size="lg"
              whileHover={{ scale: 1.03 }}
            >
              Get Started
            </MotionButton>
          </Stack>
        </Flex>

        {/* FEATURES */}
        <Box p={14} maxW="6xl" mx="auto">
          <Heading textAlign="center" mb={10} color="blue.500">
            Features
          </Heading>

          <Flex
            ref={scrollRef}
            overflowX="auto"
            gap={6}
            py={6}
            px={2}
            css={{
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {[
              {
                title: "AI Adaptive Testing",
                description: "Difficulty adjusts based on performance.",
                img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
              },
              {
                title: "Personalized Learning",
                description: "Track your progress and improve step by step.",
                img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
              },
              {
                title: "Smart Analytics",
                description: "Understand your strengths and weaknesses.",
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
              },
              {
                title: "Performance Tracking",
                description: "Monitor improvement over time.",
                img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600",
              },
              {
                title: "Real-time Feedback",
                description: "Get instant results and insights.",
                img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
              },
            ].map((feature, index) => (
              <MotionBox
                key={index}
                minW="280px"
                flex="0 0 auto"
                borderRadius="lg"
                overflow="hidden"
                bg="white"
                border="1px solid #E2E8F0"
                boxShadow="sm"
                whileHover={{ y: -6 }}
                transition="0.25s"
              >
                {/* IMAGE */}
                <Box h="250px" overflow="hidden">
                  <Image
                    src={feature.img}
                    alt={feature.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    transition="0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                </Box>

                {/* TEXT */}
                <Box p={5}>
                  <Heading fontSize="lg" mb={2} color="gray.800">
                    {feature.title}
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    {feature.description}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </Flex>
        </Box>

        {/* TESTIMONIALS */}
        <Box p={14} maxW="6xl" mx="auto">
          <Heading textAlign="center" mb={10} color="blue.500">
            Testimonials
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[
              { name: "Rahul", text: "Helped me improve my aptitude." },
              { name: "Anjali", text: "Very simple and useful platform." },
              { name: "Amit", text: "Great for daily practice." },
            ].map((t, i) => (
              <Box
                key={i}
                p={6}
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                border="1px solid #E2E8F0"
              >
                <Text color="gray.600">"{t.text}"</Text>
                <Text mt={4} fontWeight="bold">
                  - {t.name}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}
















// <Flex direction={{base:'column', md:'row'}} gap={6} p={14} maxW='6-xl' mx='auto' bgColor='yellow.400'>
//     <Stack flex='1' alignSelf='center'>
//         <Heading
//         as='h1'
//         fontSize={{base:'4xl', lg:'6xl'}}
//         fontWeight='bold'
//         color='gray.700'
//         >
//             Make Your{' '}
//             <Text as='span' color='blue.400'>Perfect</Text>
//             <br/>
//             Day
//         </Heading>
//         <Box color='gray.500' pt='8'>Taskly will help you get manage your day and to-do list
//             <br/>
//             We have a wide range of features to help you get things done.
//         </Box>
//         <Link as={RouterLink} to={'/signin'} fontWeight='bold' color='blue.400'>Let's get started... </Link>
//     </Stack>

// </Flex>

////TASK
// import { Box,
//         Center,
//         Flex,
//         Heading,
//         Stack,
//         Text,
//         Button,
//     Link,
//     SimpleGrid,
//  } from "@chakra-ui/react";
//  import { motion } from "framer-motion";
// import { Link as RouterLink} from "react-router-dom";
// // import productiveSvg from '/productive.svg';
// import Footer from "../components/Footer.jsx";

// const MotionBox = motion(Box);
// const MotionHeading = motion(Heading);
// const MotionButton = motion(Button);

// export default function Home(){
//     return (

//         <Box bgColor="purple.50" minH="100vh">
//         <Flex
//       direction={{ base: 'column', md: 'row' }}
//       gap={6}
//       p={14}
//       maxW='6xl'
//       mx='auto'
//       minH="80vh"
//       align="center"
//     >
//       <Stack flex='1' alignSelf='center' spacing={6}>
//         {/* Animated Heading */}
//         <MotionHeading
//           as='h1'
//           fontSize={{ base: '4xl', lg: '6xl' }}
//           fontWeight='bold'
//           color='gray.700'
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           Unlock the{' '}
//           <Text as='span' color='blue.400'>
//             Magic
//           </Text>
//           <br />
//           in your Mind!
//         </MotionHeading>

//         {/* Animated Text */}
//         <MotionBox
//           color='gray.600'
//           pt='4'
//           fontSize={{ base: 'md', lg: 'lg' }}
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         >
//           Fun quizzes and tricky challenges that make your brain grow bigger and stronger every day.
//           <br />
//           Sharpen your logical and quantitative skills.
//           <br/>
//           Learning has never been this addictive.
//         </MotionBox>

//         {/* Get Started Button */}
//         <MotionButton
//           as={RouterLink}
//           to='/signin'
//           colorScheme='blue'
//           size='lg'
//           mt={4}
//           w={{ base: 'full', md: 'auto' }}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 0.5 }}
//         >
//           Get Started
//         </MotionButton>
//       </Stack>
//     </Flex>
//     {/* Features Cards Section */}
// <Box p={14} maxW="6xl" mx="auto">
//   <Heading textAlign="center" mb={10} color="blue.400">
//     Features
//   </Heading>

//   {/* Scrollable container */}
//   <Flex overflowX="auto" gap={6} py={4} px={2}
//    css={{
//       '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Chrome/Safari
//       '-ms-overflow-style': 'none',                // Hide scrollbar for IE/Edge
//       'scrollbar-width': 'none',                   // Hide scrollbar for Firefox
//     }}>
//     {[
//       { title: 'Organize Tasks', description: 'Manage your tasks efficiently and never miss a deadline.' },
//       { title: 'Track Progress', description: 'Visualize your productivity and track your daily achievements.' },
//       { title: 'Reminders', description: 'Set reminders to stay on top of important tasks and events.' },
//       { title: 'Collaboration', description: 'Share your tasks and collaborate with teammates easily.' },
//       { title: 'Notifications', description: 'Stay updated with instant notifications.' },
//       { title: 'Analytics', description: 'Get insights into your productivity trends.' },
//     ].map((feature, index) => (
//       <MotionBox
//         key={index}
//         minW="250px"        // ensures each card has a fixed width
//         flex="0 0 auto"     // prevents shrinking
//         p={6}
//         h='200px'
//         bg="white"
//         shadow="md"
//         borderRadius="lg"
//         whileHover={{ scale: 1.05 }}
//         transition={{ duration: 0.3 }}
//       >
//         <Heading fontSize="xl" mb={2} color="blue.400">{feature.title}</Heading>
//         <Text color="gray.600">{feature.description}</Text>
//       </MotionBox>
//     ))}
//   </Flex>
// </Box>

// <Footer/>
// </Box>

//     )
// }
