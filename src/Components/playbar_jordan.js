import "../css/p.css";
// import fotosong from "../assets/mahalini-sial.jpg";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Center,
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLaptop,
  faRepeat,
  faBackwardStep,
  faCirclePlay,
  faForwardStep,
  faShuffle,
  faMicrophone,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { MdSpeakerGroup } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";

export default function Playbar2(props) {
  const [audio, setAudio] = useState({});
  const [duration, setDuration] = useState(0);
  const [counter, setCounter] = useState(0);
  const [pause, setPause] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    console.log(props.playlist);
    soundTrack();
  }, [props.playlist]);

  //playbar jalan
  async function updateTime() {
    if (currentTime == audio.duration && audio.duration) {
      setCounter(counter + 1);
    }
    const promise = new Promise((res) => {
      setTimeout(() => {
        if (!pause) {
          res(setCurrentTime(audio.currentTime));
        }
      }, 500);
    });
    return await promise;
  }
  useEffect(() => {
    updateTime();
  }, [currentTime]);

  //fungsi pause play
  function play(status) {
    setPause(status);
    if (!status) {
      audio.play();
      setTimeout(() => setCurrentTime(audio.currentTime), 500);
      return;
    }
    audio.pause();
  }

  function soundTrack() {
    if (props.playlist?.length) {
      const tempAudio = new Audio(
        require("../assets/audio/" + props.playlist[0].src)
      );
      tempAudio.addEventListener("loadedmetdata", function () {
        setDuration(tempAudio.duration);
        console.log(tempAudio.duration);
      });

      setAudio(tempAudio);
    }
  }

  return (
    <div className="playbar1">
      <div className="pembungkus">
        <div className="pembungkusBungkus">
          <div className="kiri">
            {/* <div className="gambar">{props.playlist[0].img}</div> */}
            <div className="judullagu">
              <div className="judullagu2">
                <div>{props.playlist[0].singer}</div>
                <div>{props.playlist[0].title}</div>
              </div>
              {/* logo */}
              <div className="logo">
                <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} />
                <FontAwesomeIcon icon={faLaptop} style={{ color: "#ffffff" }} />
              </div>
            </div>
          </div>

          {/* tengah */}
          <div className="tengah">
            <div className="tombolAtas">
              <div className="ta">
                <div>
                  <FontAwesomeIcon
                    icon={faShuffle}
                    style={{ color: "#ffffff" }}
                  />
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faBackwardStep}
                    style={{ color: "#ffffff" }}
                  />
                </div>
                <div className="playButton" onClick={() => audio.play()}>
                  <FontAwesomeIcon
                    // disini ======================================================================
                    icon={faCirclePlay}
                    style={{
                      "--fa-primary-color": "#000714",
                      "--fa-secondary-color": "#ffffff",
                    }}
                  />
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faForwardStep}
                    style={{ color: "#ffffff" }}
                  />
                </div>
                <div>
                  <FontAwesomeIcon icon={faRepeat} />
                </div>
              </div>
            </div>
            <div className="tombolBawah">
              <div className="slider">
                <p>01:23</p>
                <Center>
                  <Slider
                    aria-label="slider-ex-1"
                    defaultValue={10}
                    width={430}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Center>

                <Center>
                  {" "}
                  0{Math.floor(duration / 60)} :{" "}
                  {Math.floor(duration % 60) > 9
                    ? Math.floor(duration % 60)
                    : "0" + Math.floor(duration % 60)}
                </Center>
              </div>
            </div>
          </div>
          {/* kanan */}
          <div className="kananSpot">
            <div className="isiKanan">
              <FontAwesomeIcon
                icon={faMicrophone}
                style={{ color: "#ffffff" }}
              />
              <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff" }} />
              <MdSpeakerGroup></MdSpeakerGroup>
              <HiSpeakerWave></HiSpeakerWave>

              <Slider
                aria-label="slider-ex-1"
                defaultValue={audio?.volume * 100}
                onChange={(vol) => (audio.volume = vol / 100)}
                width={100}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
