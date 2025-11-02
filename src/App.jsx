import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import AlbumList from "./AlbumList";
import "./App.css";
import disc0Logo from "./assets/disc-0.svg";
import Player from "./Player";

function App() {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [selectedTrack, setSelectedTrack] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const onReady = (event) => {
    playerRef.current = event.target;

    // Fetch video title
    const videoData = event.target.getVideoData();
    setTitle(videoData.title);

    // Optional: auto-play on load
    event.target.playVideo();
  };

  const onPlay = () => setIsPlaying(true);
  const onPause = () => setIsPlaying(false);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;
    isPlaying ? player.pauseVideo() : player.playVideo();
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

  const opts = {
    height: "0", // hide video
    width: "0",
    playerVars: {
      autoplay: 1,
      autoPlay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  const onSelectTrack = (s) => {
    setSelectedTrack(s);
    setShowPlayer(true);
  };

  return (
    <>
      <header>
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
        {selectedTrack && (
          <YouTube
            videoId={selectedTrack}
            opts={opts}
            onReady={onReady}
            onPlay={onPlay}
            onPause={onPause}
          />
        )}
      </main>
    </>
  );
}

export default App;
