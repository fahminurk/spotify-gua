import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Icon,
  Text,
  Input,
  Link,
  Stack,
  InputGroup,
  InputRightElement,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Checkbox } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth_types } from "../redux/types";
import axios from "axios";
import { userLogin } from "../redux/userauth";

export default function LoginPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const handleClick = () => setShowPass(!showPass);
  const toast = useToast();
  //
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   console.log("asff");
  // }, [account]);

  async function login() {
    //karena butuh waktu untuk mendapatkan data dari API
    //maka function diubah menjadi async

    const status = await dispatch(userLogin(account));

    alert(status);

    if (status) {
      toast({
        title: "Account Created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      return nav("/");
    }
    return toast({
      title: "Wrong Email/Password.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
  // await axios
  //   .get("http://localhost:2000/user", {
  //     params: {
  //       email: account.email.toLowerCase(),
  //       password: account.password,
  //     },
  //   })
  //   .then((res) => {
  //     if (res.data.length) {
  //       dispatch({
  //         type: auth_types.login,
  //         payload: res.data[0],
  //       });
  //       localStorage.setItem("user", JSON.stringify(res.data[0]));
  //       return nav("/");
  //     } else {
  //       alert("email/password salah");
  //     }
  //   });

  //
  function inputHandler(event) {
    const { value, id } = event.target;
    const tempAccount = { ...account };
    tempAccount[id] = value;
    setAccount(tempAccount);
  }

  return (
    <Flex flexDir={"column"} h="100%" alignItems={"center"}>
      <Center w="100%" m=" 20px 0px">
        <Image
          src="https://cdn.discordapp.com/attachments/1079985440272158780/1092357453095649421/spotify-logo2.png"
          w="143px"
          h="44px"
        />
      </Center>
      <Box w="600px" borderTop={"1px"}></Box>
      <Center width={"100%"} p="15px">
        <Flex
          flexDir={"column"}
          className="kanvas"
          h="100vh"
          w="450px"
          gap={"10px"}
        >
          <Box textAlign={"center"} fontWeight={"bold"} fontSize={"15px"}>
            Untuk melanjutkan, masuk ke Spotify.
          </Box>
          <Box className="facebook">
            <a href="https://www.facebook.com">
              <Button
                gap={2}
                w="100%"
                h="48px"
                borderRadius={"full"}
                bg={"#1877F2"}
                border={"groove"}
                color={"white"}
              >
                <Icon as={BsFacebook} />
                LANJUTKAN DENGAN FACEBOOK
              </Button>
            </a>
          </Box>
          <Box className="apple">
            <Button
              w="100%"
              h="48px"
              borderRadius={"full"}
              bg="black"
              color={"white"}
              gap={2}
              border={"groove"}
            >
              <Icon as={BsApple} color={"white"} />
              LANJUTKAN DENGAN APPLE
            </Button>
          </Box>
          <Box className="Google">
            <Button
              gap={2}
              w="100%"
              h="48px"
              borderRadius={"full"}
              border={"groove"}
            >
              <Icon as={FcGoogle} />
              LANJUTKAN DENGAN GOOGLE
            </Button>
          </Box>
          <Box className="telpon">
            <Button w="100%" h="48px" borderRadius={"full"} border={"groove"}>
              LANJUTKAN DENGAN NOMOR TELPON
            </Button>
          </Box>
          <Flex p="10px" justify={"space-between"} alignItems={"center"}>
            <Box w="45%" borderBottom={"1px"} h="0.1px"></Box>
            <Box>ATAU</Box>
            <Box w="45%" borderBottom={"1px"} h="0.1px"></Box>
          </Flex>
          <Box>
            <Text fontWeight={"bold"}>Alamat email atau nama pengguna</Text>
            <Input
              onChange={inputHandler}
              id="email"
              m="10px 0px"
              placeholder="Alamat email atau nama pengguna"
            />
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Kata sandi</Text>
            <InputGroup s="md">
              <Input
                onChange={inputHandler}
                id="password"
                pr="4.5rem"
                type={showPass ? "text" : "password"}
                placeholder="Kata sandi"
              />
              <InputRightElement w="4.5rem">
                <Button
                  h="1.75rem"
                  s="sm"
                  onClick={handleClick}
                  bg={"white"}
                  _hover={"white"}
                >
                  {showPass ? (
                    <Icon as={AiOutlineEye} w="100%" h="100%"></Icon>
                  ) : (
                    <Icon as={AiOutlineEyeInvisible} w="100%" h="100%">
                      /
                    </Icon>
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            {account.password.length < 8 ? (
              <Box color={"red"}> password minimal 8 </Box>
            ) : null}
          </Box>
          <Link href="#" isExternal>
            Lupa kata sandimu? <ExternalLinkIcon mx="2px" />
          </Link>
          <Flex justifyContent={"space-between"}>
            <Box>
              <Stack spacing={5} direction="row">
                <Checkbox defaultChecked>Ingat aku</Checkbox>
              </Stack>
            </Box>
            <Box>
              <Button onClick={login} borderRadius={"full"} bg={"#1ED760"}>
                Masuk
              </Button>
            </Box>
          </Flex>
          <Box w="100%" borderTop={"1px"} m="10px 0px"></Box>
          <Text fontWeight={"bold"} textAlign={"center"} pb="10px">
            Tidak punya akun?
          </Text>
          <Box>
            <a href="./register">
              <Button w="100%" h="48px" borderRadius={"full"} border={"groove"}>
                MENDAFTAR KE SPOTIFY
              </Button>
            </a>
          </Box>
        </Flex>
      </Center>
    </Flex>
  );
}
