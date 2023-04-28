import "../css/sidebar.css";
import {
  Box,
  IconButton,
  Container,
  Flex,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { MdAddBox } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { useDisclosure } from "@chakra-ui/react";
import { CreatePlaylist } from "./modal";
import React, { useEffect } from "react";
import logo from "../assets/spotify-logo2.png";

export default function Sidebar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  return (
    // <Box>
    <Box
      className="bigbox"
      bg="#101010"
      w="241px"
      maxH="100vh"
      h="100%"
      color={"#b3b3b3"}
      position={"fixed"}
      zIndex={"2"}
    >
      <Flex
        bg="#101010"
        w="241px"
        maxH="100%"
        color={"#b3b3b3"}
        flexDir={"column"}
        paddingBottom={"23px"}
      >
        <Box mb={"18px"} pl={"10px"}>
          <img id="logo" objectFit="cover" src={logo} alt="logo" />
        </Box>
        <Container mb={"18px"}>
          <a href="#">
            <Flex p={"8px 0"} _hover={{ color: "white" }}>
              <IconButton
                variant="link"
                as={AiFillHome}
                color={"#b3b3b3"}
                w={"24px"}
                h={"24px"}
                cursor={"pointer"}
                _hover={{ color: "white" }}
              ></IconButton>
              <Center className="text-side">Home</Center>
            </Flex>
          </a>

          <a href="">
            <Flex p={"8px 0"} _hover={{ color: "white" }}>
              <IconButton
                variant="link"
                as={FiSearch}
                color={"#b3b3b3"}
                w={"24px"}
                h={"24px"}
                cursor={"pointer"}
                _hover={{ color: "white" }}
              ></IconButton>
              <Center className="text-side">Seacrh</Center>
            </Flex>
          </a>

          <a href="">
            <Flex p={"8px 0"} _hover={{ color: "white" }}>
              <IconButton
                variant="link"
                as={VscLibrary}
                color={"#b3b3b3"}
                w={"24px"}
                h={"24px"}
                cursor={"pointer"}
                _hover={{ color: "white" }}
              ></IconButton>
              <Center className="text-side">Library</Center>
            </Flex>
          </a>
        </Container>
        <Container>
          <a href="#">
            <Flex p={"8px 0"} _hover={{ color: "white" }} onClick={onOpen}>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                scrollBehavior={scrollBehavior}
              >
                <ModalOverlay />
                <ModalContent>
                  <CreatePlaylist onClose={onClose} />
                </ModalContent>
              </Modal>
              <IconButton
                variant="link"
                as={MdAddBox}
                color={"#b3b3b3"}
                w={"24px"}
                h={"24px"}
                cursor={"pointer"}
                _hover={{ color: "white" }}
              ></IconButton>
              <Center className="text-side">Create Playlist</Center>
            </Flex>
          </a>
          <a href="#">
            <Flex p={"8px 0"} _hover={{ color: "white" }}>
              <IconButton
                variant="link"
                as={FcLike}
                color={"#b3b3b3"}
                w={"24px"}
                h={"24px"}
                cursor={"pointer"}
                _hover={{ color: "white" }}
              ></IconButton>
              <Center className="text-side">Liked Songs</Center>
            </Flex>
          </a>
        </Container>

        <hr className="hr-sidebar" />

        <Box
          className="scrollbox-sidebar"
          padding={"8px 16px"}
          // bg={"pink"}
        >
          {props.sidePlaylist?.map((val) => (
            <SidePlay
              {...val}
              setPlaylist={props?.setPlaylist}
              list={val.list}
            />
          ))}
        </Box>
      </Flex>
    </Box>
  );
}

function SidePlay(props) {
  return (
    <Box
      cursor={"pointer"}
      _hover={{ color: "white" }}
      onClick={() => props.setPlaylist(props.list)}
    >
      {props.playlist}
    </Box>
  );
}
