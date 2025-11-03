import YouTube from "react-youtube";

export default function HiddenYoutubePlayer({
  selectedTrack,
  setIsPlaying,
  onReadyCallback,
}) {
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

  const onPlay = () => setIsPlaying(true);
  const onPause = () => setIsPlaying(false);
  const onReady = (event) => {
    onReadyCallback(event);
    event.target.playVideo();
  };

  if (!selectedTrack) return <></>;
  return (
    <YouTube
      videoId={selectedTrack}
      opts={opts}
      onReady={onReady}
      onPlay={onPlay}
      onPause={onPause}
    />
  );
}
