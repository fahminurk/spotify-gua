import { useEffect, useState } from "react";
import Content from "../component/content";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import Playbar from "../component/playbar";
import { useSelector } from "react-redux";
import ContentArtist from "../component/contentArtist";
import { Box } from "@chakra-ui/react";
import "../css/home.css";

export default function HomePage() {
  let nav = useNavigate();
  const userSelector = useSelector((state) => state.auth);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.email) {
      return nav("/login");
    }
  }, []);

  const [playlist, setPlaylist] = useState([]);
  const [homePlaylist, setHomePlaylist] = useState([]);
  const [sidePlaylist, setSidePlaylist] = useState();

  const [artis, setArtis] = useState([]);

  async function fetchData() {
    await axios
      .get("http://localhost:2000/musics")
      .then((res) => setPlaylist(res.data));

    await axios
      .get("http://localhost:2000/playlist")
      .then((res) => setHomePlaylist(res.data));

    await axios
      .get("http://localhost:2000/playlist", {
        params: {
          createdBy: userSelector.email,
        },
      })
      .then((res) => setSidePlaylist(res.data));

    await axios
      .get("http://localhost:2000/artist")
      .then((res) => setArtis(res.data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar
        key={"sidebar"}
        sidePlaylist={sidePlaylist}
        setPlaylist={setPlaylist}
      />
      <Box className="konten">
        <ContentArtist
          key={"contentArtist"}
          data={artis}
          setPlaylist={setPlaylist}
        />
        <Content
          key={"content"}
          data={homePlaylist}
          setPlaylist={setPlaylist}
        />
      </Box>

      <Playbar key={"playbar"} playlist={playlist} />
    </>
  );
}
