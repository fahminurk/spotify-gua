import { Box, Flex, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import "../css/home.css";
import play1 from "../assets/buttonplay.png";

export default function ContentArtist(props) {
  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  return (
    <Box className="container_artis" zIndex={1} bg="black" w={"100%"}>
      <Box p="20px" w={"100%"} bg={"black"}>
        <Flex
          className="title"
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize="30px"
          color="white"
          p="10px 0px"
          w={"100%"}
        >
          <Box>Selamat Malam</Box>
        </Flex>
        <Box pt={"20px"}>
          <Box className="anjing">
            {props.data.map((val) => (
              <Card
                url={val.imgURL}
                artist={val.artist}
                setPlaylist={props?.setPlaylist}
                list={val.list}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Card(props) {
  return (
    <Box
      onClick={() => props.setPlaylist(props.list)}
      height={"100%"}
      bg={"#0f0f0f"}
      cursor={"pointer"}
      _hover={{ bg: "#2c2c2c" }}
      borderStartRadius={"10px"}
    >
      {/* <Box className="play1">
        <img src={play1} alt="play" width={"50px"} height={"50px"} />
      </Box> */}
      <Flex alignItems={"center"} gap={"10px"}>
        <Box boxSize={"80px"}>
          <Image
            src={props.url}
            alt="cover"
            width={"100%"}
            height={"100%"}
            borderStartRadius={"10px"}
          />
        </Box>
        <Box color={"white"}>{props.artist}</Box>
      </Flex>
    </Box>
  );
}
