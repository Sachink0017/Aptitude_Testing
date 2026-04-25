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
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../util";
import { useUser } from "../context/userContext";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function SignIn() {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const doSubmit = async (values) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        toast.success("Sign In Successful");
        updateUser(data.user || data);
        navigate("/"); // redirect after login
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
          mb="6"
          color="gray.700"
        >
          Sign In to your Account
        </Heading>

        {/* ✅ FIXED FORM */}
        <form onSubmit={handleSubmit(doSubmit)}>
          <Stack gap="4">

            <FormControl isInvalid={errors.username}>
              <Input
                placeholder="Username or Email"
                size="lg"
                bg="gray.50"
                borderRadius="md"
                _focus={{
                  bg: "white",
                  borderColor: "blue.400",
                }}
                {...register("username", {
                  required: "Username is required",
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
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
              Sign In
            </MotionButton>
          </Stack>
        </form>

        {/* LINKS */}
        <Flex justify="center" mt={6}>
          <Text fontSize="sm">
            Don't have an account?{" "}
            <Link to="/signup">
              <Text as="span" color="blue.500" fontWeight="medium">
                Sign Up
              </Text>
            </Link>
          </Text>
        </Flex>
      </MotionBox>
    </Flex>
  );
}