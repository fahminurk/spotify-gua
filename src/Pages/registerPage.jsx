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
  Select,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Checkbox } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbAlertCircleFilled } from "react-icons/tb";
import * as Yup from "yup";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import axios from "axios";

export default function RegisterPage() {
  YupPassword(Yup);
  // deklarasi
  const nav = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const handleClick = () => setShowPass(!showPass);
  const month = [
    {
      name: "January",
      number: 1,
    },
    {
      name: "February",
      number: 2,
    },
    {
      name: "March",
      number: 3,
    },
    {
      name: "April",
      number: 4,
    },
    {
      name: "May",
      number: 5,
    },
    {
      name: "June",
      number: 6,
    },
    {
      name: "July",
      number: 7,
    },
    {
      name: "August",
      number: 8,
    },
    {
      name: "September",
      number: 9,
    },
    {
      name: "October",
      number: 10,
    },
    {
      name: "November",
      number: 11,
    },
    {
      name: "December",
      number: 12,
    },
  ];
  const [value, setValue] = React.useState("1");
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  //
  const formik = useFormik({
    initialValues: {
      email: "",
      email2: "",
      password: "",
      name: "",
      day: 0,
      month: 0,
      year: "",
      gender: "Male",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("kamu perlu memasukkan email")
        .email(
          "Email ini tidak valid. Pastikan penulisan sudah benar seperti example@email.com"
        ),
      email2: Yup.string()
        .required("Kamu perlu menkonfirmasi email kamu.")
        .oneOf([Yup.ref("email"), null], "Alamat email tidak sama."),
      password: Yup.string()
        .required("minimal 8 kata")
        .min(8, "Kata sandi terlalu pendek."),
    }),
    onSubmit: async () => {
      const { email, name, password, year, month, day, gender } = formik.values;
      const account = { email, name, password, gender };
      account.birthdate = new Date(year, month, day);
      const checkEmail = await axios
        .get("http://localhost:2000/user", {
          params: { email: account.email },
        })
        .then((res) => {
          if (res.data.length) {
            return true;
          } else {
            return false;
          }
        });
      if (checkEmail) {
        return alert("email alredy used");
      } else {
        await axios.post("http://localhost:2000/user", account).then((res) => {
          return nav("/login");
        });
      }
    },
  });
  //
  useEffect(() => {
    console.log("asff");
  }, [account]);

  //
  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
    // const tempAccount = { ...account };
    // tempAccount[id] = value;
    // setAccount(tempAccount);
  }

  return (
    <Flex id="bg" flexDir={"column"} h="100%" alignItems={"center"}>
      <Center width={"100"}>
        <Flex
          flexDir={"column"}
          className="kanvas"
          h="100%"
          w="450px"
          gap={"10px"}
        >
          <Box w="100%" p="40px 0px 32px">
            <Center>
              <Image
                src="https://cdn.discordapp.com/attachments/1079985440272158780/1092357453095649421/spotify-logo2.png"
                w="130px"
                h="40px"
              />
            </Center>
            <Box
              textAlign={"center"}
              fontWeight={"bold"}
              fontSize={"32px"}
              m="40px 0px 0px"
              letterSpacing={"-2.5px"}
            >
              Daftar gratis untuk mulai mendengarkan.
            </Box>
          </Box>
          <Center>
            {/* <Box className="facebook"> */}
            <Button
              gap={2}
              w="100%"
              maxW="312px"
              h="48px"
              borderRadius={"full"}
              colorScheme="blue"
              border={"groove"}
            >
              <Icon as={BsFacebook} />
              LANJUTKAN DENGAN FACEBOOK
            </Button>
            {/* </Box> */}
          </Center>
          <Center>
            {/* <Box className="Google"> */}
            <Button
              gap={2}
              w="100%"
              maxW="312px"
              h="48px"
              borderRadius={"full"}
              border={"groove"}
            >
              <Icon as={FcGoogle} />
              LANJUTKAN DENGAN GOOGLE
            </Button>
            {/* </Box> */}
          </Center>
          <Center>
            <Flex
              // p="10px"
              justify={"space-between"}
              alignItems={"center"}
              w="100%"
              maxW="312px"
            >
              <Box w="45%" borderBottom={"1px"} h="0.1px"></Box>
              <Text>atau</Text>
              <Box w="45%" borderBottom={"1px"} h="0.1px"></Box>
            </Flex>
          </Center>
          <Box>
            <Text fontWeight={"bold"} pb="5px">
              Apa email kamu?
            </Text>
            <Input
              //   onChange={(e) => formik.setFieldValue(e.target.value, "email")}
              id="email"
              onChange={inputHandler}
              placeholder="Masukkan email kamu"
            />
            <Flex
              color="red"
              gap="5"
              display={formik.errors.email ? "flex" : "none"}
            >
              <Center>
                <Icon as={TbAlertCircleFilled} w="16px" h="16px" />
              </Center>
              {formik.errors.email}
            </Flex>
          </Box>
          <Box>
            <Text fontWeight={"bold"} pb="5px">
              Konfirmasi email kamu
            </Text>
            <Input
              onChange={inputHandler}
              id="email2"
              placeholder="Masukkan lagi email kamu"
            />
            <Flex
              color="red"
              gap="5"
              display={formik.errors.email2 ? "flex" : "none"}
            >
              <Center>
                <Icon as={TbAlertCircleFilled} w="16px" h="16px" />
              </Center>
              {formik.errors.email2}
            </Flex>
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Buat kata sandi</Text>
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
            <Flex
              color="red"
              gap="5"
              display={formik.errors.password ? "flex" : "none"}
            >
              <Center>
                <Icon as={TbAlertCircleFilled} w="16px" h="16px" />
              </Center>
              {formik.errors.password}
            </Flex>
            {/* {account.password.length < 8 ? (
              <Box color={"red"}> password minimal 8 </Box>
            ) : null} */}
          </Box>
          <Box mb={"24px"}>
            <Text fontWeight={"bold"} pb="5px">
              Siapa namamu?
            </Text>
            <Input
              onChange={inputHandler}
              id="name"
              placeholder="Masukkan nama profil"
            />
            <Text fontSize={"14px"}>Ini akan ditampilkan di profil kamu</Text>
          </Box>
          {/*  */}
          <Flex flexDir={"column"} gap={"5px"}>
            <Box fontWeight={"700"}> What's your date of birth?</Box>

            <Flex justifyContent={"space-between"} gap={"20px"}>
              <Input
                maxW={"80px"}
                w="100%"
                onChange={inputHandler}
                id="day"
                placeholder="DD"
              ></Input>
              {/* <Input
         onChange={inputHandler}
         id="profile"
         placeholder="Enter a profile name."
        ></Input> */}
              <Select placeholder="Month" id="month">
                {month.map((val) => (
                  <option value={val.number}> {val.name} </option>
                ))}
              </Select>
              <Input
                maxW={"80px"}
                w="100%"
                onChange={inputHandler}
                id="year"
                placeholder="YYYY"
              ></Input>
            </Flex>

            {/* <Flex color={"red"} gap="5px">
              <Center>
                <Icon as={TbAlertCircleFilled} w="16px" h="16px" />
              </Center>
              Enter a valid day of the month.
            </Flex>
            <Flex color={"red"} gap="5px">
              <Center>
                <Icon as={TbAlertCircleFilled} w="16px" h="16px" />
              </Center>
              Enter a valid year.
            </Flex>
            <Flex color={"red"} gap="5px">
              <Center>
                <Icon as={TbAlertCircleFilled} w="16px" h="16px" />
              </Center>
              Select your birth month.
            </Flex> */}
          </Flex>

          <Box>
            <Text fontWeight={"700"}>What's your gender?</Text>
            <Box>
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction="row" gap={"20px"}>
                  <Radio value="1">Male</Radio>
                  <Radio value="2">Female</Radio>
                  <Radio value="3">chris</Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Box>
          <Box m="20px 0px">
            <Stack spacing={5}>
              <Checkbox colorScheme="green" defaultChecked>
                Saya tidak ingin menerima pesan pemasaran dari Spotify
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                Bagikan data pendaftaran saya kepada penyedia konten Spotify
                untuk keperluan pemasaran.
              </Checkbox>
            </Stack>
          </Box>
          <Flex fontSize={"11px"} justifyContent={"center"}>
            <Text>Dengan mengklik daftar, kamu menyetuju</Text>
            <Link textDecorationLine={"underline"} href="#" color="#1db954">
              Persyaratan dan Ketentuan Penggunaan Spotify
            </Link>
          </Flex>
          <Flex fontSize={"11px"} justifyContent={"center"}>
            <Text>Dengan mengklik daftar, kamu menyetuju</Text>
            <Link textDecorationLine={"underline"} href="#" color="#1db954">
              Kebijakan Privasi Spotify
            </Link>
          </Flex>
          <Box>
            <Center>
              <Button
                borderRadius={"full"}
                bg={"#1ED760"}
                p="12px 48px"
                fontWeight={"bold"}
                onClick={formik.handleSubmit}
              >
                Daftar
              </Button>
            </Center>
          </Box>
        </Flex>
      </Center>
    </Flex>
  );
}
