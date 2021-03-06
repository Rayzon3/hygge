import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Axios from "axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const router = useRouter()

  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("telegram.100", "grey.400");

  const submitForm = async (event: FormEvent) => {
    try {
      event.preventDefault();
        await Axios.post("/auth/register", {
        email,
        username,
        password,
      });
      router.push("/login")

    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6} textColor="teal">
          Register!
        </Heading>
        <Input
          name="email"
          textColor="white"
          placeholder="Email"
          variant="filled"
          mb={3}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Flex textColor="red" mb={3}>
            <small>{ errors.email }</small>
        </Flex>
        <Input
          name="username"
          textColor="white"
          placeholder="Username"
          variant="filled"
          mb={3}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Flex textColor="red" mb={3}>
            <small>{ errors.username }</small>
        </Flex>
        <Input
          name="password"
          textColor="white"
          placeholder="Password"
          variant="filled"
          mb={3}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Flex textColor="red" mb={3}>
            <small>{ errors.password }</small>
        </Flex>
        <Button type="submit" colorScheme="teal" mb={6} onClick={submitForm}>
          Register
        </Button>
        <Flex mb={4} textColor="teal">
          <Link href="/login">
            <a>Already a user? Login</a>
          </Link>
        </Flex>
        <Button onClick={toggleColorMode}> Toggle Theme </Button>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
