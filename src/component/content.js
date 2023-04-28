import { Badge, Box, Divider, Flex, Image, Text, calc } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../css/home.css";
import play from "../assets/buttonplay.png";

export default function Content(props) {
  const userSelector = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  return (
    <Box
      className="container_playlist"
      w="100%"
      zIndex={1}
      bg="black"
      overflowX={"hidden"}
      // pl="241px"
      h={"100vh"}
    >
      <Box className="pembungkus_card" p="20px" bgColor={"black"}>
        <Flex
          className="title"
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize="20px"
          color="white"
          p="10px 0px"
          // whiteSpace={"nowrap"}
        >
          <Box>For you {userSelector?.name}</Box>

          <Box>Show all</Box>
        </Flex>
        <Box className="babi" display={"flex"} gap={5} w={1246}>
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
      // bg={"pink"}
      width={"170px"}
      height={"300px"}
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
        <Box
          color="white"
          // height={"30px"}
          className="judul"
          fontWeight={"bold"}
        >
          {props.judul}
        </Box>

        <Box
          color={"#9f9f9f"}
          // height={"50px"}
          className="desc"
          fontSize={"14px"}
        >
          {props.desc}
        </Box>
      </Box>
    </Box>
  );
}
