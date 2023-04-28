import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  MenuGroup,
  Text,
} from "@chakra-ui/react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import profile from "../assets/profile.jpg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth_types } from "../redux/types";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
//
export default function Navbar() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();
  //
  function logout() {
    dispatch({ type: auth_types.logout });
    localStorage.removeItem("user");
    nav("/login");
  }
  return (
    <Box
      className="container-navbar"
      w={"100%"}
      // position={"fixed"}
      zIndex={1}
      // pl="241px"
    >
      <Box bgGradient="linear(to-t, black, #464646)" p={"10px 10px"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex id="right-left" w={"100px"} justifyContent={"space-between"}>
            <IconButton
              as={MdOutlineKeyboardArrowLeft}
              color={"black"}
              _hover={{ background: "black", color: "white" }}
              cursor={"pointer"}
              size={"md"}
              borderRadius={"full"}
            ></IconButton>
            <IconButton
              as={MdOutlineKeyboardArrowRight}
              color={"black"}
              _hover={{ background: "black", color: "white" }}
              cursor={"pointer"}
              size={"md"}
              borderRadius={"full"}
            ></IconButton>
          </Flex>

          <Flex id="profil" alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                borderRadius={"full"}
                gap={"5px"}
                // bg={"black"}
                color={"black"}
                // _hover={{ bg: "white", color: "black" }}
              >
                <Flex alignItems={"center"} gap={"10px"}>
                  <Box>
                    <Avatar src={profile} size={"sm"} />
                  </Box>

                  <Box>{userSelector?.name}</Box>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>Account</MenuItem>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Upgrade to Premium</MenuItem>
                <MenuItem>Settings</MenuItem>
                <Divider />
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
