// Register.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Button, FormControl, FormLabel, Input, Stack, Heading, Box, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";

export default function Register() {
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeForm = (label, event) => {
    setFormRegister({ ...formRegister, [label]: event.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/users", formRegister);
      toast.success(response.data.message);
      // Redirect to login page or handle success as needed
    } catch (error) {
      toast.error("Failed to register. Please try again.");
      console.error(error);
    }
  };

  return (
    <Stack spacing={4} maxW="xl" mx="auto" mt={8} p={4} bg="gray.100" rounded="lg">
      <Heading>Register</Heading>
      <form onSubmit={onSubmitHandler}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            value={formRegister.name}
            onChange={(event) => onChangeForm("name", event)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={formRegister.email}
            onChange={(event) => onChangeForm("email", event)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={formRegister.password}
            onChange={(event) => onChangeForm("password", event)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Register
        </Button>
      </form>
      <Box>
        <Text>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "blue" }}>
            Login here
          </Link>
        </Text>
        <Text>
          Forgot your password?{" "}
          <Link to="/forgot-password" style={{ color: "blue" }}>
            Reset it here
          </Link>
        </Text>
      </Box>
    </Stack>
  );
}
