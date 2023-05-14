import {
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  Textarea,
  Center,
  Box,
  Button,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { IoMdClose } from "react-icons/io";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function CreatePlaylist(props) {
  const [imgUrl, setImgUrl] = useState(
    require("../assets/default-spotify.png")
  );

  function input(e) {
    if (!e.target.value) {
      setImgUrl(require("../assets/default-spotify.png"));
      return;
    }
    setImgUrl(e.target.value);
  }
  //

  return (
    <>
      <Flex
        bgColor={"#282828"}
        color={"white"}
        maxW={"524px"}
        // maxH={'389px'}
        w={"524px"}
        h="100%"
        borderRadius={"5px"}
        flexDir={"column"}
        pb="20px"
      >
        <Flex
          justifyContent={"space-between"}
          w="100%"
          fontSize="24px"
          padding={"24px"}
        >
          <Flex fontWeight={"bold"}>Playlist details</Flex>
          <Flex alignItems={"end"}>
            <Icon
              as={IoMdClose}
              color="#87878"
              cursor={"pointer"}
              onClick={() => props.onClose()}
            ></Icon>
          </Flex>
        </Flex>
        <Flex padding={"0px 24px 24px 24px"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} gap="10px">
            <Image
              w={"180px"}
              h="180px"
              src={imgUrl}
              boxShadow={"0px 0px 20px black"}
            ></Image>
            <Input
              bgColor={"#3E3E3E"}
              border={"none"}
              w="180px"
              h="40px"
              placeholder="Image URL"
              id="imgURL"
            ></Input>
          </Flex>
          <Flex flexDir={"column"} justifyContent={"space-between"}>
            <Input
              bgColor={"#3E3E3E"}
              border={"none"}
              w="280px"
              h="40px"
              placeholder="Title"
              id="playlist"
            ></Input>
            <Textarea
              bgColor={"#3E3E3E"}
              border={"none"}
              w="280px"
              maxH="75%"
              h={"100%"}
              resize={"none"}
              placeholder="Description"
              id="desc"
            ></Textarea>
          </Flex>
        </Flex>
        <Flex flexDir={"column"}>
          <ListMusics />
        </Flex>
        <Center mt={5}>
          <Button
            w={"30%"}
            bg={"#1ED760"}
            _hover={{ bg: "#1ED760", color: "black" }}
          >
            Save
          </Button>
        </Center>

        {/* <Center w="100%">
          <Center
            borderRadius={"5px"}
            fontWeight={"600"}
            bgColor={"#1ED760"}
            h="48px"
            w="90%"
            cursor={"pointer"}
          >
            SAVE
          </Center>
        </Center> */}
      </Flex>
    </>
  );
}

export function ListMusics(props) {
  const [music, setMusic] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2000/musics")
      .then((res) => setMusic(res.data), []);
  });

  const arr = music.map((music) => {
    return (
      <Tr>
        <Td>
          <Button size={"xs"} color={"black"}>
            ADD
          </Button>
        </Td>
        <Td>{music.title}</Td>
        <Td>{music.singer}</Td>
      </Tr>
    );
  });
  return (
    <>
      {/* <Flex flexDir={"column"} paddingBottom="10px" gap={"10px"}>
        <Grid
          templateColumns="1fr 2fr 1fr"
          columnGap={5}
          maxH={"550px"}
          overflow={"hidden"}
        >
          <GridItem w="100%" h="25px">
            <Center>Add Musics</Center>
          </GridItem>
          <GridItem w="100%" h="25px" fontWeight={"bold"}>
            <Center>Title</Center>
          </GridItem>
          <GridItem w="100%" h="25px" fontWeight={"bold"}>
            <Center>Artist</Center>
          </GridItem>

          <GridItem w="100%" h="25px"></GridItem>
          <GridItem w="100%" h="25px" fontWeight={"bold"}></GridItem>
          <GridItem w="100%" h="25px" fontWeight={"bold"}></GridItem>

          <Box display={"none"}>
            {props.data?.map((val) => (
              <Card title={val.title} singer={val.singer} />
            ))}
          </Box>
        </Grid>

        <Flex gap={"20px"} w="100%" justifyContent={"center"}>
          <Flex cursor={"pointer"}>Prev</Flex>
          <Flex cursor={"pointer"}>Next</Flex>
        </Flex>
      </Flex> */}

      <TableContainer height={200} overflowY={"scroll"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Title</Th>
              <Th> Artist</Th>
            </Tr>
          </Thead>
          <Tbody>{arr}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
