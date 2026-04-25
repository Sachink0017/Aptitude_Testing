import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Box,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../util";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const doSubmit = async (values) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await res.json();

      if (res.status == 200) {
        toast.success("Sign Up Successful. You are now logged in");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      px={4}
      bgImage="url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600')"
      bgSize="cover"
      bgPosition="center"
    >
      {/* Overlay */}
      <Box
        position="absolute"
        w="100%"
        h="100%"
        bg="whiteAlpha.800"
        backdropFilter="blur(4px)"
      />

      <MotionBox
        position="relative"
        p="10"
        maxW="lg"
        w="full"
        bg="white"
        borderRadius="xl"
        boxShadow="xl"
        border="1px solid #E2E8F0"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Heading
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          color="gray.700"
          mb="6"
        >
          Create Account
        </Heading>

        <form onSubmit={handleSubmit(doSubmit)}>
          <Stack gap="4">
            <FormControl isInvalid={errors.username}>
              <Input
                placeholder="Username"
                size="lg"
                bg="gray.50"
                borderRadius="md"
                _focus={{
                  bg: "white",
                  borderColor: "blue.400",
                }}
                {...register("username", {
                  required: "Username is Required",
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <Input
                type="email"
                placeholder="Email"
                size="lg"
                bg="gray.50"
                borderRadius="md"
                _focus={{
                  bg: "white",
                  borderColor: "blue.400",
                }}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <Input
                type="password"
                placeholder="Password"
                size="lg"
                bg="gray.50"
                borderRadius="md"
                _focus={{
                  bg: "white",
                  borderColor: "blue.400",
                }}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <MotionButton
              type="submit"
              isLoading={isSubmitting}
              size="lg"
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </MotionButton>
          </Stack>
        </form>

        <Flex justify="center" mt="6">
          <Text fontSize="sm">
            Already have an account?{" "}
            <Link to="/signin">
              <Text as="span" color="blue.500" fontWeight="medium">
                Sign In
              </Text>
            </Link>
          </Text>
        </Flex>
      </MotionBox>
    </Flex>
  );
}