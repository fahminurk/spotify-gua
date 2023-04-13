import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import "../css/home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth_types } from "../redux/types";

export default function NavbarLogin() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  function logout() {
    dispatch({ type: auth_types.logout });
    localStorage.removeItem("user");
    nav("/login");
  }
  return (
    <Flex className="kontener_navbar" position={"fixed"} w="100%" pl="241px">
      <Box
        className="navbar"
        // bg="green"
        w="100vw"
        p={3}
        color="white"
        zIndex={2}
      >
        <Flex justifyContent={"space-between"}>
          <Flex w="90px" justifyContent={"space-between"}>
            <IconButton
              bg={"white"}
              icon={<ArrowLeftIcon />}
              borderRadius={"full"}
              color={"green"}
            />
            <IconButton
              bg={"black"}
              icon={<ArrowRightIcon />}
              borderRadius={"full"}
              color={"white"}
            />
          </Flex>
          <Box>
            <a href="/register">
              <Button bg={"#1c1c1c"} borderRadius={"20px"}>
                Daftar
              </Button>
            </a>

            <a href="/login">
              <Button
                bg={"white"}
                color="black"
                fontWeight={"bold"}
                borderRadius={"20px"}
              >
                Login
              </Button>
            </a>
            <Button onClick={logout} color="black">
              logout
            </Button>
            <Button color="black">{userSelector?.email}</Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
