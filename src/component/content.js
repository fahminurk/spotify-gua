import { Badge, Box, Divider, Flex, Image, Text, calc } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/home.css";
import play from "../assets/buttonplay.png";
import { CreatePlaylist } from "./modal";

export default function Content(props) {
  const userSelector = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  //

  return (
    <Box
      className="container_playlist"
      w="100%"
      zIndex={1}
      bg="black"
      // pl="241px"
      h={"100vh"}
    >
      <Box
        className="pembungkus_card"
        p="20px"
        bgColor={"black"}

        // whiteSpace={"nowrap"}
      >
        <Flex
          className="title"
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize={"1em"}
          color="white"
          p="10px 0px"
        >
          <Box>For you {userSelector?.name}</Box>

          <Box>Show all</Box>
        </Flex>
        <Box
          className="babi"
          // display={"flex"}
          // flexWrap={"wrap"}
          gap={5}
          maxH={"290px"}
          overflow={"hidden"}
          // justifyContent={"space-evenly"}
        >
          {props.data?.map((val) => (
            <Card1
              url={val.imgURL}
              judul={val.playlist}
              desc={val.desc}
              setPlaylist={props?.setPlaylist}
              list={val.list}
            />
          ))}
        </Box>
      </Box>

      <Box className="footer" w={"100%"} h={"90px"} bg={"black"}></Box>
    </Box>
  );
}

function Card1(props) {
  return (
    <Box
      className="card"
      width={"100%"}
      height={"290"}
      padding={"15px"}
      borderRadius={"10px"}
      bg={"#0f0f0f"}
      _hover={{ bg: "#2c2c2c" }}
      onClick={() => props.setPlaylist(props.list)}
      cursor={"pointer"}
    >
      {/* <Box className="play">
        <img src={play} alt="play" width={"50px"} height={"50px"} />
      </Box> */}
      <Box>
        <Box>
          <Image src={props.url} alt="cover" width={"100%"} height={"100%"} />
        </Box>
        <Badge colorScheme="purple" fontSize={"8px"}>
          For you
        </Badge>
        <Box color="white" className="judul" fontWeight={"bold"}>
          {props.judul}
        </Box>

        <Box color={"#9f9f9f"} className="desc" fontSize={"14px"}>
          {props.desc.length > 30
            ? props.desc.substring(0, 30) + "..."
            : props.desc}
        </Box>
      </Box>
    </Box>
  );
}
