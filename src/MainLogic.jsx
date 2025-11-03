import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AlbumList from "./AlbumList";
import "./App.css";
import disc0Logo from "./assets/disc-0.svg";
import HiddenYoutubePlayer from "./HiddenYoutubePlayer";
import Player from "./Player";

function MainLogic() {
  const location = useLocation();
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [selected, setSelected] = useState({
    album: "",
    track: "",
  });

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const navigate = useNavigate();

  const onReadyCallback = (event) => {
    playerRef.current = event.target;
  };

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;
    isPlaying ? player.pauseVideo() : player.playVideo();
    setIsPlaying(!isPlaying);
  };

  // update progress every 500ms while playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        const player = playerRef.current;
        if (player) {
          const current = player.getCurrentTime();
          const total = player.getDuration();
          setProgress(current);
          setDuration(total);
        }
      }, 500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSeek = (v) => {
    const player = playerRef.current;
    if (!player) return;
    const value = parseFloat(v);
    player.seekTo(value, true);

    setProgress(value);
  };

  const onSelectAlbum = (s) => {
    setSelected((p) => ({ ...p, album: s }));
    let path = `/album/${s}`;
    navigate(path);
  };

  const showPlayer = useMemo(
    () => location.pathname.startsWith("/album/"),
    [location]
  );

  return (
    <>
      <header onClick={() => navigate("/")}>
        <img src={disc0Logo} alt="Disc-0" />
      </header>
      <main>
        {showPlayer ? (
          <Player
            albumIndex={selected.album}
            togglePlay={togglePlay}
            isPlaying={isPlaying}
            handleSeek={handleSeek}
            duration={duration}
            progress={progress}
            selected={selected}
            setSelected={setSelected}
          />
        ) : (
          <AlbumList onSelectAlbum={onSelectAlbum} />
        )}
        {selected.track && (
          <HiddenYoutubePlayer
            selectedTrack={selected.track}
            setIsPlaying={setIsPlaying}
            onReadyCallback={onReadyCallback}
          />
        )}
      </main>
    </>
  );
}

export default MainLogic;
