import { Badge, Box, Flex, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Content(props) {
  // const data = [
  //   {
  //     url: "https://e0.pxfuel.com/wallpapers/914/962/desktop-wallpaper-the-book-yoasobi.jpg",
  //     judul: "The Book",
  //     desc: "2021 - Album",
  //   },
  //   {
  //     url: "https://upload.wikimedia.org/wikipedia/en/d/dc/Yoasobi_-_The_Book_2.jpg",
  //     judul: "The Book 2",
  //     desc: "2021 - Album",
  //   },
  //   {
  //     url: "https://upload.wikimedia.org/wikipedia/en/2/20/Yoasobi_-_E-Side.jpeg",
  //     judul: "E-SIDE",
  //     desc: "2021 - Album",
  //   },
  //   {
  //     url: "https://upload.wikimedia.org/wikipedia/en/6/6d/Yoasobi_-_E-Side_2.png",
  //     judul: "E-SIDE",
  //     desc: "2022 - Album",
  //   },
  //   {
  //     url: "https://upload.wikimedia.org/wikipedia/en/9/93/Yoru_ni_Kakeru_cover_art.jpg",
  //     judul: "夜に駆ける",
  //     desc: "2019 - Single",
  //   },
  //   {
  //     url: "https://t2.genius.com/unsafe/409x409/https%3A%2F%2Fimages.genius.com%2F17f2e3fa1692719bbb588d9c6d2f5ca3.1000x1000x1.png",
  //     judul: "祝福",
  //     desc: "2022 - Single",
  //   },
  // ];

  const data1 = [
    {
      url: "https://upload.wikimedia.org/wikipedia/id/5/58/Kerajaan_Cinta.jpg",
      judul: "Kerajaan Cinta",
      desc: "2007 - Album",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/id/f/fc/So7.jpg",
      judul: "Sheila on 7",
      desc: "1999 - Album",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/id/6/69/Perubahan_Album.jpg",
      judul: "Perubahan",
      desc: "2008 - Album",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/id/4/48/Heavenoflove.jpg",
      judul: "Heave of Love",
      desc: "2004 - Album",
    },
    {
      url: "https://upload.wikimedia.org/wikipedia/id/1/1e/Album_Puspa.jpg",
      judul: "P.U.S.P.A",
      desc: "2008 - Single",
    },
  ];

  const userSelector = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  return (
    <Box
      className="parent"
      w="100%"
      h="100vh"
      zIndex={1}
      bg="black"
      pl="241px"
      pt={"64px"}
    >
      {/* <Box className="bg_kontener" bgColor={"black"} w="100%" h="100%"> */}
      <Box className="pembungkus_card" p="20px" w="1278px" bgColor={"black"}>
        <Flex
          className="title"
          justifyContent={"space-between"}
          // alignItems={"center"}
          fontSize="20px"
          color="white"
          p="10px 10px"
        >
          <Box>For you {userSelector?.name}</Box>

          <Box>Show all</Box>
        </Flex>
        <Flex id="pembugkus-cardd" h={"310px"} alignItems={"center"} gap="20px">
          {props.data.map((val) => (
            <Card
              url={val.imgURL}
              judul={val.playlist}
              desc={val.desc}
              setPlaylist={props?.setPlaylist}
              list={val.list}
            />
          ))}
        </Flex>
      </Box>

      <Box className="pembungkus_cardd" p="20px" w="1278px" bgColor={"black"}>
        <Flex
          className="title"
          justifyContent={"space-between"}
          alignItems={"center"}
          fontSize="24px"
          color="white"
          p="10px 10px"
        >
          <div>2000an</div>

          <div>Show all</div>
        </Flex>
        <Flex
          id="music_card"
          h={"310px"}
          alignItems={"center"}
          // bgColor={"purple"}
          gap="20px"
        >
          {data1.map((val) => (
            <Card url={val.url} judul={val.judul} desc={val.desc} />
          ))}
        </Flex>
      </Box>
      <Box h={"100px"} bg={"pink"}></Box>
      {/* </Box> */}
    </Box>
  );
}

function Card(props) {
  return (
    <Box
      className="card"
      // bg={"pink"}
      width={"200px"}
      height={"100%"}
      padding={"15px"}
      borderRadius={"10px"}
      bg={"#0f0f0f"}
      _hover={{ bg: "#2c2c2c" }}
      onClick={() => props.setPlaylist(props.list)}
      cursor={"pointer"}
    >
      <Box>
        <Box
          //  maxW={"185px"}
          // marginBottom={"10px"}
          boxSize={"170px"}
        >
          <Image src={props.url} alt="cover" width={"100%"} height={"100%"} />
        </Box>
        <Box>
          <Badge colorScheme="purple" fontSize={"8px"}>
            For you
          </Badge>
        </Box>

        <Box
          color="white"
          height={"30px"}
          className="judul"
          fontWeight={"bold"}
        >
          {props.judul}
        </Box>

        <Box
          color={"#9f9f9f"}
          height={"50px"}
          className="desc"
          fontSize={"14px"}
        >
          {props.desc}
        </Box>
      </Box>
    </Box>
  );
}
