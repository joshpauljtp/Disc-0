import { useEffect, useRef, useState } from "react";
import AlbumList from "./AlbumList";
import "./App.css";
import disc0Logo from "./assets/disc-0.svg";
import HiddenYoutubePlayer from "./HiddenYoutubePlayer";
import Player from "./Player";
import { useRouter } from "./useRouter";

function App() {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [selectedTrack, setSelectedTrack] = useState("");

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const { navigate, path } = useRouter();

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

  const handleSeek = (e) => {
    const player = playerRef.current;
    if (!player) return;
    const value = parseFloat(e.target.value);
    player.seekTo(value, true);

    setProgress(value);
  };

  const onSelectTrack = (s) => {
    setSelectedTrack(s);
    navigate(`/track/${s}`);
  };

  const showPlayer = path.startsWith("/track/");

  return (
    <>
      <header onClick={() => navigate("/")}>
        <img src={disc0Logo} alt="Disc-0" />
      </header>
      <main>
        {showPlayer ? (
          <Player
            togglePlay={togglePlay}
            isPlaying={isPlaying}
            handleSeek={handleSeek}
            duration={duration}
            progress={progress}
          />
        ) : (
          <AlbumList setSelectedTrack={onSelectTrack} />
        )}
        <HiddenYoutubePlayer
          selectedTrack={selectedTrack}
          setIsPlaying={setIsPlaying}
          onReadyCallback={onReadyCallback}
        />
      </main>
    </>
  );
}

export default App;
