import {
  Box,
  Container,
  Flex,
  IconButton,
  Image,
  Link,
  Icon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Center,
} from "@chakra-ui/react";
import {
  BiSkipNext,
  BiShuffle,
  BiSkipPrevious,
  BiRepeat,
} from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import {
  BsPip,
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
} from "react-icons/bs";
import { TbMicrophone2, TbDevices2 } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { SlVolume2 } from "react-icons/sl";
import { useEffect, useState } from "react";
import "../css/home.css";
import { TiArrowShuffle } from "react-icons/ti";

export default function Playbar(props) {
  // STATING VARIABLE
  const [audio, setAudio] = useState({});
  const [duration, setDuration] = useState(0);
  const [counter, setCounter] = useState(0);
  const [pause, setPause] = useState(true);
  const [currentTime, setCurrenTime] = useState(0);

  // useEffect(() => {
  //   soundTrack();
  // }, []);
  //
  function soundTrack() {
    if (props.playlist?.length) {
      const tempAudio = new Audio(
        require("../assets/audio/" + props.playlist[0].src)
      );
      tempAudio.addEventListener("loadedmetadata", function () {
        setDuration(tempAudio.duration);
        console.log(tempAudio.duration);
      });
      setAudio(tempAudio);
    }
  }

  //
  useEffect(() => {
    // alert(audio.currentTime);
    changePlaylist();
  }, [props.playlist]);

  // PLAYBAR JALAN
  async function updateTime() {
    if (currentTime == audio.duration && audio.duration) {
      setCounter(counter + 1);
      return await changeSong(counter + 1);
    }
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        if (!pause) {
          resolve(setCurrenTime(audio.currentTime));
        }
      }, 500);
    });
    return await promise;
  }

  //
  useEffect(() => {
    updateTime();
  }, [currentTime]);

  // FUNGSI PAUSE-PLAY
  function play(status) {
    setPause(status);
    if (!status) {
      audio.play();
      setTimeout(() => setCurrenTime(audio.currentTime), 500);
      return;
    }
    audio.pause();
  }

  //changesong
  async function changeSong(track) {
    if (track > props.playlist.length - 1 || track < 0) {
      track = 0;
    }
    setCounter(track);
    audio.src = require("../assets/audio/" + props.playlist[track].src);
    return audio.play().finally(() => {
      setPause(false);
      updateTime();
    });
  }

  function changePlaylist() {
    setTimeout(() => setCurrenTime(audio?.currentTime), 500);

    if (audio.src) {
      setCounter(0);
      changeSong(0);
    } else {
      soundTrack();
    }
  }

  return (
    <Box
      className="container-playbar"
      bg={"black"}
      w="100%"
      // position={"fixed"}
      bottom={-1}
      zIndex={9}
      p={"15px 10px"}
    >
      <Flex align="center" justify="center">
        {/* KETERANGAN MUSIC */}

        <Flex
          className="msc-desc"
          gap={3}
          w={"30%"}
          align={"center"}
          // bg={"pink"}
        >
          <Image
            src={props.playlist?.length ? props.playlist[counter]?.img : null}
            boxSize={"60px"}
          />
          <Box className="judul-artis" fontSize={"0.9em"}>
            <Link id="judul-lagu" href="#" color={"white"}>
              {props.playlist?.length ? props.playlist[counter]?.title : null}
            </Link>
            <Link id="lagu" href="#" color={"white"}>
              {props.playlist?.length ? props.playlist[counter]?.singer : null}
            </Link>
          </Box>
          <Box gap={"5px"} className="msc-love">
            <Box>
              <Link boxSize={"20px"} as={AiOutlineHeart} color={"white"} />
            </Box>
            <Box>
              <Link boxSize={"20px"} as={BsPip} color={"white"} />
            </Box>
          </Box>
        </Flex>

        {/* TOMBOL PLAYER MUSIC */}
        <Flex
          className="msc-controller"
          direction="column"
          align="center"
          justify="center"
          // bg={"pink"}
          w={"50%"}
        >
          <Flex
            className="ctrl-button"
            align={"center"}
            justify={"center"}
            gap={3}
            w={"100%"}
          >
            <Box>
              <IconButton
                id="shuffle"
                variant={"link"}
                as={TiArrowShuffle}
                boxSize={30}
                pt={1}
                color="#999"
              ></IconButton>
            </Box>
            <Box>
              <IconButton
                variant={"link"}
                as={BiSkipPrevious}
                boxSize={30}
                pt={1}
                _hover={{ color: "white" }}
                color="#999"
                onClick={async () => {
                  setCounter(counter - 1);
                  await changeSong(counter - 1);
                }}
              ></IconButton>
            </Box>

            <IconButton
              variant={"link"}
              as={pause ? BsFillPlayCircleFill : BsFillPauseCircleFill}
              boxSize={"30px"}
              color="white"
              onClick={() => play(!pause)}
              // onClick={() => audio.play()}
            ></IconButton>

            <Box>
              <IconButton
                variant={"link"}
                as={BiSkipNext}
                boxSize={"30px"}
                pt={1}
                _hover={{ color: "white" }}
                color="#999"
                onClick={async () => {
                  setCounter(counter + 1);
                  await changeSong(counter + 1);
                }}
              />
            </Box>
            <Box>
              <IconButton
                id="repeat"
                variant={"link"}
                as={BiRepeat}
                boxSize={"30px"}
                pt={1}
                color="#999"
              ></IconButton>
            </Box>
          </Flex>
          <Box height={2} width={"100%"}></Box>
          <Flex
            className="prog-pool"
            align={"center"}
            justify={"space-between"}
            width={"100%"}
            gap={3}
          >
            <Center color={"white"} fontSize={12}>
              0{Math.floor(audio.currentTime / 60)}:{""}
              {Math.floor(audio.currentTime % 60) > 9
                ? Math.floor(audio.currentTime % 60)
                : "0" + Math.floor(audio.currentTime % 60)}
            </Center>

            <Center className="prog-bar" width={"100%"} pl={1} pr={1}>
              <Slider
                aria-label="slider-ex-1"
                w={"100%"}
                colorScheme="gray"
                _hover={"#r1ED760"}
                value={Math.round(audio?.currentTime * 100) / audio?.duration}
                onChange={(val) => {
                  let changeDur = val / 100;
                  if (audio.duration) {
                    changeDur *= audio.duration;
                  }
                  audio.currentTime = changeDur;
                  setCurrenTime(audio?.currentTime);
                }}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                {/* <SliderThumb /> */}
              </Slider>
            </Center>

            <Center fontSize={12} color={"white"} width={10}>
              0{Math.floor(duration / 60)}:{""}
              {Math.floor(duration % 60) > 9
                ? Math.floor(duration % 60)
                : "0" + Math.floor(duration % 60)}
            </Center>
          </Flex>
        </Flex>

        {/* volume */}
        <Box
          className="volumee"
          w={"25%"}
          // justify={"right"}
          align={"center"}
          gap={1}
        >
          <Box className="iconplaybar">
            <Link>
              <Icon as={TbMicrophone2} w={6} h={5} color={"white"}></Icon>
            </Link>
            <Link>
              <Icon as={HiOutlineQueueList} w={6} h={5} color={"white"}></Icon>
            </Link>
            <Link>
              <Icon as={TbDevices2} w={6} h={5} color={"white"}></Icon>
            </Link>
            <Link borderRadius={"full"}>
              <Icon as={SlVolume2} w={6} h={5} color={"white"}></Icon>
            </Link>

            <Slider
              aria-label="slider-ex-1"
              w={28}
              defaultValue={100}
              onChange={(vol) => (audio.volume = vol / 100)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
