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
  SliderMark,
  Center,
  Tooltip,
} from "@chakra-ui/react";
import {
  BiSkipNext,
  BiShuffle,
  BiSkipPrevious,
  BiRepeat,
} from "react-icons/bi";
// import "../css/playbar.css";
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
    <Container className="kertas" margin={0} padding={0}>
      {/* <Box w="100%" h="570px"></Box> */}

      <Flex
        className="music-container"
        bg={"black"}
        w="100%"
        h={112}
        position={"fixed"}
        bottom={0}
        direction="row"
        align="center"
        justify="center"
        zIndex={3}
      >
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
            w={70}
            h={70}
          />
          <Flex
            className="msc-intr"
            // justify={"center"}
            b
            flexDir={"column"}
          >
            <Link href="#" color={"white"}>
              {props.playlist?.length ? props.playlist[counter]?.title : null}
            </Link>
            <Link href="#" color={"white"}>
              {props.playlist?.length ? props.playlist[counter]?.singer : null}
            </Link>
          </Flex>
          <Link href="#">
            <Icon as={AiOutlineHeart} w={5} h={5} color={"white"}></Icon>
          </Link>
          <Link href="#">
            <Icon as={BsPip} w={4} h={4} color={"white"}></Icon>
          </Link>
        </Flex>

        {/* TOMBOL PLAYER MUSIC */}
        <Flex
          className="msc-controller"
          direction="column"
          align="center"
          justify="center"
          width={"30%"}
        >
          <Flex
            className="ctrl-button"
            align={"center"}
            width={"100%"}
            justify={"center"}
            gap={3}
          >
            <Box>
              <IconButton
                variant={"link"}
                as={BiShuffle}
                style={{ width: "20px", height: "20px" }}
                color="#999"
              ></IconButton>
            </Box>
            <Box>
              <IconButton
                variant={"link"}
                as={BiSkipPrevious}
                style={{ width: "50px", height: "50px" }}
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
              style={{ width: "50px", height: "50px" }}
              color="white"
              onClick={() => play(!pause)}
              // onClick={() => audio.play()}
            ></IconButton>

            <Box>
              <IconButton
                variant={"link"}
                as={BiSkipNext}
                style={{ width: "50px", height: "50px" }}
                color="#999"
                onClick={async () => {
                  setCounter(counter + 1);
                  await changeSong(counter + 1);
                }}
              />
            </Box>
            <Box>
              <IconButton
                variant={"link"}
                as={BiRepeat}
                style={{ width: "20px", height: "20px" }}
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
          >
            <Center color={"white"} width={10}>
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

            <Center color={"white"} width={10}>
              0{Math.floor(duration / 60)}:{""}
              {Math.floor(duration % 60) > 9
                ? Math.floor(duration % 60)
                : "0" + Math.floor(duration % 60)}
            </Center>
          </Flex>
        </Flex>
        <Flex
          className="msc-opt"
          w={"30%"}
          justify={"right"}
          gap={2}
          align={"center"}
          h={50}
        >
          <Link>
            <Icon as={TbMicrophone2} w={6} h={5} color={"white"}></Icon>
          </Link>
          <Link>
            <Icon as={HiOutlineQueueList} w={6} h={5} color={"white"}></Icon>
          </Link>
          <Link>
            <Icon as={TbDevices2} w={6} h={5} color={"white"}></Icon>
          </Link>
          <Link>
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
        </Flex>
      </Flex>
    </Container>
  );
}
